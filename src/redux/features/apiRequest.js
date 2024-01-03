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
  getPetDeletedFailed,
  getPetDeletedStart,
  getPetDeletedSuccess,
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
  getServicePackDeletedFailed,
  getServicePackDeletedStart,
  getServicePackDeletedSuccess,
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
  getAppointmentDeletedFailed,
  getAppointmentDeletedStart,
  getAppointmentDeletedSuccess,
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
import {
  deleteOrderFailed,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrderDeletedFailed,
  getOrderDeletedStart,
  getOrderDeletedSuccess,
  getOrderFailed,
  getOrderStart,
  getOrderSuccess,
  restoreOrderFailed,
  restoreOrderStart,
  restoreOrderSuccess,
  updateOrderFailed,
  updateOrderStart,
  updateOrderSuccess,
} from "./orderSlice";
import {
  deleteContactFailed,
  deleteContactStart,
  deleteContactSuccess,
  getContactDeletedFailed,
  getContactDeletedStart,
  getContactDeletedSuccess,
  getContactFailed,
  getContactStart,
  getContactSuccess,
  restoreContactFailed,
  restoreContactStart,
  restoreContactSuccess,
  updateContactFailed,
  updateContactStart,
  updateContactSuccess,
} from "./contactSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("http://localhost:8000/api/auth/login", user);
    dispatch(loginSuccess(res.data));
    const isAdmin = res.data.admin;
    isAdmin
      ? navigate.push("http://localhost:3000/api/me/stored-users")
      : navigate.push("/home");
  } catch (err) {
    window.alert("Tài khoản hoặc mật khẩu không chính xác");
    dispatch(loginFailed());
  }
};

export const registerUser = async (user, dispatch, navigate, axiosJWT) => {
  dispatch(registerStart());
  try {
    await axios.post("http://localhost:8000/api/users/store", user);

    dispatch(registerSuccess());
    window.alert("Đăng kí thành công");
  } catch (err) {
    window.alert("Đăng kí thất bại");
    dispatch(registerFailed());
  }
};

export const createProduct = async (product, dispatch, navigate) => {
  dispatch(getProductStart());

  try {
    await axios.post("http://localhost:8000/api/products/store", product);
    navigate.push("http://localhost:3000/api/me/stored-products");
    dispatch(getProductSuccess());
    window.location.reload();
  } catch (err) {
    dispatch(getProductFailed());
  }
};

