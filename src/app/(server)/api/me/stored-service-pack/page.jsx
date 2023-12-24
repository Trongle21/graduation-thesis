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
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  DrawerFooter,
  Input,
  FormControl,
  FormLabel,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllServicePack,
  deleteServicePack,
  updateServicePack,
  handleActionServicePackForm,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const StoredUser = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const servicePackList = useSelector(
    (state) => state.servicePack?.servicePacks?.allServicePacks?.servicePack
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
  const [currentServicePack, setCurrentServicePack] = useState(null);

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
    deleteServicePack(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleEdit = (id) => {
    const findServicePack = servicePackList.find(
      (servicePack) => servicePack._id === id
    );
    setCurrentServicePack(findServicePack);
    OnOpenEdit();
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newServicePack = {
      _id: currentServicePack._id,
      serviceName: serviceName,
      packages: packages,
    };
    updateServicePack(newServicePack, user?.accessToken, dispatch, navigate);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allServicePackIds = servicePackList.map((service) => service._id);
    setSelectedItems(selectAll ? [] : allServicePackIds);
  };

  const handleSelectItem = (servicePackId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(servicePackId)
        ? prevSelectedItems.filter((id) => id !== servicePackId)
        : [...prevSelectedItems, servicePackId];

      setSelectAll(
        newSelectedItems.length === servicePackList.length &&
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
              {servicePackList?.map((servicePack, index) => {
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
                          onClick={() => handleEdit(servicePack._id)}
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
                                Sửa dịch vụ
                              </DrawerHeader>

                              <DrawerBody>
                                <Box>
                                  <FormControl>
                                    <FormLabel fontSize="20px">
                                      Tên dịch vụ{" "}
                                    </FormLabel>
                                    <Input
                                      id="serviceName"
                                      placeholder="Please enter user name"
                                      value={serviceName}
                                      onChange={(e) =>
                                        setServiceName(e.target.value)
                                      }
                                      autoComplete="serviceName"
                                    />
                                  </FormControl>
                                </Box>
                                <Stack spacing={4}>
                                  {packages.map((pack, index) => (
                                    <Box key={index}>
                                      <FormLabel
                                        htmlFor={`packageName${index}`}
                                        fontSize="20px"
                                      >
                                        Tên gói
                                      </FormLabel>
                                      <Input
                                        id={`packageName${index}`}
                                        placeholder="Nhập tên gói..."
                                        value={pack.name}
                                        onChange={(e) =>
                                          handlePackageChange(
                                            index,
                                            "name",
                                            e.target.value
                                          )
                                        }
                                      />
                                      <FormLabel
                                        htmlFor={`packagePrice${index}`}
                                        fontSize="20px"
                                      >
                                        Giá
                                      </FormLabel>
                                      <Input
                                        id={`packagePrice${index}`}
                                        placeholder="Nhập giá..."
                                        value={pack.price}
                                        onChange={(e) =>
                                          handlePackageChange(
                                            index,
                                            "price",
                                            e.target.value
                                          )
                                        }
                                      />
                                    </Box>
                                  ))}
                                </Stack>
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
                          onClick={() => handleDelete(servicePack._id)}
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
    </Flex>
  );
};

export default StoredUser;
