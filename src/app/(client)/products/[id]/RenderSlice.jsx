import React, { useEffect } from "react";
import Link from "next/link";
import useAppContext from "@/app/_hooks/useAppContext";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import NextSlice from "./NextSlice";
import PrevSlice from "./PrevSlice";

const RenderSlide = () => {
  const products = useSelector((state) => state.api.products);

  const { onAddProductToCart, onOpenCart } = useAppContext();

  const handleAddProductToCart = (id) => {
    onAddProductToCart({ productId: id, quantity: 1 });
  };

  const handleOpenCart = () => {
    onOpenCart();
  };

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: false,
    speed: 1200,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    prevArrow: <PrevSlice />,
    nextArrow: <NextSlice />,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Slider {...settings} className="slide">
      {products?.map((product) => (
        <div className="item" key={product?.id}>
          <div className="product--item" key={product?.id}>
            <div className="product--item__wrapper">
              <Link
                href={`/product/${product?.id}`}
                className="product--item__image"
                style={{
                  backgroundImage: `url(${
                    "http://localhost:8000/images/" + product?.thumbnail
                  })`,
                }}
              ></Link>
              <div className="product--item__info text-center">
                <h3>{product?.name}</h3>
                <p>${product?.description}</p>
                <h5>
                  <span>$</span>
                  {product?.price}
                </h5>
              </div>
              <div className="product--item__btn">
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    handleAddProductToCart(product?._id), handleOpenCart();
                  }}
                >
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default RenderSlide;
