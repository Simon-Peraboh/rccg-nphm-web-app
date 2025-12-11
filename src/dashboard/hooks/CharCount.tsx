import React from "react";

interface Props {
  remaining: number;
  max: number;
}

const CharCount: React.FC<Props> = ({ remaining, max }) => {
  return (
    <div className={`text-sm mt-1 ${remaining < 20 ? "text-red-500" : "text-gray-600"}`}>
      {remaining} / {max} characters left
    </div>
  );
};

export default CharCount;
