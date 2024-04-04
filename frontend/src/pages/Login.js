import { useEffect, useState,  } from "react"
import {useDispatch, useSelector} from "react-redux"
import { Link, useLocation } from "react-router-dom"
import FormContainer from "../components/FormContainer"
import { Button, Grid, TextField, Typography, useTheme } from "@mui/material"
import Message from "../components/Message"
import Loader from "../components/Loader"
import styled from "@emotion/styled"

const Login = ({history}) => {
     const theme = useTheme();

     const StyledForm = styled('form')(
        {
            width: "100% ",
            marginTop: theme.spacing(1)
        },
     )
     const StyledButton = styled(Button)(
           { 
            margin: theme.spacing(3,0,2)
        }
        
     )
      const [email, setEmail] =   useState()
      const [password, setPassword] = useState()

      const dispatch = useDispatch()

    const location = useLocation() ;
    const searchParams = new URLSearchParams(location.search);
    const redirect = searchParams.get("redirect") || "/";
    const userLogin = useSelector((state) => state.user);
    const {userDetails, loading, error} = userLogin;

    useEffect(() => {
        if(userDetails){
            history.replace(redirect)
        }
    },[history, userDetails, redirect])

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log(email, password);
        dispatch(email, password);        
    }

    return(
        <FormContainer>
            <Typography component="h1" style={{fontWeight: "bold"}}>
                Sign In
            </Typography>
            {error && <Message></Message>}
            {loading && <Loader/>}
            <StyledForm onSubmit={submitHandler}> 
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField variant="filled" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField variant="filled" required fullWidth id="password" name="password"  label= "Password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Grid>
                </Grid>

                <StyledButton type="submit" fullWidth variant="outline" color="primary">
                    Sign In
                </StyledButton>

                <Grid container justify = "flex-start">
                    <Grid item> 
                        New Customer ? {" "}
                        <Link to={redirect ? `/register?redirect=${redirect}`: "/register"} variant='body2'> Register</Link>
                    </Grid>
                </Grid>
            </StyledForm>
        </FormContainer>
    )
}

export default Login



