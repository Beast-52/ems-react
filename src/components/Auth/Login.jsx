import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("Check Console");
  setTimeout(() => {
    setMessage(null);
  }, 3000);
  const submit = (data) => {
    dispatch(loginUser(data));
    if (data.email.includes("admin")) {
      navigate("/admin/");
    } else if (data.email.includes("@e.com")) {
      const userId = parseInt(data.email.split("@")[0].slice(1));
      navigate(`/employee/${userId}`);
    } else {
      return;
    }
    reset();
  };

  const err = useSelector((state) => state.auth.error);

  const [passwordType, setPasswordType] = useState(false);
  const togglePasswordType = () => setPasswordType(!passwordType);

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gradient-to-r from-zinc-900 to-black">
      <form
        onSubmit={handleSubmit(submit)}
        className="w-full max-w-md bg-zinc-900 p-10 rounded-lg shadow-xl border-2 border-transparent hover:border-emerald-500 transition-all duration-300"
      >
        <h1 className="text-center text-5xl  font-bold text-white mb-8">
          Login
        </h1>

        {err && (
          <div className="text-red-500 text-sm mb-5 font-semibold text-center">
            {err}
          </div>
        )}
        {message && (
          <div className="text-red-500 text-sm mb-5 font-semibold text-center">
            {message} !
          </div>
        )}
        <div className="mb-6">
          <input
            type="email"
            className="w-full bg-gray-800 text-lg text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Email"
            required
            {...register("email")}
          />
        </div>

        <div className="relative mb-6">
          <input
            type={passwordType ? "text" : "password"}
            className="w-full bg-gray-800 text-lg text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            placeholder="Password"
            required
            {...register("password")}
          />
          {passwordType ? (
            <FaEyeSlash
              onClick={togglePasswordType}
              color="white"
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={togglePasswordType}
              color="white"
              size={20}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
            />
          )}
        </div>

        <div className="mb-6">
          <button className="w-full bg-emerald-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-emerald-600 transition duration-300">
            Login
          </button>
        </div>

        <div className="flex justify-between items-center">
          <Link
            to="/forgot-password"
            className="text-sm text-emerald-500 hover:underline"
          >
            Forgot Password?
          </Link>
          <Link
            to="/register"
            className="text-sm text-emerald-500 hover:underline"
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
