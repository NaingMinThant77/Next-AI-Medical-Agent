"use client";

import { useAuth } from "@clerk/nextjs";
import { doctorAgent } from "./DocterAgentCard";
import Image from "next/image";

type props = {
  doctorAgent: doctorAgent;
  setSelectedDoctor: any;
  selectedDoctor: doctorAgent;
};

const SuggestedDoctorCard = ({
  doctorAgent,
  setSelectedDoctor,
  selectedDoctor,
}: props) => {
  const isSelected = selectedDoctor?.id === doctorAgent?.id;

  const { has } = useAuth();
  const paidUser = has?.({ plan: "pro" });

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-300 ${
        isSelected ? "transform scale-105" : "hover:transform hover:scale-102"
      }`}
      onClick={() => setSelectedDoctor(doctorAgent)}
    >
      {/* Card */}
      <div
        className={`bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border-2 p-4 transition-all duration-300 ${
          isSelected
            ? "border-blue-500 shadow-blue-200 shadow-xl"
            : "border-white/50 hover:border-blue-300 hover:shadow-xl"
        }`}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-blue-500 rounded-full p-1 shadow-lg">
            <div className="w-2 h-2 bg-white rounded-full" />
          </div>
        )}

        {/* Doctor Image */}
        <div className="relative mb-3 flex justify-between">
          <div
            className={`absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity`}
          />
          <Image
            src={doctorAgent?.image || ""}
            alt={doctorAgent?.specialist}
            width={70}
            height={70}
            className="relative w-16 h-16 object-cover rounded-2xl border-2 border-white shadow-lg"
          />

          {/* Subscription Badge */}
          {doctorAgent?.subscriptionRequired && !paidUser && (
            <div className="mt-2 flex justify-center">
              <span className="inline-flex h-8 items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                Premium
              </span>
            </div>
          )}
        </div>

        {/* Doctor Info */}
        <h3 className="font-bold text-sm text-gray-900 mb-1 text-center">
          {doctorAgent?.specialist}
        </h3>
        <p className="text-xs text-gray-600 line-clamp-2 text-center leading-relaxed">
          {doctorAgent?.description}
        </p>
      </div>
    </div>
  );
};

export default SuggestedDoctorCard;
