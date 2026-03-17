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
        className={`bg-card/80 backdrop-blur-lg rounded-2xl shadow-lg border-2 p-4 transition-all duration-300 ${
          isSelected
            ? "border-primary shadow-primary/20 shadow-xl"
            : "border-border hover:border-primary/50 hover:shadow-xl"
        }`}
      >
        {/* Selection Indicator */}
        {isSelected && (
          <div className="absolute -top-2 -right-2 bg-primary rounded-full p-1 shadow-lg">
            <div className="w-2 h-2 bg-primary-foreground rounded-full" />
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
            className="relative w-16 h-16 object-cover rounded-2xl border-2 border-background shadow-lg"
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
        <h3 className="font-bold text-sm text-foreground mb-1 text-center">
          {doctorAgent?.specialist}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 text-center leading-relaxed">
          {doctorAgent?.description}
        </p>
      </div>
    </div>
  );
};

export default SuggestedDoctorCard;
