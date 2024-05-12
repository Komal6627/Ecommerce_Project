import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Col, ListGroup, Row } from "react-bootstrap";
import Message from "../components/Message";
import { Card } from "@mui/material";

const PlaceOrder = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const order = useSelector((state) => state.order);
    const { orderDetails, loading, error } = order;
    const cart = useSelector((state) => state.order);
    console.log(cart);

    //Price Calculation
    const itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.qty, 0
    );

    const shippingPrice = itemsPrice > 100 ? 0 : 10;

    const taxPrice = Number((0.082 * itemsPrice).toFixed(2));

    const totalPrice = (
        Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice).toFixed(2)
    )

    if (!cart.paymentMethod) {
        navigate("/payment")
    }

    const data = {
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: itemsPrice.toFixed(2).toString(),
        taxPrice: taxPrice.toFixed(2).toString(),
        totalPrice: totalPrice.toString()
    };
    // console.log(data);

    const PlaceOrder = () => {
        dispatch(createOrder(data)).then(() => {
            setTimeout(() => {
                console.log(orderDetails);
                navigate('/orderDetail')
            }, 1000);
        })
        .catch((error) => {
            //Handle any error that occured during order creation
        });

    }

    return(
        <div>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Shipping Address</strong>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Payment Method:</strong>
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {
                                cart.cartItems.length === 0 ? (
                                   <Message variant="info">Your cart is empty </Message>
                                ): (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => {
                                            <ListGroup.Item key={index}>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product${item.product}`}>{item.name}</Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X ₹{item.price} {(item.qty * item.price).toFixed(2)}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        })}
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                
                <Col md={4}>
                    <Card>
                        <ListGroup></ListGroup>
                    </Card>
                </Col>

            </Row>
        </div>
    )
}

export default PlaceOrder