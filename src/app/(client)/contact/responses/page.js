"use client";

import React, { useEffect, useState } from "react";

import PathLink from "@/app/_components/PathLink";

import { useDispatch, useSelector } from "react-redux";
import { getAllContact } from "@/redux/features/apiRequest";
import { useRouter } from "next/navigation";
import HeroSection from "@/app/_components/HeroSection";
import axios from "axios";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Table,
  TableContainer,
  Tbody,
  Td,
  Textarea,
  FormControl,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { Button, FormLabel } from "react-bootstrap";
const { jwtDecode } = require("jwt-decode");

const axiosJWT = axios.create();

const ContactSection = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);

  const contactList = useSelector(
    (state) => state.contact?.contacts?.allContact?.contact
  );

  const dispatch = useDispatch();
  const navigate = useRouter();

  const findContact = contactList?.filter(
    (contact) => contact.user === user?._id
  );

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
      getAllContact(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const [responseAdmin, setResponseAdmin] = useState("");
  const [responseUser, setResponseUser] = useState("");

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

  const handleResponseUser = (res) => {
    setResponseUser(res);
    OnOpenResUser();
  };

  const handleResponseAmin = (res) => {
    setResponseAdmin(res);
    OnOpenResAdmin();
  };

  return (
    <>
      <HeroSection
        backgroundImg="https://i.ibb.co/mDFGRFh/contact-bg-1.jpg"
        content="We enjoy our work"
        des="You can’t buy happiness but you can buy lil doggo and that’s pretty much it"
      />
      <section className="section--contact__form">
        <div className="container">
          <PathLink content="Contact" />
          <div className="line"></div>
          <h2>Danh sách các ý kiến</h2>
          <TableContainer>
            <Table variant="simple" size="lg">
              <Thead>
                <Tr>
                  <Th textAlign="center" fontSize="xl">
                    #
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
                </Tr>
              </Thead>
              <Tbody>
                {findContact?.map((contact, index) => {
                  return (
                    <Tr key={contact._id}>
                      <Td textAlign="center">{index + 1}</Td>

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
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      </section>

      <Drawer
        isOpen={isOpenResUser}
        placement="bottom"
        size="lg"
        onClose={onCloseResUser}
        finalFocusRef={resUserRef}
      >
        <form>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize="26px">Xem chi tiết phản hồi</DrawerHeader>

            <DrawerBody>
              <Box>
                <FormControl>
                  <FormLabel fontSize="20px"></FormLabel>
                  <Textarea
                    fontSize={16}
                    height={200}
                    value={responseUser}
                    onChange={(e) => setResponseUser(e.target.value)}
                    readOnly
                  />
                </FormControl>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onCloseResUser}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>

      <Drawer
        isOpen={isOpenResAdmin}
        placement="bottom"
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
                    onChange={(e) => setResponseAdmin(e.target.value)}
                    readOnly
                  />
                </FormControl>
              </Box>
            </DrawerBody>

            <DrawerFooter>
              <Button variant="outline" mr={3} onClick={onCloseResAdmin}>
                Cancel
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </form>
      </Drawer>
    </>
  );
};

export default ContactSection;
