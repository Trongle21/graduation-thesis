"use client";

import React, { useState } from "react";
import SignInForm from "@/app/_components/SignInForm";
import useAppContext from "@/app/_hooks/useAppContext";
import Link from "next/link";
import { registerUser } from "@/redux/features/apiRequest";
import { useDispatch } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";
import { useRouter } from "next/navigation";

const contactForm = z.object({
  info: z.object({
    name: z
      .string({ required_error: "Bạn chưa nhập tên" })
      .min(6, { message: "tên phải có ít nhất 6 ký tự" })
      .trim(),
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

const SignIn = () => {
  const { onShowSignIn } = useAppContext();
  const [userName, setUserName] = useState("");
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
        confirm_password: "",
      },
    },
  });

  const handleSubmit = (e) => {
    const newUser = {
      username: userName,
      email: email,
      password: password,
    };
    registerUser(newUser, dispatch, navigate);
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
                <FormProvider {...methods}>
                  <form
                    className="form-wrapper"
                    onSubmit={methods.handleSubmit((data) => {
                      handleSubmit(data);
                    })}
                  >
                    <div className="sign--up__form">
                      <div className="main--account__form-group">
                        <FormControl
                          label="Tên"
                          name="info.name"
                          placeholder="Nhập tên của bạn"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="sign--up__form">
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
                    <div className="sign--up__form">
                      <div className="main--account__form-group">
                        <FormControl
                          label="Mật khẩu"
                          type="password"
                          name="info.password"
                          placeholder="Nhập mật khẩu của bạn"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sign--up__form--button">
                      <button type="submit" className="btn btn--signUp">
                        SignUp
                      </button>
                    </div>
                  </form>
                </FormProvider>
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
