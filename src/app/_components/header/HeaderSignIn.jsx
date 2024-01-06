import React from "react";
import Button from "../Button";
import useAppContext from "@/app/_hooks/useAppContext";
import { useDispatch, useSelector } from "react-redux";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { logoutUser } from "@/redux/features/apiRequest";
import Link from "next/link";

const HeaderSignIn = () => {
  const { onShowSignIn } = useAppContext();

  const user = useSelector((state) => state.auth.login.currentUser);

  const accessToken = user?.accessToken;
  const id = user?._id;
  const dispatch = useDispatch();
  const navigate = useRouter();

  const handelLogout = () => {
    logoutUser(dispatch, id, accessToken, navigate);
  };

  return (
    <div className="header--sign-in">
      {user ? (
        <Menu>
          <MenuButton>
            <Link href="/" className="btn btn--secondary btn-user">
              {user.username}{" "}
            </Link>
          </MenuButton>
          <MenuList marginTop="10px">
            {user.admin ? (
              <MenuItem>
                <Link href="/api/dash-board">Trang quản trị</Link>
              </MenuItem>
            ) : null}

            <MenuItem>
              <Link href="/order">Đơn mua</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/info">Sửa thông tin</Link>
            </MenuItem>
            <MenuItem>
              <Link href="/change-password">Đổi mật khẩu</Link>
            </MenuItem>
            <MenuItem onClick={handelLogout}>
              <Link href="/home">Đăng xuất</Link>
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Button
          className="btn btn--primary"
          content="Sign In"
          onClick={onShowSignIn}
        />
      )}
    </div>
  );
};

export default HeaderSignIn;
