import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import type { FieldValues } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../interfaces/axiosinterface";

export const Profile = () => {
  const [name, setName] = useState<string>();
  const [icon, setIcon] = useState<string>();
  const [cookie] = useCookies();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    await axiosInstance
      .get("/users", {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        setName(res.data.name);
        setIcon(res.data.iconUrl);
      })
      .catch((err) => {
        alert(`Profileの取得に失敗しました。${err.message}`);
      });
  };

  const onClickSubmit = async (data: FieldValues) => {
    //ログイン情報
    const postData = {
      name: data.user,
    };

    await axiosInstance
      .put("/users", postData, {
        headers: { authorization: `Bearer ${cookie.token}` },
      })
      .then((res) => {
        navigate("/home");
      })
      .catch((err) => {
        alert(`プロフィール更新に失敗しました。${err.message}`);
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
            Profile
          </h2>
        </div>
        <div className="w-full">
          <h3 className="text-xl text-gray-900">icon</h3>
          <img src={icon} alt="" />
        </div>
        <form
          onSubmit={handleSubmit((data) => {
            onClickSubmit(data);
          })}
          className="w-full flex flex-col items-center space-y-4"
        >
          <label key="user" className="w-full text-xl h-20">
            name
            <input
              defaultValue={name}
              type="text"
              key="user"
              id="user"
              {...register("user", { required: "No change to YourName" })}
              className="w-full h-8 pl-2 rounded"
              placeholder={"Input Your name"}
            />
            {errors.user?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.user.message.toString()}
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
