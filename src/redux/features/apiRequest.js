import axios from "axios";
import {
  loginFailed,
  loginStart,
  loginSuccess,
  registerStart,
  registerSuccess,
  registerFailed,
} from "./authSlice";
import {
  deleteUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  updateUserFailed,
  updateUserStart,
  updateUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
  getUserDeletedStart,
  getUserDeletedSuccess,
  getUserDeletedFailed,
  restoreUserStart,
  restoreUserSuccess,
  restoreUserFailed,
} from "./userSlice";
import {
  deleteProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  getProductDeletedFailed,
  getProductDeletedStart,
  getProductDeletedSuccess,
  getProductFailed,
  getProductStart,
  getProductSuccess,
  restoreProductStart,
  restoreProductSuccess,
  updateProductFailed,
  updateProductStart,
  updateProductSuccess,
} from "./productSlice";
import {
  deletePetFailed,
  deletePetStart,
  deletePetSuccess,
  getPetFailed,
  getPetStart,
  getPetSuccess,
  restorePetFailed,
  restorePetStart,
  restorePetSuccess,
  updatePetStart,
  updatePetSuccess,
} from "./petsSlice";
import {
  deleteServicePackFailed,
  deleteServicePackStart,
  deleteServicePackSuccess,
  getServicePackFailed,
  getServicePackStart,
  getServicePackSuccess,
  restoreServicePackFailed,
  restoreServicePackStart,
  restoreServicePackSuccess,
  updateServicePackFailed,
  updateServicePackStart,
  updateServicePackSuccess,
} from "./servicePackSlice";
import {
  deleteAppointmentFailed,
  deleteAppointmentStart,
  deleteAppointmentSuccess,
  getAppointmentFailed,
  getAppointmentStart,
  getAppointmentSuccess,
  restoreAppointmentFailed,
  restoreAppointmentStart,
  restoreAppointmentSuccess,
  updateAppointmentFailed,
  updateAppointmentStart,
  updateAppointmentSuccess,
} from "./appointment";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    const isAdmin = res.data.admin;
    isAdmin
      ? navigate.push("http://localhost:3000/api/me/stored-users")
      : navigate.push("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate, axiosJWT) => {
  dispatch(registerStart());
  try {
    await axiosJWT.post("http://localhost:8000/api/users/store", user);
    navigate.push("http://localhost:3000/api/me/stored-users");

    dispatch(registerSuccess());
  } catch (err) {
    dispatch(registerFailed());
  }
};

export const createProduct = async (product, dispatch, navigate) => {
  dispatch(getProductStart());
  try {
    await axios.post("http://localhost:8000/api/products/store", product);
    navigate.push("http://localhost:3000/api/me/stored-products");
    dispatch(getProductSuccess());
  } catch (err) {
    dispatch(getProductFailed());
  }
};

export const createPet = async (pet, dispatch) => {
  dispatch(getPetStart());
  try {
    const res = await axios.post("http://localhost:8000/api/pets/store", pet);
    const petId = await res.data._id;
    dispatch(getPetSuccess());
    return petId;
  } catch (err) {
    dispatch(getPetFailed());
  }
};

export const createServicePack = async (servicePack, dispatch, navigate) => {
  dispatch(getServicePackStart());
  try {
    await axios.post(
      "http://localhost:8000/api/service-pack/store",
      servicePack
    );
    navigate.push("http://localhost:3000/api/me/stored-service-packe");
    dispatch(getServicePackSuccess());
  } catch (err) {
    dispatch(getServicePackFailed());
  }
};

export const createAppointment = async (appointment, dispatch, navigate) => {
  dispatch(getAppointmentStart());
  try {
    await axios.post(
      "http://localhost:8000/api/appointment/store",
      appointment
    );
    navigate.push("http://localhost:3000/service/serviceBookSuccess");
    dispatch(getAppointmentSuccess());
  } catch (err) {
    dispatch(getAppointmentFailed());
  }
};

export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axiosJWT.get(
      "http://localhost:8000/api/me/stored/users/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getUserFailed());
  }
};

export const getAllUserDeleted = async (accessToken, dispatch) => {
  dispatch(getUserDeletedStart());
  try {
    const res = await axios.get("http://localhost:8000/api/me/trash/users/", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUserDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getUserDeletedFailed());
  }
};

export const getAllProduct = async (accessToken, dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get(
      "http://localhost:8000/api/me/stored/products/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getProductFailed());
  }
};

export const getAllProductDeleted = async (accessToken, dispatch) => {
  dispatch(getProductDeletedStart());
  try {
    const res = await axios.get(
      "http://localhost:8000/api/me/trash/products/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getProductDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getProductDeletedFailed());
  }
};

export const getAllPet = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getPetStart());
  try {
    const resPet = await axiosJWT.get(
      "http://localhost:8000/api/me/stored/pets/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(getPetSuccess(resPet.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getPetFailed());
  }
};

export const getAllServicePack = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getServicePackStart());
  try {
    const res = await axiosJWT.get(
      "http://localhost:8000/api/me/stored/service-pack/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getServicePackSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getServicePackFailed());
  }
};

export const getAllAppointment = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAppointmentStart());
  try {
    const res = await axiosJWT.get(
      "http://localhost:8000/api/me/stored/appointments/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getAppointmentSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getAppointmentFailed());
  }
};

export const updateUser = async (user, accessToken, dispatch, navigate) => {
  dispatch(updateUserStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/users/" + user._id,
      user,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    dispatch(updateUserFailed());
  }
};

export const updateProduct = async (
  product,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(updateProductStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/products/" + product._id,
      product,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailed());
  }
};

export const updatePet = async (pet, accessToken, dispatch) => {
  dispatch(updatePetStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/pets/" + pet._id,
      pet,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updatePetSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailed());
  }
};

