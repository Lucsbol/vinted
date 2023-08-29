import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NkOpLFogZwCC0ANUPdshW7d28lAOJOyd5VgD5iMLacwqk2fysNLrOaEz7jGa9SxPuvqF1Lj6uD84lZezOUWHzfy00yJ3Zz3mX"
);

function payement() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}

export default payement;
