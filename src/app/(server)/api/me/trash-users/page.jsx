"use client";

import {
  Box,
  Button,
  Checkbox,
  Flex,
  Link,
  Menu,
  MenuButton,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  MenuList,
  MenuItem,
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserForce,
  getAllUserDeleted,
  handleActionUserForm,
  restoreUser,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const TrashUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const userDeletedList = useSelector(
    (state) => state.users.users?.allUsersDeleted?.users
  );

  const dispatch = useDispatch();

  const navigate = useRouter();

  const refreshToken = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/refresh", {
        withCredentials: true,
      });

      return res.data;
    } catch (err) {}
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
      getAllUserDeleted(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [userId, setUserId] = useState(null);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = (id) => {
    setUserId(id);
    OnOpenDelete();
  };

  const handleDeleteUser = (id) => {
    deleteUserForce(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleRestoreUser = (id) => {
    restoreUser(user?.accessToken, dispatch, id);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allUserIds = userDeletedList.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allUserIds);
  };

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId];

      setSelectAll(
        newSelectedItems.length === userDeletedList.length &&
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

      <form onSubmit={handleSubmitForm}>
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
                <Th fontSize="xl"></Th>
                <Th fontSize="xl">#</Th>
                <Th fontSize="xl">Name</Th>
                <Th fontSize="xl">Email</Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {userDeletedList?.map((user, index) => {
                if (user.deleted) {
                  return (
                    <Tr key={user._id}>
                      <Td>
                        <Checkbox
                          isChecked={selectedItems.includes(user._id)}
                          onChange={() => handleSelectItem(user._id)}
                        ></Checkbox>
                      </Td>
                      <Td>{index + 1}</Td>
                      <Td>{user.username}</Td>
                      <Td>{user.email}</Td>
                      <Td textAlign="center">
                        <Link paddingRight={1}>
                          <Button
                            colorScheme="facebook"
                            onClick={() => handleRestoreUser(user._id)}
                          >
                            Khôi phục
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(user._id)}
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
              Xóa vĩnh viễn người dùng
            </AlertDialogHeader>

            <AlertDialogBody>Hành động này không thể khôi phục</AlertDialogBody>

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

export default TrashUser;
