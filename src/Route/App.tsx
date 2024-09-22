import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/util/Header";
import { Login } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import "../css/app.css";

function App() {
  return (
    <div className="w-full h-screen bg-gray-100 font-serif text-base text-gray-700">
      <Header />
      <div className="w-3/4 mx-auto flex flex-col items-center">
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
