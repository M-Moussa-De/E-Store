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
import { useStoreContext } from "../context/StoreContext";

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const links = {
  midLinks: [
    { id: 1, title: "catalog", path: "/catalog" },
    { id: 2, title: "about", path: "/about" },
    { id: 3, title: "contact", path: "/contact" },
  ],
  rightLinks: [
    { id: 1, title: "login", path: "/login" },
    { id: 2, title: "register", path: "/register" },
  ],
};

const navStyles = {
  color: "white",
  textDecoration: "none",
  typography: "h6",
  fontSize: "0.9rem",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "grey.400",
  },
};

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useStoreContext();

  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={navStyles}>
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
            {links.midLinks.map(({ id, title, path }) => (
              <ListItem component={NavLink} to={path} key={id} sx={navStyles}>
                {title.toUpperCase()}
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
          <List sx={{ display: "flex" }}>
            {links.rightLinks.map(({ id, title, path }) => (
              <ListItem component={NavLink} to={path} key={id} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
