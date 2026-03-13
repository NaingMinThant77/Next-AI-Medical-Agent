import { Calendar, Clock, FileText } from "lucide-react";
import Image from "next/image";
import AddNewSessionDialog from "./AddNewSessionDialog";

const NoRecentConsultation = () => {
  return (
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
        <AddNewSessionDialog title="Start Your First Consultation" />
      </div>

      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
        <div className="bg-gray-50/50 rounded-2xl p-4 text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <h4 className="font-semibold text-gray-900 mb-1">24/7 Available</h4>
          <p className="text-sm text-gray-600">Get medical advice anytime</p>
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
          <h4 className="font-semibold text-gray-900 mb-1">Track History</h4>
          <p className="text-sm text-gray-600">Monitor your health journey</p>
        </div>
      </div>
    </div>
  );
};

export default NoRecentConsultation;
