"use client";

import React from "react";
import {
  Container,
  Button,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { logoutUser } from "@/redux/features/apiRequest";
import HeaderLogo from "@/app/_components/header/HeaderLogo";

const HeaderServer = () => {
  const user = useSelector((state) => state.auth.login.currentUser);

  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handelLogout = () => {
    logoutUser(dispatch, id, accessToken, navigate);
  };

  return (
    <header>
      <Container bg="#ca956b" maxW="100%" marginBottom="2px" boxShadow="lg">
        <Flex justifyContent="space-between">
          <Link className="logo--admin" href="/home">
            <HeaderLogo />
          </Link>

          <Flex
            justifyContent="space-between"
            alignItems="center"
            paddingRight="20px"
          >
            {user ? (
              <Menu>
                <MenuButton background="transparent">
                  <Image
                    borderRadius="full"
                    boxSize="60px"
                    src="https://bit.ly/dan-abramov"
                    alt="Admin"
                  />
                </MenuButton>
                <MenuList margin="">
                  <MenuItem>
                    <Link href="/">Quay về trang chủ</Link>
                  </MenuItem>
                  <div className="straightLine"></div>
                  <MenuItem onClick={handelLogout}>Đăng xuất</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <Button colorScheme="gray">Đăng nhập</Button>
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </header>
  );
};

export default HeaderServer;
