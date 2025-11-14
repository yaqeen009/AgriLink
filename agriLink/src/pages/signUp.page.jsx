import React, { useState } from "react";
import farmer from "../assets/Farmer.png";
import logo from "../assets/Logo.png";
import { Input } from "../components/input";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../components/button";
import google from "../assets/google.svg";
import { signUpUser } from "../store/authSlice";

export const SignUp = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  //error handler
  const { error } = useSelector((state) => state.auth);

  //handle form data change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(
      signUpUser({
        username: form.username,
        email: form.email,
        password: form.password,
      })
    )
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {});
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  };
  //navigate to landing page
  const navToLanding = () => {
    navigate("/");
  };

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
      <div
        className={`w-full h-full bg-background p-6 flex flex-col space-y-4`}
      >
        <h1 className="font-montserrat text-headline1">Sign Up</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <Input
            placeholder={"Enter your username..."}
            name={"username"}
            value={form.username}
            type={"text"}
            onChange={handleChange}
          />
          <Input
            placeholder={"Enter your email..."}
            name={"email"}
            value={form.email}
            type={"email"}
            onChange={handleChange}
          />
          <Input
            placeholder={"Enter your password..."}
            name={"password"}
            value={form.password}
            type={"password"}
            onChange={handleChange}
          />
          <Input
            placeholder={"Confirm your password..."}
            name={"confirmPassword"}
            value={form.confirmPassword}
            type={"password"}
            onChange={handleChange}
          />
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
          <button
            onClick={() => navigate('/login')}
            className="font-bold cursor-pointer"
          >
            Sign in here
          </button>{" "}
        </p>
      </div>
    </div>
  );
};
