"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  changePasswordUser,
  getAllUser,
  updateUser,
} from "@/redux/features/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";
import { useRouter } from "next/navigation";

const contactForm = z.object({
  info: z.object({
    password: z
      .string({ required_error: "Bạn chưa nhập password" })
      .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
      .trim(),
  }),
});

const SignIn = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers?.users);

  const [currentUserId, setCurrentUserId] = useState(user._id);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useRouter();

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        password: "",
      },
    },
  });

  useEffect(() => {
    if (!user) {
      navigate.push("/home");
    }
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch);
    }
  }, []);

  const findUser = userList.find((user) => user._id === currentUserId);

  useEffect(() => {
    if (user) {
      setUserName(findUser?.username);
    }
  }, []);

  const handleSubmit = (e, data) => {
    const newUser = {
      ...findUser,
      password: password,
    };
    window.alert("Đổi mật khẩu thành công")
    changePasswordUser(newUser, user?.accessToken, dispatch, navigate);
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
                <h2>Xin Chào: {userName}</h2>
                <h3>Đổi mật khẩu</h3>
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
                          readOnly={true}
                          onChange={(e) => setUserName(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sign--up__form">
                      <div className="main--account__form-group">
                        <FormControl
                          label="Nhập mật khẩu"
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
                        Cập nhật
                      </button>
                    </div>
                  </form>
                </FormProvider>
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
    </>
  );
};

export default SignIn;
