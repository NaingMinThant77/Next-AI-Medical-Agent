import HistoryList from "./_components/HistoryList";
import DoctorAgentList from "./_components/DoctorAgentList";
import AddNewSessionDialog from "./_components/AddNewSessionDialog";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-purple-50 dark:bg-gradient-to-br darK:from-blue-900 dark:via-black dark:to-blue-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-card/80 backdrop-blur-lg rounded-3xl shadow-xl border border-border p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Medical Dashboard
              </h1>
              <p className="text-muted-foreground">
                Manage your AI medical consultations
              </p>
            </div>
            <AddNewSessionDialog title="New Consultation" />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-1 lg:grid-cols-9 gap-4">
          {/* History Section */}
          <div className="lg:col-span-4">
            <HistoryList />
          </div>

          {/* Doctor Agents Section */}
          <div className="lg:col-span-5">
            <DoctorAgentList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
