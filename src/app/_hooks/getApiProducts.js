import axios from "axios";
import {
  getDataProductStart,
  getDataProductSuccess,
  getDataFailed,
} from "@/redux/features/apiSlice";

const getApiProducts = async (dispatch) => {
  dispatch(getDataProductStart());
  try {
    const res = await axios.get(
      "http://localhost:8000/api/me/stored/products/"
    );
    console.log(res);
    dispatch(getDataProductSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getDataFailed());
  }
};

export default getApiProducts;
