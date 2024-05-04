import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { Button, Form } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const Shipping = () => {
  const cart = useSelector((state) => state.cart);

  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);

  const [city, setCity] = useState(shippingAddress.city);

  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);

  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    navigate("./payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address || ""}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter City"
            value={city || ""}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode || ""}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Country"
            value={country || ""}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>

        <Button className="my-3" type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};


export default Shipping
