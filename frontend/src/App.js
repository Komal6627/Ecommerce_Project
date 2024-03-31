import React from 'react';
import CheckoutSteps from './components/CheckoutSteps'; // Correct import for CheckoutSteps
import Footer from './components/Footer';
import FormContainer from './components/FormContainer';
import Header from './components/Header';
import Loader from './components/Loader';
import Message from './components/Message';
import Paginate from './components/Paginate';
import Rating from './components/Rating';
import ProductCarousel from './components/ProductCarousel';
import Product from './components/Product';


const App = () => {
    return (
        <div>
            {/* <CheckoutSteps />
            <Footer/>
            <FormContainer/> */}
            <Header/>
            <Paginate/>
            {/* <Message/> */}

            {/* <Loader/> */}
            {/* <Rating/> */}
            <Product/>
        </div>
    );
};

export default App;
