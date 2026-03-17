/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import NoRecentConsultation from "./NoRecentConsultation";
import { Button } from "@/components/ui/button";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const GetHistoryList = useMemo(
    () => async () => {
      const result = await axios.get("/api/session-chat?sessionId=all");
      console.log("History List Data is : ", result.data);

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
      {historyList.length == 0 ? (
        <NoRecentConsultation />
      ) : (
        <div className="space-y-4">
          <HistoryTable historyList={historyList} />

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
