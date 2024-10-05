import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import book from "../../assets/book-icon.png";
import { signOut } from "../../redux/authSlice";
import type { AppDispatch } from "../../redux/store";
import { Button } from "../util/Button";

export const Header = () => {
  //const
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const path = location.pathname.split("/")[1];

  //function
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    dispatch(signOut());
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const handleNewPostClick = () => {
    navigate("/new");
  };

  const handleClickLogo = () => {
    navigate("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClickLogo();
    }
  };

  return (
    <>
      <header className="w-full pl-3 bg-gray-300 mb-5 flex">
        <div
          className="w-full h-12 flex justify-start items-center"
          onClick={handleClickLogo}
          onKeyDown={handleKeyDown}
        >
          <img src={book} alt="logo" className="h-8 w-8 mr-3" />
          <h1 className="italic text-3xl font-bold">Book Review App</h1>
        </div>
        <div className="w-full pr-3 flex items-center justify-end space-x-4">
          <Button
            style="w-28 bg-zinc-700 hover:bg-zinc-500 text-white font-bold py-2 px-4 h-9 rounded"
            btnText="Log in"
            handleClick={handleLoginClick}
            isHidden={
              location.pathname === "/login" ||
              location.pathname === "/home" ||
              location.pathname === "/profile" ||
              location.pathname === "/new" ||
              path === "detail"
            }
          />
          <Button
            style="w-28 bg-gray-400 hover:bg-gray-100 font-bold py-2 px-4 h-9 rounded"
            btnText="Sign Up"
            handleClick={handleSignUpClick}
            isHidden={
              location.pathname === "/signup" ||
              location.pathname === "/home" ||
              location.pathname === "/profile" ||
              location.pathname === "/new" ||
              path === "detail"
            }
          />
          <Button
            style="w-28 bg-zinc-900 hover:bg-zinc-700 text-white font-bold py-2 px-4 h-9 rounded"
            btnText="New Post"
            handleClick={handleNewPostClick}
            isHidden={
              location.pathname === "/signup" ||
              location.pathname === "/login" ||
              location.pathname === "/profile" ||
              location.pathname === "/new" ||
              path === "detail"
            }
          />
          <Button
            style="w-28 bg-zinc-700 hover:bg-zinc-500 text-white font-bold py-2 px-4 h-9 rounded"
            btnText="Profile"
            handleClick={handleProfileClick}
            isHidden={
              location.pathname === "/signup" ||
              location.pathname === "/login" ||
              location.pathname === "/profile"
            }
          />
          <Button
            style="w-28 bg-gray-400 hover:bg-gray-100 font-bold py-2 px-4 h-9 rounded"
            btnText="Logout"
            handleClick={handleLogoutClick}
            isHidden={
              location.pathname === "/signup" || location.pathname === "/login"
            }
          />
        </div>
      </header>
    </>
  );
};
