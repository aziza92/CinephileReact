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
          ""
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
