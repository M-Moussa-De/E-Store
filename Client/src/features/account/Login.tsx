import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Paper } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import { signInUser } from "./accountSlice";
import { useAppDispatch } from "../../app/store/configureStore";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    setValue,
    setFocus,
    formState: { isSubmitting, errors, isValid },
  } = useForm({
    mode: "onTouched",
  });

  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      navigate(location.state?.from || "/catalog");
    } catch (error) {
      setValue("password", "");
      setFocus("password");
      console.log(error);
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
        marginTop: "6rem",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOpenOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(submitForm)}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          autoFocus
          margin="normal"
          variant="outlined"
          fullWidth
          label="Username"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors.username?.message as string}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={!!errors.password}
          helperText={errors.password?.message as string}
        />
        <LoadingButton
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link style={{ textDecoration: "none" }} to="/register">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
