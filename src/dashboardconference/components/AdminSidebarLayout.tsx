<<<<<<< HEAD
import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
=======
import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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
<<<<<<< HEAD
=======
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

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
<<<<<<< HEAD
        <aside className="rounded-3xl bg-white border p-5 shadow-sm h-fit sticky top-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Conference Manager
          </p>
          <h2 className="text-2xl font-bold mt-2 mb-6">Admin Panel</h2>

          <nav className="space-y-2">
=======
        <aside className="rounded-3xl bg-white border p-5 shadow-sm h-fit lg:sticky lg:top-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                Conference Manager
              </p>
              <h2 className="text-2xl font-bold mt-2 lg:mb-6">Admin Panel</h2>
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 lg:hidden"
              aria-label={mobileMenuOpen ? "Close admin menu" : "Open admin menu"}
              title={mobileMenuOpen ? "Close admin menu" : "Open admin menu"}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          <nav className={`${mobileMenuOpen ? "mt-6 block" : "hidden"} space-y-2 lg:mt-0 lg:block`}>
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
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
<<<<<<< HEAD
            className="mt-6 w-full rounded-xl border px-4 py-3 text-sm font-medium"
=======
            className={`${mobileMenuOpen ? "block" : "hidden"} mt-6 w-full rounded-xl border px-4 py-3 text-sm font-medium lg:block`}
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
          >
            {logoutMutation.isPending ? "Logging out..." : "Logout"}
          </button>
        </aside>

<<<<<<< HEAD
        <main>
=======
        <main className="min-w-0">
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
          <Outlet />
        </main>
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default AdminSidebarLayout;
=======
export default AdminSidebarLayout;
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
