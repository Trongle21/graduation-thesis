import React, { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";
import PathLink from "@/app/_components/PathLink";
import Link from "next/link";

const contactForm = z.object({
  info: z.object({
    email: z
      .string({ required_error: "Bạn chưa nhập email" })
      .email({ message: "Email không hợp lệ" }),
    first_name: z
      .string({ required_error: "Bạn chưa nhập first name" })
      .trim()
      .min(1, { message: "Bạn chưa nhập first name" }),
    last_name: z
      .string({ required_error: "Bạn chưa nhập last name" })
      .trim()
      .min(1, { message: "Bạn chưa nhập last name" }),
    phone_number: z
      .string({ required_error: "Bạn chưa số điện thoại" })
      .min(8, { message: "Số điện thoại tối thiểu 8 số" })
      .max(11, { message: "Số điện thoại tối đa 10 số" }),
    subject: z
      .string({ required_error: "Bạn chưa nhập subject" })
      .trim()
      .min(1, { message: "Bạn chưa nhập subject" }),
    message: z.string(),
    dogWalking: z.boolean(),
    grooming: z.boolean(),
    boarding: z.boolean(),
    petSitting: z.boolean(),
    product: z.boolean(),
    store: z.boolean(),
  }),
});

const ContactSection = () => {
  const [location, setLocation] = useState("Ha Noi");

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        subject: "",
        message: "",
        dogWalking: false,
        petSitting: false,
        grooming: false,
        boarding: false,
        product: false,
        store: false,
      },
    },
  });

  const handleTakeData = (data) => {
    console.log(data);
  };

  return (
    <section className="section--contact__form">
      <div className="container">
        <PathLink content="Contact" />
        <div className="line"></div>
        <h2>How can we help?</h2>
        <FormProvider {...methods}>
          <form
            className="contact--form__info"
            onSubmit={methods.handleSubmit((data) => {
              data.info.location = location;
              handleTakeData(data);
            })}
          >
            <div className="contact--form row">
              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="First Name"
                  name="info.first_name"
                  type="text"
                  placeholder="Enter your first name"
                />
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="Last Name"
                  name="info.last_name"
                  type="text"
                  placeholder="Enter your last name"
                />
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="Email"
                  name="info.email"
                  type="text"
                  placeholder="Enter your email"
                />
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="Phone Number"
                  name="info.phone_number"
                  type="text"
                  placeholder="Enter your your phone number"
                />
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <div className="contact--form__list--wrapper">
                  <label htmlFor="location" className="form-label location">
                    Location
                  </label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="HaNoi">Ha Noi</option>
                    <option value="LaoCai">Lao Cai</option>
                    <option value="DaNang">Da Nang</option>
                    <option value="Ho Chi Minh city">Ho Chi Minh city</option>
                  </select>
                  <span className="form-message"></span>
                </div>
              </div>
              <div className="contact--form__list l-6 m-6 c-12">
                <FormControl
                  label="Subject"
                  name="info.subject"
                  type="text"
                  placeholder="Enter your subject"
                />
              </div>
            </div>

            <div className="contact--form__checkbox">
              <h3>SERVICES YOU ARE INTERESTED IN, SELECT ALL THAT APPLY:</h3>
              <div className="contact--form__checkbox--wrapper row">
                <div className="contact--form__checkbox--list l-6 m-4 c-12">
                  <div className="checkbox--form">
                    <FormControl
                      name="info.dogWalking"
                      type="checkbox"
                      label="Dog Walking"
                    />
                  </div>
                </div>
                <div className="contact--form__checkbox--list l-6 m-4 c-12">
                  <div className="checkbox--form">
                    <FormControl
                      name="info.grooming"
                      type="checkbox"
                      label="Grooming"
                    />
                  </div>
                </div>
                <div className="contact--form__checkbox--list l-6 m-4 c-12">
                  <div className="checkbox--form">
                    <FormControl
                      name="info.boarding"
                      type="checkbox"
                      label="Boarding"
                    />
                  </div>
                </div>
                <div className="contact--form__checkbox--list l-6 m-4 c-12">
                  <div className="checkbox--form">
                    <FormControl
                      name="info.petSitting"
                      type="checkbox"
                      label="Pet Sitting"
                    />
                  </div>
                </div>
                <div className="contact--form__checkbox--list l-6 m-4 c-12">
                  <div className="checkbox--form">
                    <FormControl
                      name="info.product"
                      type="checkbox"
                      label="Products"
                    />
                  </div>
                </div>
                <div className="contact--form__checkbox--list l-6 m-4 c-12">
                  <div className="checkbox--form">
                    <FormControl
                      name="info.store"
                      type="checkbox"
                      label="Store"
                    />
                  </div>
                </div>
                <div className="contact--form__message">
                  <label htmlFor="message">Message</label>
                  <FormControl
                    as="textarea"
                    name="info.message"
                    id="message"
                    cols="30"
                    rows="10"
                    placeholder="Example text"
                  />
                </div>
              </div>
            </div>
            <div className="contact--form__btn">
              <div>
                <button type="submit" className="btn btn--secondary">
                  <Link href="/contact/contactSuccess">Submit</Link>
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
