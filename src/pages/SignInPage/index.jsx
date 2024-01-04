import signinImg from "../../img/signin.svg";
import { IoEye, IoEyeOff } from "react-icons/io5";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import OAuth from "../../components/OAuth";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../services/firebase";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = form;

  const changeShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const onChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">SignIn</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src={signinImg}
            alt="Sign Image"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form>
            <input
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mt-5"
              type="text"
              placeholder="Email"
              id="email"
              value={email}
              onChange={onChange}
            />
            <div className="relative">
              <input
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mt-5"
                type={!showPassword ? "password" : "text"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <IoEye
                  onClick={() => changeShowPassword()}
                  className="absolute right-3 top-8 text-xl cursor-pointer"
                />
              ) : (
                <IoEyeOff
                  onClick={() => changeShowPassword()}
                  className="absolute right-3 top-8 text-xl cursor-pointer"
                />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-8">
              <p>
                Don't have a account ?{" "}
                <Link
                  className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  to="/sign-up"
                >
                  Register
                </Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1"
                  to="/forgot-password"
                >
                  Forgot Password ?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 text-white px-7 py-3
             text-sm font-medium uppercase rounded
             shadow-md hover:bg-blue-700 
             transition duration-150 ease-in-out 
             hover:shadow-lg active:bg-blue-800"
              type="submit"
            >
              Sign In
            </button>
            <div className="my-4 items-center flex before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300  mb-4">
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
