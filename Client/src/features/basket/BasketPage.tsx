import Typography from "@mui/material/Typography";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Grid,
  Button,
} from "@mui/material";
import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import BasketSummary from "./BasketSummary";
import { currencyFormat } from "../../app/util/util";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemToBasketAsync, removeBasketItemAsync } from "./basketSlice";

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket || !basket.items || basket.items.length === 0)
    return (
      <Box textAlign="center">
        <Typography variant="h3" fontSize={18} color="rgba(0 0 0 /0.8)" mb={3}>
          Your basket is empty
        </Typography>

        <Link to="/catalog">
          <Button variant="contained" color="primary">
            Continue shopping
          </Button>
        </Link>
      </Box>
    );

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center">
                    <Link
                      to={`/catalog/${item.productId}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: "inherit",
                        textDecoration: "none",
                      }}
                    >
                      <img
                        src={item.pictureUrl}
                        alt={item.name}
                        style={{ height: 50, marginRight: 20 }}
                      />
                      <span>{item.name}</span>
                    </Link>
                  </Box>
                </TableCell>
                <TableCell component="th" scope="row">
                  {currencyFormat(item.price)}
                </TableCell>
                <TableCell align="center">
                  <LoadingButton
                    aria-label="remove item from cart"
                    color="error"
                    loading={status === `pendingRemoveItem${item.productId}rem`}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          name: "rem",
                        })
                      )
                    }
                  >
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    aria-label="add item to cart"
                    color="secondary"
                    loading={status === `pendingAddItem${item.productId}`}
                    onClick={() =>
                      dispatch(
                        addItemToBasketAsync({ productId: item.productId })
                      )
                    }
                  >
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell>
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                <TableCell>
                  <LoadingButton
                    aria-label="delete"
                    color="error"
                    loading={status === `pendingRemoveItem${item.productId}del`}
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
