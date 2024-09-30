import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Pagination } from "../components/home/Pagination";
import { ReviewList } from "../components/home/ReviewList";
import { axiosInstance } from "../interfaces/axiosinterface";
import type { IReview } from "../interfaces/reviewinterface";
import type { RootState } from "../redux/store";

export const Home = () => {
  const [reviewItems, setReviewItems] = useState<IReview[]>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );

  useEffect(() => {
    getReviewItems();
  }, [currentPage]);

  const getReviewItems = () => {
    axiosInstance.get(`/public/books?offset=${currentPage - 1}`).then((res) => {
      setReviewItems(res.data);
    });
  };

  return (
    <div className="w-4/5 mx-auto">
      <h1 className="text-3xl font-bold mb-6">書籍レビュー一覧</h1>
      <div className="grid grid-cols-5 gap-4">
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
      <div className="text-center mt-16">
        <Pagination />
      </div>
    </div>
  );
};
