import { PasswordRounded } from "@mui/icons-material";
import { getDocs, query, where } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { userRef } from "../firebase/Firebase";
import bcrypt from "bcryptjs";
import { Appstate } from "../App";

const Login = () => {
  const [form, setForm] = useState({
    number: 6451,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const useAppState = useContext(Appstate)

  let loginn = async () => {
    setLoading(true);
    try {
      let quer = query(userRef, where("mobile", "==", form.mobile));
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc) => {
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password); // true
        if (isUser) {
            useAppState.setLogin(true)
            useAppState.setUserName(_data.name)
            swal({
                title: "successfully Login",
                icon: "success",
                buttons: false,
                timer: 3000,
            });
            navigate('/')
        } else {
          swal({
            title: "wrong credential",
            icon: "error",
            buttons: false,
            timer: 3000,
          });
        }
      });
    } catch (error) {
      swal({
        title: "wrong credential",
        icon: "error",
        buttons: false,
        timer: 3000,
      });
    }
  };

  return (
    <div className="f my-auto flex justify-center flex-col items-center">
      <div className="t text-2xl">Login</div>
      <div className="p-2 w-1/3">
        <div className="relative">
          <label for="image" className="leading-7 text-sm text-white">
            Mobile
          </label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            value={form.mobile}
            onChange={(e) => setForm({ ...form, mobile: e.target.value })}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>
      <div className="p-2  w-1/3">
        <div className="relative">
          <label for="image" className="leading-7 text-sm text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
      </div>
      <div className="p-2 ">
        <button
          onClick={loginn}
          className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          {loading ? <TailSpin height={25} /> : "Login"}
        </button>
      </div>
      <p>
        do not have account?
        <Link to={"/signup"}>
          {" "}
          <span className="t text-blue-500">Signup</span>
        </Link>
      </p>
    </div>
  );
};

export default Login;
