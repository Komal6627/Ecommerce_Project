import styled from "@emotion/styled";
import { useTheme } from '@mui/material/styles';
import { AppBar, IconButton, Menu, MenuItem, Toolbar } from "@mui/material";
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom';
import { logout } from "../redux/slices/userSlice";
import { useState } from "react";
import logo from "../images/logo.png"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchBox from "./Searchbox";
import Star from "./star";
import { ShoppingCart } from "@mui/icons-material";


const Header = () =>{
    const theme = useTheme();

    const Appbar = styled(AppBar)({
        //  backgroundColor : "#039be5"
        // backgroundColor: "#6200ea"
        backgroundColor: "#0b5ed7"
    })

    const StyleDiv = styled('div')({
        flexGrow: 1,
    })

    const Menuitem = styled(MenuItem)({
        minWidth: 180,
    })


    const StyledLink = styled(Link)({
        textDecoration: "none",
        color: "#fff",
    })


    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.user);
    const {userDetails} = userLogin;

    const [anchorE1, setAnchorE1] = useState(null)
    const open = Boolean(anchorE1);

    const handleProfileMenuOpen = (event) =>{
            setAnchorE1(event.currentTarget);
    }

    const handleMenuClose = () =>{
        setAnchorE1(null);
    }

    const handleLogout = () =>{
        dispatch(logout());
        console.log("hii");
        handleMenuClose();
        window.location.reload();  
    }
    return(
        <StyleDiv>
            <Appbar position="static">
                <Toolbar>
                    <StyledLink to='/'>
                    <img src={logo} alt="E-Shop" style={{ height: 50, borderRadius: '50%' }} />
                    </StyledLink>

                    <div style={{marginLeft: "5vw"}}>
                       <SearchBox/>
                    </div>

                    <StyleDiv/>

                    <div>
                        <IconButton aria-label="show-cart-items" color="inherit" component={Link} to="/cart" style={{color: "white"}}> 
                            <ShoppingCart/>
                        </IconButton>
                    </div>
                    {console.log(userDetails)}
                    {userDetails ? (
                        <>
                            <IconButton edge="end" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleProfileMenuOpen} color="inherit" style={{color: "white"}}>
                                <AccountCircleIcon/>
                            </IconButton>

                            <Menu id="menu-appbar" anchorEl={anchorE1} anchorOrigin={{ vertical: "top", horizontal: "right"}} keepMounted transformOrigin={{vertical: "top", horizontal: "right"}} open={open} onClose={handleMenuClose}>
                                <Menuitem component={Link} to="/profile" onClick={handleMenuClose}>
                                    Profile
                                </Menuitem>
                                <Menuitem onClick={handleLogout}>
                                    Logout
                                </Menuitem>
                            </Menu>
                        </>
                    ): (
                        <div>
                            <IconButton aria-label="login" color="inherit" component={Link} to="/login" style={{color: "white"}}>
                                <AccountCircleIcon/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </Appbar>
        </StyleDiv>
    )
}

export default Header