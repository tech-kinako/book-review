import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/util/Button";
import { Field } from "../components/util/Field";

interface errotMessages {
  userName: string;
  email: string;
  password: string;
}

export const Login = () => {
  //state
  const [userName, setUserName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessages, setErrorMessages] = useState<errotMessages>({
    userName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  //function
  const handleLoginClick = () => {
    //フォームバリデーションチェック
    const error = formValidation();
    error ? "" : navigate("/");
  };

  const formValidation = () => {
    //エラーメッセージ状態
    let error = false;
    //エラーメッセージリセット
    setErrorMessages({ userName: "", email: "", password: "" });

    //入力チェック
    if (userName === "") {
      setErrorMessages((prev) => ({
        ...prev,
        userName: "Please enter userName.",
      }));
      error = true;
    }
    if (email === "") {
      setErrorMessages((prev) => ({
        ...prev,
        email: "Please enter a valid email address.",
      }));
      error = true;
    }
    if (password === "") {
      setErrorMessages((prev) => ({
        ...prev,
        password: "Please enter your password.",
      }));
      error = true;
    }

    return error;
  };

  return (
    <div className="h-3/6 w-3/6 flex flex-col items-center mt-6 space-y-6">
      <div className="w-full">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Log In
        </h2>
      </div>
      <form className="w-full flex flex-col items-center space-y-4">
        <Field
          lblTitle="useName"
          lblText={userName}
          name="user"
          handleChange={(e) => setUserName(e.target.value)}
          errorMessage={errorMessages?.userName}
        />
        <Field
          lblTitle="email"
          lblText={email}
          name="email"
          handleChange={(e) => setEmail(e.target.value)}
          errorMessage={errorMessages?.email}
        />
        <Field
          lblTitle="Password"
          lblText={password}
          name="password"
          handleChange={(e) => setPassword(e.target.value)}
          errorMessage={errorMessages?.password}
        />
        <Button
          style="w-28 bg-indigo-400 text-white hover:bg-indigo-600 font-bold py-2 px-4 h-9 rounded"
          btnText="Submit"
          handleClick={handleLoginClick}
        />
      </form>
    </div>
  );
};
