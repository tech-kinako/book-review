import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/util/Header";
import { axiosInstance } from "../interfaces/axiosinterface";
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
  const [cookie] = useCookies();
  const navigate = useNavigate();

  const ProtectedEditRoute = () => {
    const myUser = useSelector((state: RootState) => state.user.user);
    const { id: editId } = useParams();
    const [isEdit, setIsEdit] = useState<boolean>();

    useEffect(() => {
      getEditUser();
    }, []);

    const getEditUser = async () => {
      await axiosInstance
        .get(`books/${editId}`, {
          headers: { authorization: `Bearer ${cookie.token}` },
        })
        .then((res) => {
          myUser === res.data.reviewer ? setIsEdit(true) : setIsEdit(false);
        })
        .catch(() => {
          navigate("/home");
        });
    };

    if (isEdit === undefined) {
      return <div>Loading...</div>;
    }

    return isEdit ? <EditReview /> : <Navigate to="/home" />;
  };

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
            <Route path="edit/:id" element={<ProtectedEditRoute />} />
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
