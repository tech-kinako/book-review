// import axios from "axios";
import Compressor from "compressorjs";
import { useCookies } from "react-cookie";
import type { FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/util/Form";
import { axiosInstance } from "../interfaces/axiosinterface";
import { signIn } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

export const SignUp = () => {
  const inputValues: string[] = ["name", "email", "password"];
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (data: FieldValues) => {
    //ユーザー登録
    const postData = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    //アイコン画像
    const file = data.icon[0];
    const compressFile = await compressImage(file);

    await axiosInstance
      .post("/users", postData)
      .then((res) => {
        setCookie("token", res.data.token);

        const formData = new FormData();
        formData.append("icon", compressFile);
        axiosInstance
          .post("https://railway.bookreview.techtrain.dev/uploads", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${res.data.token}`,
            },
          })
          .then((res) => {
            dispatch(signIn());
            navigate("/home");
          });
      })
      .catch((err) => {
        alert(`サインアップに失敗しました。${err.message}`);
      });
  };

  const compressImage = (file: File): Promise<Blob> => {
    const maxSizeBites = 1000000;
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8, // 圧縮品質（0.0から1.0）
        convertSize: maxSizeBites,
        success(result: Blob) {
          resolve(result);
        },
        error(err) {
          reject(new Error(`Compression error: ${err.message}`));
        },
      });
    });
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col items-center">
      <Form
        title={"Sign Up"}
        inputValues={inputValues}
        onClickSubmit={handleSubmit}
        isIcon={true}
      />
    </div>
  );
};
