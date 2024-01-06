import React, { useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
  Flex,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  DrawerFooter,
  AccordionIcon,
  useDisclosure,
  Input,
  Stack,
  InputGroup,
  InputRightElement,
  FormLabel,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

import {
  FaCartArrowDown,
  FaProductHunt,
  FaServicestack,
  FaUserAlt,
} from "react-icons/fa";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  createProduct,
  registerUser,
  createServicePack,
} from "@/redux/features/apiRequest";
import { MdContactPhone, MdOutlinePets } from "react-icons/md";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { RiGameFill } from "react-icons/ri";

const Navigation = () => {
  const {
    isOpen: userDrawerOpen,
    onOpen: onUserDrawerOpen,
    onClose: onUserDrawerClose,
  } = useDisclosure();
  const {
    isOpen: productDrawerOpen,
    onOpen: onProductDrawerOpen,
    onClose: onProductDrawerClose,
  } = useDisclosure();

  const {
    isOpen: servicePackDrawerOpen,
    onOpen: onServicePackDrawerOpen,
    onClose: onServicePackDrawerClose,
  } = useDisclosure();

  const [userInput, setUserInput] = useState("");
  const [productInput, setProductInput] = useState("");

  const isUserError = userInput === "";
  const isProductError = productInput === "";
  const firstField = React.useRef();

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [type, setType] = useState("dog");
  const [price, setPrice] = useState("");
  const [quantityProduct, setQuantityProduct] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [images, setImages] = useState([]);

  const [serviceName, setServiceName] = useState("");
  const [packages, setPackages] = useState([
    { name: "", price: "" },
    { name: "", price: "" },
  ]);

  const dispatch = useDispatch();
  const navigate = useRouter();

  const user = useSelector((state) => state.auth.login?.currentUser);
  const axiosJWT = axios.create();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    registerUser(newUser, dispatch, navigate, axiosJWT);
  };

  const handleSubmitProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name: name,
      type: type,
      price: price,
      quantityProduct: quantityProduct,
      description: description,
      detail: detail,
      thumbnail: thumbnail.name,
      images: images.map((image) => image.name),
    };
    createProduct(newProduct, dispatch, navigate);
  };

  const handlePackageChange = (index, field, value) => {
    const updatedPackages = [...packages];
    updatedPackages[index][field] = value;
    setPackages(updatedPackages);
  };

  const handleSubmitService = (e) => {
    const newServicePack = {
      serviceName: serviceName,
      packages: packages,
    };
    createServicePack(newServicePack, dispatch, navigate);
    e.preventDefault();
  };

  return (
    <Box
      w="260px"
      h="fit-content"
      bg="#ca956b"
      color="white"
      boxShadow="2xl"
      p="6"
      rounded="md"
      marginBottom="10px"
    >
      <Accordion allowToggle>
        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Link href="/api/dash-board">
              <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
                <RiGameFill />
                Dash Board
              </Flex>
            </Link>
          </AccordionButton>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <FaUserAlt />
              Người dùng
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link href="#" fontSize="20px" onClick={onUserDrawerOpen}>
                  Thêm người dùng
                </Link>
                <Link href="/api/me/stored-users">Danh sách người dùng</Link>
                <Link href="/api/me/trash-users">
                  Danh sách người dùng đã xóa
                </Link>
              </Flex>
              <Drawer
                isOpen={userDrawerOpen}
                placement="right"
                onClose={onUserDrawerClose}
                size="md"
              >
                <form onSubmit={handleSubmit}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize="26px">Create User</DrawerHeader>
                    <DrawerBody>
                      <Stack pacing="24px">
                        <Box>
                          <FormLabel htmlFor="username" fontSize="20px">
                            Tên
                          </FormLabel>
                          <Input
                            ref={firstField}
                            id="username"
                            placeholder="Please enter user name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="email" fontSize="20px">
                            Email
                          </FormLabel>
                          <Input
                            ref={firstField}
                            id="email"
                            placeholder="Please enter user name"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="password" fontSize="20px">
                            Mật khẩu
                          </FormLabel>
                          <InputGroup size="md">
                            <Input
                              pr="4.5rem"
                              type={show ? "text" : "password"}
                              placeholder="Enter password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="current-password"
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
                        </Box>
                      </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={onUserDrawerClose}
                      >
                        Thoát
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={onUserDrawerClose}
                        disabled={isUserError}
                        type="submit"
                      >
                        Lưu
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </form>
              </Drawer>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <FaProductHunt />
              Sản phẩm
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link href="#" fontSize="20px" onClick={onProductDrawerOpen}>
                  Thêm sản phẩm
                </Link>
                <Link href="/api/me/stored-products">Danh sách sản phẩm</Link>
                <Link href="/api/me/trash-products">
                  Danh sách sản phẩm đã xóa
                </Link>
              </Flex>
              <Drawer
                isOpen={productDrawerOpen}
                placement="right"
                onClose={onProductDrawerClose}
                size="md"
              >
                <form onSubmit={handleSubmitProduct}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize="26px">Create Product</DrawerHeader>

                    <DrawerBody>
                      <Stack pacing="24px">
                        <Box>
                          <FormLabel htmlFor="name" fontSize="20px">
                            Tên sản phẩm
                          </FormLabel>
                          <Input
                            ref={firstField}
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
                            ref={firstField}
                            id="price"
                            placeholder="Giá ..."
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="quantity" fontSize="20px">
                            Số lượng
                          </FormLabel>
                          <Input
                            ref={firstField}
                            id="quantity"
                            placeholder="Số lượng ..."
                            value={quantityProduct}
                            onChange={(e) => setQuantityProduct(e.target.value)}
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="description" fontSize="20px">
                            Mô tả
                          </FormLabel>
                          <Input
                            ref={firstField}
                            id="description"
                            placeholder="Mô tả ..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="detail" fontSize="20px">
                            Chi tiết
                          </FormLabel>
                          <Textarea
                            ref={firstField}
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
                            onChange={(e) => setThumbnail(e.target.files[0])}
                          />
                        </Box>
                        <Box>
                          <FormLabel htmlFor="images" fontSize="20px">
                            Images
                          </FormLabel>
                          <Input
                            type="file"
                            id="images"
                            onChange={(e) => setImages([...e.target.files])}
                            multiple
                          />
                        </Box>
                      </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={onProductDrawerClose}
                      >
                        Thoát
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={onProductDrawerClose}
                        disabled={isProductError}
                        type="submit"
                      >
                        Lưu
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </form>
              </Drawer>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <MdOutlinePets />
              Pet
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link href="/api/me/stored-pets">Danh sách pet</Link>
                <Link href="/api/me/trash-pets">Danh sách pet đã xóa</Link>
              </Flex>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <FaServicestack />
              Dịch vụ
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link
                  href="#"
                  fontSize="20px"
                  onClick={onServicePackDrawerOpen}
                >
                  Thêm dịch vụ
                </Link>
                <Link href="/api/me/stored-service-pack">
                  Danh sách dịch vụ
                </Link>
                <Link href="/api/me/trash-service-pack">
                  Danh sách dịch vụ đã xóa
                </Link>
              </Flex>
              <Drawer
                isOpen={servicePackDrawerOpen}
                placement="right"
                onClose={onServicePackDrawerClose}
                size="md"
              >
                <form onSubmit={handleSubmitService}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader fontSize="26px">Tạo dịch vụ</DrawerHeader>
                    <DrawerBody>
                      <Stack pacing="24px">
                        <Box>
                          <FormLabel htmlFor="serviceName" fontSize="20px">
                            Tên dịch vụ
                          </FormLabel>
                          <Input
                            ref={firstField}
                            id="serviceName"
                            placeholder="Please enter user name"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            autoComplete="serviceName"
                          />
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
                      </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                      <Button
                        variant="outline"
                        mr={3}
                        onClick={onServicePackDrawerClose}
                      >
                        Thoát
                      </Button>
                      <Button
                        colorScheme="blue"
                        onClick={onServicePackDrawerClose}
                        disabled={isUserError}
                        type="submit"
                      >
                        Lưu
                      </Button>
                    </DrawerFooter>
                  </DrawerContent>
                </form>
              </Drawer>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <BsFillCalendarDateFill />
              Lịch đặt hẹn
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link href="/api/me/stored-appointment">
                  Danh sách lịch đặt hẹn
                </Link>
                <Link href="/api/me/trash-appointments">
                  Danh sách lịch hẹn đã xóa
                </Link>
              </Flex>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <FaCartArrowDown />
              Đơn hàng
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link href="/api/me/stored-order">Danh sách đơn hàng</Link>
                <Link href="/api/me/trash-order">
                  Danh sách đơn hàng đã xóa
                </Link>
              </Flex>
            </Box>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem border="none">
          <AccordionButton fontSize="20px">
            <Flex flex="1" textAlign="left" alignItems="center" gap="10px">
              <MdContactPhone />
              Liên hệ
            </Flex>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <Box>
              <Flex flexDirection="column" gap="4px">
                <Link href="/api/me/stored-contact">Ý kiến phản hồi</Link>
                <Link href="/api/me/trash-contact">Ý kiến phản hồi đã xóa</Link>
              </Flex>
            </Box>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};

export default Navigation;
