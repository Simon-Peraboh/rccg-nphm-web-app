import axios from "axios";
import { dashboardApi } from "../../dashboard/lib/axios";
import { getPublicMinistryActivitiesAPICall } from "../../dashboard/services/ministryActivitiesService";
import type { PublicMinistryActivity } from "../../dashboard/types/ministryActivities";

export type InActionComment = {
  id: string | number;
  name: string;
  email?: string | null;
  region?: string | null;
  province?: string | null;
  comment: string;
  avatarUrl?: string | null;
  createdAt?: string | null;
};

export type InActionPost = {
  id: string | number;
  title: string;
  details: string;
  date?: string | null;
  location?: string | null;
  region?: string | null;
  province?: string | null;
  images: string[];
  comments: InActionComment[];
  commentCount: number;
  likeCount: number;
};

export type InActionCommentForm = {
  name: string;
  email: string;
  region: string;
  province: string;
  comment: string;
};

type RawImageItem =
  | string
  | {
      url?: string | null;
      image_url?: string | null;
      path?: string | null;
    };

type RawInActionComment = {
  id?: string | number;
  name?: string | null;
  email?: string | null;
  region?: string | null;
  province?: string | null;
  comment?: string | null;
  body?: string | null;
  avatarUrl?: string | null;
  avatar_url?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  image_path?: string | null;
  created_at?: string | null;
  createdAt?: string | null;
};

type RawInActionPost = {
  id?: string | number;
  title?: string | null;
  details?: string | null;
  body?: string | null;
  caption?: string | null;
  date?: string | null;
  activityDate?: string | null;
  activity_date?: string | null;
  location?: string | null;
  region?: string | null;
  province?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  first_image?: string | null;
  second_image?: string | null;
  image_one?: string | null;
  image_two?: string | null;
  images?: RawImageItem[] | null;
  comments?: RawInActionComment[] | null;
  comments_count?: number | string | null;
  likes_count?: number | string | null;
};

type RawInActionListResponse = RawInActionPost[] | { data?: RawInActionPost[] };

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const PUBLIC_POSTS_PATH = "/public/in-action-posts";

export const normalizeMediaUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const path = value
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${path}`;
};

const toNumber = (value?: number | string | null) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const normalizeImageItem = (item: RawImageItem) => {
  if (typeof item === "string") return normalizeMediaUrl(item);
  return normalizeMediaUrl(item.url ?? item.image_url ?? item.path ?? "");
};

const normalizeComment = (comment: RawInActionComment, index: number): InActionComment => ({
  id: comment.id ?? `comment-${index}`,
  name: comment.name ?? "Anonymous",
  email: comment.email ?? null,
  region: comment.region ?? null,
  province: comment.province ?? null,
  comment: comment.comment ?? comment.body ?? "",
  avatarUrl: normalizeMediaUrl(
    comment.avatarUrl ??
      comment.avatar_url ??
      comment.imageUrl ??
      comment.image_url ??
      comment.image_path ??
      comment.image ??
      ""
  ) || null,
  createdAt: comment.createdAt ?? comment.created_at ?? null,
});

const normalizePost = (post: RawInActionPost, index: number): InActionPost => {
  const imageCandidates = [
    ...(post.images ?? []).map(normalizeImageItem),
    normalizeMediaUrl(post.imageUrl ?? post.image_url ?? post.image ?? ""),
    normalizeMediaUrl(post.first_image ?? post.image_one ?? ""),
    normalizeMediaUrl(post.second_image ?? post.image_two ?? ""),
  ].filter(Boolean);

  const uniqueImages = Array.from(new Set(imageCandidates)).slice(0, 2);
  const comments = (post.comments ?? []).map(normalizeComment);

  return {
    id: post.id ?? `post-${index}`,
    title: post.title ?? "Untitled Activity Report",
    details: post.details ?? post.body ?? post.caption ?? "",
    date: post.date ?? post.activityDate ?? post.activity_date ?? null,
    location: post.location ?? null,
    region: post.region ?? null,
    province: post.province ?? null,
    images: uniqueImages,
    comments,
    commentCount: toNumber(post.comments_count) || comments.length,
    likeCount: toNumber(post.likes_count),
  };
};

const mapMinistryActivity = (activity: PublicMinistryActivity): InActionPost => ({
  id: activity.id,
  title: activity.title,
  details: activity.caption ?? "",
  date: activity.activityDate ?? null,
  location: activity.location ?? null,
  region: null,
  province: null,
  images: [activity.imageUrl ?? normalizeMediaUrl(String(activity.image ?? ""))].filter(Boolean),
  comments: [],
  commentCount: 0,
  likeCount: 0,
});

export const getPublicInActionPostsAPICall = async (): Promise<InActionPost[]> => {
  try {
    const response = await dashboardApi.get<RawInActionListResponse>(PUBLIC_POSTS_PATH);
    const payload = response.data;
    const rawList = Array.isArray(payload) ? payload : payload.data ?? [];

    return rawList.map(normalizePost);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      const legacyActivities = await getPublicMinistryActivitiesAPICall();
      return legacyActivities.map(mapMinistryActivity);
    }

    throw error;
  }
};

export const createInActionCommentAPICall = async ({
  postId,
  payload,
}: {
  postId: string | number;
  payload: InActionCommentForm;
}) => {
  const response = await dashboardApi.post(`${PUBLIC_POSTS_PATH}/${postId}/comments`, payload);
  return response.data;
};

export const likeInActionPostAPICall = async (postId: string | number) => {
  const response = await dashboardApi.post(`${PUBLIC_POSTS_PATH}/${postId}/like`);
  return response.data;
};
