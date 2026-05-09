import React, { useEffect, useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFacebookF, FaUser } from "react-icons/fa";
import { useCreateStateCoordinator, useStateCoordinatorStates } from "../hooks/useStateCoordinator";
import type { StateCoordinatorDTO } from "../types/stateCoordinator";

const LOCAL_STORAGE_KEY = "nphm_state_coordinator_form";
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

const defaultFormData: StateCoordinatorDTO = {
  full_name: "",
  state: "",
  province: "",
  facebook: "",
  twitter: "",
  instagram: "",
  image_path: null,
};

const loadFromLocalStorage = (): StateCoordinatorDTO | null => {
  const saved = localStorage.getItem(LOCAL_STORAGE_KEY);

  try {
    const parsed = saved ? JSON.parse(saved) : null;
    if (parsed) {
      parsed.image_path = null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const saveToLocalStorage = (data: StateCoordinatorDTO) => {
  const sanitized = {
    ...data,
    image_path: data.image_path instanceof File ? null : data.image_path,
  };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sanitized));
};

const extractBackendMessages = (value: unknown): string[] => {
  if (!value) {
    return [];
  }

  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(extractBackendMessages);
  }

  if (typeof value === "object") {
    return Object.values(value as Record<string, unknown>).flatMap(extractBackendMessages);
  }

  return [];
};

const humanizeBackendMessage = (message: string): string => {
  return message
    .replace(/image path field/gi, "coordinator image")
    .replace(/2048 kilobytes/gi, "2MB");
};

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const detailMessages = extractBackendMessages(responseData?.message);

    if (detailMessages.length > 0) {
      return humanizeBackendMessage(detailMessages[0]);
    }

    if (typeof responseData?.error === "string") {
      return responseData.error;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Submission failed. Please check the form and try again.";
};

const toUploadFile = (compressedFile: Blob, originalFile: File): File => {
  return new File([compressedFile], originalFile.name, {
    type: compressedFile.type || originalFile.type,
    lastModified: Date.now(),
  });
};

const StateCoordinatorForm: React.FC = () => {
  const navigate = useNavigate();
  const { data: stateOptions = [] } = useStateCoordinatorStates();
  const createMutation = useCreateStateCoordinator();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [form, setForm] = useState<StateCoordinatorDTO>(
    () => loadFromLocalStorage() ?? defaultFormData
  );

  useEffect(() => {
    saveToLocalStorage(form);
  }, [form]);

  useEffect(() => {
    if (!form.state && stateOptions.length > 0) {
      setForm((prev) => ({
        ...prev,
        state: stateOptions[0],
      }));
    }
  }, [stateOptions, form.state]);

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;

    if (!file) {
      setForm((prev) => ({ ...prev, image_path: null }));
      setPreviewUrl(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      e.target.value = "";
      return;
    }

    setImageProcessing(true);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
      });
      const uploadFile = toUploadFile(compressedFile, file);

      if (uploadFile.size > MAX_IMAGE_SIZE_BYTES) {
        setForm((prev) => ({ ...prev, image_path: null }));
        setPreviewUrl(null);
        e.target.value = "";
        toast.error("The coordinator image is still larger than 2MB after compression. Please choose a smaller image.");
        return;
      }

      setForm((prev) => ({ ...prev, image_path: uploadFile }));
      setPreviewUrl(URL.createObjectURL(uploadFile));
    } catch {
      setForm((prev) => ({ ...prev, image_path: null }));
      setPreviewUrl(null);
      e.target.value = "";
      toast.error("Failed to process image. Please try another image.");
    } finally {
      setImageProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (imageProcessing) {
      toast.info("Please wait while the image is being prepared.");
      return;
    }

    try {
      await createMutation.mutateAsync(form);
      localStorage.removeItem(LOCAL_STORAGE_KEY);

      setTimeout(() => {
        navigate("/Connect");
      }, 1500);
    } catch (error: unknown) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" autoClose={4000} />

      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              State Coordinators
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Coordinator Profile Form
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Capture coordinator identity, location, social presence, and profile image in one clean workflow.
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
              to="/dashboard/stateCoordinators"
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View Coordinators
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex items-center gap-2">
              <FaUser className="text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-900">Identity & Coverage</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Record the coordinator’s full name, state, and province assignment.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="full_name" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Full Name
                </label>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  value={form.full_name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label htmlFor="state" className="mb-1.5 block text-sm font-medium text-slate-700">
                  State
                </label>
                <select
                  id="state"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  title="Select state"
                >
                  <option value="">Select state</option>
                  {stateOptions.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="province" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Province
                </label>
                <input
                  id="province"
                  type="text"
                  name="province"
                  value={form.province}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  placeholder="Enter province"
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="flex items-center gap-2">
              <FaFacebookF className="text-slate-500" />
              <h2 className="text-lg font-semibold text-slate-900">Social Media Presence</h2>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Add public profile links so coordinators are easier to identify and connect with.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="facebook" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Facebook URL
                </label>
                <input
                  id="facebook"
                  type="url"
                  name="facebook"
                  value={form.facebook}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  placeholder="https://facebook.com/..."
                />
              </div>

              <div>
                <label htmlFor="twitter" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Twitter / X URL
                </label>
                <input
                  id="twitter"
                  type="url"
                  name="twitter"
                  value={form.twitter}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  placeholder="https://x.com/..."
                />
              </div>

              <div className="md:col-span-2">
                <label htmlFor="instagram" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Instagram URL
                </label>
                <input
                  id="instagram"
                  type="url"
                  name="instagram"
                  value={form.instagram}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                  placeholder="https://instagram.com/..."
                />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Profile Image</h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload a clear image to make the coordinator easier to recognize in the system.
            </p>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
              <div>
                <label htmlFor="image_path" className="mb-1.5 block text-sm font-medium text-slate-700">
                  Upload Image
                </label>
                <input
                  id="image_path"
                  type="file"
                  name="image_path"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={imageProcessing}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700"
                  title="Upload coordinator image"
                />
                <p className="mt-2 text-xs text-slate-500">
                  Use a clear portrait photo. Large images are compressed automatically before upload.
                </p>
                {imageProcessing && (
                  <p className="mt-2 text-xs font-semibold text-blue-700">
                    Preparing image for upload...
                  </p>
                )}
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full rounded-3xl border border-dashed border-slate-300 bg-white p-4">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Coordinator preview"
                      className="h-56 w-full rounded-2xl object-cover shadow-sm"
                    />
                  ) : (
                    <div className="flex h-56 w-full items-center justify-center rounded-2xl bg-slate-100 text-sm text-slate-400">
                      Image preview will appear here
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={createMutation.isPending || imageProcessing}
              className="rounded-2xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
            >
              {imageProcessing
                ? "Preparing image..."
                : createMutation.isPending
                  ? "Submitting..."
                  : "Submit Coordinator"}
            </button>

            <Link
              to="/dashboard/stateCoordinators"
              className="rounded-2xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StateCoordinatorForm;
