import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signout } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.account);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        sx={{ textTransform: "none" }}
        onClick={handleClick}
      >
        {user?.email} <ArrowDropDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={handleClose}>
          <PermIdentityOutlinedIcon />
          <span style={{ marginLeft: "10px" }}>Profile</span>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ShoppingBagOutlinedIcon />{" "}
          <span style={{ marginLeft: "10px" }}>My orders</span>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signout());
            dispatch(clearBasket());
          }}
        >
          <LogoutOutlinedIcon />
          <span style={{ marginLeft: "10px" }}>Logout</span>
        </MenuItem>
      </Menu>
    </>
  );
}
