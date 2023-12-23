"use client";

import React, { useEffect, useState } from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginUser } from "@/redux/features/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const SignInForm = () => {
  const { isShowSignIn, onShowSignIn } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    loginUser(newUser, dispatch, navigate);
    
  };

  return (
    <div className="main--account">
      <div
        className={`overlay ${isShowSignIn ? "show--overlay" : ""}`}
        onClick={onShowSignIn}
      ></div>
      <div className="main--account__signIn">
        <form
          className={`main--account_sigIn--wrapper l-4 m-6 c-8 ${
            isShowSignIn ? "show" : ""
          }`}
          onSubmit={handleSubmit}
        >
          <div className="main--account__form-group">
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
          <div className="main--account__form-group">
            <div className="main--account__form-group">
              <label className="form-label">Password</label>
              <input
                value={password}
                type="password"
                placeholder="Nhập mật khẩu của bạn"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="form-message"></span>
            </div>
          </div>

          <div className="main--account__submit">
            <button className="btn btn--signIn" type="submit">
              <Link href="">Sign In</Link>
            </button>
          </div>
          <div className="main--account_signUp">
            <h5>Don`t have a account?</h5>
            <Link href="/signIn" onClick={onShowSignIn}>
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
