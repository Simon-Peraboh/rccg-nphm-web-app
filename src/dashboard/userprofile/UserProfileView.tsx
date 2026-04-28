import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserProfile } from "../hooks/useUserProfile";

const DetailRow: React.FC<{ label: string; value?: string | null }> = ({
  label,
  value,
}) => (
  <div className="rounded-2xl border bg-slate-50 p-4">
    <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-2 text-sm font-semibold text-slate-900 whitespace-pre-wrap">
      {value || "-"}
    </p>
  </div>
);

const UserProfileView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: profile, isLoading } = useUserProfile(id);

  if (isLoading) {
    return <div className="p-8 text-center">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="p-8 text-center">Profile not found.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              User Profile
            </p>
            <h1 className="text-2xl font-bold mt-2">
              {profile.title} {profile.first_name} {profile.last_name}
            </h1>
          </div>

          <div className="flex gap-3">
            <Link
              to={`/dashboard/userProfileEdit/${profile.id}`}
              className="rounded-xl bg-green-600 text-white px-4 py-2 text-sm font-semibold"
            >
              Edit
            </Link>
            <button
              onClick={() => navigate("/dashboard/userprofile")}
              className="rounded-xl border px-4 py-2 text-sm font-semibold"
            >
              Back
            </button>
          </div>
        </div>

        {profile.image_path && typeof profile.image_path === "string" && (
          <div className="mb-6">
            <img
              src={profile.image_path}
              alt={`${profile.first_name} ${profile.last_name}`}
              className="h-40 w-40 rounded-2xl object-cover border"
            />
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <DetailRow label="Title" value={profile.title} />
          <DetailRow label="First Name" value={profile.first_name} />
          <DetailRow label="Middle Name" value={profile.others} />
          <DetailRow label="Surname" value={profile.last_name} />
          <DetailRow label="Email" value={profile.email} />
          <DetailRow label="Phone" value={profile.phone_whatsapp} />
          <DetailRow label="Gender" value={profile.gender} />
          <DetailRow label="Date of Birth" value={profile.dob} />
          <DetailRow label="Occupation" value={profile.occupation} />
          <DetailRow label="Industry" value={profile.industry} />
          <DetailRow label="Region" value={profile.region} />
          <DetailRow label="Province" value={profile.province} />
          <DetailRow label="State" value={profile.state} />
          <DetailRow label="LGA" value={profile.lga} />
          <DetailRow label="City" value={profile.city} />
          <DetailRow label="Zone" value={profile.zone} />
          <DetailRow label="Area" value={profile.area} />
          <DetailRow label="Parish" value={profile.parish} />
          <DetailRow label="Position" value={profile.position} />
          <DetailRow label="Ordination Category" value={profile.ordination_category} />
          <DetailRow label="Join Ministry" value={profile.join_ministry} />
          <DetailRow label="Social Handle" value={profile.social_handle} />
          <DetailRow label="Next of Kin" value={profile.next_of_kin} />
          <DetailRow label="Next of Kin Phone" value={profile.next_of_kin_phone} />
          <DetailRow label="Home Address" value={profile.address_home} />
          <DetailRow label="Nearest Bus Stop" value={profile.nearest_busstop} />
          <div className="md:col-span-2 xl:col-span-3">
            <DetailRow label="Office Address" value={profile.address_office} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;