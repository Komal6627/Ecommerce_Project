import styled from "@emotion/styled"
import { Button, useTheme } from "@mui/material"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation } from "react-router-dom"



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
    const {userDetails, loading, error} = useSelector((state) => state.user)
}