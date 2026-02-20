import React from "react";
import HistoryList from "./_components/HistoryList";
import { Button } from "@/components/ui/button";
import DockerAgentList from "./_components/DockerAgentList";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <Button>+ Consult with Doctor</Button>
      </div>
      <HistoryList />
      <DockerAgentList />
    </div>
  );
};

export default Dashboard;
