import React, { useEffect } from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import Cart from "@/app/_components/Cart";
import CartIcon from "@/app/_components/CartIcon";
import PathLink from "@/app/_components/PathLink";
import RenderSlide from "./RenderSlice";

const SectionDetail = ({ id }) => {
  const { findProductById, onAddProductToCart, onOpenCart } = useAppContext();
  const detailProduct = findProductById(id);

  const handleAddProductToCart = (id) => {
    onAddProductToCart({ productId: id, quantity: 1 });
  };

  const handleOpenCart = () => {
    onOpenCart();
  };

  useEffect(() => {
    let changeImg = document.querySelector(".detail--product__image--main");
    let imgMain2 = document.querySelector(".img--main-2");
    document
      .querySelectorAll(".product--image__small--item")
      .forEach((picture) => {
        picture.addEventListener("click", (e) => {
          changeImg.style.backgroundImage = e.target.style.backgroundImage;
          imgMain2.style.backgroundImage = e.target.style.backgroundImage;
        });
      });

    let zoom = document.querySelector(".zoom");
    let imgZoom = document.querySelector("#imgZoom");
    if ((zoom, imgZoom)) {
      zoom.addEventListener("mousemove", (event) => {
        imgZoom.style.opacity = 1;
        let positionPx = event.x - zoom.getBoundingClientRect().left;
        let positionX = (positionPx / zoom.offsetWidth) * 100;

        let positionPy = event.y - zoom.getBoundingClientRect().top;
        let positionY = (positionPy / zoom.offsetHeight) * 100;

        let transformX = -(positionX - 50) / 3.5;
        let transformY = -(positionY - 50) / 3.5;

        imgZoom.style.setProperty("--zoom-x", positionX + "%");
        imgZoom.style.setProperty("--zoom-y", positionY + "%");
        imgZoom.style.transform = `
                  scale(1.5)
                  translateX(${transformX}%) translateY(${transformY}%)
              `;
      });

      zoom.addEventListener("mouseout", () => {
        imgZoom.style.opacity = 0;
      });
    }
  }, []);

  return (
    <div className="section--detail__padding">
      <div className="container">
        <PathLink content="Chi tiết sản phẩm" />
        <div className="line"></div>
        <div className="section--detail__product--wrapper">
          <section className="section--detail__product">
            <div className="section--detail__product--warper row">
              <div className="detail--product__image l-5 m-5 c-12">
                <div className="detail--product__image--large zoom">
                  <div
                    id="myimage"
                    className="detail--product__image--main"
                    style={{
                      backgroundImage: `url(${
                        "http://localhost:8000/images/" +
                        detailProduct?.thumbnail
                      })`,
                    }}
                  ></div>
                  <div
                    id="imgZoom"
                    className="img--main-2"
                    style={{
                      backgroundImage: `url(${
                        "http://localhost:8000/images/" +
                        detailProduct?.thumbnail
                      })`,
                    }}
                  ></div>
                </div>
                <div className="detail--product__image--small">
                  <div
                    className="product--image__small--item"
                    style={{
                      backgroundImage: `url(${
                        "http://localhost:8000/images/" +
                        detailProduct?.images[0]
                      })`,
                    }}
                  ></div>
                  <div
                    className="product--image__small--item secondary"
                    style={{
                      backgroundImage: `url(${
                        "http://localhost:8000/images/" +
                        detailProduct?.images[1]
                      })`,
                    }}
                  ></div>
                </div>
              </div>
              <div className="detail--product__info l-7 m-7 c-12">
                <div className="detail--product__info--wrapper">
                  <h2>{detailProduct?.description}</h2>
                  <h3>{detailProduct?.name}</h3>
                  <h4>
                    <span> $</span>
                    {detailProduct?.price}
                  </h4>
                  <div className="detail--product__btn">
                    <button
                      className="btn btn--primary"
                      onClick={() => {
                        handleAddProductToCart(detailProduct?._id),
                          handleOpenCart();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                  <div className="detail--product__info--content">
                    <h2>Description</h2>
                    <div className="line"></div>
                    <p>{detailProduct?.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className="section--product__recommend">
          <h2>Chúng tôi khuyến nghị</h2>
          <div className="line"></div>
          <div className="section--product__slide">
            <RenderSlide />
          </div>
        </section>
      </div>
    </div>
  );
};

export default SectionDetail;
