import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import {
  useMinistryActivity,
  useUpdateMinistryActivity,
} from "../hooks/useMinistryActivities";
import type { MinistryActivityFormValues } from "../types/ministryActivities";

const schema: yup.ObjectSchema<MinistryActivityFormValues> = yup.object({
  title: yup.string().required("Title is required"),
  caption: yup.string().optional(),
  activityDate: yup.string().optional(),
  location: yup.string().optional(),
  image: yup.mixed<File>().nullable().optional(),
  isPublished: yup.boolean().default(true),
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

  return "Failed to update ministry activity";
};

const MinistryActivityEdit: React.FC = () => {
  const { id = "" } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useMinistryActivity(id);
  const updateMutation = useUpdateMinistryActivity();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MinistryActivityFormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      caption: "",
      activityDate: "",
      location: "",
      image: null,
      isPublished: true,
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.title ?? "",
        caption: data.caption ?? "",
        activityDate: data.activityDate ?? "",
        location: data.location ?? "",
        image: null,
        isPublished: data.isPublished ?? true,
      });

      if (typeof data.imageUrl === "string" && data.imageUrl) {
        setImagePreview(data.imageUrl);
      }
    }
  }, [data, reset]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValue("image", file, { shouldValidate: true, shouldDirty: true });

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (values: MinistryActivityFormValues) => {
    try {
      await updateMutation.mutateAsync({ id, payload: values });
      toast.success("Activity updated successfully");
      setTimeout(() => navigate("/dashboard/ministryActivities"), 1000);
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-6">
        <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">Loading activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-5xl rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
              Website Content
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Edit Ministry Activity
            </h1>
          </div>

          <Link
            to="/dashboard/ministryActivities"
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Activities</span>
          </Link>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Activity Title
                </label>
                <input
                  {...register("title")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
                {errors.title && (
                  <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Location
                </label>
                <input
                  {...register("location")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Activity Date
                </label>
                <input
                  type="date"
                  {...register("activityDate")}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm"
                />
              </div>

              <div className="flex items-center gap-3 pt-7">
                <input
                  id="isPublished"
                  type="checkbox"
                  {...register("isPublished")}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600"
                />
                <label htmlFor="isPublished" className="text-sm font-medium text-slate-700">
                  Published
                </label>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Caption
              </label>
              <textarea
                {...register("caption")}
                className="min-h-[100px] w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm"
              />
            </div>

            <div className="mt-5">
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Replace Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700"
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Activity preview"
                  className="mt-4 h-56 w-full rounded-2xl border object-cover md:w-96"
                />
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MinistryActivityEdit;