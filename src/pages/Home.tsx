import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { axiosInstance } from "../interfaces/axiosinterface";

interface IReview {
  id: "string";
  title: "string";
  url: "string";
  detail: "string";
  review: "string";
  reviewer: "string";
}

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
      <div className="grid grid-cols-3 gap-4">
        {reviewItems?.map((review) => {
          return (
            <div
              key={review.id}
              className="w-100 h-60 p-4 bg-stone-300 shadow-lg rounded-lg "
            >
              <h2 className="text-xl font-semibold text-navy border-b-4">
                {review.title}
              </h2>
              <p className="text-xl text-navy mt-6 break-words overflow-wrap">
                レビュー：{review.review}
              </p>
              <p className="text-xl text-navy mt-2 break-words overflow-wrap">
                レビュワー：{review.reviewer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
