import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import axios from "axios";
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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
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
    axios
      .get(`http://localhost:5000/api/Products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) =>
        process.env.NODE_ENV === "development" ? console.log(error) : ""
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h4>Loading...</h4>;

  if (!product) return <h3>No product was found.</h3>;

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
          ${(product.price / 100).toFixed(2)}
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
      </Grid>
    </Grid>
  );
}
