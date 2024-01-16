import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CardMedia,
  Divider,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addItemToBasketAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const product = useAppSelector(state => productSelectors.selectById(state, id!));
  const {status: productStatus} = useAppSelector(state => state.catalog);
  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((i) => i.productId == product?.id);
  const theme = useTheme();

  const styles = {
    img: {
      width: "100%",
      margin: theme.breakpoints.up("sm") ? "5rem auto" : "0 auto",
      [theme.breakpoints.up("sm")]: {
        width: "50%",
      },
      [theme.breakpoints.up("lg")]: {
        width: "30%",
      },
    },
    text: (xsValue: string, mdValue: string): object => ({
      fontSize: { xs: xsValue, md: mdValue },
    }),
  };

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    
    if(!product && id) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (parseInt(event.currentTarget.value) >= 0) {
      setQuantity(parseInt(event.currentTarget.value));
    }
  };

  const handleUpdateCart = () => {  
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(addItemToBasketAsync({productId: product?.id, quantity: updatedQuantity}));

    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(removeBasketItemAsync({productId: product?.id, quantity: updatedQuantity}));
    }
  };

  if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />;

  if (!product) return <NotFound />;

  return (
    <Grid
      container
      spacing={6}
      mt={4}
      mx={theme.breakpoints.up("sm") ? "0 auto" : ""}
    >
      <Grid item xs={12} md={6}>
        <CardMedia
          component="img"
          image={product.pictureUrl}
          title={product.name}
          sx={styles.img}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h3" sx={styles.text("1rem", "1.2rem")}>
          {product.name}
        </Typography>
        <Divider sx={{ mt: 1, mb: 2 }} />
        <Typography
          variant="h4"
          sx={styles.text("0.9rem", "1.1rem")}
          fontWeight="bold"
          color="secondary"
        >
          {currencyFormat(product.price)}
        </Typography>

        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={6}>
            <TextField
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
            disabled={item?.quantity === quantity || !item && quantity === 0}
            loading={status.includes("pending")}
            onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
