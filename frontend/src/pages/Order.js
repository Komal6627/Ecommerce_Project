import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { payOrder } from "../redux/slices/orderSlice";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

const Order = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const order = useSelector((state) => state.order);

  const { orderDetails, error, loading } = order;
  console.log(orderDetails);

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  let updatedOrderDetails = orderDetails;

  if (
    updatedOrderDetails &&
    updatedOrderDetails.orderItems &&
    updatedOrderDetails.orderItems.length > 0
  ) {
    const itemsPrice = updatedOrderDetails.orderItems
      .reduce((acc, item) => acc + item.price * item.qty, 0)
      .toFixed(2);

    updatedOrderDetails = { ...updatedOrderDetails, itemsPrice };
  }

  const addPayPaScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AYgflmsaM7ccNLPlKUiufIyw8-spOE4UuS5XyyTCvhzheA-1EUcZF9qGlgXBZaSKcP5BY0zTc9WgINKe";
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    //If User is not Loggged In then redirect to login page
    if (!userDetails) {
      navigate("./login");
    } else if (!orderDetails.isPaid) {
      //Activating paypal script
      if (!window.paypal) {
        addPayPaScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderDetails, navigate, userDetails]);

  //Calculate the total price of each individual item
  const calculatedItemsPrice = () => {
    if (orderDetails.orderItems && orderDetails.orderItems.length > 0) {
      return orderDetails.orderItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price) * item.qty;
        return total + itemPrice;
      }, 0);
    }
    return 0;
  };

  //Call the calculateItemsPrice method to get the total price
  const itemPrice = calculatedItemsPrice();

  //Handler
  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderDetails._id, paymentResult));
    console.log(orderDetails._id);
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Order: {orderDetails._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              {/* <p>
                        <strong>Name: {orderDetails.User.name}</strong>
                      </p> */}
              {orderDetails && orderDetails.User && (
                <p>
                  <strong>Name: {orderDetails.User.name}</strong>
                </p>
              )}

              {/* <p>
                        <strong>Email:</strong>
                        <a href={`mailto:${orderDetails.User.username}`}>{orderDetails.User.username}</a>
                      </p> */}

              <p>
                <strong>Email:</strong>{" "}
                {orderDetails.User && orderDetails.User.username ? (
                  <a href={`mailto:${orderDetails.User.username}`}>
                    {orderDetails.User.username}
                  </a>
                ) : (
                  "Not available"
                )}
              </p>

              <p>
                <strong>Shipping Address:</strong>{" "}
                {orderDetails.shippingAddress ? (
                  <>
                    {orderDetails.shippingAddress.address},{" "}
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.postalCode},{" "}
                    {orderDetails.shippingAddress.country}
                  </>
                ) : (
                  "Address not available"
                )}
              </p>

              {orderDetails.isDeliver ? (
                <Message variant="success">
                  Delivered on{" "}
                  {orderDetails.deliveredAt
                    ? orderDetails.deliveredAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Payment Method</strong>
                {orderDetails.paymentMethod}
              </p>

              {orderDetails.isPaid ? (
                <Message variant="success">
                  Paid{" "}
                  {orderDetails.paidAt
                    ? orderDetails.paidAt.substring(0, 10)
                    : null}
                </Message>
              ) : (
                <Message variant="warning">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
  <h2>Order Items</h2>
  {console.log('Order Items:', orderDetails.orderItems)}

  {orderDetails.orderItems && orderDetails.orderItems.length > 0 ? (
    <ListGroup variant="flush">
      {orderDetails.orderItems.map((item, index) => (
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
              {item.qty} X ₹{item.price} = ₹
              {(item.qty * item.price).toFixed(2)}
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
    </ListGroup>
  ) : (
    <Message variant="info">Order is empty</Message>
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
                  <Col>Products Cost:</Col>
                  <Col>{itemPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>₹{orderDetails.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>₹ {orderDetails.taxPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>₹ {orderDetails.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={orderDetails.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
