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
  Select,
  Text,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  handleActionServicePackForm,
  getAllServicePackDeleted,
  deleteServicePackForce,
  restoreServicePack,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";
import Paginate from "@/app/_components/Paginate";

const axiosJWT = axios.create();

const TrashServicePack = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const servicePackDeletedList = useSelector(
    (state) =>
      state.servicePack.servicePacks?.allServicePacksDeleted?.servicePack
  );

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;

  const currentServicePackDeletedList = servicePackDeletedList?.slice(
    itemOffset,
    endOffset
  );

  const pageCount = Math.ceil(servicePackDeletedList?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset =
      (e.selected * itemsPerPage) % servicePackDeletedList?.length;
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
      getAllServicePackDeleted(user?.accessToken, dispatch, axiosJWT);
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

  const [servicePackId, setServicePackId] = useState(null);

  const [serviceName, setServiceName] = useState("");
  const [packages, setPackages] = useState([
    { name: "", price: "" },
    { name: "", price: "" },
  ]);

  const handleDelete = (id) => {
    setServicePackId(id);
    OnOpenDelete();
  };

  const handleDeleteServicePack = (id) => {
    deleteServicePackForce(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleRestoreServicePack = (id) => {
    restoreServicePack(user?.accessToken, dispatch, id);
  };
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allServicePackIds = servicePackDeletedList.map(
      (service) => service._id
    );
    setSelectedItems(selectAll ? [] : allServicePackIds);
  };

  const handleSelectItem = (servicePackId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(servicePackId)
        ? prevSelectedItems.filter((id) => id !== servicePackId)
        : [...prevSelectedItems, servicePackId];

      setSelectAll(
        newSelectedItems.length === servicePackDeletedList.length &&
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
    handleActionServicePackForm(
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
                <Th fontSize="xl">Name</Th>
                <Th fontSize="xl">Dịch vụ</Th>
                <Th fontSize="xl">Giá</Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentServicePackDeletedList?.map((servicePack, index) => {
                if (servicePack.deleted) {
                  return (
                    <Tr key={servicePack._id}>
                      <Td>
                        <Checkbox
                          isChecked={selectedItems.includes(servicePack._id)}
                          onChange={() => handleSelectItem(servicePack._id)}
                        ></Checkbox>
                      </Td>
                      <Td>{index + 1}</Td>
                      <Td>{servicePack.serviceName}</Td>
                      <Td>
                        {servicePack.packages.map((pack) => (
                          <div key={pack._id}>
                            <p>{pack.name}</p>
                          </div>
                        ))}
                      </Td>
                      <Td>
                        {servicePack.packages.map((pack, index) => (
                          <div key={pack._id}>
                            <p>{pack.price}</p>
                          </div>
                        ))}
                      </Td>
                      <Td textAlign="center">
                        <Link paddingRight={1}>
                          <Button
                            colorScheme="facebook"
                            onClick={() =>
                              handleRestoreServicePack(servicePack._id)
                            }
                          >
                            Khôi phục
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(servicePack._id)}
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
              Xóa dịch vụ này
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa dịch vụ này!</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteServicePack(servicePackId);
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

export default TrashServicePack;
