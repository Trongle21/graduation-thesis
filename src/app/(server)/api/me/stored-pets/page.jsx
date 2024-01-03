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
  FormControl,
  Select,
  Text,
  DrawerCloseButton,
  AlertDialog,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllPet,
  getAllUser,
  deletePet,
  updatePet,
  handleActionPetForm,
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
      getAllUser(user?.accessToken, dispatch, axiosJWT);
      getAllPet(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [petId, setPetId] = useState(null);

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

  const [currentPetId, setCurrentPetId] = useState(null);
  const [nameOwner, setNameOwner] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [petName, setPetName] = useState("");
  const [age, setAge] = useState("");
  const [choosePetType, setChoosePetType] = useState("cat");
  const [chooseGender, setChooseGender] = useState("male");

  const handleEdit = (id, ownerId, name) => {
    const findPet = petList.find((pet) => pet._id === id);
    setCurrentPetId(findPet._id);
    setOwnerId(findPet.user);
    setPetName(findPet.name);
    setAge(findPet.age);
    setChoosePetType(findPet.type);
    setChooseGender(findPet.gender);
    setNameOwner(name);
    OnOpenEdit();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPet = {
      _id: currentPetId,
      name: petName,
      age: age,
      user: ownerId,
      type: choosePetType,
      gender: chooseGender,
    };
    updatePet(newPet, user?.accessToken, dispatch, navigate);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allPetIds = petList.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allPetIds);
  };

  const handleSelectItem = (petId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(petId)
        ? prevSelectedItems.filter((id) => id !== petId)
        : [...prevSelectedItems, petId];

      setSelectAll(
        newSelectedItems.length === petList.length &&
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
    handleActionPetForm(
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
            <option value="delete">Xóa tấc cả</option>
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
              {petList?.map((pet, index) => {
                const username = userList.find((user) => user._id === pet.user);
                return (
                  <Tr key={pet._id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedItems.includes(pet._id)}
                        onChange={() => handleSelectItem(pet._id)}
                      ></Checkbox>
                    </Td>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">{pet.name}</Td>
                    <Td textAlign="center">{pet.type}</Td>
                    <Td textAlign="center">{pet.age}</Td>
                    <Td textAlign="center">{pet.gender}</Td>
                    <Td textAlign="center">{username?.username}</Td>
                    <Td textAlign="center">
                      <Link paddingRight={1}>
                        <Button
                          colorScheme="facebook"
                          onClick={() =>
                            handleEdit(
                              pet._id,
                              username?._id,
                              username?.username
                            )
                          }
                        >
                          Sửa
                        </Button>
                        <Drawer
                          isOpen={isOpenEdit}
                          placement="right"
                          size="md"
                          onClose={onCloseEdit}
                          finalFocusRef={btnRef}
                        >
                          <form onSubmit={handleSubmit}>
                            <DrawerContent>
                              <DrawerCloseButton />
                              <DrawerHeader fontSize="26px">
                                Sửa thông tin Pet
                              </DrawerHeader>

                              <DrawerBody>
                                <Box>
                                  <FormControl>
                                    <FormLabel fontSize="20px">
                                      Chủ sở hữu: {nameOwner}
                                    </FormLabel>
                                  </FormControl>
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel fontSize="20px">
                                      Tên Pet{" "}
                                    </FormLabel>
                                    <Input
                                      value={petName}
                                      onChange={(e) =>
                                        setPetName(e.target.value)
                                      }
                                    />
                                  </FormControl>
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel fontSize="20px">
                                      Tháng tuổi{" "}
                                    </FormLabel>
                                    <Input
                                      value={age}
                                      onChange={(e) => setAge(e.target.value)}
                                    />
                                  </FormControl>
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel fontSize="20px">
                                      Loại Pet{" "}
                                    </FormLabel>
                                    <Select
                                      value={choosePetType}
                                      onChange={(e) =>
                                        setChoosePetType(e.target.value)
                                      }
                                    >
                                      <option value="cat">Cat</option>
                                      <option value="dog">Dog</option>
                                    </Select>
                                  </FormControl>
                                </Box>
                                <Box>
                                  <FormControl>
                                    <FormLabel fontSize="20px">
                                      Giới tính{" "}
                                    </FormLabel>
                                    <Select
                                      value={chooseGender}
                                      onChange={(e) =>
                                        setChooseGender(e.target.value)
                                      }
                                    >
                                      <option value="male">Male</option>
                                      <option value="female">Female</option>
                                    </Select>
                                  </FormControl>
                                </Box>
                              </DrawerBody>

                              <DrawerFooter>
                                <Button
                                  variant="outline"
                                  mr={3}
                                  onClick={onCloseEdit}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  colorScheme="blue"
                                  type="submit"
                                  onClick={onCloseEdit}
                                >
                                  Save
                                </Button>
                              </DrawerFooter>
                            </DrawerContent>
                          </form>
                        </Drawer>
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
      <AlertDialog
        isOpen={isOpenDelete}
        leastDestructiveRef={cancelRef}
        onClose={onCloseDelete}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Xóa pet
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa pet này</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeletePet(petId);
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
