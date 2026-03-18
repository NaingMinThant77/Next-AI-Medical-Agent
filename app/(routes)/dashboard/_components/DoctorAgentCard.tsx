"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight, Star, Lock } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";

export type doctorAgent = {
  id: number;
  specialist: string;
  description: string;
  image: string;
  agentPrompt: string;
  voiceId: string;
  subscriptionRequired: boolean;
};

type props = {
  doctorAgent: doctorAgent;
  onConsult?: (doctorAgent: doctorAgent) => void;
};

const DockorAgentCard = ({ doctorAgent, onConsult }: props) => {
  const { has } = useAuth();
  const paidUser = has?.({ plan: "pro" });

  const handleClick = () => {
    if (doctorAgent.subscriptionRequired && !paidUser) {
      toast.error("This doctor is premium and service not available");
      return;
    }

    if (onConsult) {
      onConsult(doctorAgent);
    }
  };

  return (
    <div className="group cursor-pointer transition-all duration-300 hover:transform hover:scale-105">
      <div className="bg-card/80 backdrop-blur-lg rounded-2xl shadow-lg border border-border overflow-hidden hover:shadow-xl transition-all duration-300">
        {/* Image Container */}
        <div className="relative h-40 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
          <Image
            src={doctorAgent.image}
            alt={doctorAgent.specialist}
            width={200}
            height={200}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Subscription Badge */}
          {doctorAgent.subscriptionRequired && !paidUser && (
            <div className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full p-1.5 shadow-lg">
              <Lock className="w-3 h-3" />
            </div>
          )}

          {/* Rating Badge */}
          <div className="absolute top-2 left-2 bg-background/90 backdrop-blur rounded-full px-2 py-1 shadow-lg">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium">4.8</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="line-clamp-1 font-bold text-foreground mb-1 text-sm group-hover:text-primary transition-colors">
            {doctorAgent.specialist}
          </h3>
          <p className="line-clamp-2 text-xs text-muted-foreground mb-3 leading-relaxed">
            {doctorAgent.description}
          </p>

          {/* Action Button */}
          <Button
            onClick={handleClick}
            className={`w-full rounded-full text-sm font-medium transition-all duration-300 ${
              doctorAgent.subscriptionRequired && !paidUser
                ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            }`}
          >
            {doctorAgent.subscriptionRequired && !paidUser ? (
              <>
                <Lock className="w-3 h-3 mr-1" />
                Premium
              </>
            ) : (
              <>
                Consult
                <ArrowRight className="w-3 h-3 ml-1" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DockorAgentCard;
