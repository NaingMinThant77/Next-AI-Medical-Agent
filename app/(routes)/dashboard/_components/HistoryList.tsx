/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useMemo } from "react";
import { Calendar } from "lucide-react";
import axios from "axios";
import HistoryTable from "./HistoryTable";
import { SessionDetail } from "../medical-agent/[sessionId]/page";
import NoRecentConsultation from "./NoRecentConsultation";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState<SessionDetail[]>([]);

  const GetHistoryList = useMemo(
    () => async () => {
      const result = await axios.get("/api/session-chat?sessionId=all");
      console.log("History List Data is : ", result.data);
      setHistoryList(result.data);
    },
    [],
  );

  useEffect(() => {
    GetHistoryList();
  }, [GetHistoryList]);

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            Consultation History
          </h2>
          <p className="text-gray-600 text-sm">
            Your past AI medical consultations
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
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
        </div>
      )}
    </div>
  );
};

export default HistoryList;
