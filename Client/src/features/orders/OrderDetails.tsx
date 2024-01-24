import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { Order } from "../../app/models/order";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/models/Basket";
import BasketSummary from "../basket/BasketSummary";

interface Props {
 order: Order;
 setSelectedOrder: (id: number) => void;
}

export default function OrderDetails({ order, setSelectedOrder }: Props) {
 
    const subtotal = order.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) ?? 0;

  return (
    <>
     <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h6' gutterBottom sx={{p: 2}}>Order# {order?.id} - {order?.orderStatus}</Typography>
        <Link to='/orders'>
            <Button onClick={() => setSelectedOrder(0)} variant="contained">Back to orders</Button>
        </Link>
     </Box>
     <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
     <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
     </Grid>
  </>
  )
}
