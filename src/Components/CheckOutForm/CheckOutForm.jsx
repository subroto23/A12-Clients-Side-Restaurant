import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const CheckoutForm = ({ data }) => {
  const [ClientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tranjecttionId, setTranjectionID] = useState("");
  const [PriceValue, setPriceValue] = useState({});
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();
  const AxiosSecure = UseAxiosSecure();

  //
  useEffect(() => {
    if (data.state.package) {
      if (data?.state?.package === "gold") {
        setPriceValue({ price: 2600 });
      } else if (data?.state?.package === "platinum") {
        setPriceValue({ price: 3200 });
      } else if (data?.state?.package === "silver") {
        setPriceValue({ price: 2200 });
      }
    } else if (data.state.price && data.state.orderId) {
      setPriceValue({ price: Number(data?.state?.price) });
    }
  }, [data]);
  //
  useEffect(() => {
    AxiosSecure.post("/payment/create", PriceValue).then((res) =>
      setClientSecret(res.data.clientSecret)
    );
  }, [AxiosSecure, PriceValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

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
    setLoading(true);
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
        // Package Upgrade
        if (data.state.package) {
          await AxiosSecure.patch(
            `/api/users/user/catagory?email=${user?.email}`,
            {
              catagory: data?.state?.package,
            }
          ).then(() => {
            setLoading(false);
            Swal.fire(`Payment Success!`);
          });
        }
        //Order Items
        else if (data.state.orderId) {
          const OrderValue = {
            email: user?.email,
            name: user?.displayName,
            date: new Date(),
            payId: paymentIntent.id,
            price: data?.state?.price,
            itemsId: data?.state?.orderId,
          };
          await AxiosSecure.post(
            `/orders/create?email=${user?.email}`,
            OrderValue
          ).then(() => {
            setLoading(false);
            Swal.fire(`Payment Success!`);
          });
        }
      }
    }
  };
  return (
    <div>
      {UseSectionTitle("Payment", `${PriceValue.price} Taka`)}
      <div className="max-w-xl mx-auto border-2 border-orange-400">
        <form onSubmit={handleSubmit} className="py-6 md:w-1/2 mx-auto">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "20px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
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
            className="flex btn bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed items-center justify-center my-8 mx-auto h-12 px-6 text-sm uppercase rounded-lg"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner text-secondary"></span>{" "}
                Processing
              </>
            ) : (
              "Pay "
            )}
          </button>
          {error && <p className="text-red-600 text-lg text-center">{error}</p>}
          {tranjecttionId && (
            <p className="text-center">
              TranjectionId ;
              <span className="font-bold text-green-600 text-xl">
                {tranjecttionId}
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
