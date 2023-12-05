import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckOutForm/CheckOutForm";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLED_KEY);
console.log(import.meta.env.VITE_PUBLISHABLED_KEY);
const Payment = () => {
  const location = useLocation();
  return (
    <div className="py-16 flex flex-col">
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm data={location} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
