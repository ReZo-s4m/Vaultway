import DashboardView from "@/components/dashboard/DashboardView";

// The Cloud drive is the dashboard home. Authentication is enforced by the
// dashboard layout (DashboardShell), so this page can stay presentational.
export default function DashboardPage() {
  return <DashboardView view="drive" />;
}