export const updateServicePack = async (servicePack, accessToken, dispatch) => {
  dispatch(updateServicePackStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/servicePacks/" + servicePack._id,
      servicePack,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateServicePackSuccess(res.data));
  } catch (err) {
    dispatch(updateServicePackFailed());
  }
};

export const updateAppointment = async (appointment, accessToken, dispatch) => {
  dispatch(updateAppointmentStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/appointments/" + appointment._id,
      appointment,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(updateAppointmentSuccess(res.data));
  } catch (err) {
    dispatch(updateAppointmentFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete("http://localhost:8000/api/users/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed());
  }
};

export const deleteUserForce = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/users/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUserSuccess(res.data));
  } catch (err) {
    dispatch(deleteUserFailed());
  }
};

export const deleteProduct = async (accessToken, dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const res = await axios.delete("http://localhost:8000/api/products/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailed());
  }
};

export const deleteProductForce = async (accessToken, dispatch, id) => {
  dispatch(deleteProductStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/products/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteProductSuccess(res.data));
  } catch (err) {
    dispatch(deleteProductFailed());
  }
};

export const deleteServicePack = async (accessToken, dispatch, id) => {
  dispatch(deleteServicePackStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/servicePacks/" + id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteServicePackSuccess(res.data));
  } catch (err) {
    dispatch(deleteServicePackFailed());
  }
};

export const deleteServicePackForce = async (accessToken, dispatch, id) => {
  dispatch(deleteServicePackStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/servicePacks/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteServicePackSuccess(res.data));
  } catch (err) {
    dispatch(deleteServicePackFailed());
  }
};

export const deleteAppointment = async (accessToken, dispatch, id) => {
  dispatch(deleteAppointmentStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/appointments/" + id,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteAppointmentSuccess(res.data));
  } catch (err) {
    dispatch(deleteAppointmentFailed());
  }
};

export const deleteAppointmentForce = async (accessToken, dispatch, id) => {
  dispatch(deleteAppointmentStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/appointments/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteAppointmentSuccess(res.data));
  } catch (err) {
    dispatch(deleteAppointmentFailed());
  }
};

export const deletePet = async (accessToken, dispatch, id) => {
  dispatch(deletePetStart());
  try {
    const res = await axios.delete("http://localhost:8000/api/pets/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deletePetSuccess(res.data));
  } catch (err) {
    dispatch(deletePetFailed());
  }
};

export const deletePetForce = async (accessToken, dispatch, id) => {
  dispatch(deletePetStart());
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/pets/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deletePetSuccess(res.data));
  } catch (err) {
    dispatch(deletePetFailed());
  }
};

export const restoreUser = async (accessToken, dispatch, id) => {
  dispatch(restoreUserStart());
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/users/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restoreUserSuccess(res.data));
  } catch (err) {
    dispatch(restoreUserFailed());
  }
};

export const restoreProduct = async (accessToken, dispatch, id) => {
  dispatch(restoreProductStart());
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/products/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restoreProductSuccess(res.data));
  } catch (err) {
    dispatch(restoreUserFailed());
  }
};

export const restorePet = async (accessToken, dispatch, id) => {
  dispatch(restorePetStart());
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/pets/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restorePetSuccess(res.data));
  } catch (err) {
    dispatch(restorePetFailed());
  }
};

export const restoreServicePack = async (accessToken, dispatch, id) => {
  dispatch(restoreServicePackStart());
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/servicePacks/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restoreServicePackSuccess(res.data));
  } catch (err) {
    dispatch(restoreServicePackFailed());
  }
};

export const restoreAppointment = async (accessToken, dispatch, id) => {
  dispatch(restoreAppointmentStart());
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/appointments/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restoreAppointmentSuccess(res.data));
  } catch (err) {
    dispatch(restoreAppointmentFailed());
  }
};

export const handleActionUserForm = async (
  accessToken,
  dispatch,
  userList,
  action
) => {
  dispatch(getUserStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/api/users/handle-action-form",
      { userId: userList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    window.location.reload();
    dispatch(getUserDeletedSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

export const handleActionProductForm = async (
  accessToken,
  dispatch,
  productList,
  action
) => {
  dispatch(getProductStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/api/products/handle-action-form",
      { productId: productList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    window.location.reload();
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailed());
  }
};

export const handleActionPetForm = async (
  accessToken,
  dispatch,
  petList,
  action
) => {
  dispatch(getPetStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/api/pets/handle-action-form",
      { petId: petList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    window.location.reload();
    dispatch(getPetSuccess(res.data));
  } catch (err) {
    dispatch(getPetFailed());
  }
};

export const handleActionServicePackForm = async (
  accessToken,
  dispatch,
  servicePackList,
  action
) => {
  dispatch(getServicePackStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/api/servicePacks/handle-action-form",
      { servicePackListId: servicePackList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    window.location.reload();
    dispatch(getServicePackSuccess(res.data));
  } catch (err) {
    dispatch(getProductDeletedFailed());
  }
};

export const handleActionAppointmentForm = async (
  accessToken,
  dispatch,
  appointmentList,
  action
) => {
  dispatch(getAppointmentStart());
  try {
    const res = await axios.post(
      "http://localhost:8000/api/appointments/handle-action-form",
      { appointmentId: appointmentList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    window.location.reload();
    dispatch(getAppointmentSuccess(res.data));
  } catch (err) {
    dispatch(getAppointmentFailed());
  }
};

export const logoutUser = async (dispatch, id, accessToken, navigate) => {
  dispatch(loginStart());
  try {
    await axios.post("http://localhost:8000/api/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(loginSuccess());
    navigate.push("/");
  } catch (err) {
    dispatch(loginFailed());
  }
};
