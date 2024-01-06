"use client";

import React, { useState, useEffect } from "react";
import AppContext from "@/app/_context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, deleteProduct } from "@/redux/features/cartSlice";
import { getDataSuccess } from "@/redux/features/apiSlice";
import { getAllProduct } from "@/redux/features/apiRequest";

const AppProvider = ({ children }) => {
  const [isShowSignIn, setIsShowSignIn] = useState(false);
  const [isShowCart, setIsShowCart] = useState(false);
  const [isShowPackage, setIsShowPackage] = useState(false);
  const [isShowNavBar, setIsShowNavBar] = useState(false);
  const [isShowSearch, setIsShowSearch] = useState(false);
  const [isShowServiceBook, setIsShowServiceBook] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [form, setForm] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    getAllProduct(Math.random(), dispatch);
  }, []);

  const productList = useSelector(
    (state) => state.products.products?.allProducts?.products
  );

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getDataSuccess(productList));
    };
    fetchData();
  }, [dispatch]);

  const handleShowSignIn = () => {
    setIsShowSignIn(!isShowSignIn);
  };

  const handleOpenCart = () => {
    setIsShowCart(true);
  };

  const handleCloseCart = () => {
    setIsShowCart(false);
  };

  const handleShowPackage = () => {
    setIsShowPackage(!isShowPackage);
  };

  const handleShowNavBar = () => {
    setIsShowNavBar(!isShowNavBar);
  };

  const handleShowSearch = () => {
    setIsShowSearch(!isShowSearch);
  };

  const handleShowServiceBook = () => {
    setIsShowServiceBook(!isShowServiceBook);
  };

  const productsCart = useSelector((state) => state.cart.productsCart);
  // render pagination
  const products = useSelector((state) => state.api.products);

  const itemsPerPage = 8;

  const endOffset = itemOffset + itemsPerPage;

  const currentProducts = products?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(products?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % products?.length;
    setItemOffset(newOffset);
  };

  // cart
  const findProductById = (id) => {
    return products?.find((product) => product._id === id);
  };

  const handleAddProductToCart = ({ productId, quantity = 1 }) => {
    dispatch(addProduct({ productId: productId, quantity: quantity }));
  };

  const productInCart = productsCart.map((product) => ({
    product: findProductById(product.productId),
    quantity: product.quantity,
  }));

  const lengthProductCart = productInCart.length;

  const handleDeleteProduct = (id) => {
    dispatch(deleteProduct({ productId: id }));
  };

  useEffect(() => {
    setTotalProductPrice(
      productInCart.reduce(
        (total, product) => total + product?.product?.price * product?.quantity,
        0
      )
    );
  }, [productInCart]);

  // info form
  const handleTakeInfoUser = (data) => {
    console.log(data);
    setForm(data);
  };

  return (
    <AppContext.Provider
      value={{
        isShowSignIn,
        isShowCart,
        isShowPackage,
        isShowNavBar,
        isShowSearch,
        productInCart,
        isShowServiceBook,
        lengthProductCart,
        totalProductPrice,
        form,
        findProductById,
        onShowSignIn: handleShowSignIn,
        onShowPackage: handleShowPackage,
        onOpenCart: handleOpenCart,
        onCloseCart: handleCloseCart,
        onShowNavBar: handleShowNavBar,
        onShowSearch: handleShowSearch,
        onShowServiceBook: handleShowServiceBook,
        onAddProductToCart: handleAddProductToCart,
        onDeleteProduct: handleDeleteProduct,
        onPageClick: handlePageClick,
        onTakeInfoUser: handleTakeInfoUser,
        currentProducts,
        pageCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };
