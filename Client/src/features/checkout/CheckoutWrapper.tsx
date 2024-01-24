import { Elements } from "@stripe/react-stripe-js";
import CheckoutPage from "./CheckoutPage";
import { loadStripe } from "@stripe/stripe-js";
import { useAppDispatch } from "../../app/store/configureStore";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { setBasket } from "../basket/basketSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";

const stripePromise = loadStripe('pk_test_51Lp7b3DBoreCv1RzxBSJ0SVcG73pnq4VcPr7ThdTTPA2afix9OOXrxBof1qql4lQgrEQxNYZjVuoaexUUELYMoyw003RIoA0T2');

export default function CheckoutWrapper() {
  const dispatch = useAppDispatch();	
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Payment.createPaymentIntent()
    .then((basket) => dispatch(setBasket(basket)))
    .catch((error) => console.log(error))
    .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading) return <LoadingComponent message='Loading checkout...' />;

  return (
    <Elements stripe={stripePromise}>
        <CheckoutPage />
    </Elements>
  )
}
