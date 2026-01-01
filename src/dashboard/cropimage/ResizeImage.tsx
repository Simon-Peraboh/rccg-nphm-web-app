// ImageUploader.tsx
import React from "react";
import { toast } from "react-toastify";

interface Props {
  label: string;
  name: string;
  onFileSelect: (file: File | null) => void;
  previewUrl: string | null;
}

const ImageUploader: React.FC<Props> = ({ label, name, onFileSelect, previewUrl }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      onFileSelect(null);
      return;
    }

    // Optional: limit file size (e.g., 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image too large. Max 2MB allowed.");
      return;
    }

    onFileSelect(file);
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
        aria-label={label}
        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-md shadow-sm 
                   focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />

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
