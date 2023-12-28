"use client";

import {
  Button,
  Checkbox,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Select,
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllOrder,
  getAllUser,
  getAllProduct,
  updateOrder,
  deleteOrder,
  handleActionOrderForm,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const StoredOrder = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users?.users?.allUsers?.users);
  const productList = useSelector(
    (state) => state.products.products?.allProducts?.products
  );
  const orderList = useSelector(
    (state) => state.order?.orders?.allOrder?.order
  );

  const dispatch = useDispatch();
  const navigate = useRouter();

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/refresh", {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {
      console.error("Error refreshing token:", err);
    }
  };

  axiosJWT.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken();
        const refreshUser = {
          ...user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        };
        dispatch(loginSuccess(refreshUser));
        config.headers["token"] = "Bearer" + data.accessToken;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  useEffect(() => {
    if (!user) {
      navigate.push("/home");
    }
    if (user?.accessToken) {
      getAllOrder(user?.accessToken, dispatch, axiosJWT);
      getAllUser(user?.accessToken, dispatch, axiosJWT);
      getAllProduct(user?.accessToken, dispatch);
    }
  }, []);

  const [orderId, setOrderId] = useState(null);
  const [statusOrder, setStatusOrder] = useState(null);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const {
    isOpen: isOpenOderAccess,
    onOpen: OnOpenOderAccess,
    onClose: onClosOderAccess,
  } = useDisclosure();
  const cancelOrderAccessRef = React.useRef();

  const handleOrderAccess = (
    _id,
    status,
    user,
    email,
    phoneNumber,
    address,
    productDetails,
    totalPrice,
    paymentMethod
  ) => {
    setStatusOrder({
      _id,
      status,
      user,
      email,
      phoneNumber,
      address,
      productDetails,
      totalPrice,
      paymentMethod,
    });
    OnOpenOderAccess();
  };

  const handleSubmitStatusOrder = (order) => {
    let status;
    if (order.status === "Pending") {
      status = "Solved";
    } else {
      status = "Pending";
    }
    const newOrder = {
      _id: order._id,
      status: status,
      user: order.user,
      email: order.email,
      phoneNumber: order.phoneNumber,
      address: order.address,
      ProductDetails: order.productDetails,
      totalPrice: order.totalPrice,
      paymentMethod: order.paymentMethod,
    };

    updateOrder(newOrder, user?.accessToken, dispatch, navigate);
  };

  const handleDelete = (id) => {
    setOrderId(id);
    OnOpenDelete();
  };

  const handleDeleteOrder = (id) => {
    deleteOrder(user?.accessToken, dispatch, id, axiosJWT);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const orderListIds = orderList.map((orderList) => orderList._id);
    setSelectedItems(selectAll ? [] : orderListIds);
  };

  const handleSelectItem = (orderId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(orderId)
        ? prevSelectedItems.filter((id) => id !== orderId)
        : [...prevSelectedItems, orderId];

      setSelectAll(
        newSelectedItems.length === orderList.length &&
          newSelectedItems.length > 0
      );

      return newSelectedItems;
    });
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [actionValue, setActionValue] = useState("");

  useEffect(() => {
    selectedItems.length > 0
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  }, [selectedItems]);

  const handleSubmitForm = (e) => {
    e.preventDefault()
    handleActionOrderForm(
      user?.accessToken,
      dispatch,
      selectedItems,
      actionValue
    );
  };

  return (
    <Flex gap="20px">
      <Navigation />

      <form style={{ width: "100%" }} onSubmit={handleSubmitForm}>
        <Flex gap={10} alignItems="center" padding="10px 0 0 18px">
          <Checkbox size="lg" onChange={handleSelectAll} isChecked={selectAll}>
            <Text fontSize="2xl">Chọn tất cả</Text>
          </Checkbox>
          <Select
            w="100px"
            size="lg"
            placeholder="Select option"
            value={actionValue}
            onChange={(e) => setActionValue(e.target.value)}
          >
            <option value="delete">Xóa</option>
          </Select>
          <Button
            colorScheme="blue"
            isDisabled={isButtonDisabled}
            type="submit"
          >
            Thực hiện
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th fontSize="xl" textAlign="center"></Th>
                <Th fontSize="xl" textAlign="center">
                  #
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Tên khách hàng
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Sản phẩm
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Số lượng
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Tổng tiền
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Phương thức thanh toán
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Ngày đặt
                </Th>
                <Th fontSize="xl" textAlign="center">
                  Trạng thái
                </Th>

                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {orderList?.map((order, index) => {
                const userName = userList?.find(
                  (user) => user._id === order.user
                );

                const productIds = order.products.map((prd) => prd.product);

                const orderProductDetails = productList?.filter((product) =>
                  productIds.includes(product._id.toString())
                );

                const dateTime = new Date(order.createdAt);

                const orderDay = dateTime.getDate();
                const orderMonth = dateTime.getMonth();
                const orderYear = dateTime.getYear();
                const orderHours = dateTime.getHours();
                const orderMinutes = dateTime.getMinutes();

                const orderDate = `${orderHours}:${orderMinutes}--${orderDay}/${orderMonth}/${orderYear}`;

                return (
                  <Tr key={order._id}>
                    <Td textAlign="center">
                      <Checkbox
                        isChecked={selectedItems.includes(order._id)}
                        onChange={() => handleSelectItem(order._id)}
                      ></Checkbox>
                    </Td>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">{userName?.username}</Td>
                    <Td textAlign="center">
                      {orderProductDetails.map((product) => (
                        <Box key={product._id}>
                          <div>{product.name}</div>
                        </Box>
                      ))}
                    </Td>
                    <Td textAlign="center">
                      {order.products.map((product, index) => (
                        <Box key={index}>{product.quantity}</Box>
                      ))}
                    </Td>
                    <Td textAlign="center">{order.totalPrice}</Td>
                    <Td textAlign="center">{order.paymentMethod}</Td>
                    <Td>{orderDate}</Td>
                    <Td textAlign="center">{order.status}</Td>
                    <Td textAlign="center">
                      <Button
                        colorScheme={
                          order.status === "Pending" ? "whatsapp" : "gray"
                        }
                        marginRight={2}
                        onClick={() =>
                          handleOrderAccess(
                            order._id,
                            order.status,
                            order.user,
                            order.email,
                            order.phoneNumber,
                            order.address,
                            orderProductDetails,
                            order.totalPrice,
                            order.paymentMethod
                          )
                        }
                      >
                        {order.status === "Pending" ? "Chấp nhận" : "Hủy đơn"}
                      </Button>

                      <Button
                        colorScheme="red"
                        onClick={() => handleDelete(order._id)}
                      >
                        Xóa
                      </Button>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </form>
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa hóa đơn
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa hóa đơn</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteOrder(orderId);
                  onCloseDelete();
                }}
                ml={3}
              >
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <AlertDialog
        isOpen={isOpenOderAccess}
        leastDestructiveRef={cancelOrderAccessRef}
        onClose={onClosOderAccess}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {statusOrder?.status === "Pending"
                ? "Chấp nhận đơn hàng"
                : "Hủy đơn hàng này"}
            </AlertDialogHeader>

            <AlertDialogBody>
              {statusOrder?.status === "Pending"
                ? "Bạn chắc chắn nhận đơn hàng"
                : "Bạn chắc chắn hủy đơn hàng này"}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelOrderAccessRef} onClick={onClosOderAccess}>
                Thoát
              </Button>
              <Button
                colorScheme={statusOrder?.status === "Pending" ? "blue" : "red"}
                onClick={() => {
                  handleSubmitStatusOrder(statusOrder);
                  onClosOderAccess();
                }}
                ml={3}
              >
                {statusOrder?.status === "Pending" ? "Chấp nhận" : "Hủy"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default StoredOrder;
