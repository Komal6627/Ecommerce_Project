import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { payOrder, getOrderDetails } from "../redux/slices/orderSlice";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

const Order = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sdkReady, setSdkReady] = useState(false);

  const order = useSelector((state) => state.order);
  const { orderDetails, error, loading } = order;

  const userLogin = useSelector((state) => state.user);
  const { userDetails } = userLogin;

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://www.paypal.com/sdk/js?client-id=AW3tzRvnb-rXU4fLHh83fyByJ18kFW5jt5tYFAgW5xdQyuNqCFXZ6-29b4PZ75pv-qUMX1h8ZpyF4bt7";
      script.async = true;
      script.onload = () => {
        console.log("PayPal SDK loaded");
        setSdkReady(true);
      };
      script.onerror = () => {
        console.error("PayPal SDK failed to load");
      };
      document.body.appendChild(script);
    };

    if (!userDetails) {
      navigate("/login");
    } else if (!orderDetails || orderDetails._id !== orderId) {
      console.log("Dispatching getOrderDetails for orderId:", orderId);
      dispatch(getOrderDetails(orderId));
    } else if (!orderDetails.isPaid && !sdkReady) {
      if (!window.paypal) {
        console.log("Adding PayPal script...");
        addPayPalScript();
      } else {
        console.log("PayPal script already loaded.");
        setSdkReady(true);
      }
    }

    // Log the orderDetails object
    console.log("orderDetails:", orderDetails);
  }, [dispatch, orderId, orderDetails?._id, orderDetails?.isPaid, navigate, userDetails, sdkReady]);

  const successPaymentHandler = (paymentResult) => {
    console.log("Payment successful:", paymentResult);
    dispatch(payOrder(orderDetails._id, paymentResult));
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
              {orderDetails.user && (
                <p>
                  <strong>Name: {orderDetails.user.name}</strong>
                </p>
              )}
              <p>
                <strong>Email:</strong>{" "}
                {orderDetails.user && orderDetails.user.username ? (
                  <a href={`mailto:${orderDetails.user.username}`}>
                    {orderDetails.user.username}
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
              {orderDetails.isDelivered ? (
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
                          {item.qty} X &#8377;{item.price} = &#8377;
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
                  <Col>
                    {orderDetails.orderItems &&
                      orderDetails.orderItems
                        .reduce(
                          (acc, item) => acc + item.price * item.qty,
                          0
                        )
                        .toFixed(2)}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    {orderDetails.shippingPrice !== undefined
                      ? `₹${Number(orderDetails.shippingPrice).toFixed(2)}`
                      : "Not available"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>&#8377;{Number(orderDetails.taxPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>&#8377;{Number(orderDetails.totalPrice).toFixed(2)}</Col>
                </Row>
              </ListGroup.Item>
              {!orderDetails.isPaid && (
                <ListGroup.Item>
                  {loading && <Loader />}
                  {!sdkReady ? (
                    <PayPalButton
                      amount={Number(orderDetails.totalPrice).toFixed(2)}
                      onSuccess={successPaymentHandler}
                    />
                  ) : (
                    <Loader />
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
