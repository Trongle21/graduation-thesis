"use client";

import {
  Button,
  Checkbox,
  Flex,
  Link,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useDisclosure,
  Drawer,
  Select,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointment,
  getAllPet,
  getAllServicePack,
  getAllUser,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const StoredUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users?.users?.allUsers?.users);
  const petList = useSelector((state) => state.pets?.pets?.allPets?.pets);
  const servicePackList = useSelector(
    (state) => state.servicePack?.servicePacks?.allServicePacks?.servicePack
  );
  const appointmentList = useSelector(
    (state) => state.appointments?.appointment?.allAppointment?.appointments
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
      getAllServicePack(user?.accessToken, dispatch, axiosJWT);
      getAllPet(user?.accessToken, dispatch, axiosJWT);
      getAllUser(user?.accessToken, dispatch, axiosJWT);
      getAllAppointment(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const {
    isOpen: isOpenEdit,
    onOpen: OnOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex gap="20px">
      <Navigation />

      <form style={{ width: "100%" }}>
        <Flex gap={10} alignItems="center" padding="10px 0 0 18px">
          <Checkbox size="lg">
            <Text fontSize="2xl">Chọn tất cả</Text>
          </Checkbox>
          <Select w="100px" size="lg" placeholder="Select option">
            <option value="delete">Xóa tấc cả</option>
          </Select>
          <Button colorScheme="blue" type="submit">
            Thực hiện
          </Button>
        </Flex>
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th fontSize="xl"></Th>
                <Th fontSize="xl">#</Th>
                <Th fontSize="xl">Tên pet</Th>
                <Th fontSize="xl">Chủ sở hữu</Th>
                <Th fontSize="xl">Dịch vụ</Th>
                <Th fontSize="xl">Gói</Th>
                <Th fontSize="xl">Giá</Th>
                <Th fontSize="xl">Ngày đặt</Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {appointmentList?.map((appointment) => {
                const userName = userList.find(
                  (user) => user._id === appointment.user
                );

                const petName = petList.find(
                  (pet) => pet._id === appointment.pet
                );
                const servicePack = servicePackList.find(
                  (service) => service._id === appointment.service
                );
                const appointmentPackageId = appointment.package;

                const foundServicePack = servicePackList.find((servicePack) =>
                  servicePack.packages.some(
                    (pack) => pack._id === appointmentPackageId
                  )
                );

                const foundPackage = foundServicePack
                  ? foundServicePack.packages.find(
                      (pack) => pack._id === appointmentPackageId
                    )
                  : null;

                return (
                  <Tr key={appointment._id}>
                    <Td>
                      <Checkbox></Checkbox>
                    </Td>
                    <Td>{appointment.appointmentId}</Td>
                    <Td>{petName.name}</Td>
                    <Td>{userName.username}</Td>
                    <Td>{servicePack.serviceName}</Td>
                    <Td>{foundPackage.name}</Td>
                    <Td>{foundPackage.price}</Td>
                    <Td>{appointment.date}</Td>
                    <Td textAlign="center">
                      <Link paddingRight={1}>
                        <Button
                          colorScheme="facebook"
                          onClick={() => handleEdit(user._id)}
                        >
                          Sửa
                        </Button>
                        <Drawer
                          isOpen={isOpenEdit}
                          placement="right"
                          size="md"
                          onClose={onCloseEdit}
                          finalFocusRef={btnRef}
                        ></Drawer>
                      </Link>
                      <Link>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(appointment._id)}
                        >
                          Xóa
                        </Button>
                      </Link>
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </form>
    </Flex>
  );
};

export default StoredUser;
