import HistoryList from "./_components/HistoryList";
import DockerAgentList from "./_components/DockerAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Medical Dashboard
              </h1>
              <p className="text-gray-600">
                Manage your AI medical consultations
              </p>
            </div>
            <AddNewSessionDialog title="New Consultation" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-7 gap-6">
          {/* History Section */}
          <div className="lg:col-span-3">
            <HistoryList />
          </div>

          {/* Doctor Agents Section */}
          <div className="lg:col-span-4">
            <DockerAgentList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
