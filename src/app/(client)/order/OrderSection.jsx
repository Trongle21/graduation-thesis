"use client";

import React, { useEffect } from "react";
import {
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
  Box,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
                  <Tab fontSize="20px">Tất cả</Tab>
                  <Tab fontSize="20px">Đơn đã được chấp nhập</Tab>
                  <Tab fontSize="20px">Đơn đang chờ xác nhận</Tab>
                </TabList>

                <TabPanels>
                  <TabPanel>
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
                        return (
                          <Box key={order._id}>
                            {orderProductDetails.map((product) => (
                              <Flex key={product._id} gap={4} marginBottom={10}>
                                <Box>
                                  <Image
                                    boxSize="100px"
                                    src={
                                      `http://localhost:8000/images/` +
                                      product.thumbnail
                                    }
                                    alt="Dan Abramov"
                                  />
                                </Box>
                                <div>
                                  <Heading as="h5" size="lg">
                                    {product.description}
                                  </Heading>
                                  <span>${product.price}</span>
                                  <br />
                                  <span>
                                    x
                                    {
                                      order.products.find(
                                        (prd) => prd.product === product._id
                                      )?.quantity
                                    }
                                  </span>
                                </div>
                              </Flex>
                            ))}
                            <Flex
                              justifyContent="space-between"
                              marginBottom={10}
                            >
                              <Heading as="h5" size="2xl" color="#fa9645">
                                Tổng tiền : ${order.totalPrice}
                              </Heading>
                            </Flex>
                            <div className="line"></div>
                          </Box>
                        );
                      })}
                  </TabPanel>
                  <TabPanel>
                    <TabPanel>
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
                              <Box key={index}>
                                {orderProductDetails.map((product, index) => (
                                  <Flex key={index} gap={4} marginBottom={10}>
                                    <Box>
                                      <Image
                                        boxSize="100px"
                                        src={
                                          `http://localhost:8000/images/` +
                                          product.thumbnail
                                        }
                                        alt="Dan Abramov"
                                      />
                                    </Box>
                                    <div>
                                      <Heading as="h5" size="lg">
                                        {product.description}
                                      </Heading>
                                      <span>${product.price}</span>
                                      <br />
                                      <span>
                                        x
                                        {
                                          order.products.find(
                                            (prd) => prd.product === product._id
                                          )?.quantity
                                        }
                                      </span>
                                    </div>
                                  </Flex>
                                ))}
                                <Flex
                                  justifyContent="space-between"
                                  marginBottom={10}
                                >
                                  <Heading as="h5" size="2xl" color="#fa9645">
                                    Tổng tiền : ${order.totalPrice}
                                  </Heading>
                                </Flex>
                                <div className="line"></div>
                              </Box>
                            );
                          }
                        })}
                    </TabPanel>
                  </TabPanel>
                  <TabPanel>
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
                            <Box key={order._id + index}>
                              {orderProductDetails.map((product) => (
                                <Flex
                                  key={order._id + index}
                                  gap={4}
                                  marginBottom={10}
                                >
                                  <Box>
                                    <Image
                                      boxSize="100px"
                                      src={
                                        `http://localhost:8000/images/` +
                                        product.thumbnail
                                      }
                                      alt="Dan Abramov"
                                    />
                                  </Box>
                                  <div>
                                    <Heading as="h5" size="lg">
                                      {product.description}
                                    </Heading>
                                    <span>${product.price}</span>
                                    <br />
                                    <span>
                                      x
                                      {
                                        order.products.find(
                                          (prd) => prd.product === product._id
                                        )?.quantity
                                      }
                                    </span>
                                  </div>
                                </Flex>
                              ))}
                              <Flex
                                justifyContent="space-between"
                                marginBottom={10}
                              >
                                <Heading as="h5" size="2xl" color="#fa9645">
                                  Tổng tiền : ${order.totalPrice}
                                </Heading>
                              </Flex>
                              <div className="line"></div>
                            </Box>
                          );
                        }
                      })}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
            <TabPanel>
              <Tabs variant="enclosed">
                <TabList>
                  <Tab fontSize="20px">Tất cả</Tab>
                  <Tab fontSize="20px">Đơn đặt lịch đã được chấp nhận</Tab>
                  <Tab fontSize="20px">Đơn đặt lịch chờ xác nhận</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {appointmentList
                      ?.filter(
                        (appointmentList) => appointmentList.user === user?._id
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

                        return (
                          <Flex
                            key={appointment._id}
                            gap={16}
                            justifyContent="space-between"
                          >
                            <Box fontSize={20}>
                              <p>Tên pet: {petName?.name}</p>
                            </Box>
                            <Box fontSize={20}>
                              <p>Dịch vụ: {servicePack?.serviceName}</p>
                            </Box>
                            <Box fontSize={20}>
                              <p>Gói: {foundPackage?.name}</p>
                            </Box>
                            <Box fontSize={20}>
                              <p>Giá: {foundPackage?.price}</p>
                            </Box>
                          </Flex>
                        );
                      })}
                  </TabPanel>
                  <TabPanel>
                    {appointmentList
                      ?.filter(
                        (appointmentList) => appointmentList.user === user?._id
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
                            <Flex
                              key={index}
                              gap={16}
                              justifyContent="space-between"
                            >
                              <Box fontSize={20}>
                                <p>Tên pet: {petName?.name}</p>
                              </Box>
                              <Box fontSize={20}>
                                <p>Dịch vụ: {servicePack?.serviceName}</p>
                              </Box>
                              <Box fontSize={20}>
                                <p>Gói: {foundPackage?.name}</p>
                              </Box>
                              <Box fontSize={20}>
                                <p>Giá: {foundPackage?.price}</p>
                              </Box>
                            </Flex>
                          );
                        }
                      })}
                  </TabPanel>
                  <TabPanel>
                    {appointmentList
                      ?.filter(
                        (appointmentList) => appointmentList.user === user?._id
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
                            <Flex
                              key={appointment._id + index}
                              gap={16}
                              justifyContent="space-between"
                            >
                              <Box fontSize={20}>
                                <p>Tên pet: {petName?.name}</p>
                              </Box>
                              <Box fontSize={20}>
                                <p>Dịch vụ: {servicePack?.serviceName}</p>
                              </Box>
                              <Box fontSize={20}>
                                <p>Gói: {foundPackage?.name}</p>
                              </Box>
                              <Box fontSize={20}>
                                <p>Giá: {foundPackage?.price}</p>
                              </Box>
                            </Flex>
                          );
                        }
                      })}
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </section>
  );
};

export default OrderSection;
