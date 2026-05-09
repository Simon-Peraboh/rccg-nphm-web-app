import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import imageCompression from "browser-image-compression";
<<<<<<< HEAD
import { getStorageImageUrl, PLACEHOLDER_IMAGE } from "../../utils/getStorageImageUrl";
=======
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
import {
    useCreateMinistryActivity,
    useDeleteMinistryActivity,
    useMinistryActivities,
    useToggleMinistryActivityPublish,
} from "../hooks/useMinistryActivities";
import type {
    MinistryActivityDTO,
    MinistryActivityFormValues,
} from "../types/ministryActivities";

<<<<<<< HEAD
=======
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const PLACEHOLDER_IMAGE = "/placeholder.png";

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
const schema: yup.ObjectSchema<MinistryActivityFormValues> = yup.object({
    title: yup.string().required("Title is required"),
    caption: yup.string().optional(),
    activityDate: yup.string().optional(),
    location: yup.string().optional(),
    image: yup.mixed<File>().nullable().required("Activity image is required"),
    isPublished: yup.boolean().default(true),
});

<<<<<<< HEAD
=======
const normalizeImageUrl = (imagePath?: string | File | null): string | null => {
    if (!imagePath || typeof imagePath !== "string") {
        return null;
    }

    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    let normalizedPath = imagePath.trim();
    normalizedPath = normalizedPath.replace(/^\/+/, "");
    normalizedPath = normalizedPath.replace(/^public\//, "");
    normalizedPath = normalizedPath.replace(/^storage\//, "");

    return `${API_BASE_URL}/storage/${normalizedPath}`;
};
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

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

    return "Failed to save ministry activity";
};

const MinistryActivityAdminPage: React.FC = () => {
    const createMutation = useCreateMinistryActivity();
    const deleteMutation = useDeleteMinistryActivity();
    const togglePublishMutation = useToggleMinistryActivityPublish();
    const { data, isLoading } = useMinistryActivities();

    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
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

    const activities = useMemo<MinistryActivityDTO[]>(() => {
        return Array.isArray(data) ? data : [];
    }, [data]);

    const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] ?? null;

        if (!file) {
            setValue("image", null, { shouldValidate: true, shouldDirty: true });
            setImagePreview(null);
            return;
        }

        try {
            const compressedFile = await imageCompression(file, {
                maxSizeMB: 1.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                initialQuality: 0.8,
            });

            setValue("image", compressedFile, {
                shouldValidate: true,
                shouldDirty: true,
            });

            setImagePreview(URL.createObjectURL(compressedFile));

            if (compressedFile.size > 10 * 1024 * 1024) {
                toast.error("Compressed image is still larger than 10MB. Please choose a smaller image.");
            }
        } catch (error) {
            toast.error("Failed to process image. Please try another image.");
        }
    };

    const onSubmit = async (values: MinistryActivityFormValues) => {
        try {
            await createMutation.mutateAsync(values);
            reset();
            setImagePreview(null);
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    const handleDelete = (id: string) => {
        confirmAlert({
            title: "Confirm deletion",
            message: "Are you sure you want to delete this activity?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        try {
                            await deleteMutation.mutateAsync(id);
                        } catch (error) {
                            toast.error(getApiErrorMessage(error));
                        }
                    },
                },
                {
                    label: "No",
                    onClick: () => undefined,
                },
            ],
        });
    };

    const handleTogglePublish = async (id: string, isPublished: boolean) => {
        try {
            await togglePublishMutation.mutateAsync({ id, isPublished });
        } catch (error) {
            toast.error(getApiErrorMessage(error));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-6">
            <ToastContainer position="top-right" theme="colored" />

            <div className="mx-auto max-w-7xl space-y-6">
                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                                Website Content
                            </p>
                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                                Ministry Activities Admin
                            </h1>
                            <p className="mt-1 text-sm text-slate-500">
                                Publish the latest ministry activities in pictures for the website.
                            </p>
                        </div>

                        <Link
                            to="/dashboard"
                            className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <FaArrowLeft className="text-xs" />
                            <span>Back to Dashboard</span>
                        </Link>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                            <h2 className="text-lg font-semibold text-slate-900">Activity Details</h2>

                            <div className="mt-5 grid gap-4 md:grid-cols-2">
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
                                    {errors.location && (
                                        <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
                                    )}
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
                                    {errors.activityDate && (
                                        <p className="mt-1 text-xs text-red-500">{errors.activityDate.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center gap-3 pt-7">
                                    <input
                                        id="isPublished"
                                        type="checkbox"
                                        {...register("isPublished")}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600"
                                    />
                                    <label htmlFor="isPublished" className="text-sm font-medium text-slate-700">
                                        Publish immediately
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
                                {errors.caption && (
                                    <p className="mt-1 text-xs text-red-500">{errors.caption.message}</p>
                                )}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-5">
                            <h2 className="text-lg font-semibold text-slate-900">Activity Image</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Upload the featured image that will appear on the public website.
                            </p>

                            <div className="mt-5">
<<<<<<< HEAD
                                <label
                                    htmlFor="image"
                                    className="block text-sm font-medium text-slate-700 mb-1"
                                >
                                    Upload Image
                                </label>

                                <input
                                    id="image"
=======
                                <input
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-xl file:border-0 file:bg-blue-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-blue-700"
                                />
<<<<<<< HEAD

=======
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
                                {errors.image && (
                                    <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
                                )}

                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Activity preview"
                                        className="mt-4 h-52 w-full rounded-2xl border object-cover md:w-96"
                                    />
                                )}
                            </div>
<<<<<<< HEAD

=======
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button
                                type="submit"
                                disabled={createMutation.isPending}
                                className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >
                                {createMutation.isPending ? "Publishing..." : "Publish Activity"}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="mb-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-600">
                            Existing Posts
                        </p>
                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                            Latest Ministry Activities
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            Most recent activities appear first on the website.
                        </p>
                    </div>

                    {isLoading ? (
                        <p className="text-center text-slate-500">Loading activities...</p>
                    ) : activities.length === 0 ? (
                        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
                            No ministry activities created yet.
                        </div>
                    ) : (
                        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                            {activities.map((activity) => {
                                const imageUrl =
<<<<<<< HEAD
                                    getStorageImageUrl(activity.imageUrl || activity.image) || PLACEHOLDER_IMAGE;
=======
                                    normalizeImageUrl(activity.imageUrl || activity.image) || PLACEHOLDER_IMAGE;
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

                                return (
                                    <article
                                        key={activity.id}
                                        className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
                                    >
                                        <div className="h-64 overflow-hidden bg-slate-100">
                                            <img
                                                src={imageUrl}
                                                alt={activity.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>

                                        <div className="space-y-3 p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <h3 className="text-lg font-bold text-slate-900">
                                                    {activity.title}
                                                </h3>
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${activity.isPublished
                                                        ? "bg-emerald-50 text-emerald-700"
                                                        : "bg-amber-50 text-amber-700"
                                                        }`}
                                                >
                                                    {activity.isPublished ? "Published" : "Draft"}
                                                </span>
                                            </div>

                                            {activity.location && (
                                                <p className="text-sm font-medium text-blue-700">
                                                    {activity.location}
                                                </p>
                                            )}

                                            {activity.caption && (
                                                <p className="text-sm leading-6 text-slate-600">
                                                    {activity.caption}
                                                </p>
                                            )}

                                            {activity.activityDate && (
                                                <p className="text-xs uppercase tracking-wide text-slate-400">
                                                    {activity.activityDate}
                                                </p>
                                            )}

                                            <div className="flex flex-wrap items-center gap-2 pt-2">
                                                <Link
                                                    to={`/dashboard/ministryActivitiesEdit/${activity.id}`}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-blue-200 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-50"
                                                >
                                                    <FaEdit />
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(activity.id)}
                                                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50"
                                                >
                                                    <FaTrash />
                                                    Delete
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleTogglePublish(activity.id, !!activity.isPublished)
                                                    }
                                                    className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition ${activity.isPublished
                                                        ? "border border-amber-200 text-amber-700 hover:bg-amber-50"
                                                        : "border border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                                        }`}
                                                >
                                                    {activity.isPublished ? "Unpublish" : "Publish"}
                                                </button>
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MinistryActivityAdminPage;