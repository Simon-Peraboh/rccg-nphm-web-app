import React, { useEffect, useMemo, useState } from "react";
import { getStorageImageUrl, PLACEHOLDER_IMAGE } from "../../utils/getStorageImageUrl";

interface ProfileAvatarProps {
  imagePath?: string | File | null;
  alt: string;
  size?: number;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  imagePath,
  alt,
  size = 56,
}) => {
  const [hasError, setHasError] = useState(false);

  const imageUrl = useMemo(() => getStorageImageUrl(imagePath), [imagePath]);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  return (
    <img
      src={!imageUrl || hasError ? PLACEHOLDER_IMAGE : imageUrl}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      className="rounded-full border object-cover shadow-sm"
      onError={() => {
        console.error("Avatar image failed", { imagePath, imageUrl });
        setHasError(true);
      }}
    />
  );
};

export default ProfileAvatar;