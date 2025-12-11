import { useState } from "react";

export const useCharLimit = (maxLength: number) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const text = e.target.value;

    if (text.length <= maxLength) {
      setValue(text);
    }
  };

  const remaining = maxLength - value.length;

  return {
    value,
    handleChange,
    remaining,
    maxLength,
    isLimitReached: remaining === 0
  };
};
