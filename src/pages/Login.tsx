import { useNavigate } from "react-router-dom";
import type { FieldValues } from "react-hook-form";
import { Form } from "../components/util/Form";
import { axiosInstance } from "../interfaces/axiosinterface";
import { useCookies } from "react-cookie";

export const Login = () => {
  const inputValues: string[] = ["email", "password"];
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const handleSubmit = async (data: FieldValues) => {
    //ログイン情報
    const postData = {
      email: data.email,
      password: data.password,
    };

    await axiosInstance
      .post("/signin", postData)
      .then((res) => {
        setCookie("token", res.data.token);
        navigate("/home");
      })
      .catch((err) => {
        alert(`ログインに失敗しました。${err.message}`);
      });
  };

  return (
    <Form
      title={"Log In"}
      inputValues={inputValues}
      onClickSubmit={handleSubmit}
      isIcon={false}
    />
  );
};
