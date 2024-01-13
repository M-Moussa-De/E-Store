import { Typography, ButtonGroup, Button, Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./CounterSlice";

export default function ContactPage() {
  const dispatch = useAppDispatch();
  const { data, title } = useAppSelector((state) => state.counter);

  return (
    <>
      <Typography variant="h5" textAlign="center">
        {title}
      </Typography>

      <Box mt={5}>
        <Typography variant="h5">The data are {data}</Typography>

        <ButtonGroup variant="text" sx={{ mt: 1 }}>
          <Button
            variant="contained"
            color="error"
            onClick={() => dispatch(decrement(1))}
          >
            Decrement
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(increment(1))}
          >
            Increment
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => dispatch(increment(5))}
          >
            Increment by 5
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
}
