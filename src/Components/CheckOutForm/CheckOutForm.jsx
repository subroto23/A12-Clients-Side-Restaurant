import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";
import UseBalance from "../../Hookes/Balance/UseBalance";

const CheckoutForm = ({ data }) => {
  const [secretClient, setSecretClient] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tranjecttionId, setTranjectionID] = useState("");
  const [PriceValue, setPriceValue] = useState({});
  const [subscriberValue, setSubscriberValue] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const { user } = UseAuth();
  const AxiosSecure = UseAxiosSecure();
  const [cash, refetch] = UseBalance();
  //Order And Premium Packages Data Load
  useEffect(() => {
    if (data.state.package) {
      if (data?.state?.package === "gold") {
        setSubscriberValue({ price: 2600 });
      } else if (data?.state?.package === "platinum") {
        setSubscriberValue({ price: 3200 });
      } else if (data?.state?.package === "silver") {
        setSubscriberValue({ price: 2200 });
      }
    } else if (data.state.price && data.state.orderId) {
      setPriceValue({ price: Number(data?.state?.price) });
    }
  }, [data]);
  //Backed Send Data To Strip
  useEffect(() => {
    const priceDatas = { PriceValue, subscriberValue };
    if (PriceValue?.price > 0 || subscriberValue?.price > 0) {
      AxiosSecure.post("/payment/create", priceDatas).then((res) => {
        setSecretClient(res?.data?.clientSecret);
      });
    }
  }, [AxiosSecure, PriceValue, subscriberValue]);
  let insufficent = Number(cash) - Number(PriceValue?.price);
  //Form Submissions Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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

    // Use card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]");
      setError(null);
    }

    //Conform Card Payment secretClient
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(`${secretClient}`, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "Anonymous",
            name: user?.displayName || "Anonymous",
          },
        },
      });

    //
    if (confirmError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Payment Failed!!${confirmError.message}`,
        footer: "Please try again later",
      });
    } else {
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
          ).then(async () => {
            refetch();
            setLoading(false);
            Swal.fire(`Payment Success!`);
          });
        }
        //Balance
        const balanceDatas = {
          email: user?.email,
          taka: subscriberValue?.price,
          txd: paymentIntent?.id,
        };
        if (Number(subscriberValue.price) > 0) {
          await AxiosSecure.post(
            `/api/balance/create?email=${user?.email}`,
            balanceDatas
          ).then(async (res) => {
            if (res?.data?.insertedId) {
              await refetch();
              setLoading(false);
              Swal.fire(`Payment Success!`);
            }
          });
        }
      }
    }
  };

  return (
    <div>
      {UseSectionTitle(
        "Payment",
        `${PriceValue.price || subscriberValue?.price} Taka`
      )}
      <div className="max-w-3xl mx-auto border-2 border-orange-400">
        <form onSubmit={handleSubmit} className="py-6 mx-auto">
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
            disabled={!stripe || !secretClient || insufficent < 0}
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
          {insufficent < 0 ? (
            <div className="text-center">
              <span className="font-bold text-red-600 text-xl">
                Insufficent Balance
              </span>
            </div>
          ) : (
            ""
          )}
        </form>
      </div>
    </div>
  );
};
export default CheckoutForm;
