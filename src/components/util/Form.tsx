import type React from "react";
import { useForm } from "react-hook-form";
import type { IForm } from "../../interfaces/formInterface";

export const Form: React.FC<IForm> = ({
  title,
  inputValues,
  onClickSubmit,
  isIcon,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="h-3/6 w-3/6 flex flex-col items-center mt-6 space-y-6">
      <div className="w-full">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          {title}
        </h2>
      </div>
      <form
        onSubmit={handleSubmit((data) => {
          onClickSubmit(data);
        })}
        className="w-full flex flex-col items-center space-y-4"
      >
        {inputValues.map((val) => {
          return (
            <label key={val} className="w-full text-xl h-20">
              {val}
              <input
                type="text"
                key={val}
                id={val}
                {...register(val, { required: `Please Input Your ${val}` })}
                className="w-full h-8 pl-2 rounded"
                placeholder={`Input Your ${val}`}
              />
              {errors[val]?.message && (
                <span className="error-message text-sm text-red-500">
                  {errors[val].message.toString()}
                </span>
              )}
            </label>
          );
        })}
        {isIcon && (
          <label key="icon" className="w-full text-xl h-26">
            アイコンをアップロード
            <input
              type="file"
              key="icon"
              id="icon"
              {...register("icon", {
                required: "Please Upload Your Icon",
                validate: (files) => {
                  const file = files[0];
                  return (
                    (file &&
                      (file.type === "image/jpeg" ||
                        file.type === "image/png")) ||
                    "PNGまたはJPEG形式のファイルを選択してください"
                  );
                },
              })}
              className="w-full h-10 pl-2 rounded"
              placeholder={"Upload Your Icon"}
            />
            {errors.icon?.message && (
              <span className="error-message text-sm text-red-500">
                {errors.icon.message.toString()}
              </span>
            )}
          </label>
        )}
        <input
          type="submit"
          className="w-28 bg-indigo-400 text-center text-white hover:bg-indigo-600 font-bold py-2 px-4 h-9 rounded"
          value="Submit"
        />
      </form>
    </div>
  );
};
