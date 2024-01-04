"use client";

import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";
import PathLink from "@/app/_components/PathLink";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { createContact } from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";

const contactForm = z.object({
  info: z.object({
    subject: z
      .string({ required_error: "Bạn chưa nhập subject" })
      .trim()
      .min(1, { message: "Bạn chưa nhập subject" }),
    message: z.string(),
  }),
});

const ContactSection = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const dispatch = useDispatch();
  const navigate = useRouter();

  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (user) {
      setUserName(user?.username);
    }
  }, []);

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        subject: "",
        message: "",
      },
    },
  });

  const handleSubmit = (data) => {
    if (user) {
      const newContact = {
        user: user._id,
        subject: data.info.subject,
        message: data.info.message,
      };
      createContact(newContact, dispatch, navigate);
      window.alert("Cảm ơn bạn đã gửi ý kiến phản hồi");
      window.location.reload();
    } else {
      window.alert("Bạn cần đăng nhập để liên hệ");
    }
  };

  return (
    <section className="section--contact__form">
      <div className="container">
        <PathLink content="Contact" />
        <div className="line"></div>
        <h2>How can we help?</h2>
        {!user?.admin && user ? (
          <>
            <Link href="/contact/responses" className="responses--user">
              Xem các phản hồi
            </Link>
          </>
        ) : (
          <></>
        )}
        <FormProvider {...methods}>
          <form
            className="contact--form__info"
            onSubmit={methods.handleSubmit((data) => {
              handleSubmit(data);
            })}
          >
            <div className="contact--form row">
              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="Tên"
                  name="name"
                  value={userName}
                  readOnly={true}
                />
              </div>

              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="Chủ đề"
                  name="info.subject"
                  type="text"
                  placeholder="Vui lòng nhập chủ đề"
                />
              </div>
            </div>

            <div className="contact--form__checkbox">
              <h3>SERVICES YOU ARE INTERESTED IN, SELECT ALL THAT APPLY:</h3>
              <div className="contact--form__checkbox--wrapper">
                <div className="contact--form__message">
                  <label htmlFor="message">Message</label>
                  <FormControl
                    as="textarea"
                    name="info.message"
                    id="message"
                    rows="10"
                    placeholder="Example text"
                  />
                </div>
              </div>
            </div>
            <div className="contact--form__btn">
              <div>
                <button type="submit" className="btn btn--secondary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default ContactSection;
