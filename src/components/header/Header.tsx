import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, HeartHandshake } from "lucide-react";
import Logo from "../../assets/Images/logo1_ed3.jpg";
import SectionContainer from "../layout/SectionContainer";

type NavChild = {
  label: string;
  to: string;
};

type NavItem = {
  label: string;
  to?: string;
  children?: NavChild[];
};

const primaryNav: NavItem[] = [
  { label: "Home", to: "/" },
  { label: "Who We Are", to: "/WeAre" },
  { label: "In Action", to: "/InAction" },
  { label: "Conference", to: "/Conference" },
  { label: "Connect", to: "/Connect" },
  {
    label: "More",
    children: [
      { label: "Contact Us", to: "/Contact" },
      { label: "Report", to: "/Report" },
    ],
  },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "transition-colors duration-200 text-sm font-semibold",
    isActive ? "text-blue-700" : "text-slate-700 hover:text-blue-700",
  ].join(" ");

const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [desktopMorePinned, setDesktopMorePinned] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const desktopDropdownRef = useRef<HTMLDivElement | null>(null);
  const desktopMoreButtonRef = useRef<HTMLButtonElement | null>(null);
  const desktopMenuItemRefs = useRef<Array<HTMLAnchorElement | null>>([]);

  const mobileNavItems = useMemo(() => primaryNav, []);

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileMoreOpen(false);
  };

  const closeDesktopMore = () => {
    setDesktopMoreOpen(false);
    setDesktopMorePinned(false);
  };

  const closeAll = () => {
    closeMobileMenu();
    closeDesktopMore();
    window.scrollTo(0, 0);
  };

  const openDesktopMore = (pinned = false) => {
    setDesktopMoreOpen(true);
    setDesktopMorePinned(pinned);
  };

  const toggleMobileMenu = () => {
    setMobileOpen((prev) => {
      const next = !prev;
      if (!next) {
        setMobileMoreOpen(false);
      }
      return next;
    });
  };

  const toggleMobileMore = () => {
    setMobileMoreOpen((prev) => !prev);
  };

  const focusDesktopMenuItem = (index: number) => {
    const items = desktopMenuItemRefs.current.filter(
      (item): item is HTMLAnchorElement => item !== null
    );

    if (!items.length) return;

    const safeIndex = ((index % items.length) + items.length) % items.length;
    items[safeIndex]?.focus();
  };

  useEffect(() => {
    if (!desktopMoreOpen) {
      desktopMenuItemRefs.current = [];
    }
  }, [desktopMoreOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!desktopDropdownRef.current) return;

      if (!desktopDropdownRef.current.contains(event.target as Node)) {
        closeDesktopMore();
      }
    };

    const handleFocusOutside = (event: FocusEvent) => {
      if (!desktopMoreOpen || !desktopDropdownRef.current) return;

      if (!desktopDropdownRef.current.contains(event.target as Node)) {
        closeDesktopMore();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("focusin", handleFocusOutside);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("focusin", handleFocusOutside);
    };
  }, [desktopMoreOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleDesktopMoreButtonClick = () => {
    if (desktopMoreOpen && desktopMorePinned) {
      closeDesktopMore();
      return;
    }

    openDesktopMore(true);
  };

  const handleDesktopMoreButtonKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    childrenCount: number
  ) => {
    switch (event.key) {
      case "Enter":
      case " ": {
        event.preventDefault();

        if (desktopMoreOpen && desktopMorePinned) {
          closeDesktopMore();
        } else {
          openDesktopMore(true);
          window.setTimeout(() => focusDesktopMenuItem(0), 0);
        }
        break;
      }

      case "ArrowDown": {
        event.preventDefault();
        openDesktopMore(true);
        window.setTimeout(() => focusDesktopMenuItem(0), 0);
        break;
      }

      case "ArrowUp": {
        event.preventDefault();
        openDesktopMore(true);
        window.setTimeout(() => focusDesktopMenuItem(childrenCount - 1), 0);
        break;
      }

      case "Escape": {
        event.preventDefault();
        closeDesktopMore();
        desktopMoreButtonRef.current?.focus();
        break;
      }

      default:
        break;
    }
  };

  const handleDesktopMenuItemKeyDown = (
    event: React.KeyboardEvent<HTMLAnchorElement>,
    index: number,
    childrenCount: number
  ) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        focusDesktopMenuItem(index + 1);
        break;

      case "ArrowUp":
        event.preventDefault();
        focusDesktopMenuItem(index - 1);
        break;

      case "Home":
        event.preventDefault();
        focusDesktopMenuItem(0);
        break;

      case "End":
        event.preventDefault();
        focusDesktopMenuItem(childrenCount - 1);
        break;

      case "Escape":
        event.preventDefault();
        closeDesktopMore();
        desktopMoreButtonRef.current?.focus();
        break;

      case "Tab":
        closeDesktopMore();
        break;

      default:
        break;
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <SectionContainer className="relative flex items-center justify-between py-3">
        <Link to="/" onClick={closeAll} className="flex min-w-0 items-center gap-3">
          <img
            src={Logo}
            alt="RCCG NPHM logo"
            className="h-12 w-12 rounded-full object-cover ring-1 ring-slate-200"
          />
          <div className="min-w-0">
            <p className="truncate text-lg font-bold tracking-tight text-slate-900">
              RCCG NPHM
            </p>
            <p className="truncate text-xs font-medium text-slate-500">
              Prison &amp; Hospital Ministry
            </p>
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-6 xl:gap-8 lg:flex"
        >
          {primaryNav.map((item) => {
            if (item.children?.length) {
              return (
                <div
                  key={item.label}
                  ref={desktopDropdownRef}
                  className="relative"
                  onMouseEnter={() => {
                    if (!desktopMorePinned) {
                      openDesktopMore(false);
                    }
                  }}
                  onMouseLeave={() => {
                    if (!desktopMorePinned) {
                      closeDesktopMore();
                    }
                  }}
                >
                  <button
                    ref={desktopMoreButtonRef}
                    type="button"
                    onClick={handleDesktopMoreButtonClick}
                    onKeyDown={(event) =>
                      handleDesktopMoreButtonKeyDown(event, item.children!.length)
                    }
                    className="flex items-center gap-1 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
                    aria-expanded={desktopMoreOpen}
                    aria-haspopup={true}
                    aria-controls="desktop-more-menu"
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        desktopMoreOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {desktopMoreOpen && (
                    <div className="absolute right-0 top-full pt-3">
                      <div
                        id="desktop-more-menu"
                        className="w-56 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
                      >
                        {item.children.map((child, index) => (
                          <NavLink
                            key={child.to}
                            to={child.to}
                            ref={(element) => {
                              desktopMenuItemRefs.current[index] = element;
                            }}
                            onClick={closeAll}
                            onKeyDown={(event) =>
                              handleDesktopMenuItemKeyDown(
                                event,
                                index,
                                item.children!.length
                              )
                            }
                            className={({ isActive }) =>
                              [
                                "block rounded-xl px-4 py-3 text-sm font-medium transition focus:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-200",
                                isActive
                                  ? "bg-blue-50 text-blue-700"
                                  : "text-slate-700 hover:bg-slate-50 hover:text-blue-700",
                              ].join(" ")
                            }
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <NavLink key={item.label} to={item.to!} onClick={closeAll} className={navLinkClass}>
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            to="/dashboard/register"
            onClick={closeAll}
            className="rounded-xl border border-blue-200 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            HopOnboard
          </Link>

          <Link
            to="/donation"
            onClick={closeAll}
            className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
          >
            <HeartHandshake className="h-4 w-4" />
            Donate
          </Link>

          <Link
            to="/dashboard/loginUser"
            onClick={closeAll}
            className="rounded-xl px-2 py-2 text-sm font-semibold text-slate-700 transition hover:text-blue-700"
          >
            Login
          </Link>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          className="inline-flex rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
          onClick={toggleMobileMenu}
        >
          <Menu className="h-6 w-6" />
        </button>
      </SectionContainer>

      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 bg-slate-900/35 backdrop-blur-[2px]"
            onClick={closeMobileMenu}
          />

          <div className="absolute inset-x-0 top-0 bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 px-4 py-4">
              <div>
                <p className="text-base font-bold text-slate-900">RCCG NPHM</p>
                <p className="text-xs text-slate-500">Care. Outreach. Restoration.</p>
              </div>

              <button
                type="button"
                aria-label="Close navigation menu"
                className="rounded-xl border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50"
                onClick={closeMobileMenu}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100vh-80px)] overflow-y-auto px-4 py-4">
              <nav aria-label="Mobile navigation" className="space-y-2">
                {mobileNavItems.map((item) => {
                  if (item.children?.length) {
                    return (
                      <div key={item.label} className="rounded-2xl border border-slate-200 bg-white">
                        <button
                          type="button"
                          aria-expanded={mobileMoreOpen}
                          aria-controls="mobile-more-menu"
                          className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-semibold text-slate-800"
                          onClick={toggleMobileMore}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              mobileMoreOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {mobileMoreOpen && (
                          <div id="mobile-more-menu" className="border-t border-slate-200 px-2 py-2">
                            {item.children.map((child) => (
                              <NavLink
                                key={child.to}
                                to={child.to}
                                onClick={closeAll}
                                className={({ isActive }) =>
                                  [
                                    "block rounded-xl px-3 py-3 text-sm font-medium transition",
                                    isActive
                                      ? "bg-blue-50 text-blue-700"
                                      : "text-slate-700 hover:bg-slate-50",
                                  ].join(" ")
                                }
                              >
                                {child.label}
                              </NavLink>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={item.label}
                      to={item.to!}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        [
                          "block rounded-2xl border px-4 py-4 text-sm font-semibold transition",
                          isActive
                            ? "border-blue-200 bg-blue-50 text-blue-700"
                            : "border-slate-200 bg-white text-slate-800 hover:bg-slate-50",
                        ].join(" ")
                      }
                    >
                      {item.label}
                    </NavLink>
                  );
                })}
              </nav>

              <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4">
                <Link
                  to="/donation"
                  onClick={closeAll}
                  className="rounded-xl bg-red-600 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-red-700"
                >
                  Donate
                </Link>

                <Link
                  to="/dashboard/register"
                  onClick={closeAll}
                  className="rounded-xl border border-blue-200 px-4 py-3 text-center text-sm font-semibold text-blue-700 transition hover:bg-blue-50"
                >
                  HopOnboard
                </Link>

                <Link
                  to="/dashboard/loginUser"
                  onClick={closeAll}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
