import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../CheckOutForm/CheckOutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLED_KEY);
const Payment = () => {
  const loader = useLoaderData();
  return (
    <div className="py-16 flex flex-col">
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm data={loader} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
