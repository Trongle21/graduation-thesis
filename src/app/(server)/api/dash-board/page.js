"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import {
  FaCartArrowDown,
  FaLongArrowAltUp,
  FaProductHunt,
  FaServicestack,
  FaUser,
} from "react-icons/fa";

import Navigation from "@/app/_components/Navigation";
import RevenueChart from "../../../_components/RevenueChart";
import { MdContactPhone, MdOutlinePets } from "react-icons/md";
import CardDashBoard from "@/app/_components/CardDashBoard";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getAllAppointment,
  getAllContact,
  getAllOrder,
  getAllPet,
  getAllProduct,
  getAllServicePack,
  getAllUser,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
const { jwtDecode } = require("jwt-decode");

const axiosJWT = axios.create();

const StoredProducts = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users?.users?.allUsers?.users);
  const petList = useSelector((state) => state.pets?.pets?.allPets?.pets);
  const servicePackList = useSelector(
    (state) => state.servicePack?.servicePacks?.allServicePacks?.servicePack
  );
  const appointmentList = useSelector(
    (state) => state.appointments?.appointments?.allAppointments?.appointments
  );

  const productList = useSelector(
    (state) => state.products.products?.allProducts?.products
  );
  const orderList = useSelector(
    (state) => state.order?.orders?.allOrder?.order
  );

  const contactList = useSelector(
    (state) => state.contact?.contacts?.allContact?.contact
  );

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

  const dispatch = useDispatch();
  const navigate = useRouter();

  useEffect(() => {
    if (!user) {
      navigate.push("/home");
    }
    if (user?.accessToken) {
      getAllUser(user?.accessToken, dispatch, axiosJWT);
      getAllProduct(user?.accessToken, dispatch, axiosJWT);
      getAllPet(user?.accessToken, dispatch, axiosJWT);
      getAllOrder(user?.accessToken, dispatch, axiosJWT);
      getAllAppointment(user?.accessToken, dispatch, axiosJWT);
      getAllServicePack(user?.accessToken, dispatch, axiosJWT);
      getAllContact(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [totalRevenueOrder, setTotalRevenueOrder] = useState(0);
  const [totalRevenueAppointment, setTotalRevenueAppointment] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const totalRevenueOrder = orderList?.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    setTotalRevenueOrder(totalRevenueOrder);

    const totalRevenueAppointment = appointmentList?.reduce(
      (acc, order) => acc + order.totalPrice,
      0
    );

    setTotalRevenueAppointment(totalRevenueAppointment);

    setTotalRevenue(totalRevenueOrder + totalRevenueAppointment);
  }, [orderList, appointmentList]);

  const [orderedInJanuary, setOrderedJanuary] = useState(0);
  const [orderedInFebruary, setOrderedFebruary] = useState(0);
  const [orderedInMarch, setOrderedMarch] = useState(0);
  const [orderedInApril, setOrderedApril] = useState(0);
  const [orderedInMay, setOrderedMay] = useState(0);
  const [orderedInJune, setOrderedJune] = useState(0);
  const [orderedInJuly, setOrderedJuly] = useState(0);
  const [orderedInAugust, setOrderedAugust] = useState(0);
  const [orderedInSeptember, setOrderedSeptember] = useState(0);
  const [orderedInOctober, setOrderedOctober] = useState(0);
  const [orderedInNovember, setOrderedNovember] = useState(0);
  const [orderedInDecember, setOrderedDecember] = useState(0);

  const [appointmentInJanuary, setAppointmentJanuary] = useState(0);
  const [appointmentInFebruary, setAppointmentFebruary] = useState(0);
  const [appointmentInMarch, setAppointmentMarch] = useState(0);
  const [appointmentInApril, setAppointmentApril] = useState(0);
  const [appointmentInMay, setAppointmentMay] = useState(0);
  const [appointmentInJune, setAppointmentJune] = useState(0);
  const [appointmentInJuly, setAppointmentJuly] = useState(0);
  const [appointmentInAugust, setAppointmentAugust] = useState(0);
  const [appointmentInSeptember, setAppointmentSeptember] = useState(0);
  const [appointmentInOctober, setAppointmentOctober] = useState(0);
  const [appointmentInNovember, setAppointmentNovember] = useState(0);
  const [appointmentInDecember, setAppointmentDecember] = useState(0);

  useEffect(() => {
    const ordersByMonthList = {};

    for (let month = 1; month <= 12; month++) {
      const ordersInMonth = orderList?.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === month - 1;
      });

      ordersByMonthList[month] = ordersInMonth;

      const totalOrderPriceInJun = ordersByMonthList[1]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedJanuary(totalOrderPriceInJun);

      const totalOrderPriceInFeb = ordersByMonthList[2]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedFebruary(totalOrderPriceInFeb);

      const totalOrderPriceInMar = ordersByMonthList[3]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedMarch(totalOrderPriceInMar);

      const totalOrderPriceInApr = ordersByMonthList[4]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedApril(totalOrderPriceInApr);

      const totalOrderPriceInMay = ordersByMonthList[5]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedMay(totalOrderPriceInMay);

      const totalOrderPriceInJune = ordersByMonthList[6]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedJune(totalOrderPriceInJune);

      const totalOrderPriceInJuly = ordersByMonthList[7]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedJuly(totalOrderPriceInJuly);

      const totalOrderPriceInAug = ordersByMonthList[8]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedAugust(totalOrderPriceInAug);

      const totalOrderPriceInSep = ordersByMonthList[9]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedSeptember(totalOrderPriceInSep);

      const totalOrderPriceInOct = ordersByMonthList[10]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedOctober(totalOrderPriceInOct);

      const totalOrderPriceInNov = ordersByMonthList[11]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedNovember(totalOrderPriceInNov);

      const totalOrderPriceInDec = ordersByMonthList[12]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setOrderedDecember(totalOrderPriceInDec);
    }
  }, [orderList]);

  useEffect(() => {
    const appointmentsByMonthList = {};

    for (let month = 1; month <= 12; month++) {
      const appointmentsInMonth = appointmentList?.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === month - 1;
      });

      appointmentsByMonthList[month] = appointmentsInMonth;

      const totalAppointmentPriceInJun = appointmentsByMonthList[1]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentJanuary(totalAppointmentPriceInJun);

      const totalAppointmentPriceInFeb = appointmentsByMonthList[2]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentFebruary(totalAppointmentPriceInFeb);

      const totalAppointmentPriceInMar = appointmentsByMonthList[3]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentMarch(totalAppointmentPriceInMar);

      const totalAppointmentPriceInApr = appointmentsByMonthList[4]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentApril(totalAppointmentPriceInApr);

      const totalAppointmentPriceInMay = appointmentsByMonthList[5]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentMay(totalAppointmentPriceInMay);

      const totalAppointmentPriceInJune = appointmentsByMonthList[6]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentJune(totalAppointmentPriceInJune);

      const totalAppointmentPriceInJuly = appointmentsByMonthList[7]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentJuly(totalAppointmentPriceInJuly);

      const totalAppointmentPriceInAug = appointmentsByMonthList[8]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentAugust(totalAppointmentPriceInAug);

      const totalAppointmentPriceInSep = appointmentsByMonthList[9]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentSeptember(totalAppointmentPriceInSep);

      const totalAppointmentPriceInOct = appointmentsByMonthList[10]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentOctober(totalAppointmentPriceInOct);

      const totalAppointmentPriceInNov = appointmentsByMonthList[11]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentNovember(totalAppointmentPriceInNov);

      const totalAppointmentPriceInDec = appointmentsByMonthList[12]?.reduce(
        (acc, order) => acc + order.totalPrice,
        0
      );

      setAppointmentDecember(totalAppointmentPriceInDec);
    }
  }, [appointmentList]);

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Doanh thu",
        data: [],
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const mockData = {
      labels: [
        "Tháng 1",
        "Tháng 2",
        "Tháng 3",
        "Tháng 4",
        "Tháng 5",
        "Tháng 6",
        "Tháng 7",
        "Tháng 8",
        "Tháng 9",
        "Tháng 10",
        "Tháng 11",
        "Tháng 12",
      ],

      datasets: [
        {
          label: "Tổng doanh thu",
          data: [
            orderedInJanuary + appointmentInJanuary,
            orderedInFebruary + appointmentInFebruary,
            orderedInMarch + appointmentInMarch,
            orderedInApril + appointmentInApril,
            orderedInMay + appointmentInMay,
            orderedInJune + appointmentInJune,
            orderedInJuly + appointmentInJuly,
            orderedInAugust + appointmentInAugust,
            orderedInSeptember + appointmentInSeptember,
            orderedInOctober + appointmentInOctober,
            orderedInNovember + appointmentInNovember,
            orderedInDecember + appointmentInDecember,
          ],
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          borderWidth: 1,
        },
        {
          label: "Doanh thu sản phẩm",
          data: [
            orderedInJanuary,
            orderedInFebruary,
            orderedInMarch,
            orderedInApril,
            orderedInMay,
            orderedInJune,
            orderedInJuly,
            orderedInAugust,
            orderedInSeptember,
            orderedInOctober,
            orderedInNovember,
            orderedInDecember,
          ],
          backgroundColor: "rgba(0,128,0,0.2)",
          borderColor: "rgba(0,128,0,1)",
          borderWidth: 1,
        },
        {
          label: "Doanh thu dịch vụ",
          data: [
            appointmentInJanuary,
            appointmentInFebruary,
            appointmentInMarch,
            appointmentInApril,
            appointmentInMay,
            appointmentInJune,
            appointmentInJuly,
            appointmentInAugust,
            appointmentInSeptember,
            appointmentInOctober,
            appointmentInNovember,
            appointmentInDecember,
          ],
          backgroundColor: "rgba(255,0,0,0.2)",
          borderColor: "rgba(255,0,0,01)",
          borderWidth: 1,
        },
      ],
    };

    setChartData(mockData);
  }, [orderedInJanuary]);

  return (
    <Flex gap={10}>
      <Navigation />
      <Flex gap={30}>
        <SimpleGrid
          columns={[1, null, 3]}
          marginTop={10}
          gap={6}
          height="310px"
        >
          <CardDashBoard
            text="Tổng số người dùng"
            icon={<FaUser />}
            quantity={userList?.length}
          />

          <CardDashBoard
            text="Tổng số sẩn phẩm"
            icon={<FaProductHunt />}
            quantity={productList?.length}
          />

          <CardDashBoard
            text="Tổng số thú cưng"
            icon={<MdOutlinePets />}
            quantity={petList?.length}
          />

          <CardDashBoard
            text="Tổng số dịch vụ"
            icon={<FaServicestack />}
            quantity={servicePackList?.length}
          />

          <CardDashBoard
            text="Tổng số lịch đặt hẹn"
            icon={<BsFillCalendarDateFill />}
            quantity={appointmentList?.length}
          />

          <CardDashBoard
            text="Tổng hóa đơn"
            icon={<FaCartArrowDown />}
            quantity={orderList?.length}
          />

          <CardDashBoard
            text="Tổng ý kiến"
            icon={<MdContactPhone />}
            quantity={contactList?.length}
          />

          <CardDashBoard
            text="Doanh thu sản phẩm"
            icon={<FaProductHunt />}
            quantity={totalRevenueOrder}
          />
          <CardDashBoard
            text="Doanh thu dịch vụ"
            icon={<FaServicestack />}
            quantity={totalRevenueAppointment}
          />
        </SimpleGrid>

        <Box marginTop={10} width="640px">
          <Box>
            <Card height="fit-content" borderRadius="10px">
              <CardHeader>
                <Text>Tổng doanh thu</Text>
              </CardHeader>

              <CardBody paddingBottom="60px">
                <Stack divider={<StackDivider />} spacing="1">
                  <Flex justifyContent="center">
                    <Text fontSize="20px">$</Text>
                    <Heading fontSize="40px">{totalRevenue}</Heading>
                  </Flex>
                </Stack>

                <Flex
                  fontSize="20px"
                  justifyContent="center"
                  alignItems="center"
                  color="#f6a25e"
                >
                  <FaLongArrowAltUp /> 12%
                </Flex>
              </CardBody>
            </Card>
          </Box>

          <RevenueChart data={chartData} />
        </Box>
      </Flex>
    </Flex>
  );
};

export default StoredProducts;
