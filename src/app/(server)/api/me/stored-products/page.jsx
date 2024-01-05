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
  Image,
  Textarea,
  Select,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  getAllProduct,
  handleActionForm,
  handleActionProductForm,
  updateProduct,
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
  const productList = useSelector(
    (state) => state.products.products?.allProducts?.products
  );

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;

  const currentProductList = productList?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(productList?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % productList?.length;
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
      getAllProduct(user?.accessToken, dispatch);
    }
  }, []);

  const [productId, setProductId] = useState(null);

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
    setProductId(id);
    OnOpenDelete();
  };

  const handleDeleteUser = (id) => {
    deleteProduct(user?.accessToken, dispatch, id, axiosJWT);
  };

  const [currentProductId, setCurrentProductId] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState("dog");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);

  const handleEdit = (id) => {
    const findProduct = productList.find((product) => product._id === id);
    setCurrentProductId(findProduct._id);
    setName(findProduct.name);
    setType(findProduct.type);
    setPrice(findProduct.price);
    setDescription(findProduct.description);
    setDetail(findProduct.detail);
    setThumbnail(findProduct.thumbnail);
    setImages(findProduct.images);
    OnOpenEdit();
  };

  const handleSubmit = (e) => {
    const newProduct = {
      _id: currentProductId,
      name: name,
      type: type,
      price: price,
      description: description,
      detail: detail,
      thumbnail: thumbnail.name,
      images: images.map((image) => image.name),
    };
    updateProduct(newProduct, user?.accessToken, dispatch, navigate);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allProductIds = productList.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allProductIds);
  };

  const handleSelectItem = (productId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(productId)
        ? prevSelectedItems.filter((id) => id !== productId)
        : [...prevSelectedItems, productId];

      setSelectAll(
        newSelectedItems.length === productList.length &&
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
                  Type
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Price
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Image
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Description
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentProductList?.map((product, index) => (
                <Tr key={product._id}>
                  <Td textAlign="center">
                    <Checkbox
                      isChecked={selectedItems.includes(product._id)}
                      onChange={() => handleSelectItem(product._id)}
                    ></Checkbox>
                  </Td>
                  <Td textAlign="center">{index + 1}</Td>
                  <Td textAlign="center">{product.type}</Td>
                  <Td textAlign="center">{product.price}</Td>
                  <Td textAlign="center">
                    <Image
                      maxW="60px"
                      src={`http://localhost:8000/images/` + product.thumbnail}
                      alt={product.description}
                    />
                  </Td>
                  <Td>{product.description}</Td>

                  <Td textAlign="center">
                    <Link paddingRight={1}>
                      <Button
                        colorScheme="facebook"
                        onClick={() => handleEdit(product._id)}
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
                              Sửa sản phẩm
                            </DrawerHeader>

                            <DrawerBody>
                              <Box>
                                <FormLabel htmlFor="name" fontSize="20px">
                                  Tên sản phẩm
                                </FormLabel>
                                <Input
                                  id="name"
                                  placeholder="Tên sản phẩm ..."
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                                />
                              </Box>
                              <Box>
                                <FormLabel htmlFor="type" fontSize="20px">
                                  Loại
                                </FormLabel>
                                <Select
                                  name="type"
                                  id="typeSelect"
                                  defaultValue={type}
                                  onChange={(e) => setType(e.target.value)}
                                >
                                  <option value="dog">Dog</option>
                                  <option value="cat">Cat</option>
                                </Select>
                              </Box>
                              <Box>
                                <FormLabel htmlFor="price" fontSize="20px">
                                  Giá
                                </FormLabel>
                                <Input
                                  id="price"
                                  placeholder="Giá ..."
                                  value={price}
                                  onChange={(e) => setPrice(e.target.value)}
                                />
                              </Box>
                              <Box>
                                <FormLabel
                                  htmlFor="description"
                                  fontSize="20px"
                                >
                                  Mô tả
                                </FormLabel>
                                <Input
                                  id="description"
                                  placeholder="Mô tả ..."
                                  value={description}
                                  onChange={(e) =>
                                    setDescription(e.target.value)
                                  }
                                />
                              </Box>
                              <Box>
                                <FormLabel htmlFor="detail" fontSize="20px">
                                  Chi tiết
                                </FormLabel>
                                <Textarea
                                  id="detail"
                                  placeholder="Chi tiết sản phẩm ..."
                                  value={detail}
                                  onChange={(e) => setDetail(e.target.value)}
                                />
                              </Box>
                              <Box>
                                <FormLabel htmlFor="thumbnail" fontSize="20px">
                                  Thumbnail
                                </FormLabel>
                                <Input
                                  type="file"
                                  id="thumbnail"
                                  onChange={(e) =>
                                    setThumbnail(e.target.files[0])
                                  }
                                />
                              </Box>
                              <Box>
                                <FormLabel htmlFor="images" fontSize="20px">
                                  Images
                                </FormLabel>
                                <Input
                                  type="file"
                                  id="images"
                                  onChange={(e) =>
                                    setImages([...e.target.files])
                                  }
                                  multiple
                                />
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
                        onClick={() => handleDelete(product._id)}
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
                  handleDeleteUser(productId);
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
      <Box position="fixed" bottom="40px" left="36%">
        <Paginate onPageClick={handlePageClick} pageCount={pageCount} />
      </Box>
    </Flex>
  );
};

export default StoredUser;
