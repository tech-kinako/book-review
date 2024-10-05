import { useCookies } from "react-cookie";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../interfaces/axiosinterface";

export const NewReview = () => {
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onClickSubmit = async (data: FieldValues) => {
    //ログイン情報
    const postData = {
      title: data.title,
      url: data.url,
      detail: data.detail,
      review: data.review,
    };

    await axiosInstance
      .post("/books", postData, {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(`新しいレビュー投稿に失敗しました。${err.message}`);
      });
  };

  const handleClickPrev = () => {
    navigate("/home");
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col items-center">
      <div className="h-3/6 w-3/6 flex flex-col items-center mt-6 space-y-6">
        <div className="w-full">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            新規投稿
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
          <label key="title" className="w-full text-xl h-20">
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
          <label key="detail" className="w-full text-xl h-20">
            Detail
            <input
              type="text"
              key="detail"
              id="detail"
              {...register("detail", { required: "Pelase Input Detail" })}
              className="w-full h-8 pl-2 rounded"
              placeholder={"Input Detail"}
            />
            {errors.detail?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.detail.message.toString()}
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
          <div>
            <input
              type="submit"
              className="w-28 bg-indigo-400 text-center text-white hover:bg-indigo-600 font-bold mr-2 py-2 px-4 h-9 rounded"
              value="Submit"
            />
            <input
              type="button"
              onClick={handleClickPrev}
              className="w-28 bg-neutral-400 text-center text-white hover:bg-neutral-600 font-bold py-2 px-4 h-9 rounded"
              value="Back"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
