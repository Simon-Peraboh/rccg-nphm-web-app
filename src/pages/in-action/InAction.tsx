import React, { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaCommentDots,
  FaHeart,
  FaMapMarkerAlt,
  FaRegCommentDots,
  FaRegHeart,
  FaSmile,
} from "react-icons/fa";
import { Footer, Header } from "../../components";
import {
  createInActionCommentAPICall,
  getPublicInActionPostsAPICall,
  likeInActionPostAPICall,
  type InActionCommentForm,
  type InActionPost,
} from "./inActionApi";

const emptyComment: InActionCommentForm = {
  name: "",
  email: "",
  region: "",
  province: "",
  comment: "",
};

const commentEmojis = ["🙏", "❤️", "🙌", "👏", "🔥", "😊", "🎉", "💙"];

const avatarPalettes = [
  { background: "#e0f2fe", accent: "#0369a1" },
  { background: "#dcfce7", accent: "#15803d" },
  { background: "#fef3c7", accent: "#b45309" },
  { background: "#ffe4e6", accent: "#be123c" },
  { background: "#ede9fe", accent: "#7c3aed" },
];

const formatDate = (value?: string | null) => {
  if (!value) return "Date not specified";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getApiErrorMessage = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Could not submit comment."
    );
  }

  return "Could not submit comment.";
};

const hashIdentity = (value: string) =>
  Array.from(value).reduce((total, character) => total + character.charCodeAt(0), 0);

const getInitials = (name?: string | null) => {
  const parts = (name || "Guest Commenter")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (parts[0]?.[0] ?? "G").concat(parts[1]?.[0] ?? "").toUpperCase();
};

