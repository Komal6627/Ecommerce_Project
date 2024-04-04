import React from 'react';
import { Container } from "react-bootstrap"
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Footer from "./components/Footer"
import Login from './pages/Login';



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
                   </Routes>
                </main>
            </Container>
            <Footer />
        </>
    );
};

export default App;
