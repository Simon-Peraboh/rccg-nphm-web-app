import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import ImageUploader from "../cropimage/ResizeImage";
import UserProfileStepTabs from "../../components/userprofile/UserProfileStepTabs";
import {
  useCreateUserProfile,
  useLgas,
  useProvinces,
  useRegions,
  useStates,
} from "../hooks/useUserProfile";
import {
  defaultUserProfileForm,
  type UserProfileDTO,
} from "../types/userProfile";

const LOCAL_STORAGE_KEY = "nphm_form_wizard";

const loadFromLocalStorage = (): UserProfileDTO | null => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

  try {
    const parsedData = saved ? JSON.parse(saved) : null;
    if (parsedData) {
      parsedData.image_path = null;
    }
    return parsedData;
  } catch {
    return null;
  }
};

const saveToLocalStorage = (data: UserProfileDTO) => {
  const sanitizedData = {
    ...data,
    image_path: data.image_path instanceof File ? null : data.image_path,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitizedData));
};

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

const RegisterProfileCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateUserProfile();

  const [form, setForm] = useState<UserProfileDTO>(
    () => loadFromLocalStorage() ?? defaultUserProfileForm
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [consentGiven, setConsentGiven] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const { data: regions = [] } = useRegions();
  const { data: states = [] } = useStates();
  const { data: provinces = [] } = useProvinces(form.region);
  const { data: lgas = [] } = useLgas(form.state);

  useEffect(() => {
    saveToLocalStorage(form);
  }, [form]);

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

  const renderInput = useCallback(
    (
      label: string,
      name: keyof UserProfileDTO,
      type = "text",
      placeholder = ""
    ) => {
      const value = (form[name] ?? "") as string;
      const limit = charLimits[name as string];

      return (
        <div>
          <label htmlFor={String(name)} className="block text-sm font-medium mb-1">
            {label}
          </label>

          <input
            id={String(name)}
            name={String(name)}
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
    },
    [form]
  );

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
      const readableFields = missing
        .map((field) => String(field).replace(/_/g, " "))
        .join(", ");

      toast.error(`Please complete: ${readableFields}.`);
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
              <label htmlFor="gender" className="block text-sm font-medium mb-1">
                Gender
              </label>
              <select
                id="gender"
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
              <label htmlFor="region" className="block text-sm font-medium mb-1">
                Region
              </label>
              <select
                id="region"
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
              <label htmlFor="province" className="block text-sm font-medium mb-1">
                Province
              </label>
              <select
                id="province"
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
              <label htmlFor="state" className="block text-sm font-medium mb-1">
                State
              </label>
              <select
                id="state"
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
              <label htmlFor="lga" className="block text-sm font-medium mb-1">
                LGA
              </label>
              <select
                id="lga"
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
              <label htmlFor="position" className="block text-sm font-medium mb-1">
                Position
              </label>
              <select
                id="position"
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
              <label htmlFor="ordination_category" className="block text-sm font-medium mb-1">
                Ordination Category
              </label>
              <select
                id="ordination_category"
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
                setPreviewUrl(file ? URL.createObjectURL(file) : null);
              }}
            />

            <div className="rounded-2xl border bg-slate-50 p-4">
              <label className="flex items-start gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={() => setConsentGiven((prev) => !prev)}
                  className="mt-1"
                />
                <span>
                  I agree to the processing of my personal data for ministry purposes.
                </span>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  }, [currentStep, form, regions, provinces, states, lgas, previewUrl, consentGiven, renderInput]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consentGiven) {
      toast.error("Please provide consent before submitting the form.");
      return;
    }

    try {
      const response = await createMutation.mutateAsync(form);
      toast.success(response.message || "Submission successful");

      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const responseData = error.response?.data;

        if (responseData?.message && typeof responseData.message === "object") {
          const messages = Object.values(responseData.message)
            .flat()
            .join(" ");

          toast.error(messages || "Validation failed.");
          return;
        }

        toast.error(
          (typeof responseData?.message === "string" && responseData.message) ||
            responseData?.error ||
            "Submission failed."
        );
        return;
      }

      toast.error(error instanceof Error ? error.message : "Submission failed.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-[32px] p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-slate-900 mb-6">NPHM Bio-Data Form</h2>

      <UserProfileStepTabs
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      <form onSubmit={handleSubmit} className="mt-8">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-slate-900">{steps[currentStep]}</h3>
          <p className="text-slate-500 mt-1">
            Complete this section carefully before moving forward.
          </p>
        </div>

        {stepContent}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="rounded-xl bg-gray-300 border px-5 py-3 font-semibold disabled:opacity-50"
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
                disabled={!consentGiven || createMutation.isPending}
                className="rounded-xl bg-green-600 hover:bg-green-700 text-white px-6 py-3 font-semibold disabled:opacity-50"
              >
                {createMutation.isPending ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
};

export default RegisterProfileCreate;