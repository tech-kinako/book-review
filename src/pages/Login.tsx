import { useCookies } from "react-cookie";
import type { FieldValues } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "../components/util/Form";
import { axiosInstance } from "../interfaces/axiosinterface";
import { signIn } from "../redux/authSlice";
import type { AppDispatch } from "../redux/store";

export const Login = () => {
  const inputValues: string[] = ["email", "password"];
  const [, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

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
        dispatch(signIn());
        navigate("/home");
      })
      .catch((err) => {
        alert(`ログインに失敗しました。${err.message}`);
      });
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col items-center">
      <Form
        title={"Log In"}
        inputValues={inputValues}
        onClickSubmit={handleSubmit}
        isIcon={false}
      />
    </div>
  );
};
