import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import app, { userRef } from "../firebase/Firebase";
import { signInWithPhoneNumber } from "firebase/auth";
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import bcrypt from "bcryptjs";
const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState();

  const auth = getAuth(app);

  const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          //   onSignInSubmit();
        },
      },
      auth
    );
  };

  let validate = async () => {
    try {
      setLoading(true);
      window.confirmationResult.confirm(otp).then((result) => {
        uploadData();
        swal({
          title: "successfully Registered",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        navigate("/login");
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  let uploadData = async () => {
    try {
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(form.password, salt);
      await addDoc(userRef, {
        name: form.name,
        password: hash,
        mobile: form.mobile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const requestotp = () => {
    setLoading(true);
    generateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        swal({
          title: "successfully Added",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let signupp = () => {};

  return (
    <div className="f my-auto flex justify-center flex-col items-center">
      <div className="t text-2xl">Signup</div>
      {otpSent ? (
        <div className="w-1/3">
          <div className="p-2 ">
            <div className="relative">
              <label for="mobile" className="leading-7 text-sm text-white">
                OTP
              </label>
              <input
                id="mobile"
                name="mobile"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div className="p-2 ">
            <button
              onClick={validate}
              className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {loading ? <TailSpin height={25} /> : "Validate"}
            </button>
          </div>
        </div>
      ) : (
        <>
          {" "}
          <div className="p-2 w-1/3">
            <div className="relative">
              <label for="mobile" className="leading-7 text-sm text-white">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              ></input>
            </div>
          </div>
          <div className="p-2 w-1/3">
            <div className="relative">
              <label for="mobile" className="leading-7 text-sm text-white">
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
              onClick={requestotp}
              className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              {loading ? <TailSpin height={25} /> : "Signup"}
            </button>
          </div>
          <p>
            Already have an account?
            <Link to={"/login"}>
              {" "}
              <span className="t text-blue-500">Login</span>
            </Link>
          </p>
        </>
      )}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default SignUp;
