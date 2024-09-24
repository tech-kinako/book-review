import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { ReviewList } from "../components/home/ReviewList";
import { axiosInstance } from "../interfaces/axiosinterface";
import type { IReview } from "../interfaces/reviewinterface";

export const Home = () => {
  const [reviewItems, setReviewItems] = useState<IReview[]>();

  useEffect(() => {
    getReviewItems();
  }, []);

  const getReviewItems = () => {
    axiosInstance.get("/public/books").then((res) => {
      setReviewItems(res.data);
    });
  };

  return (
    <div className="w-3/4 mx-auto">
      <h1 className="text-3xl font-bold mb-6">書籍レビュー一覧</h1>
      <div className="grid grid-cols-4 gap-4">
        {reviewItems?.map((review) => {
          return (
            <ReviewList
              key={review.id}
              id={review.id}
              title={review.title}
              review={review.review}
              reviewer={review.review}
            />
          );
        })}
      </div>
    </div>
  );
};
