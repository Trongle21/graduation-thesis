"use client";

import {
  Box,
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
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Drawer,
  FormLabel,
  InputGroup,
  FormControl,
  InputRightElement,
  Select,
  Text,
  DrawerCloseButton,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getAllPet } from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const StoredUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const listUser = useSelector((state) => state.users?.users?.allUsers?.users);
  const petList = useSelector((state) => state.pets?.pets?.allPets?.pets);

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
      getAllPet(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const {
    isOpen: isOpenEdit,
    onOpen: OnOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const btnRef = React.useRef();

  const handleDelete = (id) => {
    setPetId(id);
    OnOpenDelete();
  };

  const handleDeletePet = (id) => {
    deletePet(user?.accessToken, dispatch, id, axiosJWT);
  };

  const [currentPet, setCurrentPet] = useState(null);
  const [petName, setPetName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEdit = (id) => {
    const findPet = petList.find((pet) => pet._id === id);
    setCurrentPet(findPet);
    OnOpenEdit();
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = {
      _id: currentPet._id,
      petName: petName,
      email: email,
      password: password,
    };
    updatePet(newPet, user?.accessToken, dispatch, navigate);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allPetIds = petList.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allUserIds);
  };

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId];

      setSelectAll(
        newSelectedItems.length === userList.length &&
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
    e.preventDefault();
    handleActionUserForm(
      user?.accessToken,
      dispatch,
      selectedItems,
      actionValue
    );
  };

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
                <Th textAlign="center" fontSize="xl"></Th>
                <Th textAlign="center" fontSize="xl">
                  #
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Tên pet
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Loại
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Tháng tuổi
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Giới tính
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Chủ sở hữu
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {petList?.map((pet) => {
                const username = listUser.find((user) => user._id === pet.user);
                return (
                  <Tr key={pet._id}>
                    <Td>
                      <Checkbox></Checkbox>
                    </Td>
                    <Td textAlign="center">{pet.petId}</Td>
                    <Td textAlign="center">{pet.name}</Td>
                    <Td textAlign="center">{pet.type}</Td>
                    <Td textAlign="center">{pet.age}</Td>
                    <Td textAlign="center">{pet.gender}</Td>
                    <Td textAlign="center">{username.username}</Td>
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
                          onClick={() => handleDelete(pet._id)}
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
