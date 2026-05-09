import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaSun,
  FaMoon,
  FaBell,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaSearch,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { clearSession, getSessionUser } from "../utils/authSession";

const Navbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("Guest");
  const [firstName, setFirstName] = useState("Guest");

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = getSessionUser();

    if (sessionUser) {
      setUserEmail(sessionUser.email);
      setFirstName(sessionUser.name || sessionUser.email.split("@")[0] || "Guest");
    }

    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isDropdownOpen]);

  const toggleDarkMode = () => {
    const nextDarkMode = !isDarkMode;
    setIsDarkMode(nextDarkMode);

    if (nextDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    if (!isLogoutConfirmOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLogoutConfirmOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isLogoutConfirmOpen]);

  const requestLogout = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsLogoutConfirmOpen(true);
  };

  const handleLogout = () => {
    setIsLogoutConfirmOpen(false);
    clearSession();
    toast.dismiss();
    toast.success("Logged out successfully.");
    navigate("/dashboard/loginUser", { replace: true });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 px-4 py-4 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 md:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            title="Open mobile menu"
            aria-label="Open mobile menu"
            className="rounded-xl border border-slate-200 p-2 text-slate-600 sm:hidden dark:border-slate-700 dark:text-slate-300"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          >
            <FaBars />
          </button>

          <div className="hidden md:block">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Welcome Beloved,{" "}
              <span className="font-semibold text-blue-600 dark:text-cyan-400 animate-pulse">
                {firstName}
              </span>
            </p>
          </div>
        </div>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              title="Search reports members and tasks"
              placeholder="Search reports, members, tasks..."
              className="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
            onClick={toggleDarkMode}
            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          <button
            type="button"
            title="Notifications"
            aria-label="Notifications"
            className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <FaBell />
          </button>

          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm dark:border-slate-700 dark:bg-slate-900 sm:flex">
            <FaUserCircle className="text-2xl text-slate-500" />
            <div className="max-w-[180px] overflow-hidden">
              <p className="truncate text-sm font-semibold text-slate-700 dark:text-slate-200">
                {firstName}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="relative z-[70]" ref={dropdownRef}>
            <button
              type="button"
              title="Open settings menu"
              aria-label="Open settings menu"
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="rounded-xl border border-slate-200 p-2.5 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <FaCog />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full z-[80] mt-3 w-56 rounded-2xl border border-slate-200 bg-white py-2 text-slate-800 shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <p className="text-xs uppercase tracking-widest text-slate-500">
                    Signed in as
                  </p>
                  <p className="mt-1 text-sm font-semibold">{firstName}</p>
                  <p className="truncate text-xs text-slate-500">{userEmail}</p>
                </div>
                <button
                  type="button"
                  title="Logout"
                  onClick={requestLogout}
                  className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <FaSignOutAlt />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-lg dark:border-slate-700 dark:bg-slate-900 sm:hidden">
          <div className="mb-3">
            <input
              type="text"
              title="Mobile search"
              placeholder="Search..."
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm dark:border-slate-700 dark:bg-slate-950"
            />
          </div>

          <div className="space-y-2">
            <button
              type="button"
              title="Toggle dark mode"
              onClick={toggleDarkMode}
              className="block w-full rounded-xl px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              type="button"
              title="Notifications"
              className="block w-full rounded-xl px-4 py-2 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Notifications
            </button>

            <div className="rounded-xl border border-slate-100 px-4 py-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <FaUserCircle className="text-xl" />
                <div className="overflow-hidden">
                  <p className="truncate text-sm font-semibold">{firstName}</p>
                  <p className="truncate text-xs text-slate-500">{userEmail}</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              title="Logout"
              onClick={requestLogout}
              className="block w-full rounded-xl px-4 py-2 text-left text-sm text-red-600 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {isLogoutConfirmOpen && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/45 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="logout-confirm-title"
        >
          <div className="w-full max-w-[320px] rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl dark:border-slate-700 dark:bg-slate-950 sm:max-w-sm sm:p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-sm text-red-600 dark:bg-red-950/40 dark:text-red-300">
              <FaSignOutAlt />
            </div>
            <h2
              id="logout-confirm-title"
              className="text-base font-bold text-slate-950 dark:text-white sm:text-lg"
            >
              Logout?
            </h2>
            <p className="mt-1.5 text-sm leading-5 text-slate-600 dark:text-slate-300">
              Your dashboard session will end and you will return to the login
              page.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-600 px-3 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/20 transition hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
