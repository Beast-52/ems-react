import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/slices/authSlice";

const Login = () => {
  const { handleSubmit, register, reset } = useForm();
  const dispatch = useDispatch();
  const submit = (data) => {
    dispatch(loginUser(data));
    reset();
  };
  const err = useSelector((state) => state.auth.error);

  const [passwordType, setPasswordType] = useState(false);
  const togglePasswordType = () => setPasswordType(!passwordType);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit(submit)}
        className="flex flex-col items-center gap-y-3 border-2 border-emerald-500  justify-center px-16 py-20 rounded-xl"
      >
        <div>
          <h1 className="text-center text-zinc-100 mb-10 text-[1.8vmax] font-bold">
            Login
          </h1>
          {err && (
            <div className="text-red-500 text-xs mb-5 font-semibold text-center ">
              {err}
            </div>
          )}
          <input
            type="email"
            className="bg-zinc-800 text-2xl rounded-lg p placeholder:text-zinc-500 font-medium text-white outline-none py-2 px-5 pr-10"
            placeholder="Email"
            required
            {...register("email")}
          />
        </div>
        <div className="relative">
          <input
            type={passwordType ? "text" : "password"}
            className="bg-zinc-800 text-2xl rounded-lg p placeholder:text-zinc-500 font-medium text-white outline-none py-2 px-5 pr-10"
            placeholder="Password"
            required
            {...register("password")}
          />
          {passwordType ? (
            <FaEyeSlash
              onClick={togglePasswordType}
              color="white"
              size={20}
              className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 cursor-pointer"
            />
          ) : (
            <FaEye
              onClick={togglePasswordType}
              color="white"
              size={20}
              className="absolute right-0 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-80 hover:opacity-100 cursor-pointer"
            />
          )}
        </div>
        <div>
          <button className="bg-emerald-500 px-5 py-2 text-white rounded-lg text-xl font-semibold w-full hover:bg-emerald-400">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
