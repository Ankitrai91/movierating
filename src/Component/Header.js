import React, { useContext } from "react";
import {
  Add,
  BarChart,
  Login,
  SearchRounded,
  ShoppingCartRounded,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import ReactStars from "react-stars";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
  const useAppState = useContext(Appstate);

  return (
    <>
      <div className="w sticky top-0 z-10 bg-black h-20 flex justify-between items-center text-3xl font-bold border-gray-300 text-red-600">
        <Link to={"/"}>
          {" "}
          <span>
            Movie<span className="text-yellow-50 ">Rating</span>
          </span>
        </Link>
        {useAppState.login ? (
          <Link to={"/addmovie"}>
            {" "}
            <Button>
              <h1 className="c cursor-pointer items-center text-white mr-3 text-lg">
                <Add className="m mr-1" color="secondary" /> Add New
              </h1>
            </Button>
          </Link>
        ) : (
         <Link to={'/login'}> <button>
            <h1 className="c cursor-pointer items-center text-white mr-3 text-lg">
              <Login /> Login
            </h1>
          </button></Link>
        )}
      </div>
    </>
  );
};

export default Header;
