
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../redux/slices/orderSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Col, ListGroup, Row, Image } from "react-bootstrap";
import Message from "../components/Message";
import { Card } from "@mui/material";
import { useEffect, useState } from "react";

const PlaceOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = useSelector((state) => state.order);
  const { orderDetails, loading, error } = order;
  const [orderPlaced, setOrderPlaced] = useState(false);
  const cart = useSelector((state) => state.cart);
  console.log("Cart:",cart);


  
  //Price Calculation
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  console.log("Items Price:", itemsPrice);


  
  const shippingPrice = itemsPrice > 100 ? 10: 0;
  console.log("Shipping Price:", shippingPrice);


  const taxPrice = Number((0.082 * itemsPrice).toFixed(2));

  const totalPrice = Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);

  console.log("Total Price:", totalPrice);

   useEffect(() => {
        if (!cart.paymentMethod) {
          navigate("/payment");
        }
      }, [cart.paymentMethod, navigate]);
  // const data = {
  //   orderItems: cart.cartItems,
  //   shippingAddress: cart.shippingAddress,
  //   paymentMethod: cart.paymentMethod,
  //   itemsPrice: itemsPrice.toFixed(2).toString(),
  //   taxPrice: taxPrice.toFixed(2).toString(),
  //   totalPrice: totalPrice.toString(),
  //   shippingPrice: shippingPrice.toString()
  // };
  // console.log("data:",data);


  console.log("PlaceOrderHandler Prev");

  useEffect(() => {
    if (orderPlaced && orderDetails && orderDetails._id) {
      navigate(`/orderDetail/${orderDetails._id}`);
    }
  }, [orderPlaced, orderDetails, navigate]);
  
  const placeOrderHandler = () => {
    console.log("PlaceOrderHandler starts");

    const data = {
      orderItems: cart.cartItems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: itemsPrice.toFixed(2),
      taxPrice: taxPrice.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      shippingPrice: shippingPrice.toFixed(2),
    };

    dispatch(createOrder(data))
      .then(() => {
        setTimeout(() => {
          console.log("Order Details:", orderDetails);
          setOrderPlaced(true);
        }, 500);
      })
      .catch((error) => {
        console.log("Error of placeOrderHandler:", error);
        // Handle any error that occurred during order creation
      });

    // dispatch(createOrder(data))
    //   .then(() => {
    //     setOrderPlaced(true);
    //   })
    //   .catch((error) => {
    //     console.error("Error in placeOrderHandler:", error);
    //   });
  };

     console.log("PlaceOrderHandler ends");

  const ErrorFallback = ({ error }) => (
    <Message variant="danger">{error.message}</Message>
  );

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping Address:</strong>
                {cart.shippingAddress
                  ? `${cart.shippingAddress.address}, ${cart.shippingAddress.city}, ${cart.shippingAddress.postalCode}, ${cart.shippingAddress.country}`
                  : "No shipping address provided"}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Payment Method:</strong>
                {cart.paymentMethod || "No payment method provided"}
                
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Message variant="info">Your cart is empty </Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} X ₹{item.price}{" "}
                          {(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items:</Col>
                  <Col>₹{itemsPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>₹{shippingPrice.toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>₹{taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹{totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
              {error ? <ErrorFallback error={error} /> : null}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="w-100"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrder;
