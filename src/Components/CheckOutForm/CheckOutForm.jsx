import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";
import Subscribtion from "../../Pages/Home/Subscribtion/Subscribtion";

const CheckoutForm = ({ data }) => {
  const [ClientSecret, setClientSecret] = useState("");
  const [error, setError] = useState("");
  const [tranjecttionId, setTranjectionID] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();
  const AxiosSecure = UseAxiosSecure();
  const SectionTitle = UseSectionTitle("Payment Your", "Order");
  //
  useEffect(() => {
    AxiosSecure.post("/payment/create").then((res) =>
      setClientSecret(res.data.clientSecret)
    );
  }, [AxiosSecure]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target);
    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(Subscribtion);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError(null);
    }

    //Conform Card Payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(ClientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirmError", confirmError.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Payment Failed!!${confirmError.message}`,
        footer: "Please try again later",
      });
    } else {
      console.log("Payment Success", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTranjectionID(paymentIntent.id);
        Swal.fire(`Payment Success!. Your TransactionId: ${tranjecttionId}`);
      }
    }
  };

  return (
    <div>
      {SectionTitle}
      <form onSubmit={handleSubmit} className="py-6 md:w-1/2 mx-auto">
        <CardElement
          className="py-5"
          options={{
            style: {
              base: {
                fontSize: "20px",
                color: "#fb923c",
                "::placeholder": {
                  color: "#27413",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          disabled={!stripe || !ClientSecret}
          className="flex btn btn-gost items-center justify-center my-8 mx-auto h-12 px-6 text-sm uppercase rounded-lg"
        >
          Pay
        </button>
        {error && <p className="text-red-600 text-lg text-center">{error}</p>}
      </form>
    </div>
  );
};
export default CheckoutForm;
