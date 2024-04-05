import styled from "@emotion/styled"
import { Button, Container, Grid, TextField, Typography, useTheme } from "@mui/material"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useLocation } from "react-router-dom"
import createUser from "../redux/slices/userSlice"
import Message from "../components/Message"
import Loader from "../components/Loader"


const Register = ({history}) =>{
    const theme = useTheme()

    const Paper = styled('div')({
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "left"
    })

    const Form = styled('form')({
        width: "100%",
        marginTop : theme.spacing(3)
    })

    const SubmitButton = styled(Button)({
        margin: theme.spacing(3,0,2)
    })

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState()

    const dispatch = useDispatch();

    const location = useLocation() ;
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get("redirect") || "/";
    const {userDetails, loading, error} = useSelector((state) => state.user);

    useEffect(() => {
        if (userDetails) {
            history.push(redirect)
        }
    }, [history, userDetails, redirect])


    const submitHandler = (e) =>{
        e.preventDefault();
    
        if(password !== confirmPassword){
            setMessage("Password do not match");
        }else {
            dispatch(createUser(name, email, password))
        }
    }

    return(
        <Container component="main" maxWidth="xs">
            <Paper>
                <Typography component="h1" style={{fontWeight: "bold"}} variant="h5">
                    Register
                </Typography>
    
                {message && <Message variant="danger">{message}</Message> }
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader/>}
    
               <Form onSubmit={submitHandler}>
                   <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField variant="filled" required fullWidth id="name" label="Name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField variant="filled" required fullWidth id="email" label="Email Address" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField variant="filled" required fullWidth id="password" label="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField variant="filled" required fullWidth id="Confirm Password" label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </Grid>

                        <SubmitButton type="submit" fullWidth variant="outlined" color="primary">
                            Register
                        </SubmitButton>

                        <Grid container justifyContent="flex-start">
                            <Grid item>
                                Already have an account ? 
                                <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} variant="body2">
                                    Sign In
                                </Link>
                            </Grid>
                        </Grid>
                   </Grid>
               </Form>
            </Paper>
        </Container>
    )
}

export default Register

