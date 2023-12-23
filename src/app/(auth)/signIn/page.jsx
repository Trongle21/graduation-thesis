"use client";

import React, { useState } from "react";
import SignInForm from "@/app/_components/SignInForm";
import useAppContext from "@/app/_hooks/useAppContext";
import Link from "next/link";
import { registerUser } from "@/redux/features/apiRequest";
import { useDispatch } from "react-redux";

const SignIn = () => {
  const { onShowSignIn } = useAppContext();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: userName,
      email: email,
      password: password,
    };
    registerUser(newUser, dispatch);
  };

  return (
    <>
      <section className="section--signUp">
        <div className="container">
          <div className="section--signUp__wrapper row">
            <div className="signUp--form l-6 m-6 c-12">
              <div className="signUp--form__wrapper">
                <div className="header--logo">
                  <Link href="/">
                    <img src="https://i.ibb.co/5251mQc/logo.png" alt="" />
                  </Link>
                </div>
                <h2>Get Started</h2>
                <h3>Create your account now</h3>

                <form className="form-wrapper" onSubmit={handleSubmit}>
                  <div className="sign--up__form">
                    <div className="main--account__form-group">
                      <label className="form-label">Name</label>
                      <input
                        value={userName}
                        placeholder="Nhập name của bạn"
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <span className="form-message"></span>
                    </div>
                  </div>
                  <div className="sign--up__form">
                    <div className="main--account__form-group">
                      <label className="form-label">Email</label>
                      <input
                        value={email}
                        placeholder="Nhập email của bạn"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <span className="form-message"></span>
                    </div>
                  </div>
                  <div className="sign--up__form">
                    <div className="main--account__form-group">
                      <label className="form-label">Password</label>
                      <input
                        value={password}
                        placeholder="Nhập password của bạn"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span className="form-message"></span>
                    </div>
                  </div>

                  <div className="sign--up__form--button">
                    <button type="submit" className="btn btn--signUp">
                      SignUp
                    </button>
                  </div>
                </form>

                <div className="sign--up__form--login">
                  <h5>Have an account</h5>
                  <p onClick={onShowSignIn}>Sign In</p>
                </div>
              </div>
            </div>

            <div className="signUp--decorate l-6 m-6">
              <div
                className="signUp--image"
                style={{
                  background: `url(
                    "https://i.ibb.co/TMyNt19/wallpaperflare-com-wallpaper-1.jpg"
                  )`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
      <SignInForm />
    </>
  );
};

export default SignIn;
