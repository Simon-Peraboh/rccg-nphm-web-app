import { dashboardApi } from "../lib/axios";
import type {
  InActionPostDTO,
  InActionPostFormValues,
  InActionPostResponse,
} from "../types/inActionPosts";

const BASE_PATH = "/inActionPosts";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

type RawImageItem =
  | string
  | {
      url?: string | null;
      image_url?: string | null;
      path?: string | null;
    };

type RawInActionPost = Partial<InActionPostDTO> & {
  activity_date?: string | null;
  date?: string | null;
  image_one?: string | null;
  image_two?: string | null;
  first_image?: string | null;
  second_image?: string | null;
  comments_count?: number | string | null;
  likes_count?: number | string | null;
  is_published?: boolean | number | string | null;
  images?: RawImageItem[] | null;
};

type RawListResponse = RawInActionPost[] | { data?: RawInActionPost[] };

const toNumber = (value?: number | string | null) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
  }
  return 0;
};

const normalizeFileUrl = (value?: string | null) => {
  if (!value) return "";
  if (value.startsWith("http://") || value.startsWith("https://")) return value;

  const path = value
    .trim()
    .replace(/^\/+/, "")
    .replace(/^public\//, "")
    .replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${path}`;
};

const imageUrlFromList = (images: RawImageItem[] | null | undefined, index: number) => {
  const item = images?.[index];

  if (!item) return "";
  if (typeof item === "string") return normalizeFileUrl(item);

  return normalizeFileUrl(item.url ?? item.image_url ?? item.path ?? "");
};

const normalizePost = (post: RawInActionPost): InActionPostDTO => ({
  id: String(post.id ?? ""),
  title: String(post.title ?? ""),
  details: String(post.details ?? ""),
  activityDate: post.activityDate ?? post.activity_date ?? post.date ?? "",
  location: post.location ?? "",
  region: post.region ?? "",
  province: post.province ?? "",
  imageOne: post.imageOne ?? post.image_one ?? "",
  imageTwo: post.imageTwo ?? post.image_two ?? "",
  imageOneUrl:
    post.imageOneUrl ||
    post.first_image ||
    imageUrlFromList(post.images, 0) ||
    normalizeFileUrl(post.image_one ?? ""),
  imageTwoUrl:
    post.imageTwoUrl ||
    post.second_image ||
    imageUrlFromList(post.images, 1) ||
    normalizeFileUrl(post.image_two ?? ""),
  commentCount: toNumber(post.commentCount ?? post.comments_count),
  likeCount: toNumber(post.likeCount ?? post.likes_count),
  isPublished:
    typeof post.isPublished === "boolean"
      ? post.isPublished
      : typeof post.is_published === "boolean"
      ? post.is_published
      : post.is_published === undefined
      ? true
      : Boolean(Number(post.is_published)),
  comments: post.comments ?? [],
});

const buildFormData = (payload: InActionPostFormValues) => {
  const formData = new FormData();

  formData.append("title", payload.title);
  formData.append("details", payload.details);
  formData.append("activity_date", payload.activityDate);
  formData.append("location", payload.location);
  formData.append("region", payload.region);
  formData.append("province", payload.province);
  formData.append("is_published", payload.isPublished ? "1" : "0");

  if (payload.imageOne instanceof Blob) {
    formData.append(
      "image_one",
      payload.imageOne,
      payload.imageOne instanceof File ? payload.imageOne.name : "in-action-image-one.jpg"
    );
  }

  if (payload.imageTwo instanceof Blob) {
    formData.append(
      "image_two",
      payload.imageTwo,
      payload.imageTwo instanceof File ? payload.imageTwo.name : "in-action-image-two.jpg"
    );
  }

  return formData;
};

export const getAllInActionPostsAPICall = async (): Promise<InActionPostDTO[]> => {
  const response = await dashboardApi.get<RawListResponse>(`${BASE_PATH}/getAll`);
  const payload = response.data;
  const rawList = Array.isArray(payload) ? payload : payload.data ?? [];

  return rawList.map(normalizePost);
};

export const createInActionPostAPICall = async (
  payload: InActionPostFormValues
): Promise<InActionPostResponse> => {
  const response = await dashboardApi.post<InActionPostResponse>(
    `${BASE_PATH}/create`,
    buildFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const deleteInActionPostAPICall = async (
  id: string
): Promise<{ message: string }> => {
  const response = await dashboardApi.delete<{ message: string }>(`${BASE_PATH}/delete/${id}`);
  return response.data;
};

export const toggleInActionPostPublishAPICall = async (
  id: string,
  isPublished: boolean
): Promise<InActionPostResponse> => {
  const response = await dashboardApi.patch<InActionPostResponse>(
    `${BASE_PATH}/toggle-publish/${id}`,
    { is_published: !isPublished }
  );

  return response.data;
};
