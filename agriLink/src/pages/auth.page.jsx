import React, { useEffect, useState } from "react";
import farmer from "../assets/Farmer.png";
import logo from "../assets/Logo.png";
import { Input } from "../components/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import google from "../assets/google.svg";

export const Auth = () => {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate()

  const navToLanding = () => {
    navigate("/");
  };

  useEffect(() => {
    if (location.state?.mode === "signUp") {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  }, [location.state]);

  return (
    <div className="flex bg-background w-screen h-screen text-primary">
      <div className="w-full h-full">
        <img
          src={logo}
          alt=""
          onClick={navToLanding}
          className="absolute top-9 left-9 z-20 shadow rounded-full cursor-pointer"
        />
        <img src={farmer} alt="" className="top-0 left-0 relative z-0" />
      </div>
      {/* sign in */}
      {!isSignUp ? (
        <div
          className={`w-full h-full bg-background p-6  flex-col space-y-4 ${
            isSignUp ? "hidden" : "flex"
          }`}
        >
          <h1 className="font-montserrat text-headline1">Sign In</h1>
          <form action="" className="flex flex-col space-y-4">
            <Input placeholder={"Enter your email..."} />
            <Input placeholder={"Enter your password..."} />
            <Link className="font-bold">Forgot password?</Link>
            <Button name={"Sign in"} />
            <p className="text-center text-headline2 font-semibold py-4">Or</p>
            <button
              onClick={""}
              className="flex items-center justify-center text-center p-5 rounded-xl text-primary border-2 text-body font-open_sans font-bold focus:outline-none focus:ring-4 focus:ring-primary hover:bg-accent"
            >
              <p>Continue with Google</p>
              <img src={google} alt="" />
            </button>
          </form>
          <p className="text-body font-open_sans font-light text-center">
            Don't have an account?{" "}
            <button onClick={() => setIsSignUp(true)} className="font-bold cursor-pointer">Sign up here</button>{" "}
          </p>
        </div>
      ) : (
        //sign up
        <div
          className={`w-full h-full bg-background p-6 ${
            isSignUp ? "flex" : "hidden"
          } flex-col space-y-4`}
        >
          <h1 className="font-montserrat text-headline1">Sign Up</h1>
          <form action="" className="flex flex-col space-y-4">
            <Input placeholder={"Enter your username..."} />
            <Input placeholder={"Enter your email..."} />
            <Input placeholder={"Enter your password..."} />
            <Input placeholder={"Confirm your password..."} />
            <Link className="font-bold">Forgot password?</Link>
            <Button name={"Sign up"} />
            <p className="text-center text-headline2 font-semibold py-4">Or</p>
            <button
              onClick={""}
              className="flex items-center justify-center text-center p-5 rounded-xl text-primary border-2 text-body font-open_sans font-bold focus:outline-none focus:ring-4 focus:ring-primary hover:bg-accent"
            >
              <p>Continue with Google</p>
              <img src={google} alt="" />
            </button>
          </form>
          <p className="text-body font-open_sans font-light text-center">
            Already have an account?{" "}
            <button onClick={() => setIsSignUp(false)} className="font-bold cursor-pointer">Sign in here</button>{" "}
          </p>
        </div>
      )}
    </div>
  );
};
