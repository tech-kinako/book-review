import type React from "react";
import type { IReview } from "../../interfaces/reviewinterface";

export const ReviewList: React.FC<IReview> = ({
  id,
  title,
  review,
  reviewer,
}) => {
  return (
    <div
      key={id}
      className="w-100 min-h-60 max-h-80 p-4 bg-stone-300 shadow-lg rounded-lg overflow-hidden"
    >
      <h2 className="text-xl font-semibold text-navy border-b-4">{title}</h2>
      <p className="text-xl text-navy mt-6 break-words overflow-wrap">
        レビュー：{review}
      </p>
      <p className="text-xl text-navy mt-2 break-words overflow-wrap">
        レビュワー：{reviewer}
      </p>
    </div>
  );
};
