
import { Button, Card, Col, ListGroup, Row, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import {removeFromCart} from "../redux/slices/cartSlice"
import { FaTrashAlt } from "react-icons/fa";

const Cart = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const cart = useSelector((state) => state.cart);

    const { cartItems } = cart;
    console.log(cartItems);

    const removeFromCartHandler = (id) =>{
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () =>{
        navigate("/login?redirect=shipping");
    }

    return(
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                   <Message variant= "info">
                        Your cart is empty.<Link to="/">Go Back</Link>
                   </Message>
                ): (
                    <ListGroup variant="flush">
                        {cartItems.map((item) => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded></Image>
                                    </Col>
                                    <Col m={3}>
                                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                                    </Col>
                                    <Col>{item.qty}</Col>
                                    <Col> ₹{item.price}</Col>
                                    <Col md={1}>
                                        <Button type="button" variant="light" onClick={() => removeFromCartHandler(item._id)} >
                                        <FaTrashAlt style={{color: "red"}} />
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>
                                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                                items
                            </h2>
                            ₹ {cartItems .reduce((acc, item) => acc + item.qty * item.price, 0).toFixed}
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Button type="button" className="w-100" disabled={cartItems.length === 0} onClick={checkoutHandler}>
                            Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </Card>
            </Col>
        </Row>
    )
}

export default Cart;