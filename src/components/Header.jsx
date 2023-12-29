import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMatch = (route) => {
    return route === location.pathname && true;
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.infoimoveis.com.br/img/logo-info.png"
            alt="logo img"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          ></img>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatch("/") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatch("/offers") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMatch("/sign-in") && "text-black border-b-blue-500"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              SignIn
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
