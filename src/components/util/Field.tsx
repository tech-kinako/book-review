import type React from "react";
import type { IField } from "../../interfaces/fieldInterface";

export const Field: React.FC<IField> = ({
  lblTitle,
  lblText,
  name,
  handleChange,
  errorMessage,
}) => {
  return (
    <label className="w-full text-xl h-20">
      {lblTitle}
      <div>
        <input
          type="text"
          value={lblText}
          name={name}
          className="w-full h-8 rounded"
          onChange={handleChange}
        />
        <span className="error-message text-sm text-red-500">
          {errorMessage}
        </span>
      </div>
    </label>
  );
};
