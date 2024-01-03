import React from "react";
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {
  return (
    <button className="flex w-full items-center justify-center bg-red-500 py-3 rounded text-white px-7 text-sm font-medium uppercase hover:bg-red-700 active:bg-red-900 hover:shadow-lg active:shadow-lg transition duration-150 ease-in-out">
      <FcGoogle className="text-2xl bg-white rounded-full mr-2" />
      Continue With Google
    </button>
  );
};

export default OAuth;
