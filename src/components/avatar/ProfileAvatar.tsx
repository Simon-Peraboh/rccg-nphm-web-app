import React, { useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const PLACEHOLDER_IMAGE = "/placeholder.png";

interface ProfileAvatarProps {
  imagePath?: string | File | null;
  alt: string;
  size?: number;
}

const normalizeImageUrl = (imagePath?: string | File | null): string | null => {
  if (!imagePath || typeof imagePath !== "string") {
    return null;
  }

  if (imagePath.startsWith("http")) {
    return imagePath;
  }

  let normalizedPath = imagePath.trim();
  normalizedPath = normalizedPath.replace(/^\/+/, "");
  normalizedPath = normalizedPath.replace(/^public\//, "");
  normalizedPath = normalizedPath.replace(/^storage\//, "");

  return `${API_BASE_URL}/storage/${normalizedPath}`;
};

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imagePath,
  alt,
  size = 56,
}) => {
  const [hasError, setHasError] = useState(false);

  const imageUrl = useMemo(() => normalizeImageUrl(imagePath), [imagePath]);

  if (!imageUrl || hasError) {
    return (
      <img
        src={PLACEHOLDER_IMAGE}
        alt={alt}
        width={size}
        height={size}
        className="rounded-full border object-cover shadow-sm"
      />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className="rounded-full border object-cover shadow-sm"
      onError={() => setHasError(true)}
    />
  );
};

export default ProfileAvatar;