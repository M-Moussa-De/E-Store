import { useEffect, useState } from 'react';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Order } from '../../app/models/order';
import OrderDetails from './OrderDetails';
import { Typography, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';
import { currencyFormat } from '../../app/util/util';

export default function Orders() {
  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    agent.Orders.list()
        .then(orders => {
            setOrders(orders);
        })
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
  }, []);

  if(loading) return <LoadingComponent message='Loading orders...' />;

  if(selectedOrderNumber > 0) return (
      <OrderDetails
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        order={orders?.find(o => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    )
  
  return (
    <>
      <Typography variant='h6' gutterBottom p={2}>Orders</Typography>    
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Order Number</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Order Date</TableCell>
              <TableCell align="center">Order Status</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <TableRow
                key={order.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }}}
              >
                <TableCell component="th" scope="row" align='center'>
                  {order.id}
                </TableCell>
                <TableCell align="center">{currencyFormat(order.total)}</TableCell>
                <TableCell align="center">{order.orderDate.split('T')[0]}</TableCell>
                <TableCell align="center">{order.orderStatus}</TableCell>
                <TableCell align="center">
                  <Button onClick={() => setSelectedOrderNumber(order.id)}>View</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}