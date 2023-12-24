"use client";

import React, { useEffect, useState } from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import CartIcon from "@/app/_components/CartIcon";
import Link from "next/link";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { decreaseProduct, increaseProduct } from "@/redux/features/cartSlice";
import { MdCancel } from "react-icons/md";
import { BiSolidTrashAlt } from "react-icons/bi";

const Cart = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const {
    isShowCart,
    onCloseCart,
    productInCart,
    totalProductPrice,
    onDeleteProduct,
  } = useAppContext();

  const dispatch = useDispatch();

  const handleCloseCart = () => {
    onCloseCart();
  };

  const handleDeleteProduct = (id) => {
    const isDelete = window.confirm(
      "Bạn chắc chắn muốn xóa sản phẩm này khỏi cửa hàng"
    );
    if (isDelete) {
      onDeleteProduct(id);
    }
  };

  const handleCheckProduct = () => {
    if (user) {
      if (productInCart && productInCart.length < 1) {
        window.alert("Bạn không có sản phẩm trong giỏ hàng");
      }
    } else {
      window.alert("Bạn cần đăng nhập để thanh toán hóa đơn");
    }
  };

  const handleDecreaseProduct = (id, quantity) => {
    if (quantity < 2) {
      console.log(1);
      window.alert("không thể giảm số lượng được nữa");
    } else {
      dispatch(
        decreaseProduct({
          productId: id,
        })
      );
    }
  };

  const handleIncreaseProduct = (id) => {
    dispatch(
      increaseProduct({
        productId: id,
      })
    );
  };

  // productInCart.map((product) => console.log(product))

  const classCart = isShowCart ? "show--cart" : "product--cart";

  return (
    <>
      <div className={`product--cart ${classCart}`}>
        <div className="product--cart__info">
          <div className="product--cart__info--user">
            <div
              className="user--image"
              style={{
                backgroundImage: `url(${"https://i.ibb.co/QCRGk2z/Kaio-In-the-world-of-fantasy-1.png"})`,
              }}
            ></div>
            <h6>Kaiosuke</h6>
          </div>
          <div className="product--cart__info--close" onClick={handleCloseCart}>
            <i>
              {" "}
              <i>
                {" "}
                <MdCancel />{" "}
              </i>
            </i>
          </div>
        </div>
        <div className="cart--wrapper">
          <div className="product--cart__pay">
            {productInCart && productInCart.length < 1 ? (
              <div className="no-product">Giỏ hàng của bạn đang trống!</div>
            ) : (
              <>
                {productInCart &&
                  productInCart.map((product) => (
                    <div
                      className="product--cart__pay--wrapper"
                      key={product?.product?._id}
                    >
                      <div
                        className="product--cart__pay--image"
                        style={{
                          backgroundImage: `url(${
                            "http://localhost:8000/images/" +
                            product?.product?.thumbnail
                          })`,
                        }}
                      ></div>
                      <div className="product--cart__pay--info">
                        <h3>{product?.product?.name}</h3>
                        <h5>
                          <span>$</span> {product?.product?.price}
                        </h5>
                        <div className="product--quantity">
                          <Button
                            className="quantity decrease"
                            content="-"
                            onClick={() =>
                              handleDecreaseProduct(
                                product?.product?._id,
                                product?.quantity
                              )
                            }
                          />
                          <p>{product.quantity}</p>

                          <Button
                            className="quantity increase"
                            content="+"
                            onClick={() =>
                              handleIncreaseProduct(product?.product?._id)
                            }
                          />
                        </div>
                      </div>
                      <div className="product--item__delete">
                        <button
                          onClick={() =>
                            handleDeleteProduct(product?.product?._id)
                          }
                        >
                          <BiSolidTrashAlt />
                        </button>
                      </div>
                    </div>
                  ))}
              </>
            )}
          </div>
        </div>
        <div className="product--cart__btn">
          <Link
            href={
              user && productInCart && productInCart.length > 0
                ? "/payment"
                : ""
            }
          >
            <Button
              className="btn btn--secondary"
              onClick={handleCheckProduct}
              content="Place an order"
            />
          </Link>
          <div className="product--cart__total">
            <h4>Total</h4>
            <span>${totalProductPrice}</span>
          </div>
        </div>
      </div>
      {!isShowCart && <CartIcon />}
    </>
  );
};

export default Cart;
