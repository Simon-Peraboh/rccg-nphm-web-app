import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import ImageUploader from "../cropimage/ResizeImage";
import UserProfileStepTabs from "../../components/userprofile/UserProfileStepTabs";
import {
  useLgas,
  useProvinces,
  useRegions,
  useStates,
  useUpdateUserProfile,
  useUserProfile,
} from "../hooks/useUserProfile";
import { defaultUserProfileForm, type UserProfileDTO } from "../types/userProfile";

const steps = [
  "Basic Info",
  "Location Info",
  "Contact",
  "Work",
  "Church",
  "Family",
  "Upload",
];

const genderOptions = ["MALE", "FEMALE"];
const ordinationOptions = [
  "NOT ORDAINED",
  "DEACON",
  "DEACONESS",
  "ASST PASTOR",
  "FULL PASTOR",
];
const positionOptions = [
  "NATIONAL EXCO",
  "REG COORDINATOR",
  "PROV COORDINATOR",
  "ASST REG COORDINATOR",
  "ASST PROV COORDINATOR",
  "MEMBER",
];

const charLimits: Record<string, number> = {
  first_name: 50,
  last_name: 50,
  email: 50,
  others: 50,
  address_home: 100,
  phone_whatsapp: 20,
  nearest_busstop: 60,
  address_office: 100,
  next_of_kin_phone: 20,
  next_of_kin: 50,
  zone: 50,
  area: 50,
  city: 50,
  parish: 50,
};

const UserProfileEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data, isLoading } = useUserProfile(id);
  const updateMutation = useUpdateUserProfile();

  const [form, setForm] = useState<UserProfileDTO>(defaultUserProfileForm);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const { data: regions = [] } = useRegions();
  const { data: states = [] } = useStates();
  const { data: provinces = [] } = useProvinces(form.region);
  const { data: lgas = [] } = useLgas(form.state);

  useEffect(() => {
    if (!data) return;
    setForm({ ...defaultUserProfileForm, ...data });

    if (data.image_path && typeof data.image_path === "string") {
      setPreviewUrl(data.image_path);
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (charLimits[name] && value.length > charLimits[name]) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderInput = (
    label: string,
    name: keyof UserProfileDTO,
    type = "text",
    placeholder = ""
  ) => {
    const value = (form[name] ?? "") as string;
    const limit = charLimits[name as string];

    return (
      <div>
        <label htmlFor={name} className="block text-sm font-medium mb-1">
          {label}
        </label>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
        />

        {limit && (
          <div
            className={`text-xs mt-1 ${
              value.length > limit - 20 ? "text-red-500" : "text-slate-500"
            }`}
          >
            {limit - value.length} / {limit} characters left
          </div>
        )}
      </div>
    );
  };

  const validateCurrentStep = () => {
    const stepFields: Record<number, (keyof UserProfileDTO)[]> = {
      0: ["title", "first_name", "last_name", "gender", "dob"],
      1: ["region", "province", "state", "lga", "city"],
      2: ["email", "phone_whatsapp", "address_home", "nearest_busstop"],
      3: ["occupation", "industry", "address_office"],
      4: ["zone", "area", "parish", "position", "ordination_category", "join_ministry"],
      5: ["next_of_kin", "next_of_kin_phone", "social_handle"],
      6: [],
    };

    const missing = stepFields[currentStep].filter((field) => {
      const value = form[field];
      return !value || String(value).trim() === "";
    });

    if (missing.length > 0) {
      toast.error("Please complete required fields before moving on.");
      return false;
    }

    return true;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const stepContent = useMemo(() => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderInput("Title", "title", "text", "e.g. Bro")}
            {renderInput("First Name", "first_name", "text", "e.g. Adewale")}
            {renderInput("Middle Name", "others", "text", "Optional")}
            {renderInput("Surname", "last_name", "text", "e.g. Osun")}
            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                title="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select Gender</option>
                {genderOptions.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
            {renderInput("Date of Birth", "dob", "date")}
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium mb-1">Region</label>
              <select
              title="Region"
                name="region"
                value={form.region}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select Region</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Province</label>
              <select
               title="Province"
                name="province"
                value={form.province}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select Province</option>
                {provinces.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <select
                title="State"
                name="state"
                value={form.state}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">LGA</label>
              <select
                title="LGA"
                name="lga"
                value={form.lga}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select LGA</option>
                {lgas.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            {renderInput("City", "city", "text", "e.g. Lagos")}
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderInput("Email", "email", "email", "e.g. john@example.com")}
            {renderInput("Phone Number", "phone_whatsapp", "text", "e.g. 08012345678")}
            {renderInput("Home Address", "address_home", "text", "Enter home address")}
            {renderInput("Nearest Bus Stop", "nearest_busstop", "text", "Nearest bus stop")}
          </div>
        );

      case 3:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderInput("Occupation", "occupation", "text", "e.g. Teacher")}
            {renderInput("Industry", "industry", "text", "e.g. Education")}
            {renderInput("Office Address", "address_office", "text", "Office location")}
          </div>
        );

      case 4:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderInput("Zone", "zone", "text", "e.g. Zone A")}
            {renderInput("Area", "area", "text", "e.g. Area 1")}
            {renderInput("Parish", "parish", "text", "e.g. RCCG Grace Chapel")}

            <div>
              <label className="block text-sm font-medium mb-1">Position</label>
              <select
                title="Position"
                name="position"
                value={form.position}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select Position</option>
                {positionOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Ordination Category</label>
              <select
                title="Ordination Category"
                name="ordination_category"
                value={form.ordination_category}
                onChange={handleChange}
                className="w-full rounded-2xl border px-4 py-3 text-sm shadow-sm"
              >
                <option value="">Select Ordination</option>
                {ordinationOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            {renderInput("Join The Ministry", "join_ministry", "date")}
          </div>
        );

      case 5:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {renderInput("Next of Kin", "next_of_kin", "text", "e.g. Jane Doe")}
            {renderInput("Next of Kin Phone", "next_of_kin_phone", "text", "e.g. 08012345678")}
            {renderInput("Social Media Handle", "social_handle", "text", "@yourhandle")}
          </div>
        );

      case 6:
        return (
          <div className="space-y-5">
            <ImageUploader
              label="Upload Image"
              name="image_path"
              previewUrl={previewUrl}
              onFileSelect={(file) => {
                setForm((prev) => ({ ...prev, image_path: file }));
                setPreviewUrl(file ? URL.createObjectURL(file) : previewUrl);
              }}
            />
          </div>
        );

      default:
        return null;
    }
  }, [currentStep, form, regions, provinces, states, lgas, previewUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.id) {
      toast.error("Profile ID is missing.");
      return;
    }

    try {
      await updateMutation.mutateAsync({
        id: form.id,
        payload: form,
      });

      setTimeout(() => {
        navigate("/dashboard/userprofile");
      }, 1500);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-[32px] p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">Edit User Profile</h2>

      <UserProfileStepTabs
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900">{steps[currentStep]}</h3>
          <p className="text-slate-500 mt-1">
            Update this section carefully before moving forward.
          </p>
        </div>

        {stepContent}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-xl border px-5 py-3 font-semibold disabled:opacity-50"
          >
            Previous
          </button>

          <div className="flex gap-3">
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded-xl bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold disabled:opacity-50"
              >
                {updateMutation.isPending ? "Updating..." : "Update"}
              </button>
            )}
          </div>
        </div>
      </form>

      <ToastContainer position="top-right" theme="colored" />
    </div>
  );
};

export default UserProfileEdit;