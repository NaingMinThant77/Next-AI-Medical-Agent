"use client";

import { useState } from "react";
import Image from "next/image";
import { Clock, FileText, Calendar } from "lucide-react";
import AddNewSessionDialog from "./AddNewSessionDialog";

const HistoryList = () => {
  const [historyList, setHistoryList] = useState([]);

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
        <div className="text-center py-12">
          {/* Empty State Illustration */}
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-20" />
            <Image
              src={"/medical-assistance.png"}
              alt="empty"
              width={150}
              height={150}
              className="relative"
            />
          </div>

          {/* Empty State Text */}
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Recent Consultations
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Start your first AI medical consultation to get personalized health
            advice and recommendations
          </p>

          {/* Call to Action */}
          <div className="flex justify-center">
            <AddNewSessionDialog />
          </div>

          {/* Feature Highlights */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-gray-50/50 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                24/7 Available
              </h4>
              <p className="text-sm text-gray-600">
                Get medical advice anytime
              </p>
            </div>
            <div className="bg-gray-50/50 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">AI-Powered</h4>
              <p className="text-sm text-gray-600">
                Advanced medical AI assistance
              </p>
            </div>
            <div className="bg-gray-50/50 rounded-2xl p-4 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">
                Track History
              </h4>
              <p className="text-sm text-gray-600">
                Monitor your health journey
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* History items would go here */}
          <p className="text-center text-gray-500 font-medium">
            No history found
          </p>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
