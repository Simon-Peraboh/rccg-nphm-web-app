export const formatDisplayDate = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatDisplayDateTime = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

export const formatDisplayTime = (value?: string | null) => {
  if (!value) return "-";

  const date = new Date(`1970-01-01T${value}`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleTimeString("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  });
};