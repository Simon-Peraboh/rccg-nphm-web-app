import React, { useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaFacebookF,
  FaInstagram,
  FaPlus,
  FaSearch,
  FaTrash,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";
import {
  useDeleteStateCoordinator,
  useStateCoordinators,
} from "../hooks/useStateCoordinator";
import type { StateCoordinatorDTO } from "../types/stateCoordinator";
import { getStorageImageUrl } from "../../utils/getStorageImageUrl";

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const message = responseData?.message || responseData?.error;

    if (typeof message === "string") {
      return message;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Action failed. Please try again.";
};

const coordinatorImage = (coordinator: StateCoordinatorDTO) => {
  const imagePath = String(coordinator.image_url || coordinator.image_path || "").trim();

  if (!imagePath) {
    return "";
  }

  if (/^https?:\/\//i.test(imagePath)) {
    return imagePath;
  }

  return getStorageImageUrl(imagePath) ?? "";
};

const initialsFor = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "SC";

const StateCoordinatorTable: React.FC = () => {
  const { data = [], isLoading, isError } = useStateCoordinators();
  const deleteMutation = useDeleteStateCoordinator();
  const [searchTerm, setSearchTerm] = useState("");

  const coordinators = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return data.filter((coordinator) => {
      if (!normalizedSearch) {
        return true;
      }

      return [
        coordinator.full_name,
        coordinator.state,
        coordinator.province,
        coordinator.facebook,
        coordinator.twitter,
        coordinator.instagram,
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedSearch);
    });
  }, [data, searchTerm]);

  const stateCount = useMemo(
    () => new Set(data.map((coordinator) => coordinator.state).filter(Boolean)).size,
    [data]
  );

  const provinceCount = useMemo(
    () => new Set(data.map((coordinator) => coordinator.province).filter(Boolean)).size,
    [data]
  );

  const handleDelete = (coordinator: StateCoordinatorDTO) => {
    if (!coordinator.id) {
      toast.error("Coordinator record cannot be deleted because the ID is missing.");
      return;
    }

    const toastId = toast.info(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="text-sm font-bold text-slate-950">
            Delete this state coordinator?
          </p>
          <p className="text-xs leading-5 text-slate-600">
            {coordinator.full_name}
            {coordinator.state ? `, ${coordinator.state}` : ""}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                closeToast?.();

                try {
                  await deleteMutation.mutateAsync(coordinator.id as number);
                } catch (error) {
                  toast.error(getApiErrorMessage(error));
                }
              }}
              className="rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-red-700"
            >
              Delete
            </button>
            <button
              type="button"
              onClick={() => closeToast?.()}
              className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
      }
    );

    window.setTimeout(() => toast.dismiss(toastId), 30000);
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              State Coordinators
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Coordinator Directory
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View all state coordinator records and confirm the public network data.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>

            <Link
              to="/dashboard/stateCoordinatorsCreate"
              className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FaPlus className="text-xs" />
              <span>Add Coordinator</span>
            </Link>
          </div>
        </div>

        <div className="mb-6 grid gap-4 md:grid-cols-3">
          {[
            { label: "Coordinators", value: data.length },
            { label: "States Covered", value: stateCount },
            { label: "Provinces", value: provinceCount },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
            >
              <FaUsers className="mb-4 text-blue-600" />
              <p className="text-3xl font-black text-slate-950">{item.value}</p>
              <p className="mt-1 text-sm font-semibold text-slate-500">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, state, province, social link..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="text-sm text-slate-500">
            {coordinators.length} record{coordinators.length === 1 ? "" : "s"}
          </div>
        </div>

        {isLoading ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center text-sm font-semibold text-slate-500">
            Loading coordinators...
          </div>
        ) : isError ? (
          <div className="rounded-3xl border border-red-100 bg-red-50 px-6 py-12 text-center text-sm font-semibold text-red-700">
            Unable to load coordinators. Please refresh and try again.
          </div>
        ) : coordinators.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
            <FaUsers className="mx-auto text-3xl text-slate-400" />
            <h2 className="mt-4 text-xl font-black text-slate-950">
              No coordinators found
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              Add a coordinator or adjust the search term to see existing records.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Coordinator
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      State
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Province
                    </th>
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Social
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {coordinators.map((coordinator) => {
                    const imageUrl = coordinatorImage(coordinator);

                    return (
                      <tr
                        key={coordinator.id ?? `${coordinator.full_name}-${coordinator.state}`}
                        className="transition hover:bg-slate-50"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-blue-50 text-sm font-black text-blue-700 ring-1 ring-blue-100">
                              {initialsFor(coordinator.full_name)}
                              {imageUrl && (
                                <img
                                  src={imageUrl}
                                  alt={coordinator.full_name}
                                  onError={(event) => {
                                    event.currentTarget.remove();
                                  }}
                                  className="absolute inset-0 h-full w-full object-cover"
                                />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-950">
                                {coordinator.full_name || "Unnamed coordinator"}
                              </p>
                              <p className="text-xs text-slate-500">
                                ID: {coordinator.id ?? "-"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-sm font-semibold text-slate-700">
                          {coordinator.state || "-"}
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-600">
                          {coordinator.province || "-"}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex gap-2">
                            {coordinator.facebook && (
                              <a
                                href={coordinator.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${coordinator.full_name} Facebook`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition hover:bg-sky-600 hover:text-white"
                              >
                                <FaFacebookF />
                              </a>
                            )}
                            {coordinator.twitter && (
                              <a
                                href={coordinator.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${coordinator.full_name} Twitter`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-700 transition hover:bg-sky-600 hover:text-white"
                              >
                                <FaTwitter />
                              </a>
                            )}
                            {coordinator.instagram && (
                              <a
                                href={coordinator.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${coordinator.full_name} Instagram`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-700 transition hover:bg-rose-600 hover:text-white"
                              >
                                <FaInstagram />
                              </a>
                            )}
                            {!coordinator.facebook &&
                              !coordinator.twitter &&
                              !coordinator.instagram && (
                                <span className="text-sm text-slate-400">-</span>
                              )}
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(coordinator)}
                            disabled={deleteMutation.isPending}
                            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50 disabled:opacity-60"
                          >
                            <FaTrash />
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StateCoordinatorTable;
