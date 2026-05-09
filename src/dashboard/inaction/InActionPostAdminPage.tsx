import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowLeft, FaComments, FaHeart, FaTrash } from "react-icons/fa";
import {
  useCreateInActionPost,
  useDeleteInActionPost,
  useInActionPosts,
  useToggleInActionPostPublish,
} from "../hooks/useInActionPosts";
import type { InActionPostDTO, InActionPostFormValues } from "../types/inActionPosts";

const emptyForm: InActionPostFormValues = {
  title: "",
  details: "",
  activityDate: "",
  location: "",
  region: "",
  province: "",
  imageOne: null,
  imageTwo: null,
  isPublished: true,
};

const MAX_IMAGE_SIZE_BYTES = 900 * 1024;

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

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const responseData = error.response?.data;
    const detailMessages = extractBackendMessages(responseData?.message);

    if (detailMessages.length > 0) {
      return detailMessages[0]
        .replace(/image one/gi, "first image")
        .replace(/image two/gi, "second image");
    }

    return responseData?.error || "Action failed.";
  }

  if (error instanceof Error) return error.message;

  return "Action failed.";
};

const toUploadFile = (compressedFile: Blob, originalFile: File): File =>
  new File([compressedFile], originalFile.name, {
    type: compressedFile.type || originalFile.type,
    lastModified: Date.now(),
  });