export const createPet = async (pet, dispatch, accessToken, petName) => {
  dispatch(getPetStart());
  try {
    const resPet = await axios.get(
      "http://localhost:8000/api/me/stored/pets/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    const duplicatePet = resPet.data.pets.find((p) => p.name === petName);

    let petId;

    if (duplicatePet) {
      console.log(`Pet này đã có trong thông tin người dùng rồi`);
      petId = await duplicatePet._id;
      dispatch(getPetSuccess());
    } else {
      const res = await axios.post("http://localhost:8000/api/pets/store", pet);
      petId = await res.data._id;
    }

    dispatch(getPetSuccess());
    return petId;
  } catch (err) {
    dispatch(getPetFailed());
  }
};

export const createServicePack = async (servicePack, dispatch, navigate) => {
  dispatch(getServicePackStart());
  window.location.reload();
  try {
    await axios.post(
      "http://localhost:8000/api/service-pack/store",
      servicePack
    );
    dispatch(getServicePackSuccess());
  } catch (err) {
    dispatch(getServicePackFailed());
  }
};

export const createAppointment = async (appointment, dispatch, navigate) => {
  dispatch(getAppointmentStart());

  try {
    await axios.post(
      "http://localhost:8000/api/appointments/store",
      appointment
    );
    navigate.push("http://localhost:3000/service/serviceBookSuccess");
    dispatch(getAppointmentSuccess());
    navigate.push("/service/serviceBookSuccess");
  } catch (err) {
    dispatch(getAppointmentFailed());
  }
};

export const createOrder = async (order, dispatch, navigate) => {
  dispatch(getOrderStart());
  try {
    await axios.post("http://localhost:8000/api/order/store", order);
    navigate.push("http://localhost:3000/payment/paymentSuccess");
    dispatch(getOrderSuccess());
  } catch (err) {
    dispatch(getOrderFailed());
  }
};

export const createContact = async (contact, dispatch, navigate) => {
  dispatch(getContactStart());
  try {
    await axios.post("http://localhost:8000/api/contact/store", contact);
    dispatch(getContactSuccess());
  } catch (err) {
    dispatch(getContactFailed());
  }
};

export const getAllUser = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getUserStart());
  try {
    const res = await axios.get("http://localhost:8000/api/me/stored/users/", {
      headers: { token: `Bearer ${accessToken}` },
    });
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
    const resPet = await axios.get(
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

export const getAllPetDeleted = async (accessToken, dispatch) => {
  dispatch(getPetDeletedStart());
  try {
    const res = await axios.get("http://localhost:8000/api/me/trash/pets/", {
      headers: { token: `Bearer ${accessToken}` },
    });

    dispatch(getPetDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getPetDeletedFailed());
  }
};

export const getAllServicePack = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getServicePackStart());
  try {
    const res = await axios.get(
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

export const getAllServicePackDeleted = async (accessToken, dispatch) => {
  dispatch(getServicePackDeletedStart());
  try {
    const res = await axios.get(
      "http://localhost:8000/api/me/trash/service-pack/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(getServicePackDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getServicePackDeletedFailed());
  }
};

export const getAllAppointment = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getAppointmentStart());
  try {
    const res = await axios.get(
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

export const getAllAppointmentDeleted = async (accessToken, dispatch) => {
  dispatch(getAppointmentDeletedStart());

  try {
    const res = await axios.get(
      "http://localhost:8000/api/me/trash/appointments/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(getAppointmentDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getAppointmentDeletedFailed());
  }
};

export const getAllOrder = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getOrderStart());

  try {
    const res = await axios.get("http://localhost:8000/api/me/stored/order/", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getOrderFailed());
  }
};

export const getAllOrderDeleted = async (accessToken, dispatch) => {
  dispatch(getOrderDeletedStart());

  try {
    const res = await axios.get("http://localhost:8000/api/me/trash/order/", {
      headers: { token: `Bearer ${accessToken}` },
    });

    dispatch(getOrderDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getOrderDeletedFailed());
  }
};

export const getAllContact = async (accessToken, dispatch, axiosJWT) => {
  dispatch(getContactStart());

  try {
    const res = await axios.get(
      "http://localhost:8000/api/me/stored/contact/",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getContactSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getContactFailed());
  }
};

export const getAllContactDeleted = async (accessToken, dispatch) => {
  dispatch(getContactDeletedStart());

  try {
    const res = await axios.get("http://localhost:8000/api/me/trash/contact/", {
      headers: { token: `Bearer ${accessToken}` },
    });

    dispatch(getContactDeletedSuccess(res.data));
  } catch (err) {
    console.error("Error from API:", err);
    dispatch(getContactDeletedFailed());
  }
};

export const updateUser = async (user, accessToken, dispatch, navigate) => {
  dispatch(updateUserStart());
  console.log(user);
  try {
    window.location.reload();
    const res = await axios.put(
      "http://localhost:8000/api/users/" + user._id,
      user,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    console.log(err.message);
    dispatch(updateUserFailed());
  }
};

export const changePasswordUser = async (
  user,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(updateUserStart());

  try {
    window.location.reload();
    const res = await axios.put(
      "http://localhost:8000/api/users/" + user._id + "/change-password",
      user,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(updateUserSuccess(res.data));
  } catch (err) {
    console.log(err.message);
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
  window.location.reload();
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
  window.location.reload();
  try {
    const res = await axios.put(
      "http://localhost:8000/api/pets/" + pet._id,
      pet,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    console.log(res);
    dispatch(updatePetSuccess(res.data));
  } catch (err) {
    dispatch(updateProductFailed());
  }
};

export const updateServicePack = async (servicePack, accessToken, dispatch) => {
  dispatch(updateServicePackStart());
  window.location.reload();
  try {
    console.log(servicePack);
    const res = await axios.put(
      "http://localhost:8000/api/service-pack/" + servicePack._id,
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
  window.location.reload();
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

export const updateOrder = async (order, accessToken, dispatch, navigate) => {
  dispatch(updateOrderStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/order/" + order._id,
      order,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    window.location.reload();
    dispatch(updateOrderSuccess(res.data));
  } catch (err) {
    dispatch(updateOrderFailed());
  }
};

export const updateContact = async (
  contact,
  accessToken,
  dispatch,
  navigate
) => {
  dispatch(updateContactStart());
  try {
    const res = await axios.put(
      "http://localhost:8000/api/contact/" + contact._id,
      contact,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    window.location.reload();
    dispatch(updateContactSuccess(res.data));
  } catch (err) {
    dispatch(updateContactFailed());
  }
};

export const deleteUser = async (accessToken, dispatch, id) => {
  dispatch(deleteUserStart());
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/service-pack/" + id,
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
  window.location.reload();
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/service-pack/" + id + "/force",
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
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
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

export const deleteOrder = async (accessToken, dispatch, id) => {
  dispatch(deleteOrderStart());
  window.location.reload();
  try {
    const res = await axios.delete("http://localhost:8000/api/order/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteOrderSuccess(res.data));
  } catch (err) {
    dispatch(deleteOrderFailed());
  }
};

export const deleteOrderForce = async (accessToken, dispatch, id) => {
  dispatch(deleteOrderStart());
  window.location.reload();
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/order/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteOrderSuccess(res.data));
  } catch (err) {
    dispatch(deleteOrderFailed());
  }
};

export const deleteContact = async (accessToken, dispatch, id) => {
  dispatch(deleteContactStart());
  window.location.reload();
  try {
    const res = await axios.delete("http://localhost:8000/api/contact/" + id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(deleteContactSuccess(res.data));
  } catch (err) {
    dispatch(deleteContactFailed());
  }
};

export const deleteContactForce = async (accessToken, dispatch, id) => {
  dispatch(deleteContactStart());
  window.location.reload();
  try {
    const res = await axios.delete(
      "http://localhost:8000/api/contact/" + id + "/force",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteContactSuccess(res.data));
  } catch (err) {
    dispatch(deleteContactFailed());
  }
};

export const restoreUser = async (accessToken, dispatch, id) => {
  dispatch(restoreUserStart());
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
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
  window.location.reload();
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/service-pack/" + id + "/restore",
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
  window.location.reload();
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

export const restoreOrder = async (accessToken, dispatch, id) => {
  dispatch(restoreOrderStart());
  window.location.reload();
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/order/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restoreOrderSuccess(res.data));
  } catch (err) {
    dispatch(restoreOrderFailed());
  }
};

export const restoreContact = async (accessToken, dispatch, id) => {
  dispatch(restoreContactStart());
  window.location.reload();
  try {
    const res = await axios.patch(
      "http://localhost:8000/api/contact/" + id + "/restore",
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(restoreContactSuccess(res.data));
  } catch (err) {
    dispatch(restoreContactFailed());
  }
};

export const handleActionUserForm = async (
  accessToken,
  dispatch,
  userList,
  action,
  axiosJWT
) => {
  dispatch(getUserStart());
  window.location.reload();
  try {
    const res = await axiosJWT.post(
      "http://localhost:8000/api/users/handle-action-form",
      { userId: userList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

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
    window.location.reload();
    const res = await axios.post(
      "http://localhost:8000/api/products/handle-action-form",
      { productId: productList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
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
    window.location.reload();
    const res = await axios.post(
      "http://localhost:8000/api/pets/handle-action-form",
      { petId: petList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

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
    window.location.reload();
    console.log(servicePackList, action);
    const res = await axios.post(
      "http://localhost:8000/api/service-pack/handle-action-form",
      { servicePackListId: servicePackList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

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
    window.location.reload();
    const res = await axios.post(
      "http://localhost:8000/api/appointments/handle-action-form",
      { appointmentId: appointmentList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );

    dispatch(getAppointmentSuccess(res.data));
  } catch (err) {
    dispatch(getAppointmentFailed());
  }
};

export const handleActionOrderForm = async (
  accessToken,
  dispatch,
  orderList,
  action
) => {
  dispatch(getOrderStart());
  try {
    window.location.reload();
    const res = await axios.post(
      "http://localhost:8000/api/order/handle-action-form",
      { orderId: orderList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailed());
  }
};

export const handleActionContactForm = async (
  accessToken,
  dispatch,
  orderList,
  action
) => {
  dispatch(getContactStart());
  try {
    window.location.reload();
    const res = await axios.post(
      "http://localhost:8000/api/contact/handle-action-form",
      { contactId: orderList, action: action },
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(getContactSuccess(res.data));
  } catch (err) {
    dispatch(getContactFailed());
  }
};

export const logoutUser = async (dispatch, id, accessToken, navigate) => {
  dispatch(loginStart());
  try {
    await axios.post("http://localhost:8000/api/auth/logout", id, {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(loginSuccess());
    navigate.push("/home");
  } catch (err) {
    dispatch(loginFailed());
  }
};
