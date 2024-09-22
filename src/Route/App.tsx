import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "../components/util/Header";
import { Home } from "../pages/Home";
import { Login } from "../pages/LogIn";
import { SignUp } from "../pages/SignUp";
import "../css/app.css";

function App() {
  return (
    <div className="w-full h-full bg-gray-100 font-serif text-base text-gray-700">
      <Header />
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="home" element={<Home />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
