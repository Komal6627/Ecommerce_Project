import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderDetails, listMyOrders } from "../redux/slices/orderSlice";
import { deleteUser, updateUser } from "../redux/slices/userSlice";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Row, Col, Button, Form, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const { userDetails, loading, error } = user;

    const userData = {
        id: userDetails._id,
        name: name,
        email: email,
        password: password
    };

    const order = useSelector((state) => state.order);
    const { listorder, loading: loadingOrder, error: errorOrders } = order;

    console.log("Redux State Orders:", listorder);

    useEffect(() => {
        if (!userDetails) {
            navigate("/login");
        } else {
            dispatch(listMyOrders());
            setName(userDetails.name);
            setEmail(userDetails.username);
        }
    }, [dispatch, navigate, userDetails, error]);

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
        } else {
            dispatch(updateUser(userDetails.id, userData));
            console.log(userData);
            setMessage("");
        }
    };

    const handleDeleteUser = () => {
        dispatch(deleteUser(userDetails.id));
        navigate("/");
        window.location.reload();
    };

    return (
        <Row>
            <Col>
                <h2>User Profile</h2>
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            required
                            type="name"
                            placeholder="Enter the name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            required
                            type="email"
                            placeholder="Enter the Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Enter the Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="passwordConfirm">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            required
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" className="mt-3">
                        Update
                    </Button>
                </Form>

                <Button
                    type="button"
                    variant="danger"
                    className="mt-3"
                    onClick={handleDeleteUser}
                >
                    Delete Account
                </Button>
            </Col>

            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrder ? (
                    <Loader />
                ) : errorOrders ? (
                    <Message variant="danger">{errorOrders}</Message>
                ) : (
                    <Table striped responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Paid</th>
                                <th>Delivered</th>
                                <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listorder &&
                            listorder.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>
                                        {order.createdAt
                                            ? order.createdAt.substring(0, 10)
                                            : null}
                                    </td>
                                    <td>₹{order.totalPrice}</td>
                                    <td>
                                        {order.isPaid ? (
                                            order.paidAt ? (
                                                order.paidAt.substring(0, 10)
                                            ) : null
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        {order.isDeliver ? (
                                            order.deliveredAt ? (
                                                order.deliveredAt.substring(0, 10)
                                            ) : null
                                        ) : (
                                            <i
                                                className="fas fa-times"
                                                style={{ color: "red" }}
                                            ></i>
                                        )}
                                    </td>
                                    <td>
                                        <LinkContainer to={`/orderDetail/${order._id}`}>
                                            <Button
                                                className="btn-sm"
                                                onClick={() =>
                                                    dispatch(getOrderDetails(order._id))
                                                }
                                            >
                                                Details
                                            </Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                    </tbody>

                    </Table>
                )}
            </Col>
        </Row>
    );
};

export default Profile;
