import { AIDoctorAgents } from "@/shared/list";
import React from "react";
import DockerAgentCard from "./DockerAgentCard";

const DockerAgentList = () => {
  return (
    <div className="mt-10">
      <h2 className="font-bold text-2xl text-center">
        AI Specialist Docker Agents
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mt-5">
        {AIDoctorAgents.map((doctor, index) => (
          <div key={index}>
            <DockerAgentCard doctorAgent={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DockerAgentList;
