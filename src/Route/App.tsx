import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Header } from "../components/util/Header";
import { EditReview } from "../pages/EditReview";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { NewReview } from "../pages/NewReview";
import { Profile } from "../pages/Profile";
import { ReviewDetail } from "../pages/ReviewDetail";
import { SignUp } from "../pages/SignUp";
import type { RootState } from "../redux/store";
import "../css/app.css";

function App() {
  const auth = useSelector((state: RootState) => state.auth.isSignIn);

  return (
    <div className="w-full min-h-screen bg-gray-100 font-serif text-base text-gray-700">
      <Header />
      <Routes>
        {!auth ? (
          <>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/home" />} />
        )}

        {auth ? (
          <>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="new" element={<NewReview />} />
            <Route path="detail/:id" element={<ReviewDetail />} />
            <Route path="edit/:id" element={<EditReview />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
}

export default App;
