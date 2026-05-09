import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useSpecialProject, useUpdateSpecialProject } from "../hooks/useSpecialProjects";
import type { SpecialProjectsReportDTO } from "../types/specialProjects";

type SpecialProjectEditFormValues = Omit<
  SpecialProjectsReportDTO,
  | "id"
  | "projectBeforeImage"
  | "projectInProgressImage"
  | "projectCompletedImage"
  | "slug"
>;

const schema: yup.ObjectSchema<SpecialProjectEditFormValues> = yup.object({
  projectName: yup.string().required("Project name is required"),
  projectDescription: yup.string().required("Project description is required"),
  projectLocation: yup.string().required("Project location is required"),
  state: yup.string().required("State is required"),
  projectEstimate: yup.string().required("Estimate time frame is required"),
  projectCost: yup.string().required("Project cost is required"),
  projectStartDate: yup.string().required("Start date is required"),
  projectCompletedDate: yup.string().required("Completed date is required"),
  projectManager: yup.string().required("Project manager is required"),
  projectAid: yup.string().required("Funding detail is required"),
  projectRemarks: yup.string().optional(),
});

const SpecialProjectsEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const reportId = id as string;
  const navigate = useNavigate();

  const { data, isLoading } = useSpecialProject(reportId);
  const updateMutation = useUpdateSpecialProject();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SpecialProjectEditFormValues>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!data) return;

    setValue("projectName", data.projectName);
    setValue("projectDescription", data.projectDescription);
    setValue("projectLocation", data.projectLocation);
    setValue("state", data.state);
    setValue("projectEstimate", data.projectEstimate);
    setValue("projectCost", data.projectCost);
    setValue("projectStartDate", data.projectStartDate);
    setValue("projectCompletedDate", data.projectCompletedDate);
    setValue("projectManager", data.projectManager);
    setValue("projectAid", data.projectAid);
    setValue("projectRemarks", data.projectRemarks || "");
  }, [data, setValue]);

  const onSubmit = async (formData: SpecialProjectEditFormValues) => {
    try {
      await updateMutation.mutateAsync({
        id: reportId,
        payload: formData,
      });

      setTimeout(() => navigate("/dashboard/specialProjectsTable"), 1500);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            error.response?.data?.error ||
            "Failed to update project report"
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update project report");
      }
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading project...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6">
      <ToastContainer position="top-center" />

      <div className="mx-auto max-w-4xl rounded-3xl bg-white border p-6 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            Special Projects
          </p>
          <h1 className="text-2xl font-bold mt-2">Edit Project Report</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
          {([
            ["projectName", "Project Name"],
            ["projectLocation", "Project Location"],
            ["state", "State"],
            ["projectEstimate", "Project Estimate"],
            ["projectCost", "Project Cost"],
            ["projectManager", "Project Manager"],
            ["projectAid", "Funding Detail"],
          ] satisfies Array<[keyof SpecialProjectEditFormValues, string]>).map(([name, label]) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-1">{label}</label>
              <input
                type="text"
                {...register(name)}
                className="w-full rounded-xl border px-3 py-2.5"
              />
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">
                  {String(errors[name]?.message ?? "")}
                </p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Project Start Date</label>
            <input
              type="date"
              {...register("projectStartDate")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.projectStartDate && (
              <p className="text-red-500 text-xs mt-1">{errors.projectStartDate.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Project Completed Date</label>
            <input
              type="date"
              {...register("projectCompletedDate")}
              className="w-full rounded-xl border px-3 py-2.5"
            />
            {errors.projectCompletedDate && (
              <p className="text-red-500 text-xs mt-1">{errors.projectCompletedDate.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Project Description</label>
            <textarea
              {...register("projectDescription")}
              className="w-full rounded-xl border px-3 py-2.5 min-h-[100px]"
            />
            {errors.projectDescription && (
              <p className="text-red-500 text-xs mt-1">{errors.projectDescription.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Remarks</label>
            <textarea
              {...register("projectRemarks")}
              className="w-full rounded-xl border px-3 py-2.5 min-h-[90px]"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-xl bg-blue-600 text-white px-5 py-2.5 text-sm font-semibold disabled:opacity-50"
            >
              {updateMutation.isPending ? "Updating..." : "Update Report"}
            </button>

            <Link
              to="/dashboard/specialProjectsTable"
              className="rounded-xl border px-5 py-2.5 text-sm font-semibold"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialProjectsEdit;
