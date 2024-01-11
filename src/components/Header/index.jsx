import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [pageState, setPageSate] = useState("Sign-in");
  const auth = getAuth();

  const location = useLocation();
  const navigate = useNavigate();

  function pathMatch(route) {
    return route === location.pathname;
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user ? setPageSate("Profile") : setPageSate("Sign-in");
    });
  }, [auth]);

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
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
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] transition ease-linear duration-500 ${
                pathMatch("/")
                  ? "text-black border-b-blue-500"
                  : "border-b-transparent"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] transition ease-linear duration-500 ${
                pathMatch("/offers")
                  ? "text-black border-b-blue-500"
                  : "border-b-transparent"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] transition ease-linear duration-500 ${
                pathMatch("/sign-in") || pathMatch("/profile")
                  ? "text-black border-b-blue-500"
                  : "border-b-transparent"
              }`}
              onClick={() => navigate("/profile")}
            >
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
