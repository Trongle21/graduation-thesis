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
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  handleActionUserForm,
  updateUser,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const StoredUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers?.users);

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
    }
  }, []);

  const [userId, setUserId] = useState(null);

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
    setUserId(id);
    OnOpenDelete();
  };

  const handleDeleteUser = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  const [currentUser, setCurrentUser] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEdit = (id) => {
    const findUser = userList.find((user) => user._id === id);
    setCurrentUser(findUser);
    OnOpenEdit();
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      _id: currentUser._id,
      username: username,
      email: email,
      password: password,
    };
    updateUser(newUser, user?.accessToken, dispatch, navigate);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allUserIds = userList.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allUserIds);
  };

  const handleSelectItem = (userId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(userId)
        ? prevSelectedItems.filter((id) => id !== userId)
        : [...prevSelectedItems, userId];

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
      actionValue,
      axiosJWT
    );
  };

  return (
    <Flex gap="20px">
      <Navigation />

      <form onSubmit={handleSubmitForm} style={{ width: "100%" }}>
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
                <Th fontSize="xl"></Th>
                <Th textAlign="center" fontSize="xl">
                  #
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Name
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Email
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {userList?.map((user, index) => (
                <Tr key={user._id}>
                  <Td textAlign="center">
                    <Checkbox
                      isChecked={selectedItems.includes(user._id)}
                      onChange={() => handleSelectItem(user._id)}
                    ></Checkbox>
                  </Td>
                  <Td textAlign="center">{index + 1}</Td>
                  <Td textAlign="center">{user.username}</Td>
                  <Td textAlign="center">{user.email}</Td>
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
                      >
                        <form onSubmit={handleSubmit}>
                          <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader fontSize="26px">
                              Sửa người dùng
                            </DrawerHeader>

                            <DrawerBody>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">
                                    Tên người dùng{" "}
                                  </FormLabel>
                                  <Input
                                    type="name"
                                    value={username}
                                    onChange={(e) =>
                                      setUsername(e.target.value)
                                    }
                                  />
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">Email</FormLabel>
                                  <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">
                                    Password{" "}
                                  </FormLabel>
                                  <InputGroup size="md">
                                    <Input
                                      type={show ? "text" : "password"}
                                      value={password}
                                      onChange={(e) =>
                                        setPassword(e.target.value)
                                      }
                                    />
                                    <InputRightElement width="4.5rem">
                                      <Button
                                        h="1.75rem"
                                        size="sm"
                                        onClick={handleClick}
                                      >
                                        {show ? "Hide" : "Show"}
                                      </Button>
                                    </InputRightElement>
                                  </InputGroup>
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
                        onClick={() => handleDelete(user._id)}
                      >
                        Xóa
                      </Button>
                    </Link>
                  </Td>
                </Tr>
              ))}
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
              Xóa người dùng
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa người dùng này</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteUser(userId);
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
