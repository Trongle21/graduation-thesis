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
import Paginate from "@/app/_components/Paginate";

const axiosJWT = axios.create();

const StoredUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector((state) => state.users.users?.allUsers?.users);

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;

  const currentUserList = userList?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(userList?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % userList?.length;
    setItemOffset(newOffset);
  };

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
  const [currentUser, setCurrentUser] = useState([]);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhonNumber] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setUsername(user.username);
    setPhonNumber(user.phoneNumber);
    setAddress(user.address);
    setIsAdmin(user.admin);
    OnOpenEdit();
  };

  const handleSubmit = (e) => {
    let newUser;
    if (isAdmin === "admin" || isAdmin) {
      newUser = {
        ...currentUser,
        username: username,
        address: address,
        phoneNumber: phoneNumber,
        admin: true,
      };
    } else
      newUser = {
        ...currentUser,
        username: username,
        address: address,
        phoneNumber: phoneNumber,
        admin: false,
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
              {currentUserList?.map((user, index) => (
                <Tr key={user._id}>
                  <Td textAlign="center">
                    <Checkbox
                      isChecked={selectedItems.includes(user._id)}
                      onChange={() => handleSelectItem(user._id)}
                    ></Checkbox>
                  </Td>
                  <Td textAlign="center">{index + 1}</Td>
                  {user.admin ? (
                    <>
                      <Td textAlign="center" color="#f6a25e">
                        {user.username}
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td textAlign="center">{user.username}</Td>
                    </>
                  )}
                  {user.admin ? (
                    <>
                      <Td textAlign="center" color="#f6a25e">
                        {user.email}
                      </Td>
                    </>
                  ) : (
                    <>
                      <Td textAlign="center">{user.email}</Td>
                    </>
                  )}
                  <Td textAlign="center">
                    <Link paddingRight={1}>
                      <Button
                        colorScheme="facebook"
                        onClick={() => handleEdit(user)}
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
                        <form>
                          <DrawerContent>
                            <DrawerCloseButton />
                            <DrawerHeader fontSize="26px">
                              Sửa người dùng
                            </DrawerHeader>

                            <DrawerBody>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">Email</FormLabel>
                                  <Input
                                    type="email"
                                    value={currentUser.email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    readOnly
                                  />
                                </FormControl>
                              </Box>
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
                                    autoComplete="name"
                                  />
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">
                                    Địa chỉ{" "}
                                  </FormLabel>
                                  <Input
                                    type="name"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    autoComplete="address"
                                  />
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">
                                    Số điện thoại{" "}
                                  </FormLabel>
                                  <Input
                                    type="name"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                      setPhonNumber(e.target.value)
                                    }
                                    autoComplete="phoneNumber"
                                  />
                                </FormControl>
                              </Box>
                              <Box>
                                <FormControl>
                                  <FormLabel fontSize="20px">
                                    Phân quyền{" "}
                                  </FormLabel>
                                  {isAdmin ? (
                                    <>
                                      <Select
                                        defaultValue="admin"
                                        onChange={(e) =>
                                          setIsAdmin(e.target.value)
                                        }
                                      >
                                        <option value="admin">Admin</option>
                                        <option value="user">User</option>
                                      </Select>
                                    </>
                                  ) : (
                                    <>
                                      <Select
                                        value="user"
                                        onChange={(e) =>
                                          setIsAdmin(e.target.value)
                                        }
                                      >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                      </Select>
                                    </>
                                  )}
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
                                // type="submit"
                                onClick={() => {
                                  onCloseEdit(), handleSubmit();
                                }}
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
      <Box position="fixed" bottom="200px" left="40%">
        <Paginate onPageClick={handlePageClick} pageCount={pageCount} />
      </Box>
    </Flex>
  );
};

export default StoredUser;