const InActionPostAdminPage: React.FC = () => {
  const { data, isLoading } = useInActionPosts();
  const createMutation = useCreateInActionPost();
  const deleteMutation = useDeleteInActionPost();
  const togglePublishMutation = useToggleInActionPostPublish();

  const [form, setForm] = useState<InActionPostFormValues>(emptyForm);
  const [previews, setPreviews] = useState<{ imageOne?: string; imageTwo?: string }>({});
  const [imageProcessingKey, setImageProcessingKey] = useState<"imageOne" | "imageTwo" | null>(null);

  const posts = useMemo<InActionPostDTO[]>(() => data ?? [], [data]);

  const updateForm = <T extends keyof InActionPostFormValues>(
    key: T,
    value: InActionPostFormValues[T]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    return () => {
      Object.values(previews).forEach((preview) => {
        if (preview?.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [previews]);

  const handleImageChange = async (
    key: "imageOne" | "imageTwo",
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] ?? null;

    if (!file) {
      updateForm(key, null);
      setPreviews((prev) => ({ ...prev, [key]: undefined }));
      return;
    }

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      updateForm(key, null);
      setPreviews((prev) => ({ ...prev, [key]: undefined }));
      toast.error("Please upload a valid image file.");
      return;
    }

    setImageProcessingKey(key);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.85,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        initialQuality: 0.78,
      });
      const uploadFile = toUploadFile(compressedFile, file);

      if (uploadFile.size > MAX_IMAGE_SIZE_BYTES) {
        event.target.value = "";
        updateForm(key, null);
        setPreviews((prev) => ({ ...prev, [key]: undefined }));
        toast.error("Image is still too large after compression. Please choose a smaller image.");
        return;
      }

      updateForm(key, uploadFile);
      setPreviews((prev) => {
        const currentPreview = prev[key];

        if (currentPreview?.startsWith("blob:")) {
          URL.revokeObjectURL(currentPreview);
        }

        return {
          ...prev,
          [key]: URL.createObjectURL(uploadFile),
        };
      });
    } catch {
      event.target.value = "";
      updateForm(key, null);
      setPreviews((prev) => ({ ...prev, [key]: undefined }));
      toast.error("Failed to prepare image. Please try another image.");
    } finally {
      setImageProcessingKey(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formElement = event.currentTarget;

    if (!form.title.trim() || !form.details.trim()) {
      toast.error("Title and report details are required.");
      return;
    }

    if (imageProcessingKey) {
      toast.info("Please wait while the image is being prepared.");
      return;
    }

    if (!form.imageOne || !form.imageTwo) {
      toast.error("Please upload two images for the activity post.");
      return;
    }

    try {
      await createMutation.mutateAsync(form);
      setForm(emptyForm);
      setPreviews({});
      formElement.reset();
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  const handleDelete = (post: InActionPostDTO) => {
    const toastId = toast.info(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="text-sm font-bold text-slate-950">
            Delete this In Action post?
          </p>
          <p className="text-xs leading-5 text-slate-600">{post.title}</p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={async () => {
                closeToast?.();

                try {
                  await deleteMutation.mutateAsync(post.id);
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
              onClick={() => {
                closeToast?.();
              }}
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

  const handleTogglePublish = async (post: InActionPostDTO) => {
    try {
      await togglePublishMutation.mutateAsync({
        id: post.id,
        isPublished: post.isPublished,
      });
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6">
      <ToastContainer position="top-right" theme="colored" />

      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                Website Content
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                In Action Blog Posts
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                Publish regional and provincial field reports with two images.
              </p>
            </div>

            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <FaArrowLeft className="text-xs" />
              <span>Back to Dashboard</span>
            </Link>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Post Title
                </label>
                <input
                  value={form.title}
                  onChange={(event) => updateForm("title", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Activity Date
                </label>
                <input
                  type="date"
                  value={form.activityDate}
                  onChange={(event) => updateForm("activityDate", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Location
                </label>
                <input
                  value={form.location}
                  onChange={(event) => updateForm("location", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Region
                </label>
                <input
                  value={form.region}
                  onChange={(event) => updateForm("region", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-slate-700">
                  Province
                </label>
                <input
                  value={form.province}
                  onChange={(event) => updateForm("province", event.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm"
                />
              </div>

              <label className="flex items-center gap-3 pt-8 text-sm font-bold text-slate-700">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(event) => updateForm("isPublished", event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-sky-600"
                />
                Publish immediately
              </label>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-bold text-slate-700">
                Report Details
              </label>
              <textarea
                value={form.details}
                onChange={(event) => updateForm("details", event.target.value)}
                className="min-h-32 w-full rounded-lg border border-slate-200 px-4 py-3 text-sm"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {(["imageOne", "imageTwo"] as const).map((key, index) => (
                <div key={key}>
                  <label className="mb-1.5 block text-sm font-bold text-slate-700">
                    Image {index + 1}
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) => handleImageChange(key, event)}
                    disabled={imageProcessingKey === key}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm file:mr-3 file:rounded-lg file:border-0 file:bg-sky-50 file:px-3 file:py-2 file:text-sm file:font-bold file:text-sky-700"
                  />
                  {imageProcessingKey === key && (
                    <p className="mt-2 text-xs font-bold text-sky-700">
                      Preparing image for upload...
                    </p>
                  )}
                  {previews[key] && (
                    <img
                      src={previews[key]}
                      alt={`Preview ${index + 1}`}
                      className="mt-4 h-48 w-full rounded-lg border object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={createMutation.isPending || !!imageProcessingKey}
              className="rounded-lg bg-sky-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-50"
            >
              {imageProcessingKey
                ? "Preparing images..."
                : createMutation.isPending
                  ? "Publishing..."
                  : "Publish In Action Post"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
              Existing Posts
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950">
              In Action Feed
            </h2>
          </div>

          {isLoading ? (
            <p className="text-center text-slate-500">Loading posts...</p>
          ) : posts.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-slate-500">
              No In Action posts created yet.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                >
                  <div className="grid grid-cols-2 gap-1 bg-slate-100">
                    {[post.imageOneUrl, post.imageTwoUrl].map((image, index) => (
                      <div key={`${post.id}-${index}`} className="h-44 bg-slate-100">
                        {image ? (
                          <img
                            src={image}
                            alt={`${post.title} ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs font-bold text-slate-400">
                            No image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black text-slate-950">{post.title}</h3>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          post.isPublished
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {post.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>

                    <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                      {post.details}
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs font-bold text-slate-500">
                      {post.region && <span>{post.region} Region</span>}
                      {post.province && <span>{post.province} Province</span>}
                    </div>

                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                      <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1 text-rose-700">
                        <FaHeart /> {post.likeCount}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1 text-sky-700">
                        <FaComments /> {post.commentCount}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(post)}
                        className={`rounded-lg border px-3 py-2 text-xs font-bold transition ${
                          post.isPublished
                            ? "border-amber-200 text-amber-700 hover:bg-amber-50"
                            : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        }`}
                      >
                        {post.isPublished ? "Unpublish" : "Publish"}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(post)}
                        className="inline-flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-50"
                      >
                        <FaTrash />
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InActionPostAdminPage;
