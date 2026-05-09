import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash, FaArrowLeft, FaSearch } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDeleteUserProfile, useUserProfiles } from "../hooks/useUserProfile";
import type { UserProfileDTO } from "../types/userProfile";
import ProfileAvatar from "../../components/avatar/ProfileAvatar";
<<<<<<< HEAD
import { getStorageImageUrl } from "../../utils/getStorageImageUrl";
=======
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

const truncateText = (value: string | null | undefined, max = 22): string => {
  if (!value) return "-";
  return value.length > max ? `${value.slice(0, max)}...` : value;
};

const UserProfileTable: React.FC = () => {
  const { data = [], isLoading } = useUserProfiles();
  const deleteMutation = useDeleteUserProfile();

  const [searchTerm, setSearchTerm] = useState("");

  const profiles = useMemo(() => {
    return data.filter((item: UserProfileDTO) => {
      const haystack = [
        item.first_name,
        item.last_name,
        item.email,
        item.region,
        item.province,
        item.parish,
        item.phone_whatsapp,
        item.position,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

<<<<<<< HEAD
  console.log(
    profiles.slice(0, 5).map((profile) => ({
      id: profile.id,
      image_path: profile.image_path,
      resolved: getStorageImageUrl(profile.image_path),
    }))
  );

=======
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  const handleDelete = (id: number, fullName: string) => {
    confirmAlert({
      title: "Confirm deletion",
      message: `Are you sure you want to delete ${fullName}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            await deleteMutation.mutateAsync(id);
          },
        },
        {
          label: "No",
          onClick: () => undefined,
        },
      ],
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <div className="mx-auto max-w-7xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              User Profiles
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Registered Members
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              View and manage ministry member records from one place.
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
              to="/dashboard/register"
              className="inline-flex items-center rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Add New Profile
            </Link>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email, parish, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="text-sm text-slate-500">
            {profiles.length} record{profiles.length === 1 ? "" : "s"}
          </div>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-200">
          <table className="w-full min-w-[1120px] border-collapse">
            <thead className="bg-slate-50">
              <tr className="text-left text-sm font-semibold text-slate-500">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Province</th>
                <th className="px-6 py-4">Parish</th>
                <th className="px-6 py-4">Position</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {profiles.map((profile, index) => {
                const fullName =
                  `${profile.title ?? ""} ${profile.first_name ?? ""} ${profile.last_name ?? ""}`
                    .replace(/\s+/g, " ")
                    .trim();

                return (
                  <tr
                    key={profile.id}
                    className={`border-t border-slate-100 transition hover:bg-slate-50 ${
                      index === 0 ? "border-t-0" : ""
                    }`}
                  >
                    <td className="px-6 py-5">
                      <div className="flex min-w-[280px] items-center gap-4">
                        <ProfileAvatar
                          imagePath={profile.image_path}
                          alt={fullName}
                          size={46}
                        />

                        <div className="min-w-0">
                          <p
                            className="truncate text-base font-semibold text-slate-900"
                            title={fullName}
                          >
                            {truncateText(fullName, 28)}
                          </p>
                          <p
                            className="truncate text-sm text-slate-500"
                            title={profile.email ?? ""}
                          >
                            {truncateText(profile.email, 30)}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      <span title={profile.phone_whatsapp ?? ""}>
                        {truncateText(profile.phone_whatsapp, 15)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      <span title={profile.region ?? ""}>
                        {truncateText(profile.region, 14)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      <span title={profile.province ?? ""}>
                        {truncateText(profile.province, 16)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      <span title={profile.parish ?? ""}>
                        {truncateText(profile.parish, 18)}
                      </span>
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-700">
                      <span title={profile.position ?? ""}>
                        {truncateText(profile.position, 16)}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end">
                        <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
                          <Link
                            to={`/dashboard/userProfileView/${profile.id}`}
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            aria-label={`View ${fullName}`}
                            title={`View ${fullName}`}
                          >
                            <FaEye />
                          </Link>

                          <Link
                            to={`/dashboard/userProfileEdit/${profile.id}`}
                            className="rounded-lg p-2 text-emerald-600 transition hover:bg-emerald-50"
                            aria-label={`Edit ${fullName}`}
                            title={`Edit ${fullName}`}
                          >
                            <FaEdit />
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(profile.id as number, fullName)}
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
                            aria-label={`Delete ${fullName}`}
                            title={`Delete ${fullName}`}
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {profiles.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center text-slate-500">
                    No profiles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default UserProfileTable;