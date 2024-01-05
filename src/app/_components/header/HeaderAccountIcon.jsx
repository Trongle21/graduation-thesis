import { logoutUser } from "@/redux/features/apiRequest";
import { Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button";
import useAppContext from "@/app/_hooks/useAppContext";
const HeaderAccountIcon = () => {
  const { onShowSignIn } = useAppContext();
  const user = useSelector((state) => state.auth.login.currentUser);

  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handelLogout = () => {
    logoutUser(dispatch, id, accessToken, navigate);
  };

  const handleSignIn = () => {
    onShowSignIn();
  };

  return (
    <div className="main--account__icon">
      {user ? (
        <Menu>
          <MenuButton>
            <FaUser />
          </MenuButton>
          <MenuList marginTop="10px">
            {user.admin ? (
              <MenuItem fontSize="18px">
                <Link href="/api/dash-board">
                  Trang quản trị
                </Link>
              </MenuItem>
            ) : null}
            <div className="straightLine"></div>
            <MenuItem fontSize="18px" textAlign="center">
              <Link href="/order">Đơn mua</Link>
            </MenuItem>
            <div className="straightLine"></div>
            <MenuItem fontSize="18px">
              <Link href="/home" onClick={handelLogout}>
                Đăng xuất
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton>
            <FaUser />
          </MenuButton>
          <MenuList marginTop="10px">
            <MenuItem fontSize="18px" display="flex" justifyContent="center">
              <Link href="#" onClick={handleSignIn}>
                Đăng nhập
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </div>
  );
};

export default HeaderAccountIcon;
