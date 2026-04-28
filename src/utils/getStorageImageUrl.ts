const SITE_BASE_URL =
  (import.meta.env.VITE_APP_BASE_URL as string | undefined)?.replace(/\/+$/, "") ||
  window.location.origin.replace(/\/+$/, "");

export const PLACEHOLDER_IMAGE = "/placeholder.png";

export const getStorageImageUrl = (
  imagePath?: string | File | null
): string | null => {
  if (!imagePath || typeof imagePath !== "string") {
    return null;
  }

  const raw = imagePath.trim();
  if (!raw) {
    return null;
  }

  if (/^https?:\/\//i.test(raw)) {
    return raw;
  }

  let normalizedPath = raw.replace(/^\/+/, "");
  normalizedPath = normalizedPath.replace(/^public\//i, "");
  normalizedPath = normalizedPath.replace(/^storage\//i, "");

  return `${SITE_BASE_URL}/storage/${normalizedPath}`;
};