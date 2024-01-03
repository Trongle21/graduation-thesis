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
  getAllContactDeleted,
  getAllUser,
  restoreContact,
  deleteContactForce,
  handleActionContactForm,
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
  const contactDeleteList = useSelector(
    (state) => state.contact?.contacts?.allContactDeleted?.contact
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
      getAllUser(user?.accessToken, dispatch, axiosJWT);
      getAllContactDeleted(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [contactId, setContactId] = useState(null);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = (id) => {
    setContactId(id);
    OnOpenDelete();
  };

  const handleDeleteContact = (id) => {
    deleteContactForce(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleRestoreContact = (id) => {
    restoreContact(user?.accessToken, dispatch, id);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allContactIds = contactDeleteList.map((contact) => contact._id);
    setSelectedItems(selectAll ? [] : allContactIds);
  };

  const handleSelectItem = (contactId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(contactId)
        ? prevSelectedItems.filter((id) => id !== contactId)
        : [...prevSelectedItems, contactId];

      setSelectAll(
        newSelectedItems.length === contactDeleteList.length &&
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
            <option value="forceDelete">Xóa vĩnh viễn</option>
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
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {contactDeleteList?.map((contact, index) => {
                if (contact.deleted) {
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
                      <Td textAlign="center">{contact.message}</Td>
                      <Td textAlign="center">
                        <Link paddingRight={1}>
                          <Button
                            colorScheme="facebook"
                            marginRight="2px"
                            onClick={() => handleRestoreContact(contact._id)}
                          >
                            Khôi phục
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(contact._id)}
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
              Xóa ý kiến
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa vĩnh viễn này</AlertDialogBody>

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
    </Flex>
  );
};

export default StoredUser;
