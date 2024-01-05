"use client";

import React, { useEffect, useState } from "react";
import {
  deleteAppointment,
  deleteOrder,
  getAllAppointment,
  getAllOrder,
  getAllPet,
  getAllProduct,
  getAllServicePack,
} from "@/redux/features/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import axios from "axios";
import PathLink from "@/app/_components/PathLink";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";

const axiosJWT = axios.create();

const OrderSection = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const appointmentList = useSelector(
    (state) => state.appointments?.appointments?.allAppointments?.appointments
  );
  const petList = useSelector((state) => state.pets?.pets?.allPets?.pets);

  const servicePackList = useSelector(
    (state) => state.servicePack?.servicePacks?.allServicePacks?.servicePack
  );

  const orderList = useSelector(
    (state) => state.order?.orders?.allOrder?.order
  );

  const productList = useSelector(
    (state) => state.products.products?.allProducts?.products
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
      getAllAppointment(user?.accessToken, dispatch, axiosJWT);
      getAllServicePack(user?.accessToken, dispatch, axiosJWT);
      getAllPet(user?.accessToken, dispatch, axiosJWT);
      getAllProduct(user?.accessToken, dispatch, axiosJWT);
      getAllOrder(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [orderId, setOrderId] = useState(null);
  const [appointmentId, setAppointmentId] = useState(null);

  const {
    isOpen: isOpenDeleteOrder,
    onOpen: OnOpenDeleteOrder,
    onClose: onCloseDeleteOrder,
  } = useDisclosure();
  const cancelRefOrder = React.useRef();

  const {
    isOpen: isOpenDeleteAppointment,
    onOpen: OnOpenDeleteAppointment,
    onClose: onCloseDeleteAppointment,
  } = useDisclosure();
  const cancelRefAppointment = React.useRef();

  const handleDeleteOrder = (id) => {
    setOrderId(id);
    OnOpenDeleteOrder();
  };

  const handleDeleteOrderForce = (id) => {
    deleteOrder(user?.accessToken, dispatch, id, user?._id);
  };

  const handleDeleteAppointment = (id) => {
    setAppointmentId(id);
    OnOpenDeleteAppointment();
  };

  const handleDeleteAppointmentForce = (id) => {
    deleteAppointment(user?.accessToken, dispatch, id, user?._id);
  };

  return (
    <section>
      <div className="container">
        <PathLink content="Purchase" />
        <div className="line"></div>
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab fontSize="20px">Sản phẩm</Tab>
            <Tab fontSize="20px">Đặt lịch</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab fontSize="20px">Đơn đã được chấp nhập</Tab>
                  <Tab fontSize="20px">Đơn đang chờ xác nhận</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
                    <TableContainer>
                      <Table variant="simple" size="lg">
                        <Thead>
                          <Tr>
                            <Th fontSize="xl" textAlign="center">
                              #
                            </Th>
                            <Th fontSize="xl" textAlign="center">
                              Sản phẩm
                            </Th>
                            <Th fontSize="xl" textAlign="center">
                              Tổng tiền
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {orderList
                            ?.filter((order) => order.user === user?._id)
                            .map((order, index) => {
                              const productIds = order.products.map(
                                (prd) => prd.product
                              );

                              const orderProductDetails = productList?.filter(
                                (product) =>
                                  productIds.includes(product._id.toString())
                              );

                              if (order.status === "Solved") {
                                return (
                                  <Tr key={order._id}>
                                    <Td textAlign="center" fontSize="40px">
                                      {index + 1}
                                    </Td>
                                    <Td textAlign="center">
                                      {orderProductDetails.map(
                                        (product, index) => (
                                          <Flex
                                            key={index}
                                            gap={4}
                                            marginBottom={10}
                                            alignItems="center"
                                            justifyContent="center"
                                          >
                                            <Box>
                                              <Image
                                                boxSize="60px"
                                                src={
                                                  `http://localhost:8000/images/` +
                                                  product.thumbnail
                                                }
                                                alt="Dan Abramov"
                                              />
                                            </Box>
                                            <div>
                                              <span>${product.price}</span>
                                              <br />
                                              <span>
                                                x
                                                {
                                                  order.products.find(
                                                    (prd) =>
                                                      prd.product ===
                                                      product._id
                                                  )?.quantity
                                                }
                                              </span>
                                            </div>
                                          </Flex>
                                        )
                                      )}
                                    </Td>
                                    <Td textAlign="center" fontSize="40px">
                                      ${order.totalPrice}
                                    </Td>
                                  </Tr>
                                );
                              }
                            })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>

                  <TabPanel>
                    <TableContainer>
                      <Table variant="simple" size="lg">
                        <Thead>
                          <Tr>
                            <Th fontSize="xl" textAlign="center">
                              #
                            </Th>
                            <Th fontSize="xl" textAlign="center">
                              Sản phẩm
                            </Th>
                            <Th fontSize="xl" textAlign="center">
                              Tổng tiền
                            </Th>
                            <Th fontSize="xl" textAlign="center">
                              Hủy đơn hàng
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {orderList
                            ?.filter((order) => order.user === user?._id)
                            .map((order, index) => {
                              const productIds = order.products.map(
                                (prd) => prd.product
                              );

                              const orderProductDetails = productList?.filter(
                                (product) =>
                                  productIds.includes(product._id.toString())
                              );

                              if (order.status === "Pending") {
                                return (
                                  <Tr key={order._id + 200}>
                                    <Td textAlign="center" fontSize="40px">
                                      {index + 1}
                                    </Td>
                                    <Td textAlign="center">
                                      {orderProductDetails.map(
                                        (product, index) => (
                                          <Flex
                                            gap={4}
                                            key={index + 200}
                                            marginBottom={10}
                                            alignItems="center"
                                            justifyContent="center"
                                          >
                                            <Box>
                                              <Image
                                                boxSize="60px"
                                                src={
                                                  `http://localhost:8000/images/` +
                                                  product.thumbnail
                                                }
                                                alt="Dan Abramov"
                                              />
                                            </Box>
                                            <div>
                                              <span>${product.price}</span>
                                              <br />
                                              <span>
                                                x
                                                {
                                                  order.products.find(
                                                    (prd) =>
                                                      prd.product ===
                                                      product._id
                                                  )?.quantity
                                                }
                                              </span>
                                            </div>
                                          </Flex>
                                        )
                                      )}
                                    </Td>
                                    <Td textAlign="center" fontSize="40px">
                                      ${order.totalPrice}
                                    </Td>
                                    <Td textAlign="center">
                                      <button
                                        className="btn btn--primary"
                                        onClick={() =>
                                          handleDeleteOrder(order._id)
                                        }
                                      >
                                        Hủy
                                      </button>
                                    </Td>
                                  </Tr>
                                );
                              }
                            })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab fontSize="20px">Đơn đặt lịch đã được chấp nhận</Tab>
                  <Tab fontSize="20px">Đơn đặt lịch chờ xác nhận</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <TableContainer>
                      <Table variant="simple" size="lg">
                        <Thead>
                          <Tr>
                            <Th fontSize="xl">#</Th>
                            <Th fontSize="xl">Tên pet</Th>
                            <Th fontSize="xl">Dịch vụ</Th>
                            <Th fontSize="xl">Gói</Th>
                            <Th fontSize="xl">Giá</Th>
                            <Th fontSize="xl">Ngày đặt</Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {appointmentList
                            ?.filter(
                              (appointmentList) =>
                                appointmentList.user === user?._id
                            )
                            .map((appointment, index) => {
                              const petName = petList?.find(
                                (pet) => pet._id === appointment.pet
                              );

                              const servicePack = servicePackList?.find(
                                (service) => service._id === appointment.service
                              );
                              const appointmentPackageId = appointment.package;

                              const foundServicePack = servicePackList?.find(
                                (servicePack) =>
                                  servicePack.packages.some(
                                    (pack) => pack._id === appointmentPackageId
                                  )
                              );

                              const foundPackage = foundServicePack
                                ? foundServicePack.packages?.find(
                                    (pack) => pack._id === appointmentPackageId
                                  )
                                : null;

                              if (appointment.status === "Solved") {
                                return (
                                  <Tr key={appointment._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{petName?.name}</Td>
                                    <Td>{servicePack?.serviceName}</Td>
                                    <Td>{foundPackage?.name}</Td>
                                    <Td>{foundPackage?.price}</Td>
                                    <Td>{appointment.date}</Td>
                                  </Tr>
                                );
                              }
                            })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>

                  <TabPanel>
                    <TableContainer>
                      <Table variant="simple" size="lg">
                        <Thead>
                          <Tr>
                            <Th fontSize="xl">#</Th>
                            <Th fontSize="xl">Tên pet</Th>
                            <Th fontSize="xl">Dịch vụ</Th>
                            <Th fontSize="xl">Gói</Th>
                            <Th fontSize="xl">Giá</Th>
                            <Th fontSize="xl">Ngày đặt</Th>
                            <Th fontSize="xl" textAlign="center">
                              Hủy đặt lịch
                            </Th>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {appointmentList
                            ?.filter(
                              (appointmentList) =>
                                appointmentList.user === user?._id
                            )
                            .map((appointment, index) => {
                              const petName = petList?.find(
                                (pet) => pet._id === appointment.pet
                              );

                              const servicePack = servicePackList?.find(
                                (service) => service._id === appointment.service
                              );
                              const appointmentPackageId = appointment.package;

                              const foundServicePack = servicePackList?.find(
                                (servicePack) =>
                                  servicePack.packages.some(
                                    (pack) => pack._id === appointmentPackageId
                                  )
                              );

                              const foundPackage = foundServicePack
                                ? foundServicePack.packages?.find(
                                    (pack) => pack._id === appointmentPackageId
                                  )
                                : null;

                              if (appointment.status === "Pending") {
                                return (
                                  <Tr key={appointment._id}>
                                    <Td>{index + 1}</Td>
                                    <Td>{petName?.name}</Td>
                                    <Td>{servicePack?.serviceName}</Td>
                                    <Td>{foundPackage?.name}</Td>
                                    <Td>{foundPackage?.price}</Td>
                                    <Td>{appointment.date}</Td>
                                    <Td textAlign="center">
                                      <button
                                        className="btn btn--primary"
                                        onClick={() =>
                                          handleDeleteAppointment(
                                            appointment._id
                                          )
                                        }
                                      >
                                        Hủy
                                      </button>
                                    </Td>
                                  </Tr>
                                );
                              }
                            })}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <AlertDialog
        isOpen={isOpenDeleteOrder}
        leastDestructiveRef={cancelRefOrder}
        onClose={onCloseDeleteOrder}
      >
        <AlertDialogOverlay>
          <AlertDialogContent marginTop="100px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa hóa đơn này
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn hóa đơn này</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRefOrder} onClick={onCloseDeleteOrder}>
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteOrderForce(orderId);
                  onCloseDeleteOrder();
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
        isOpen={isOpenDeleteAppointment}
        leastDestructiveRef={cancelRefAppointment}
        onClose={onCloseDeleteAppointment}
      >
        <AlertDialogOverlay>
          <AlertDialogContent marginTop="100px">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa đơn đặt lịch này
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn đơn đặt lịch này</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRefAppointment}
                onClick={onCloseDeleteAppointment}
              >
                Hủy
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteAppointmentForce(appointmentId);
                  onCloseDeleteAppointment();
                }}
                ml={3}
              >
                Xóa
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </section>
  );
};

export default OrderSection;
