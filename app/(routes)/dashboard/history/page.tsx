"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Clock,
  FileText,
  Calendar,
  Search,
  Filter,
  Stethoscope,
  TrendingUp,
} from "lucide-react";
import AddNewSessionDialog from "../_components/AddNewSessionDialog";
import axios from "axios";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import moment from "moment";
import { Input } from "@/components/ui/input";
import ViewReportDialog from "../_components/ViewReportDialog";
import NoRecentConsultation from "../_components/NoRecentConsultation";

const History = () => {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSpecialist, setFilterSpecialist] = useState("all");

  const GetHistoryList = useMemo(
    () => async () => {
      try {
        const result = await axios.get("/api/session-chat?sessionId=all");
        console.log("History List Data is : ", result.data);
        setHistoryList(result.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    },
    [],
  );

  useEffect(() => {
    GetHistoryList();
  }, [GetHistoryList]);

  // Memoized filtered history
  const filteredHistory = useMemo(() => {
    return historyList.filter((record) => {
      const matchesSearch =
        record.notes.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.selectedDoctor.specialist
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterSpecialist === "all" ||
        record.selectedDoctor.specialist === filterSpecialist;

      return matchesSearch && matchesFilter;
    });
  }, [historyList, searchTerm, filterSpecialist]);

  // Memoized specialists list
  const specialists = useMemo(() => {
    return [
      ...new Set(historyList.map((record) => record.selectedDoctor.specialist)),
    ];
  }, [historyList]);

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "severe":
        return "bg-red-100 text-red-700 border-red-200";
      case "moderate":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "mild":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Consultation History
              </h1>
              <p className="text-gray-600">
                Track your AI medical consultations and health journey
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="font-medium">{historyList.length} Total</span>
              </div>
              <AddNewSessionDialog title="New Consultation" />
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by symptoms, specialist, or notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-lg border-white/20"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={filterSpecialist}
                onChange={(e) => setFilterSpecialist(e.target.value)}
                className="px-4 py-2 bg-white/80 backdrop-blur-lg border border-white/20 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Specialists</option>
                {specialists.map((specialist) => (
                  <option key={specialist} value={specialist}>
                    {specialist}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {filteredHistory.length === 0 ? (
          <NoRecentConsultation />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHistory.map((record: SessionDetail, index: number) => {
              const report = record.report as any;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  {/* Card Header */}
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Stethoscope className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {record.selectedDoctor.specialist}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {record.selectedDoctor.description}
                          </p>
                        </div>
                      </div>
                      {report?.severity && (
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(report.severity)}`}
                        >
                          {report.severity}
                        </span>
                      )}
                    </div>

                    {/* Date and User */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {moment(new Date(record.createdOn)).format(
                            "MMM DD, YYYY",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>
                          {moment(new Date(record.createdOn)).fromNow()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Chief Complaint */}
                    <div className="mb-4 flex justify-between">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Description
                      </h4>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {record?.notes || "No description provided"}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                      <ViewReportDialog record={record} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats Section */}
        {historyList.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Consultations</p>
                  <p className="text-xl font-bold text-gray-900">
                    {historyList.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Specialists Seen</p>
                  <p className="text-xl font-bold text-gray-900">
                    {specialists.length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">This Month</p>
                  <p className="text-xl font-bold text-gray-900">
                    {
                      historyList.filter((record) =>
                        moment(new Date(record.createdOn)).isSame(
                          moment(),
                          "month",
                        ),
                      ).length
                    }
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-lg rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Health Score</p>
                  <p className="text-xl font-bold text-gray-900">Good</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
