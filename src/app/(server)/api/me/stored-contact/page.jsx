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
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllContact,
  getAllUser,
  updateContact,
  deleteContact,
  handleActionContactForm,
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
  const userList = useSelector((state) => state.users?.users?.allUsers?.users);
  const contactList = useSelector(
    (state) => state.contact?.contacts?.allContact?.contact
  );

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;

  const currentContactList = contactList?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(contactList?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % contactList?.length;
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
      getAllContact(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [contactId, setContactId] = useState(null);

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

  const {
    isOpen: isOpenResUser,
    onOpen: OnOpenResUser,
    onClose: onCloseResUser,
  } = useDisclosure();
  const resUserRef = React.useRef();

  const {
    isOpen: isOpenResAdmin,
    onOpen: OnOpenResAdmin,
    onClose: onCloseResAdmin,
  } = useDisclosure();
  const resAdminRef = React.useRef();

  const handleDelete = (id) => {
    setContactId(id);
    OnOpenDelete();
  };

  const handleDeleteContact = (id) => {
    deleteContact(user?.accessToken, dispatch, id, axiosJWT);
  };

  const [userName, setUsername] = useState("");
  const [response, serResponse] = useState("");
  const [contact, setContact] = useState("");

  const [responseUser, setResponseUser] = useState("");
  const [responseAdmin, setResponseAdmin] = useState("");

  const handleEdit = (contact, userName) => {
    setContact(contact);
    setUsername(userName);
    OnOpenEdit();
  };

  const handleSubmit = (e) => {
    console.log(contact);
    const newContact = {
      ...contact,
      response: response,
    };
    console.log(newContact);
    updateContact(newContact, user?.accessToken, dispatch, navigate);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allContactIds = contactList.map((contact) => contact._id);
    setSelectedItems(selectAll ? [] : allContactIds);
  };

  const handleSelectItem = (contactId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(contactId)
        ? prevSelectedItems.filter((id) => id !== contactId)
        : [...prevSelectedItems, contactId];

      setSelectAll(
        newSelectedItems.length === contactList.length &&
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
    handleActionContactForm(
      user?.accessToken,
      dispatch,
      selectedItems,
      actionValue
    );
  };

  const handleResponseUser = (res) => {
    setResponseUser(res);
    OnOpenResUser();
  };

  const handleResponseAmin = (res) => {
    setResponseAdmin(res);
    OnOpenResAdmin();
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
                  Tên người dùng
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Chủ đề
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Ý kiến
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Phản hồi
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentContactList?.map((contact, index) => {
                const username = userList.find(
                  (user) => user._id === contact.user
                );
                return (
                  <Tr key={contact._id}>
                    <Td>
                      <Checkbox
                        isChecked={selectedItems.includes(contact._id)}
                        onChange={() => handleSelectItem(contact._id)}
                      ></Checkbox>
                    </Td>
                    <Td textAlign="center">{index + 1}</Td>
                    <Td textAlign="center">{username?.username}</Td>
                    <Td textAlign="center">{contact.subject}</Td>
                    <Td textAlign="center" className="contact--message">
                      {contact.message.length > 20 ? (
                        <span
                          className="contact--message__info"
                          onClick={() => handleResponseUser(contact.message)}
                        >
                          {contact.message}
                        </span>
                      ) : (
                        <>{contact.message}</>
                      )}
                    </Td>
                    <Drawer
                      isOpen={isOpenResUser}
                      placement="top"
                      size="lg"
                      onClose={onCloseResUser}
                      finalFocusRef={resUserRef}
                    >
                      <form>
                        <DrawerContent>
                          <DrawerCloseButton />
                          <DrawerHeader fontSize="26px">
                            Xem chi tiết phản hồi từ người dùng
                          </DrawerHeader>

                          <DrawerBody>
                            <Box>
                              <FormControl>
                                <FormLabel fontSize="20px"></FormLabel>
                                <Textarea
                                  fontSize={16}
                                  height={200}
                                  value={responseUser}
                                  onChange={(e) =>
                                    setResponseUser(e.target.value)
                                  }
                                  readOnly
                                />
                              </FormControl>
                            </Box>
                          </DrawerBody>

                          <DrawerFooter>
                            <Button
                              variant="outline"
                              mr={3}
                              onClick={onCloseResUser}
                            >
                              Cancel
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </form>
                    </Drawer>

                    <Td textAlign="center" className="contact--message">
                      {contact.response.length > 1 ? (
                        <span
                          className="contact--message__info"
                          onClick={() => handleResponseAmin(contact.response)}
                        >
                          {contact.response}
                        </span>
                      ) : (
                        "Chưa phản hồi"
                      )}
                    </Td>
                    <Drawer
                      isOpen={isOpenResAdmin}
                      placement="top"
                      size="lg"
                      onClose={onCloseResAdmin}
                      finalFocusRef={resAdminRef}
                    >
                      <form>
                        <DrawerContent>
                          <DrawerCloseButton />
                          <DrawerHeader fontSize="26px">
                            Xem chi tiết phản hồi từ Admin
                          </DrawerHeader>

                          <DrawerBody>
                            <Box>
                              <FormControl>
                                <FormLabel fontSize="20px"></FormLabel>
                                <Textarea
                                  fontSize={16}
                                  height={200}
                                  value={responseAdmin}
                                  onChange={(e) =>
                                    setResponseAdmin(e.target.value)
                                  }
                                  readOnly
                                />
                              </FormControl>
                            </Box>
                          </DrawerBody>

                          <DrawerFooter>
                            <Button
                              variant="outline"
                              mr={3}
                              onClick={onCloseResAdmin}
                            >
                              Cancel
                            </Button>
                          </DrawerFooter>
                        </DrawerContent>
                      </form>
                    </Drawer>
                    <Td textAlign="center">
                      <Link paddingRight={1}>
                        <Button
                          colorScheme="facebook"
                          onClick={() =>
                            handleEdit(contact, username?.username)
                          }
                        >
                          Phản hồi
                        </Button>
                      </Link>
                      <Link>
                        <Button
                          colorScheme="red"
                          onClick={() => handleDelete(contact._id)}
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
              Xóa ý kiến
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa ý kiến này</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteContact(contactId);
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

      <Drawer
        isOpen={isOpenEdit}
        placement="right"
        size="lg"
        onClose={onCloseEdit}
        finalFocusRef={btnRef}
      >
        <form>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize="26px">
              Phẩn hồi từ Admin:
              {user?.username}
            </DrawerHeader>

            <DrawerBody>
              <Box>
                <FormControl>
                  <FormLabel fontSize="20px">Tên người dùng </FormLabel>
                  <Input
                    value={userName}
                    onChange={(e) => setUsername(e.target.value)}
                    readOnly
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel fontSize="20px">Phản hồi ý kiên</FormLabel>
                  <Textarea
                    value={response}
                    onChange={(e) => serResponse(e.target.value)}
                  />
                </FormControl>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onCloseEdit}>
                Cancel
              </Button>
              <Button
                colorScheme="blue"
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

      <Box position="fixed" bottom="200px" left="40%">
        <Paginate onPageClick={handlePageClick} pageCount={pageCount} />
      </Box>
    </Flex>
  );
};

export default StoredUser;
