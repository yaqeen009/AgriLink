import React from "react";
import logo from "../assets/Logo.png";
import RoundedBtn from "../components/roundedbtn";
import boots from "../assets/boots.png";
import book from "../assets/Book.svg";
import community from "../assets/Community.svg";
import trend from "../assets/Trend.svg";
import question from "../assets/Question.svg";
import { FeatureCard } from "../components/featureCard";
import { Button } from "../components/button";
import { Input } from "../components/input";
import { handleScroll } from "../utils/scroll.fn";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  const navToLogin = () => {
    navigate("/login");
  };

  const navToSignUp = () => {
    navigate("/signup");
  };
  return (
    <div className="px-9 pt-6">
      <nav className="bg-primary p-2 w-full rounded-full flex justify-between">
        <img src={logo} alt="" />
        <div className="flex space-x-2">
          <RoundedBtn
            name={"Landing"}
            fn={() => handleScroll("hero")}
            colors={true}
          />
          <RoundedBtn
            name={"About"}
            fn={() => handleScroll("about")}
            colors={true}
          />
          <RoundedBtn
            name={"Contact"}
            fn={() => handleScroll("contact")}
            colors={true}
          />
        </div>
        <div className="flex space-x-2">
          <RoundedBtn
            name={"Login"}
            fn={navToLogin}
            colors={false}
            altColor={`bg-accent text-background hover:bg-transparent border`}
          />
          <RoundedBtn
            name={"Sign Up"}
            fn={navToSignUp}
            colors={false}
            altColor={`hover:bg-secondary text-background bg-transparent border`}
          />
        </div>
      </nav>

      {/* Hero Section  */}
      <section id="hero" className="pt-6">
        <div className="bg-primary text-background p-10 rounded-2xl flex justify-between">
          <span className="flex flex-col space-y-6">
            <h1 className="text-display font-montserrat">
              Empowering Farmers with <br />
              Knowledge, Data, and <br />
              Community.
            </h1>
            <p className="text-body font-open_sans font-light">
              Access real-time market prices, weather alerts, expert farming
              tips, and local <br /> community insights, all in one platform
              designed for smarter, sustainable <br /> agriculture.
            </p>
            <RoundedBtn
              name={"Get Started"}
              fn
              colors={false}
              altColor={`hover:bg-accent text-background bg-transparent border`}
            />
          </span>
          <img src={boots} alt="" />
        </div>

        <div className="grid grid-cols-4 space-x-4 mt-9">
          <FeatureCard
            title={"Browse Resources"}
            info={"Access thousands of agricultural guides"}
            icon={book}
          />
          <FeatureCard
            title={"Browse Resources"}
            info={"Connect with farmers and experts"}
            icon={community}
          />
          <FeatureCard
            title={"Market Trends"}
            info={"Stay updated with the latest market prices"}
            icon={trend}
          />
          <FeatureCard
            title={"Ask Questions"}
            info={`Get answers from agricultural experts`}
            icon={question}
          />
        </div>
      </section>

      {/* About */}
      <section id="about" className="pt-12 text-primary">
        <h1 className="font-montserrat text-headline1 font-semibold mb-4">
          What is AgriLink?
        </h1>
        <p className="font-open_sans text-body font-light">
          AgriLink connects farmers, experts, and data resources in one
          platform. From real-time market trends to verified local insights, we
          help build a smarter, more sustainable agricultural ecosystem.
        </p>
      </section>

      {/* Contact */}
      <section id="contact" className="pt-12 text-primary">
        <h1 className="font-montserrat text-headline1 font-semibold mb-4">
          Get in Touch
        </h1>
        <p className="font-open_sans text-body font-light">
          Have questions or feedback? We’d love to hear from you.
        </p>

        <form action="" className="grid grid-cols-2 space-x-2">
          <div className="flex flex-col space-y-2">
            <Input placeholder={"Enter your name here..."} />
            <Input placeholder={"Enter your email here..."} />
            <Button name={"Submit Message"} />
          </div>
          <textarea
            name=""
            id=""
            className="p-5 border border-primary rounded-xl"
            placeholder="Enter your message..."
          />
        </form>
      </section>

      <footer></footer>
    </div>
  );
};
