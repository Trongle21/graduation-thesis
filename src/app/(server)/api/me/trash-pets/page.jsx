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
  DrawerOverlay,
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
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  getAllPet,
  getAllUser,
  deletePet,
  updatePet,
  getAllPetDeleted,
  handleActionPetForm,
  restorePet,
  deletePetForce,
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
  const petListDeleted = useSelector(
    (state) => state.pets?.pets?.allPetsDeleted?.pets
  );

  const [itemOffset, setItemOffset] = useState(0);

  const itemsPerPage = 4;

  const endOffset = itemOffset + itemsPerPage;

  const currentPetDeletedList = petListDeleted?.slice(itemOffset, endOffset);

  const pageCount = Math.ceil(petListDeleted?.length / itemsPerPage);

  const handlePageClick = (e) => {
    const newOffset = (e.selected * itemsPerPage) % petListDeleted?.length;
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
      getAllPet(user?.accessToken, dispatch, axiosJWT);
      getAllPetDeleted(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [petId, setPetId] = useState(null);

  const {
    isOpen: isOpenDelete,
    onOpen: OnOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const cancelRef = React.useRef();

  const handleDelete = (id) => {
    setPetId(id);
    OnOpenDelete();
  };

  const handleDeletePet = (id) => {
    deletePetForce(user?.accessToken, dispatch, id, axiosJWT);
  };

  const handleRestorePet = (id) => {
    restorePet(user?.accessToken, dispatch, id);
  };

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    const allPetIds = petListDeleted.map((product) => product._id);
    setSelectedItems(selectAll ? [] : allPetIds);
  };

  const handleSelectItem = (petId) => {
    setSelectedItems((prevSelectedItems) => {
      const newSelectedItems = prevSelectedItems.includes(petId)
        ? prevSelectedItems.filter((id) => id !== petId)
        : [...prevSelectedItems, petId];

      setSelectAll(
        newSelectedItems.length === petListDeleted.length &&
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
    handleActionPetForm(
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
                <Th textAlign="center" fontSize="xl"></Th>
                <Th textAlign="center" fontSize="xl">
                  #
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Tên pet
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Loại
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Tháng tuổi
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Giới tính
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Chủ sở hữu
                </Th>
                <Th textAlign="center" fontSize="xl">
                  Edit
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentPetDeletedList?.map((pet, index) => {
                const username = userList.find((user) => user._id === pet.user);
                if (pet.deleted) {
                  return (
                    <Tr key={pet._id}>
                      <Td>
                        <Checkbox
                          isChecked={selectedItems.includes(pet._id)}
                          onChange={() => handleSelectItem(pet._id)}
                        ></Checkbox>
                      </Td>
                      <Td textAlign="center">{index + 1}</Td>
                      <Td textAlign="center">{pet.name}</Td>
                      <Td textAlign="center">{pet.type}</Td>
                      <Td textAlign="center">{pet.age}</Td>
                      <Td textAlign="center">{pet.gender}</Td>
                      <Td textAlign="center">{username?.username}</Td>
                      <Td textAlign="center">
                        <Link paddingRight={1}>
                          <Button
                            colorScheme="facebook"
                            onClick={() => handleRestorePet(pet._id)}
                          >
                            Khôi phục
                          </Button>
                        </Link>
                        <Link>
                          <Button
                            colorScheme="red"
                            onClick={() => handleDelete(pet._id)}
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
              Xóa pet
            </AlertDialogHeader>

            <AlertDialogBody>Bạn chắc chắn xóa pet này</AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeletePet(petId);
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
