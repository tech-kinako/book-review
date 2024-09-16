import { useNavigate } from "react-router-dom";
import book from "../../assets/book-icon.png";
import { Button } from "../util/Button";

export const Header = () => {
  //const
  const navigate = useNavigate();

  //function
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/");
  };

  return (
    <>
      <header className="w-full pl-3 bg-gray-300 mb-5 flex">
        <div className="w-full h-12 flex justify-start items-center">
          <img src={book} alt="logo" className="h-8 w-8 mr-3" />
          <h1 className="italic text-3xl font-bold">Book Review App</h1>
        </div>
        <div className="w-full pr-3 flex items-center justify-end space-x-4">
          <Button
            style="w-28 bg-zinc-700 hover:bg-zinc-500 text-white font-bold py-2 px-4 h-9 rounded"
            btnText="Log in"
            handleClick={handleLoginClick}
          />
          <Button
            style="w-28 bg-gray-400 hover:bg-gray-100 font-bold py-2 px-4 h-9 rounded"
            btnText="Sign Up"
            handleClick={handleSignUpClick}
          />
        </div>
      </header>
    </>
  );
};
