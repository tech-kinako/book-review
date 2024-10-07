import type React from "react";
import { useNavigate } from "react-router-dom";
import type { IReview } from "../../interfaces/reviewinterface";

export const ReviewList: React.FC<IReview> = ({
  id,
  title,
  review,
  reviewer,
  handleClickReview,
  userId,
}) => {
  const navigate = useNavigate();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClickReview(id);
    }
  };

  const handleEditClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  return (
    <div
      key={id}
      className="w-100 min-h-60 max-h-80 p-4 bg-stone-300 shadow-lg rounded-lg overflow-hidden"
      onKeyDown={(e) => handleKeyDown(e)}
      onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        handleClickReview(id);
      }}
    >
      <h2 className="text-xl font-semibold text-navy border-b-4">{title}</h2>
      <p className="text-xl text-navy mt-6 break-words overflow-wrap">
        レビュー：{review}
      </p>
      <p className="text-xl text-navy mt-2 break-words overflow-wrap">
        レビュワー：{reviewer}
      </p>
      <div>
        {userId === reviewer && (
          <div className="text-center mt-4 z-10">
            <button
              type="button"
              className="bg-white text-navy font-semibold py-2 px-4 border-solid border-2 rounded-lg"
              onClick={(e) => {
                handleEditClick(e);
              }}
            >
              編集する
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
