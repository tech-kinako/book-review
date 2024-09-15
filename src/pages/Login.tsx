import { useState } from "react";
import { Button } from "../components/util/Button";
import { Field } from "../components/util/Field";

export const Login = () => {
  //state
  const [userName, setUserName] = useState<string>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  //function
  const handleLoginClick = () => {
    //ここにログイン処理を書くところから。
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
          handleChange={(e) => setUserName(e.target.value)}
        />
        <Field
          lblTitle="email"
          lblText={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <Field
          lblTitle="Password"
          lblText={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style="w-28 bg-indigo-400 text-white hover:bg-indigo-600 font-bold py-2 px-4 h-9 rounded"
          btnText="Log in"
          handleClick={handleLoginClick}
        />
      </form>
    </div>
  );
};
