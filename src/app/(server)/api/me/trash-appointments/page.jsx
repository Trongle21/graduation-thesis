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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointment,
  getAllPet,
  getAllServicePack,
  getAllUser,
  deleteAppointment,
  getAllAppointmentDeleted,
  restoreAppointment,
  deleteAppointmentForce,
  handleActionAppointmentForm,
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
  const appointmentDeletedList = useSelector(
    (state) =>
      state.appointments.appointments?.allAppointmentsDeleted?.appointment
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
      getAllAppointmentDeleted(user?.accessToken, dispatch, axiosJWT);
      getAllServicePack(user?.accessToken, dispatch, axiosJWT);
      getAllPet(user?.accessToken, dispatch, axiosJWT);
      getAllUser(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [appointmentId, setAppointmentId] = useState(null);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = (id) => {
    setAppointmentId(id);
    OnOpenDelete();
  };

  const handleDeleteAppointment = (id) => {
    deleteAppointmentForce(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleRestoreAppointment = (id) => {
    restoreAppointment(user?.accessToken, dispatch, id);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allAppointmentIds = appointmentDeletedList.map(
      (appointment) => appointment._id
    );
    setSelectedItems(selectAll ? [] : allAppointmentIds);
  };

  const handleSelectItem = (servicePackId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(servicePackId)
        ? prevSelectedItems.filter((id) => id !== servicePackId)
        : [...prevSelectedItems, servicePackId];

      setSelectAll(
        newSelectedItems.length === appointmentDeletedList.length &&
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
    handleActionAppointmentForm(
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
            <option value="restore">Khôi phục</option>
            <option value="forceDelete">Xóa tấc cả</option>
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
              {appointmentDeletedList?.map((appointment, index) => {
                const userName = userList?.find(
                  (user) => user._id === appointment.user
                );

                const petName = petList.find(
                  (pet) => pet._id === appointment.pet
                );

                const servicePack = servicePackList?.find(
                  (service) => service._id === appointment.service
                );
                const appointmentPackageId = appointment.package;

                const foundServicePack = servicePackList?.find((servicePack) =>
                  servicePack.packages.some(
                    (pack) => pack._id === appointmentPackageId
                  )
                );

                const foundPackage = foundServicePack
                  ? foundServicePack.packages.find(
                      (pack) => pack._id === appointmentPackageId
                    )
                  : null;
                if (appointment.deleted) {
                  return (
                    <Tr key={appointment._id}>
                      <Td>
                        <Checkbox
                          isChecked={selectedItems.includes(appointment._id)}
                          onChange={() => handleSelectItem(appointment._id)}
                        ></Checkbox>
                      </Td>
                      <Td>{index + 1}</Td>
                      <Td>{petName?.name}</Td>
                      <Td>{userName?.username}</Td>
                      <Td>{servicePack?.serviceName}</Td>
                      <Td>{foundPackage?.name}</Td>
                      <Td>{foundPackage?.price}</Td>
                      <Td>{appointment.date}</Td>
                      <Td textAlign="center">
                        <Link paddingRight={1}>
                          <Button
                            colorScheme="facebook"
                            onClick={() =>
                              handleRestoreAppointment(appointment._id)
                            }
                          >
                            Khôi phục
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(appointment._id)}
                          >
                            Xóa vĩnh viễn
                          </Button>
                        </Link>
                      </Td>
                    </Tr>
                  );
                }
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
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteAppointment(appointmentId);
                  onCloseDelete();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  );
};

export default StoredUser;
