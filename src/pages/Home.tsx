import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Pagination } from "../components/home/Pagination";
import { ReviewList } from "../components/home/ReviewList";
import { axiosInstance } from "../interfaces/axiosinterface";
import type { IReview } from "../interfaces/reviewinterface";
import type { AppDispatch, RootState } from "../redux/store";
import { setUser } from "../redux/userId";

export const Home = () => {
  const [reviewItems, setReviewItems] = useState<IReview[]>();
  const [userId, setUserId] = useState<string>("");
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(
    (state: RootState) => state.pagination.currentPage,
  );

  useEffect(() => {
    getUserId();
  }, []);

  useEffect(() => {
    getReviewItems(currentPage);
  }, [currentPage]);

  const getReviewItems = (next: number) => {
    axiosInstance.get(`/public/books?offset=${next - 1}`).then((res) => {
      setReviewItems(res.data);
    });
  };

  const getUserId = async () => {
    await axiosInstance
      .get("/users", {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setUserId(res.data.name);
        dispatch(setUser(res.data.name));
      })
      .catch((err) => {
        alert(`データの取得に失敗しました。${err.message}`);
      });
  };

  const handleClickReview = (id: string) => {
    navigate(`/detail/${id}`);
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
              reviewer={review.reviewer}
              handleClickReview={handleClickReview}
              userId={userId}
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
