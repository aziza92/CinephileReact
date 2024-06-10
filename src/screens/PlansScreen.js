import React, { useEffect, useState } from "react";
import "./PlansScreen.css";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";

export default function PlantsScreen() {
  const [products, setProduct] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    db.collection("product")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const products = {};
        querySnapshot.forEach(async (productDoc) => {
          products[productDoc.id] = productDoc.data();
          const priceSnap = await productDoc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            products[productDoc.id].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
        });
        setProduct(products);
      });
  }, []);

  const loadCheckOut = async (priceId) => {
    const docRef = await db
      .collection("clients")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    docRef.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) {
        alert(`something went wrong : ${error.maessage}`);
      }
      if (sessionId) {
        // stripe
        const stripe = await loadStripe(
          "sk_test_51MC0YCLNbjRGuJOeQKJPYjiMLyKPQ0IwnNy5oe6YTRzHF5GZ3IBPNH3VG6ALMIItYQEH7hlPTPAmnbG9pSg3BadN00R9jK1O6X"
        );
        stripe.redirectToCheckout({ sessionId });
        return (
          <Elements stripe={stripe}>
            <form>
              <PaymentElement />
              <button>Submit</button>
            </form>
          </Elements>
        );
      }
    });
  };
  // const CheckoutForm = () => {
  //   // stripe
  //   const stripe = loadStripe(
  //     "pk_test_51MC0YCLNbjRGuJOeJlxeIdZD70cg65wzxfARoBexisOUPUSq1CRuxRHf8c6RPoknNqS6qeMUasbm15My9MYSnzyp00pERew8cC"
  //   );
  //   const options = {
  //     // passing the client secret obtained from the server
  //     clientSecret:
  //       "{{sk_test_51MC0YCLNbjRGuJOeQKJPYjiMLyKPQ0IwnNy5oe6YTRzHF5GZ3IBPNH3VG6ALMIItYQEH7hlPTPAmnbG9pSg3BadN00R9jK1O6X}}",
  //   };
  //   const handleSubmit = async (event) => {
  //     event.preventDefault();

  //     const { stripe, elements } = this.props;

  //     if (!stripe || !elements) {
  //       return;
  //     }

  //     const result = await stripe.confirmPayment({
  //       elements,
  //       confirmParams: {
  //         return_url: "https://example.com/order/123/complete",
  //       },
  //     });

  //     if (result.error) {
  //       console.log(result.error.message);
  //     } else {
  //     }
  //   };
  //   return (
  //     <Elements onSubmit={handleSubmit} stripe={stripe} options={options}>
  //       <form>
  //         <PaymentElement />
  //         <button>Submit</button>
  //       </form>
  //     </Elements>
  //   );
  // };

  //console.log(products);
  return (
    <div className="plansScreen">
      {Object.entries(products).map(([productId, productData]) => {
        //if user's subscribtion is active :::

        return (
          <div key={productId} className="plansScreen__plan">
            <div className="plansScreen__info">
              <h5>{productData.name}</h5>
            </div>
            <button onClick={() => loadCheckOut(productData.priceId)}>
              S'abonner
            </button>
          </div>
        );
      })}
    </div>
  );
}