const createAvatarImage = (name?: string | null, email?: string | null) => {
  const initials = getInitials(name);
  const palette = avatarPalettes[hashIdentity(email || name || initials) % avatarPalettes.length];
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" rx="24" fill="${palette.background}" />
      <circle cx="76" cy="20" r="18" fill="${palette.accent}" opacity="0.12" />
      <circle cx="20" cy="78" r="22" fill="${palette.accent}" opacity="0.10" />
      <text x="48" y="57" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="800" fill="${palette.accent}">${initials}</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const InAction: React.FC = () => {
  const queryClient = useQueryClient();
  const [likedPosts, setLikedPosts] = useState<Set<string | number>>(new Set());
  const [serverLikeCounts, setServerLikeCounts] = useState<
    Record<string | number, number>
  >({});
  const [commentDrafts, setCommentDrafts] = useState<
    Record<string | number, InActionCommentForm>
  >({});

  const { data, isLoading, isError } = useQuery({
    queryKey: ["public", "in-action-posts"],
    queryFn: getPublicInActionPostsAPICall,
    staleTime: 1000 * 60 * 5,
  });

  const posts = useMemo<InActionPost[]>(() => data ?? [], [data]);

  const commentMutation = useMutation({
    mutationFn: createInActionCommentAPICall,
    onSuccess: async (_data, variables) => {
      toast.success("Comment submitted successfully.");
      setCommentDrafts((prev) => ({
        ...prev,
        [variables.postId]: emptyComment,
      }));
      await queryClient.invalidateQueries({ queryKey: ["public", "in-action-posts"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });

  const likeMutation = useMutation({
    mutationFn: likeInActionPostAPICall,
    onSuccess: async (data, postId) => {
      const nextCount = Number(data?.data?.likes_count);

      setLikedPosts((prev) => new Set(prev).add(postId));

      if (!Number.isNaN(nextCount)) {
        setServerLikeCounts((prev) => ({
          ...prev,
          [postId]: nextCount,
        }));
      }

      await queryClient.invalidateQueries({ queryKey: ["public", "in-action-posts"] });
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error).replace("comment", "like"));
    },
  });

  const updateCommentDraft = (
    postId: string | number,
    field: keyof InActionCommentForm,
    value: string
  ) => {
    setCommentDrafts((prev) => ({
      ...prev,
      [postId]: {
        ...(prev[postId] ?? emptyComment),
        [field]: value,
      },
    }));
  };

  const addEmojiToComment = (postId: string | number, emoji: string) => {
    const currentComment = commentDrafts[postId]?.comment ?? "";
    const separator = currentComment && !currentComment.endsWith(" ") ? " " : "";

    updateCommentDraft(postId, "comment", `${currentComment}${separator}${emoji} `);
  };

  const handleLike = (postId: string | number) => {
    if (likedPosts.has(postId)) return;

    likeMutation.mutate(postId);
  };

  const handleCommentSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    postId: string | number
  ) => {
    event.preventDefault();
    const payload = commentDrafts[postId] ?? emptyComment;

    if (!payload.name.trim() || !payload.email.trim() || !payload.comment.trim()) {
      toast.error("Name, email, and comment are required.");
      return;
    }

    commentMutation.mutate({ postId, payload });
  };

  return (
    <div className="bg-slate-50 text-slate-900">
      <Header />

      <main>
        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  In Action Reports
                </p>
                <h1 className="mt-3 text-4xl font-black leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                  Field reports, testimonies, and outreach updates.
                </h1>
              </div>
              <p className="text-base leading-8 text-slate-600 sm:text-lg">
                Follow ministry activity posts from regions and provinces,
                including dates, locations, images, reports, and public comments.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-[520px] animate-pulse rounded-lg bg-white shadow-sm"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-lg border border-red-100 bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-black text-slate-950">
                  Activity reports could not be loaded.
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Please try again when the server is available.
                </p>
              </div>
            ) : posts.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
                <h2 className="text-2xl font-black text-slate-950">
                  No activity reports have been posted yet.
                </h2>
                <p className="mt-3 text-sm text-slate-600">
                  Regional and provincial updates will appear here after they
                  are published.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-2">
                {posts.map((post) => {
                  const draft = commentDrafts[post.id] ?? emptyComment;
                  const isLiked = likedPosts.has(post.id);
                  const likeCount = serverLikeCounts[post.id] ?? post.likeCount;

                  return (
                    <article
                      key={post.id}
                      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
                    >
                      <div className="grid grid-cols-2 gap-1 bg-slate-100">
                        {Array.from({ length: 2 }).map((_, imageIndex) => {
                          const image = post.images[imageIndex];

                          return image ? (
                            <img
                              key={`${post.id}-${imageIndex}`}
                              src={image}
                              alt={`${post.title} image ${imageIndex + 1}`}
                              className="h-64 w-full object-cover"
                            />
                          ) : (
                            <div
                              key={`${post.id}-${imageIndex}`}
                              className="flex h-64 items-center justify-center bg-sky-50 text-center text-sm font-semibold text-sky-700"
                            >
                              Image {imageIndex + 1} awaiting upload
                            </div>
                          );
                        })}
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                          <span className="inline-flex items-center gap-1">
                            <FaCalendarAlt className="h-3.5 w-3.5 text-sky-700" />
                            {formatDate(post.date)}
                          </span>
                          {post.location && (
                            <span className="inline-flex items-center gap-1">
                              <FaMapMarkerAlt className="h-3.5 w-3.5 text-sky-700" />
                              {post.location}
                            </span>
                          )}
                        </div>

                        <h2 className="mt-4 text-2xl font-black tracking-tight text-slate-950">
                          {post.title}
                        </h2>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {post.region && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              {post.region} Region
                            </span>
                          )}
                          {post.province && (
                            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                              {post.province} Province
                            </span>
                          )}
                        </div>

                        {post.details && (
                          <p className="mt-5 whitespace-pre-line text-sm leading-7 text-slate-600">
                            {post.details}
                          </p>
                        )}

                        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-5">
                          <button
                            type="button"
                            onClick={() => handleLike(post.id)}
                            disabled={isLiked || likeMutation.isPending}
                            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition ${
                              isLiked
                                ? "bg-rose-50 text-rose-700"
                                : "bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700"
                            } disabled:cursor-not-allowed disabled:opacity-80`}
                          >
                            {isLiked ? <FaHeart /> : <FaRegHeart />}
                            {likeCount} {likeCount === 1 ? "Like" : "Likes"}
                          </button>
                          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-4 py-2 text-sm font-bold text-sky-700">
                            <FaRegCommentDots />
                            {post.commentCount}{" "}
                            {post.commentCount === 1 ? "Comment" : "Comments"}
                          </span>
                        </div>

                        {post.comments.length > 0 && (
                          <div className="mt-5 space-y-3">
                            {post.comments.slice(0, 3).map((comment) => (
                              <div
                                key={comment.id}
                                className="rounded-lg border border-slate-200 bg-slate-50 p-4"
                              >
                                <div className="flex items-start gap-3">
                                  <img
                                    src={
                                      comment.avatarUrl ||
                                      createAvatarImage(comment.name, comment.email)
                                    }
                                    alt={`${comment.name} avatar`}
                                    className="h-11 w-11 shrink-0 rounded-2xl border border-white object-cover shadow-sm"
                                  />
                                  <div className="min-w-0">
                                    <p className="text-sm font-black text-slate-900">
                                      {comment.name}
                                    </p>
                                    <p className="text-xs font-semibold text-slate-500">
                                      {[comment.region, comment.province]
                                        .filter(Boolean)
                                        .join(" / ") || "Guest commenter"}
                                    </p>
                                    <p className="mt-2 text-sm leading-6 text-slate-600">
                                      {comment.comment}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <form
                          onSubmit={(event) => handleCommentSubmit(event, post.id)}
                          className="mt-6 rounded-lg border border-slate-200 bg-white p-4"
                        >
                          <div className="mb-4 flex items-center gap-2 text-sm font-black text-slate-900">
                            <img
                              src={createAvatarImage(draft.name, draft.email)}
                              alt="Comment avatar preview"
                              className="h-9 w-9 rounded-xl border border-slate-200 object-cover"
                            />
                            <span className="inline-flex items-center gap-2">
                              <FaCommentDots className="text-sky-700" />
                              Add a comment
                            </span>
                          </div>

                          <div className="grid gap-3 sm:grid-cols-2">
                            <input
                              value={draft.name}
                              onChange={(event) =>
                                updateCommentDraft(post.id, "name", event.target.value)
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                              placeholder="Name"
                            />
                            <input
                              value={draft.email}
                              onChange={(event) =>
                                updateCommentDraft(post.id, "email", event.target.value)
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                              placeholder="Email"
                              type="email"
                            />
                            <input
                              value={draft.region}
                              onChange={(event) =>
                                updateCommentDraft(post.id, "region", event.target.value)
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                              placeholder="Region"
                            />
                            <input
                              value={draft.province}
                              onChange={(event) =>
                                updateCommentDraft(post.id, "province", event.target.value)
                              }
                              className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                              placeholder="Province"
                            />
                          </div>

                          <textarea
                            value={draft.comment}
                            onChange={(event) =>
                              updateCommentDraft(post.id, "comment", event.target.value)
                            }
                            className="mt-3 min-h-24 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
                            placeholder="Write your comment"
                          />

                          <div className="mt-3 flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
                              <FaSmile className="text-sky-700" />
                              Emojis
                            </span>
                            {commentEmojis.map((emoji) => (
                              <button
                                key={emoji}
                                type="button"
                                onClick={() => addEmojiToComment(post.id, emoji)}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-lg transition hover:border-sky-200 hover:bg-sky-50"
                                aria-label={`Add ${emoji} emoji`}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>

                          <button
                            type="submit"
                            disabled={commentMutation.isPending}
                            className="mt-3 rounded-lg bg-sky-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-sky-700 disabled:opacity-50"
                          >
                            {commentMutation.isPending ? "Submitting..." : "Post Comment"}
                          </button>
                        </form>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InAction;
