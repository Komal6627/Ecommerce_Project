import styled from "@emotion/styled";
import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import {createUser} from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const theme = useTheme();



  const SubmitButton = styled(Button)({
    margin: theme.spacing(3, 0, 2),
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";
  const { userDetails, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDetails) {
      navigate("/redirect");
    }
  }, [navigate, userDetails, redirect]);

  const handleChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
    console.log(e.target.value);
  };


  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(createUser(name, email, password));
      setMessage("Registered Successfully")
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{display:"flex",  flexDirection: "column", alignItems: "left", margin: "3px"}}>
        <Typography component="h1" style={{ fontWeight: "bold" }} variant="h5">
          Register
        </Typography>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}

        <form onSubmit={submitHandler} style={{width: "100%", marginTop: "3px"}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Grid>

            <button
              type="submit"
              fullWidth
              variant="outlined"
              style={{ color:"blue"}}
            >
              Register
            </button>

            <Grid container justifyContent="flex-start">
              <Grid item>
                Already have an account ?{" "}
                <Link
                  to={redirect ? `/login?redirect=${redirect}` : "/login"}
                  variant="body2"
                >
                  Sign In
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default Register;
