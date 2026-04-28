import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useConferenceLogout } from "../hooks/useConferenceManagerAuth";

const navItems = [
  { label: "Summary", to: "/dashboardconference/admin" },
  { label: "Pending Attendance", to: "/dashboardconference/admin-attendance" },
  { label: "Attendance Records", to: "/dashboardconference/admin-attendance-records" },
  { label: "Conference Registrations", to: "/dashboardconference/admin-registrations" },
  { label: "Create Admin", to: "/dashboardconference/create-admin" },
  { label: "Conference Events", to: "/dashboardconference/events" },
  { label: "Activities", to: "/dashboardconference/activities" },
  { label: "View Conference Dashboard", to: "/dashboardconference/member" },
];

const AdminSidebarLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logoutMutation = useConferenceLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate("/dashboardconference/admin-login");
    } catch {
      navigate("/dashboardconference/admin-login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-3xl bg-white border p-5 shadow-sm h-fit sticky top-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Conference Manager
          </p>
          <h2 className="text-2xl font-bold mt-2 mb-6">Admin Panel</h2>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const active = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                    active
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="mt-6 w-full rounded-xl border px-4 py-3 text-sm font-medium"
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </aside>

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminSidebarLayout;