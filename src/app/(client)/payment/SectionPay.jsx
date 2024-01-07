"use client";

import React, { useEffect, useState } from "react";
import PathLink from "@/app/_components/PathLink";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormControl from "@/app/_components/FormControl";
import useAppContext from "@/app/_hooks/useAppContext";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, getAllUser } from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";

const contactForm = z.object({
  info: z.object({
    phone_number: z
      .string({ required_error: "Bạn chưa số điện thoại" })
      .min(8, { message: "Số điện thoại tối thiểu 8 số" }),
    address: z
      .string({ required_error: "Bạn chưa nhập địa chỉ" })
      .trim()
      .min(1, { message: "Vui lòng nhập địa chỉ" }),
    paymentMethod: z
      .string()
      .min(1, { message: " vui lòng trọn hình thức thanh toán" }),
  }),
});

const SectionPay = () => {
  const [choosePayment, setChoosePayment] = useState("Bank transfer");

  const { form, totalProductPrice, productInCart, onTakeInfoUser } =
    useAppContext();

  const user = useSelector((state) => state.auth?.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers?.users);

  useEffect(() => {
    if (!user) {
      navigate.push("/home");
    }
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch);
    }
  }, []);

  const [currentUserId, setCurrentUserId] = useState(user._id);
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const findUser = userList.find((user) => user._id === currentUserId);

  const methods = useForm({
    resolver: zodResolver(contactForm),
    defaultValues: {
      info: {
        phone_number: "",
        address: "",
      },
    },
  });

  useEffect(() => {
    if (user) {
      setAddress(findUser?.address);
      setPhoneNumber(findUser?.phoneNumber);
    }
  }, []);

  const handleCheckboxChange = (check) => {
    setChoosePayment(check);
  };

  const dispatch = useDispatch();
  const navigate = useRouter();

  const handleSubmitForm = async (data) => {
    if (user) {
      const newOrder = {
        user: findUser?._id,
        email: findUser?.email,
        address: address,
        phoneNumber: phoneNumber,
        products: productInCart,
        totalPrice: totalProductPrice,
        paymentMethod: data.info.paymentMethod,
      };

      await createOrder(newOrder, dispatch, navigate);
      onTakeInfoUser(data);
    } else {
      window.alert("Bạn cần đăng nhập để hoàn tất dịch vụ!");
    }
  };

  return (
    <section className="section--pay">
      <div className="container">
        <PathLink content="Payment" />
        <div className="line" />
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit((data) => {
              data.info.paymentMethod = choosePayment;
              handleSubmitForm(data);
            })}
          >
            <div className="section--pay__wrapper row">
              <div className="section--pay__bill l-4 m-4 c-12">
                <div className="section--pay__bill--wrapper">
                  <h3>Thông tin</h3>
                  <FormControl
                    label="Email"
                    name="email"
                    value={user?.email}
                    disabled="disabled"
                  />
                  <FormControl
                    label="Name"
                    name="info.name"
                    value={user?.username}
                    disabled="disabled"
                  />
                  <FormControl
                    label="Địa chỉ"
                    name="info.address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your phone address"
                  />
                  <FormControl
                    label="Số điện thoại"
                    name="info.phone_number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="payment--methods l-4 m-4 c-12">
                <div className="payment--methods__wrapper">
                  <h3>Phương thức thanh toán</h3>
                  <div className="payment checkbox">
                    <FormControl
                      label="Bank Transfer"
                      id="bank transfer"
                      type="radio"
                      name="info.paymentMethod"
                      onChange={() => handleCheckboxChange("Bank transfer")}
                      checked={choosePayment === "Bank transfer"}
                    />
                  </div>
                  <div className="payment checkbox">
                    <FormControl
                      label="Delivery"
                      id="delivery"
                      type="radio"
                      name="info.paymentMethod"
                      onChange={() => handleCheckboxChange("Delivery")}
                      checked={choosePayment === "Delivery"}
                    />
                  </div>
                </div>
              </div>
              <div className="line" />
              <div className="section--pay__info l-4 m-4 c-12">
                <div className="section--pay__list">
                  {productInCart.map((product) => (
                    <div
                      className="section--pay__info--product"
                      key={product?.product?._id}
                    >
                      <div
                        className="pay--image"
                        style={{
                          backgroundImage: `url(${
                            "http://localhost:8000/images/" +
                            product?.product?.thumbnail
                          })`,
                        }}
                      >
                        <p>{product?.quantity}</p>
                      </div>
                      <div className="pay--des">
                        <h4>{product?.product?.name}</h4>
                      </div>
                      <div className="pay--price">
                        <span>$ </span>
                        {product?.product?.price}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="section--pay__info--total">
                  <h5>Tổng tiền</h5>
                  <h4>
                    <span>$</span>
                    <p>{totalProductPrice}</p>
                  </h4>
                </div>
              </div>
            </div>
            <div className="payment--btn">
              <button type="submit" className="btn btn--primary link">
                <h5>Đặt hàng</h5>
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </section>
  );
};

export default SectionPay;
