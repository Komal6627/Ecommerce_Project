import React from 'react';
import { Card, Container } from "react-bootstrap"
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from "./components/Footer"
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Product from './pages/Product';
import Shipping from './pages/Shipping';
import Order from './pages/Order';
import PlaceOrder from './pages/PlaceOrder';
import CheckoutSteps from './components/CheckoutSteps';
import Payment from './pages/Payment';
import Profile from './pages/Profile';




const App = () => {
    return (
        <>
            <div style={{position:"sticky", top: 0, zIndex:"100"}}>
                <Header/>
            </div>
            <Container>
                <main className='py-3'>
                   <Routes>
                        <Route exact path='/' Component={Home}/>
                        <Route  path='/page/:pageNumber' Component={Home}/>
                        <Route path='/login' Component={Login}/>
                        <Route path='/register' Component={Register}/>
                        <Route path='/cart/:id?' Component={Cart}/>
                        <Route path='/product/:id' Component={Product}></Route>
                        <Route path='/shipping' Component={Shipping}></Route>
                        <Route path="/orderDetail" Component={Order} />
                        <Route path='/placeorder' Component={PlaceOrder}></Route>
                        <Route path='/check' Component={CheckoutSteps}/>
                        <Route path='/payment' Component={Payment}></Route>
                        <Route path='/profile' Component={Profile}/>
                   </Routes>
                </main>
            </Container>
            <Footer />
        </>
    );
};

export default App;
