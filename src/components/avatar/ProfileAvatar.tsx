<<<<<<< HEAD
import React, { useEffect, useMemo, useState } from "react";
import { getStorageImageUrl, PLACEHOLDER_IMAGE } from "../../utils/getStorageImageUrl";
=======
import React, { useMemo, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";
const PLACEHOLDER_IMAGE = "/placeholder.png";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f

interface ProfileAvatarProps {
  imagePath?: string | File | null;
  alt: string;
  size?: number;
}

<<<<<<< HEAD
=======
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

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imagePath,
  alt,
  size = 56,
}) => {
  const [hasError, setHasError] = useState(false);

<<<<<<< HEAD
  const imageUrl = useMemo(() => getStorageImageUrl(imagePath), [imagePath]);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  return (
    <img
      src={!imageUrl || hasError ? PLACEHOLDER_IMAGE : imageUrl}
=======
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
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className="rounded-full border object-cover shadow-sm"
<<<<<<< HEAD
      onError={() => {
        console.error("Avatar image failed", { imagePath, imageUrl });
        setHasError(true);
      }}
=======
      onError={() => setHasError(true)}
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
    />
  );
};

export default ProfileAvatar;