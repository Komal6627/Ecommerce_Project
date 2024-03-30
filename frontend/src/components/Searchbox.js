import { useTheme } from '@mui/material/styles';
import styled from "@emotion/styled";
import { Box, IconButton, InputBase } from "@mui/material";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const SearchBox =() =>{
    const theme = useTheme()
    const StyledBox =  styled(Box)({
        display: "flex",
        borderRadius : theme.shape.borderRadius,
        backgroundColor: "#fff",
        boxShadow: "0 0 3px 1px rgba(0,0,0,0.1)",
        width: "100%"
    })

    const StyleInput = styled(InputBase)({
        marginLeft: theme.spacing(2),
        flex : 1,
        fontSize: "1rem"
    })

    const IconBtn = styled(IconButton)({
        padding : theme.spacing(1),
        backgroundColor : "white",
        color: "grey",
        "&:hover":{
            color: "black",
            backgroundColor:"grey",
        }
    })

    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();

        navigate(`/?keyword=${keyword}&page=1`);
    }

    return(
        <StyledBox component="form" onSubmit={submitHandler}>
            <StyleInput placeholder="Search for product" value={keyword} onChange= {((e) => setKeyword(e.target.value))}/>

            <IconBtn type='submit' aria-label='search'>
                <SearchOutlinedIcon/>
            </IconBtn>
        </StyledBox>
    )
}

export default SearchBox 