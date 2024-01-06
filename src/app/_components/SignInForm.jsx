"use client";

import React, { useEffect, useState } from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import Link from "next/link";
import { loginUser } from "@/redux/features/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";

const contactForm = z.object({
  info: z.object({
    email: z
      .string({ required_error: "Bạn chưa nhập email" })
      .min(8, { message: "Email phải có ít nhất 8 ký tự" })
      .email({ message: "Bạn chưa nhập email" })
      .trim(),
    password: z
      .string({ required_error: "Bạn chưa nhập password" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .trim(),
  }),
});

const SignInForm = () => {
  const { isShowSignIn, onShowSignIn } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useRouter();

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        email: "",
        password: "",
      },
    },
  });

  const handleSubmit = (e) => {
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
        <FormProvider {...methods}>
          <form
            className={`main--account_sigIn--wrapper l-4 m-6 c-8 ${
              isShowSignIn ? "show" : ""
            }`}
            onSubmit={methods.handleSubmit((data) => {
              handleSubmit(data);
            })}
          >
            <div className="main--account__form-group">
              <div className="main--account__form-group">
                <FormControl
                  label="Email"
                  name="info.email"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="main--account__form-group">
              <div className="main--account__form-group">
                <FormControl
                  label="Password"
                  type="password"
                  name="info.password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="main--account__submit">
              <button className="btn btn--signIn" type="submit">
                <Link href="">Đăng nhập</Link>
              </button>
            </div>
            <div className="main--account_signUp">
              <h5>Bạn không có tài khoản?</h5>
              <Link href="/signIn" onClick={onShowSignIn}>
                Đăng ký
              </Link>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default SignInForm;
