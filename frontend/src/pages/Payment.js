import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from '../redux/slices/cartSlice'
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form, Col } from "react-bootstrap";



const Payment = () =>{

    //Pulling out shipping Address in the cart
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate()

    const { shippingAddress } = cart;

  
    const [ paymentMethod, setPaymentMethod ] = useState("Paypal");

    //If no shipping address  then redirect to shipping Address page

    if(!shippingAddress.address){
        navigate('/shipping')
    }

    const  dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault()

        dispatch(savePaymentMethod(paymentMethod));

        navigate('/placeorder')
    }

    return(
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Method
                    </Form.Label>

                    <Col>
                        {/* <Form.Check type="radio" label="PayPal or Credit Card" id="paypal" name="payementMethod" checked onChange={(e) => setPaymentMethod(e.target.value)} ></Form.Check> */}

                        <Form.Check
                            type="radio"
                            label="PayPal or Credit Card"
                            id="paypal"
                            name="paymentMethod"
                            value="PayPal"
                            checked={paymentMethod === "PayPal"}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>
                    </Col>
                </Form.Group>

                <Button type="submit" variant="primary" className="my-3">Continue</Button>
            </Form>
        </FormContainer>
    )

}

export default Payment