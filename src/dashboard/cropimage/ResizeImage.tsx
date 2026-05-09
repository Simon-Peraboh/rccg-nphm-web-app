// ImageUploader.tsx
<<<<<<< HEAD
import React from "react";
=======
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
import { toast } from "react-toastify";

interface Props {
  label: string;
  name: string;
  onFileSelect: (file: File | null) => void;
  previewUrl: string | null;
}

<<<<<<< HEAD
const ImageUploader: React.FC<Props> = ({ label, name, onFileSelect, previewUrl }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
=======
const MAX_IMAGE_SIZE_BYTES = 2 * 1024 * 1024;

const toUploadFile = (compressedFile: Blob, originalFile: File): File => {
  return new File([compressedFile], originalFile.name, {
    type: compressedFile.type || originalFile.type,
    lastModified: Date.now(),
  });
};

const ImageUploader: React.FC<Props> = ({ label, name, onFileSelect, previewUrl }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
    const file = e.target.files?.[0] || null;

    if (!file) {
      onFileSelect(null);
      return;
    }

<<<<<<< HEAD
    // Optional: limit file size (e.g., 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large. Max 2MB allowed.");
      return;
    }

    onFileSelect(file);
=======
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file.");
      e.target.value = "";
      return;
    }

    setIsProcessing(true);

    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        initialQuality: 0.8,
      });
      const uploadFile = toUploadFile(compressedFile, file);

      if (uploadFile.size > MAX_IMAGE_SIZE_BYTES) {
        toast.error("Image is still larger than 2MB after compression. Please choose a smaller image.");
        onFileSelect(null);
        e.target.value = "";
        return;
      }

      onFileSelect(uploadFile);
    } catch {
      toast.error("Failed to process image. Please try another image.");
      onFileSelect(null);
      e.target.value = "";
    } finally {
      setIsProcessing(false);
    }
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
  };

  return (
    <div className="md:col-span-2">
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">
        {label}
      </label>

      <input
        id={name}
        type="file"
        accept="image/*"
        onChange={handleChange}
<<<<<<< HEAD
=======
        disabled={isProcessing}
>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
        aria-label={label}
        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />

<<<<<<< HEAD
=======
      {isProcessing && (
        <p className="mt-2 text-xs font-semibold text-blue-700">
          Preparing image for upload...
        </p>
      )}

>>>>>>> a588daea0a42daf01c94c33cdaa998540773516f
      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">Image Preview:</p>
          <img src={previewUrl} alt="Selected image preview" className="h-40 rounded shadow" />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
