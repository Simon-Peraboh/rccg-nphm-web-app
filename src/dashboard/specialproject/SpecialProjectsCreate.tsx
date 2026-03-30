import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useCreateSpecialProject } from "../hooks/useSpecialProjects";
import imageCompression from "browser-image-compression";
import type {
  SpecialProjectsReportDTO,
  SpecialProjectsReportFormValues,
} from "../types/specialProjects";

const schema: yup.ObjectSchema<SpecialProjectsReportFormValues> = yup.object({
  projectName: yup.string().required("Project name is required"),
  projectDescription: yup.string().required("Project description is required"),
  projectLocation: yup.string().required("Project location is required"),
  state: yup.string().required("State is required"),
  projectEstimate: yup.string().required("Project estimate is required"),
  projectCost: yup.string().required("Project cost is required"),
  projectStartDate: yup.string().required("Project start date is required"),
  projectCompletedDate: yup.string().required("Project completed date is required"),
  projectManager: yup.string().required("Project manager is required"),
  projectAid: yup.string().required("Project aid/funding detail is required"),
  projectRemarks: yup.string().optional(),
  projectBeforeImage: yup.mixed<File>().nullable().optional(),
  projectInProgressImage: yup.mixed<File>().nullable().optional(),
  projectCompletedImage: yup.mixed<File>().nullable().optional(),
});

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;

    if (typeof responseData?.message === "string") {
      return responseData.message;
    }

    if (responseData?.message && typeof responseData.message === "object") {
      const firstError = Object.values(responseData.message)
        .flat()
        .find((value) => typeof value === "string");

      if (typeof firstError === "string") {
        return firstError;
      }
    }

    if (typeof responseData?.error === "string") {
      return responseData.error;
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Failed to create project report";
};

const SpecialProjectsCreate: React.FC = () => {
  const navigate = useNavigate();
  const createMutation = useCreateSpecialProject();

  const [beforePreview, setBeforePreview] = useState<string | null>(null);
  const [progressPreview, setProgressPreview] = useState<string | null>(null);
  const [completedPreview, setCompletedPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SpecialProjectsReportFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      projectName: "",
      projectDescription: "",
      projectLocation: "",
      state: "",
      projectEstimate: "",
      projectCost: "",
      projectStartDate: "",
      projectCompletedDate: "",
      projectManager: "",
      projectAid: "",
      projectRemarks: "",
      projectBeforeImage: null,
      projectInProgressImage: null,
      projectCompletedImage: null,
    },
  });

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    field:
      | "projectBeforeImage"
      | "projectInProgressImage"
      | "projectCompletedImage",
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      setValue(field, null, { shouldValidate: true, shouldDirty: true });
      setPreview(null);
      return;
    }

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
      });

      setValue(field, compressedFile, {
        shouldValidate: true,
        shouldDirty: true,
      });

      setPreview(URL.createObjectURL(compressedFile));

      if (compressedFile.size > 10 * 1024 * 1024) {
        toast.error(`${field} is still larger than 10MB after compression. Please choose a smaller image.`);
      }
    } catch (error) {
      toast.error(`Failed to process ${field}. Please try another image.`);
    }
  };

  const onSubmit = async (data: SpecialProjectsReportFormValues) => {
    try {
      await createMutation.mutateAsync(data as unknown as SpecialProjectsReportDTO);
      toast.success("Project report created successfully");
      setTimeout(() => navigate("/dashboard/specialProjectsTable"), 1200);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const renderImageUpload = (
    label: string,
    field:
      | "projectBeforeImage"
      | "projectInProgressImage"
      | "projectCompletedImage",
    preview: string | null,
    setPreview: React.Dispatch<React.SetStateAction<string | null>>
  ) => (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageChange(e, field, setPreview)}
        className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700"
      />
      {preview && (
        <img
          src={preview}
          alt={label}
          className="mt-3 h-32 w-full rounded-2xl border object-cover"
        />
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Special Projects
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Create Special Project Report
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Capture project scope, funding, cost, timeline, and visual evidence.
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
              to="/dashboard/specialProjectsTable"
              className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              View Reports
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Project Identity</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Name</label>
                <input {...register("projectName")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectName && <p className="mt-1 text-xs text-red-500">{errors.projectName.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Location</label>
                <input {...register("projectLocation")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectLocation && <p className="mt-1 text-xs text-red-500">{errors.projectLocation.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">State</label>
                <input {...register("state")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Manager</label>
                <input {...register("projectManager")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectManager && <p className="mt-1 text-xs text-red-500">{errors.projectManager.message}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Timeline & Cost</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Estimate</label>
                <input {...register("projectEstimate")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectEstimate && <p className="mt-1 text-xs text-red-500">{errors.projectEstimate.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Cost</label>
                <input {...register("projectCost")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectCost && <p className="mt-1 text-xs text-red-500">{errors.projectCost.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Start Date</label>
                <input type="date" {...register("projectStartDate")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectStartDate && <p className="mt-1 text-xs text-red-500">{errors.projectStartDate.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Completed Date</label>
                <input type="date" {...register("projectCompletedDate")} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm" />
                {errors.projectCompletedDate && <p className="mt-1 text-xs text-red-500">{errors.projectCompletedDate.message}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Description & Funding</h2>
            <div className="mt-5 grid gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Description</label>
                <textarea {...register("projectDescription")} className="min-h-[120px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                {errors.projectDescription && <p className="mt-1 text-xs text-red-500">{errors.projectDescription.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">How Was Project Funded</label>
                <textarea {...register("projectAid")} className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" />
                {errors.projectAid && <p className="mt-1 text-xs text-red-500">{errors.projectAid.message}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Remarks</label>
                <textarea {...register("projectRemarks")} className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm" />
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <h2 className="text-lg font-semibold text-slate-900">Project Images</h2>
            <p className="mt-1 text-sm text-slate-500">
              Upload visual evidence for before, in-progress, and completed stages.
            </p>

            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {renderImageUpload("Before Image", "projectBeforeImage", beforePreview, setBeforePreview)}
              {renderImageUpload("In Progress Image", "projectInProgressImage", progressPreview, setProgressPreview)}
              {renderImageUpload("Completed Image", "projectCompletedImage", completedPreview, setCompletedPreview)}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {createMutation.isPending ? "Creating..." : "Create Report"}
            </button>

            <Link
              to="/dashboard/specialProjectsTable"
              className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialProjectsCreate;