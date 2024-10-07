import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../interfaces/axiosinterface";

interface Idata {
  title: string;
  url: string;
  review: string;
  reviewer: string;
  detail: string;
}

export const ReviewDetail = () => {
  const [cookie] = useCookies();
  const { id } = useParams();
  const [data, setData] = useState<Idata>();
  const [isLoading, setIsLocading] = useState<boolean>(true);

  useEffect(() => {
    getReviewDetail();
    postLog();
  }, []);

  const getReviewDetail = async () => {
    await axiosInstance
      .get(`books/${id}`, {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        const tempData = {
          title: res.data.title,
          url: res.data.url,
          review: res.data.review,
          reviewer: res.data.reviewer,
          detail: res.data.detail,
        };
        setData(tempData);
        setIsLocading(false);
      })
      .catch((err) => {
        alert(`レビューデータの取得に失敗しました。${err.message}`);
      });
  };

  const postLog = async () => {
    await axiosInstance
      .post(
        "/logs",
        { selectBookId: id },
        { headers: { authorization: `Bearer ${cookie.token}` } },
      )
      .catch((err) => {
        alert(`ログの送信に失敗しました。${err.message}`);
      });
  };

  const LoadingModal = () => {
    if (!isLoading) return null;

    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg">
          <h2>Loading...</h2>
        </div>
      </div>
    );
  };

  return (
    <div className="w-3/4 mx-auto">
      <div className="h-3/6 w-3/6 flex flex-col items-center mt-6 space-y-6 mx-auto">
        <div className="w-full">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            書籍レビュー詳細
          </h2>
          <div className="w-100 min-h-60 p-4 bg-stone-300 shadow-lg rounded-lg ">
            <h2 className="text-xl font-semibold text-navy border-b-4">
              {data?.title}
            </h2>
            <p className="text-xl text-navy mt-6 break-words overflow-wrap">
              URL：{data?.url}
            </p>
            <p className="text-xl text-navy mt-2 break-words overflow-wrap">
              レビュワー：{data?.reviewer}
            </p>
            <p className="text-xl text-navy mt-2 break-words overflow-wrap">
              レビュー：{data?.review}
            </p>
            <p className="text-xl text-navy mt-2 break-words overflow-wrap">
              詳細：{data?.detail}
            </p>
          </div>
        </div>
      </div>
      {isLoading && LoadingModal()}
    </div>
  );
};
