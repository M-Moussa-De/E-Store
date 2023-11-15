import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import axios from "axios";
import { Divider, Grid, Typography } from "@mui/material";
import Image from 'material-ui-image'


export default function ProductDetails() {
   const {id} = useParams<{id: string}>();
   const [product, setProduct] = useState<Product | null>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
    axios.get(`http://localhost:5000/api/Products/${id}`)
      .then((response) => setProduct(response.data))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);
  
  if(loading) return <h4>Loading...</h4>

  if(!product) return <h3>No product was found.</h3>

  return (
    <Grid container spacing={6}>
        <Grid item xs={6}>
          <Image src={product.pictureUrl} alt={product.name} />
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5">{product.name}</Typography>
          <Divider sx={{mb: 2}} />
          <Typography variant="h6" color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
        </Grid>
    </Grid>
  )
}
