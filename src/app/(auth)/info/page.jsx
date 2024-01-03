"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
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
    name: z
      .string({ required_error: "Bạn chưa nhập tên" })
      .min(6, { message: "Tên phải có ít nhất 6 ký tự" })
      .trim(),
    address: z
      .string({ required_error: "Bạn chưa nhập địa chỉ" })
      .min(4, { message: "Địa chỉ ít nhất phải có 4 ký tự" })
      .trim(),
    phoneNumber: z
      .string({ required_error: "Bạn chưa nhập số điện thoại" })
      .min(9, { message: "Số điện thoại ít nhất phải có 9 ký tự" })
      .trim(),
  }),
});

const SignIn = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers?.users);

  const [currentUserId, setCurrentUserId] = useState(user._id);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const dispatch = useDispatch();
  const navigate = useRouter();

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        password: "",
        address: "",
        phoneNumber: "",
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
      setEmail(findUser?.email);
      setAddress(findUser?.address);
      setPhoneNumber(findUser?.phoneNumber);
    }
  }, []);

  const handleSubmit = (e, data) => {
    const newUser = {
      ...findUser,
      username: userName,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
    };
    updateUser(newUser, user?.accessToken, dispatch, navigate);
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
                <h3>Sửa thông tin tài khoản</h3>
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
                          label="Email"
                          name="info.email"
                          placeholder="Nhập email của bạn"
                          value={email}
                          readOnly={true} 
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
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
                          label="Địa chỉ"
                          name="info.address"
                          placeholder="Nhập địa chỉ của bạn"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="sign--up__form">
                      <div className="main--account__form-group">
                        <FormControl
                          label="Số điện thoại"
                          name="info.phoneNumber"
                          placeholder="Nhập số điện thoại của bạn"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
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
