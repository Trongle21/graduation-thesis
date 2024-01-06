import React from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import Button from "@/app/_components/Button";
import Link from "next/link";

const ProductList = () => {
  const { onAddProductToCart, onOpenCart, currentProducts } = useAppContext();

  const handleAddProductToCart = (id) => {
    onAddProductToCart({ productId: id, quantity: 1 });
  };

  const handleShowCart = () => {
    onOpenCart();
  };

  return (
    <div className="product--list">
      {currentProducts && currentProducts.length === 0 ? (
        <div>Không tìm thấy sản phẩm</div>
      ) : (
        currentProducts &&
        currentProducts.map((product) => (
          <div className="product--item l-3 m-6 c-11" key={product._id}>
            <div className="product--item__wrapper">
              <div className="product--item__wrapper">
                <Link
                  href={`/products/${product._id}`}
                  className="product--item__image"
                  style={{ backgroundImage: `url(${"http://localhost:8000/images/" + product.thumbnail})` }}
                ></Link>
                <div className="product--item__info text-center">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <h5>
                    <span>$</span>
                    {product.price}
                  </h5>
                </div>
              </div>
              <div className="product--item__btn">
                <Button
                  className="btn btn--primary"
                  onClick={() => {
                    handleAddProductToCart(product._id);
                    handleShowCart();
                  }}
                  content="Thêm vào giỏ hàng"
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
