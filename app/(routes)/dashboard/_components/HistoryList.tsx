/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import NoRecentConsultation from "./NoRecentConsultation";
import Pagination from "./Pagination";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;

  const GetHistoryList = useMemo(
    () => async () => {
      setLoading(true);
      const result = await axios.get("/api/session-chat?sessionId=all");

      // Filter for last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const filteredData = result.data.filter(
        (item: SessionDetail) => new Date(item.createdOn) >= thirtyDaysAgo,
      );

      // Calculate pagination
      const totalItems = filteredData.length;
      const totalPagesCount = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(totalPagesCount);

      // Get current page data
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedData = filteredData.slice(startIndex, endIndex);

      setHistoryList(paginatedData);
      setLoading(false);
    },
    [currentPage],
  );

  useEffect(() => {
    GetHistoryList();
  }, [GetHistoryList]);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-xl border border-border p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-1">
            Consultation History
          </h2>
          <p className="text-muted-foreground text-sm">
            Your past AI medical consultations
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Last 30 days</span>
        </div>
      </div>

      {/* Content */}
      {historyList.length == 0 && !loading ? (
        <NoRecentConsultation />
      ) : loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="space-y-4">
          <HistoryTable historyList={historyList} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousPage={handlePreviousPage}
            handleNextPage={handleNextPage}
          />
        </div>
      )}
    </div>
  );
};

export default HistoryList;
