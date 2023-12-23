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
  Text,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Select,
  Image,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductForce,
  getAllProductDeleted,
  handleActionProductForm,
  restoreProduct,
} from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import axios from "axios";
const { jwtDecode } = require("jwt-decode");
import { loginSuccess } from "@/redux/features/authSlice";
import Navigation from "@/app/_components/Navigation";

const axiosJWT = axios.create();

const TrashProduct = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const productDeletedList = useSelector(
    (state) => state.products.products?.allProductsDeleted?.products
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
      getAllProductDeleted(user?.accessToken, dispatch);
    }
  }, []);

  const [productId, setProductId] = useState(null);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = (id) => {
    setProductId(id);
    OnOpenDelete();
  };

  const handleDeleteProduct = (id) => {
    deleteProductForce(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleRestoreProduct = (id) => {
    restoreProduct(user?.accessToken, dispatch, id);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allProductIds = productDeletedList.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allProductIds);
  };

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId];

      setSelectAll(
        newSelectedItems.length === productDeletedList.length &&
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
    handleActionProductForm(
      user?.accessToken,
      dispatch,
      selectedItems,
      actionValue
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
                <Th fontSize="xl">Type</Th>
                <Th fontSize="xl">Price</Th>
                <Th fontSize="xl">Image</Th>
                <Th fontSize="xl">Description</Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {productDeletedList?.map((product) => {
                if (product.deleted) {
                  return (
                    <Tr key={product._id}>
                      <Td>
                        <Checkbox
                          isChecked={selectedItems.includes(product._id)}
                          onChange={() => handleSelectItem(product._id)}
                        ></Checkbox>
                      </Td>
                      <Td>{product.productId}</Td>
                      <Td>{product.type}</Td>
                      <Td>{product.price}</Td>
                      <Td>
                        <Image
                          w="60px"
                          src={
                            `http://localhost:8000/images/` + product.thumbnail
                          }
                        />
                      </Td>
                      <Td>{product.description}</Td>

                      <Td textAlign="center">
                        <Link paddingRight={1}>
                          <Button
                            colorScheme="facebook"
                            onClick={() => handleRestoreProduct(product._id)}
                          >
                            Khôi phục
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(product._id)}
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
              Xóa vĩnh viễn sản phẩm
            </AlertDialogHeader>

            <AlertDialogBody>Hành động này không thể khôi phục</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteProduct(productId);
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

export default TrashProduct;
