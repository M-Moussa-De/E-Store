import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import { useAppSelector } from "../store/configureStore";
import SignedInMenu from "./SignedInMenu";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import DialpadOutlinedIcon from "@mui/icons-material/DialpadOutlined";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const links = {
  midLinks: [
    { id: 1, title: "catalog", path: "/catalog", icon: StoreOutlinedIcon },
    { id: 2, title: "about", path: "/about", icon: InfoOutlinedIcon },
    { id: 3, title: "contact", path: "/contact", icon: DialpadOutlinedIcon },
  ],
  rightLinks: [
    { id: 1, title: "login", path: "/login", icon: LoginOutlinedIcon },
    { id: 2, title: "register", path: "/register", icon: LockOpenOutlinedIcon },
  ],
};

const navStyles = {
  color: "white",
  textDecoration: "none",
  typography: "p",
  fontWeight: "200",
  fontSize: "1rem",
  "&:hover": {
    "&:not(a.siteTitle)": {
      color: "primary.light",
    },
  },
  "&.active": {
    "&:not(a.siteTitle)": {
      color: "primary.light",
    },
  },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar
      elevation={0}
      position="static"
      sx={{ mb: 4, width: "100%", maxWidth: "100%" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="h6"
            component={NavLink}
            to="/"
            sx={navStyles}
            className="siteTitle"
          >
            E-Store
          </Typography>
          <Switch
            checked={darkMode}
            onClick={handleThemeChange}
            name="theme switcher"
          />
        </Box>

        <Box>
          <List sx={{ display: "flex" }}>
            {links.midLinks.map(({ id, title, path, icon: Icon }) => (
              <ListItem component={NavLink} to={path} key={id} sx={navStyles}>
                {<Icon />}{" "}
                <span
                  style={{ marginLeft: "8px", textTransform: "capitalize" }}
                >
                  {title}
                </span>
              </ListItem>
            ))}
          </List>
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            component={Link}
            to="/basket"
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
          >
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {user ? (
            <SignedInMenu />
          ) : (
            <List sx={{ display: "flex" }}>
              {links.rightLinks.map(({ id, title, path, icon: Icon }) => (
                <ListItem component={NavLink} to={path} key={id} sx={navStyles}>
                  {<Icon />}
                  <span
                    style={{ marginLeft: "8px", textTransform: "capitalize" }}
                  >
                    {title}
                  </span>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
