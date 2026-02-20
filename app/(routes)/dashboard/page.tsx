import HistoryList from "./_components/HistoryList";
import DockerAgentList from "./_components/DockerAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

const Dashboard = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">My Dashboard</h2>
        <AddNewSessionDialog />
      </div>
      <HistoryList />
      <DockerAgentList />
    </div>
  );
};

export default Dashboard;
