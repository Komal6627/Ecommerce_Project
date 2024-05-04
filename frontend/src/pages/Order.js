import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { saveShippingAddress } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () =>{
    const cart = useSelector((state) => state.cart)

    const {shippingAddress } = cart;

    const  [address, setAddress ] = useState(shippingAddress.address)

    const [city, setCity] = useState(shippingAddress.city)

    const [postalCode, setPostalCode ] = useState(shippingAddress.postalCode)

    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();

    const navigate = useNavigate();

    //Handler

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(
            saveShippingAddress({
                address, city, postalCode, country
            })
        )
        navigate('./payment')
    }

    return(
        <FormContainer>
            <CheckoutSteps step1 step2/>

            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="address">
                    <Form.label>Address</Form.label>
                    <Form.Control required type="text" placeholder="Enter Address" value={address ? address:""} onChange={(e) => setAddress(e.target.value)}>

                    </Form.Control>
                </Form.Group>
            </Form>
        </FormContainer>
    )
 }