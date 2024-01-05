import React from "react";
import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

const Page404 = () => {
  return (
    <div className="flex items-center justify-center flex-col h-screen w-full">
      <div className="flex items-center justify-center">
        <h1>Page not Found</h1>
        <TbError404 className="text-5xl m-3" />
      </div>
      <Link className="text-blue-500 font-medium" to="/">
        Back to Home Page
      </Link>
    </div>
  );
};

export default Page404;
