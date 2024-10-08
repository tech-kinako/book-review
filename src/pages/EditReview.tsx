import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../interfaces/axiosinterface";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";

interface Idata {
  title: string;
  url: string;
  detail: string;
  review: string;
}

export const EditReview = () => {
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState<Idata>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: data?.title,
      url: data?.url,
      detail: data?.detail,
      review: data?.review,
    },
  });
  const user = useSelector(
    (state: RootState) => state.user.user,
  );

  useEffect(() => {
    getReviewDetail();
  }, [reset]);

  const getReviewDetail = async () => {
    await axiosInstance
      .get(`books/${id}`, {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        const tempData = {
          title: res.data.title,
          url: res.data.url,
          detail: res.data.detail,
          review: res.data.review,
        };
        user !== res.data.reviewer? navigate("/home") : "";
        setData(tempData);
        reset(tempData);
      })
      .catch((err) => {
        alert(`データの取得に失敗しました。${err.message}`);
      });
  };

  const onClickSubmit = async (data: FieldValues) => {
    const postData = {
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    };

    await axiosInstance
      .put(`/books/${id}`, postData, {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(`新しいレビュー投稿に失敗しました。${err.message}`);
      });
  };

  const handleClickDelete = async () => {
    await axiosInstance
      .delete(`/books/${id}`, {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(`新しいレビュー投稿に失敗しました。${err.message}`);
      });
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col items-center">
      <div className="h-3/6 w-3/6 flex flex-col items-center mt-6 space-y-6">
        <div className="w-full">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            編集内容
          </h2>
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            onClickSubmit(data);
          })}
          className="w-full flex flex-col items-center space-y-4"
        >
          <label key="title" className="w-full text-xl h-20">
            Title
            <input
              type="text"
              key="title"
              id="title"
              {...register("title", { required: "Pelase Input Book Title" })}
              className="w-full h-8 pl-2 rounded"
              placeholder={"Input Book Title"}
            />
            {errors.title?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.title.message.toString()}
              </span>
            )}
          </label>
          <label key="url" className="w-full text-xl h-20">
            URL
            <input
              type="text"
              key="url"
              id="url"
              {...register("url", { required: "Pelase Input URL" })}
              className="w-full h-8 pl-2 rounded"
              placeholder={"Input URL"}
            />
            {errors.url?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.url.message.toString()}
              </span>
            )}
          </label>
          <label key="review" className="w-full text-xl h-20">
            Review
            <input
              type="text"
              key="review"
              id="review"
              {...register("review", { required: "Pelase Input Review" })}
              className="w-full h-8 pl-2 rounded"
              placeholder={"Input Review"}
            />
            {errors.review?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.review.message.toString()}
              </span>
            )}
          </label>
          <label key="detail" className="w-full text-xl h-50">
            Detail
            <textarea
              key="detail"
              id="detail"
              {...register("detail", { required: "Pelase Input Detail" })}
              className="w-full h-32 pl-2 resize-none rounded"
              placeholder={"Input Detail"}
            />
            {errors.detail?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.detail.message.toString()}
              </span>
            )}
          </label>
          <div>
            <input
              type="submit"
              className="w-28 bg-indigo-400 text-center text-white hover:bg-indigo-600 font-bold mr-2 py-2 px-4 h-9 rounded"
              value="Submit"
            />
            <input
              type="button"
              onClick={handleClickDelete}
              className="w-28 bg-neutral-400 text-center text-white hover:bg-neutral-600 font-bold py-2 px-4 h-9 rounded"
              value="Delete"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
