import React, { useState } from "react";
import useAppContext from "@/app/_hooks/useAppContext";
import data from "@/app/data.json";
import { useSelector, useDispatch } from "react-redux";
import {
  filterProductsBySearch,
  filterProductsBySelect,
} from "@/redux/features/apiSlice";

const ProductInfo = () => {
  const { isShowSearch, onShowSearch } = useAppContext();
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearchProduct = (name) => {
    setSearch(name);
    dispatch(filterProductsBySearch({ name: name }));
  };

  const handleSelectedTypesPet = (type) => {
    setSearch("");
    dispatch(filterProductsBySelect(type));
  };

  const selectedPetTypes = data["selectedPetTypes"];
  return (
    <div className="product--info">
      <h4>Cat and Dog</h4>
      <div className={`product--search ${isShowSearch ? "show" : ""}`}>
        <input
          className="search--product"
          type="text"
          value={search}
          onChange={(e) => handleSearchProduct(e.target.value)}
          placeholder="search..."
        />
      </div>
      <div className="product--section__search">
        <i
          className={`fa-solid ${
            isShowSearch ? "fa-solid fa-xmark show" : "fa-magnifying-glass "
          }`}
          onClick={onShowSearch}
        ></i>
        <select
          className="product--info__select"
          onChange={(e) => handleSelectedTypesPet(e.target.value)}
        >
          {selectedPetTypes.map((type, index) => (
            <option value={type.value} key={index}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductInfo;
