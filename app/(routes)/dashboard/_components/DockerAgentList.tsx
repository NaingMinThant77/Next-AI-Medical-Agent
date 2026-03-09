"use client";

import { AIDoctorAgents } from "@/shared/list";
import { useState } from "react";
import { Users, Star } from "lucide-react";
import DockerAgentCard, { doctorAgent } from "./DockerAgentCard";
import AddNewSessionDialog from "./AddNewSessionDialog";

const DockerAgentList = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent | null>(
    null,
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleConsult = (doctor: doctorAgent) => {
    setSelectedDoctor(doctor);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            AI Medical Specialists
          </h2>
          <p className="text-gray-600 text-sm">
            Choose from our range of specialized AI doctors
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-500">
          <Users className="w-4 h-4" />
          <span className="text-sm">{AIDoctorAgents.length} Available</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50/50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-600 mb-1">
            {AIDoctorAgents.filter((d) => !d.subscriptionRequired).length}
          </div>
          <p className="text-sm text-gray-600">Free Specialists</p>
        </div>
        <div className="bg-purple-50/50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600 mb-1">
            {AIDoctorAgents.filter((d) => d.subscriptionRequired).length}
          </div>
          <p className="text-sm text-gray-600">Premium Specialists</p>
        </div>
        <div className="bg-green-50/50 rounded-2xl p-4 text-center">
          <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
          <p className="text-sm text-gray-600">Always Available</p>
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 font-medium">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm">All Specialists</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {AIDoctorAgents.map((doctor, index) => (
            <div
              key={index}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <DockerAgentCard doctorAgent={doctor} onConsult={handleConsult} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Need Help Choosing?
            </h3>
            <p className="text-sm text-gray-600">
              Start a consultation and our AI will recommend the best specialist
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur rounded-full p-3">
            <Star className="w-5 h-5 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Consultation Dialog */}
      <AddNewSessionDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        preselectedDoctor={selectedDoctor}
      />
    </div>
  );
};

export default DockerAgentList;
