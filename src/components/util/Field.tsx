import type React from "react";
import type { IField } from "../../interfaces/fieldInterface";

export const Field: React.FC<IField> = ({
  lblTitle,
  lblText,
  handleChange,
}) => {
  return (
    <label className="w-full text-xl">
      {lblTitle}
      <div>
        <input
          type="text"
          value={lblText}
          className="w-full h-8 rounded"
          onChange={handleChange}
        />
      </div>
    </label>
  );
};
