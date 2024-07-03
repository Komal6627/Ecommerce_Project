import { useEffect, useState, useRef } from "react";
import Loader from "../components/Loader";

const PayPalButton = ({ amount, onSuccess }) => {
  const [sdkReady, setSdkReady] = useState(false);
  const paypalRef = useRef();

  useEffect(() => {
    const addPayPalScript = () => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=AW3tzRvnb-rXU4fLHh83fyByJ18kFW5jt5tYFAgW5xdQyuNqCFXZ6-29b4PZ75pv-qUMX1h8ZpyF4bt7&currency=USD`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // Check if the PayPal script is already added
    if (!document.querySelector(`script[src="https://www.paypal.com/sdk/js?client-id=AW3tzRvnb-rXU4fLHh83fyByJ18kFW5jt5tYFAgW5xdQyuNqCFXZ6-29b4PZ75pv-qUMX1h8ZpyF4bt7&currency=USD"]`)) {
      addPayPalScript();
    } else {
      setSdkReady(true);
    }
  }, []);

  useEffect(() => {
    if (sdkReady) {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log('Order successful', order);
          onSuccess(order);
        },
        onError: (err) => {
          console.error('PayPal Checkout onError', err);
        },
      }).render(paypalRef.current);
    }
  }, [sdkReady, amount, onSuccess]);

  return (
    <div>
      {sdkReady ? (
        <div ref={paypalRef}></div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default PayPalButton;
