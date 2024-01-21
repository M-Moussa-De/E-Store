import { Remove, Add, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Card,
} from "@mui/material";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { removeBasketItemAsync, addItemToBasketAsync } from "./basketSlice";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { BasketItem } from "../../app/models/Basket";

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Products</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell>Subtotal</TableCell>
              {isBasket && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
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
                  {isBasket && (
                    <LoadingButton
                      aria-label="remove item from cart"
                      color="error"
                      loading={
                        status === `pendingRemoveItem${item.productId}rem`
                      }
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
                  )}
                  {item.quantity}
                  {isBasket && (
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
                  )}
                </TableCell>
                <TableCell>
                  {currencyFormat(item.price * item.quantity)}
                </TableCell>
                {isBasket && (
                  <TableCell>
                    <LoadingButton
                      aria-label="delete"
                      color="error"
                      loading={
                        status === `pendingRemoveItem${item.productId}del`
                      }
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
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
