import React, { useRef } from "react";
import "./SigninScreen.css";
import { auth } from "../firebase";

export default function SigninScreen() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  //Sign Up :::::
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredential) => {
        // Signed in
        const user = userCredential;
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("Error", "veuillez remplirl'email et le password svp!");
        console.log(errorMessage);
      });
  };
  //

  //Sign In :::::
  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((userCredential) => {
        // Signed in
        const user = userCredential;

        console.log("hello im the ", user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("Error", errorMessage);
        console.log("coucou", errorMessage);
      });
  };
  //

  return (
    <div className="signinScreen">
      <form>
        <h1> Sélectionner un compte </h1>

        <input ref={emailRef} placeholder="Email" type="email" />
        <input
          ref={passwordRef}
          placeholder="password"
          type="password"
          autoComplete="on"
        />

        <button type="submit" onClick={signIn} className="signinScreen_button">
          Connexion
        </button>

        <h4>
          <span className="signinScreen__gray">Nouveau sur cinéphile? </span>

          <span onClick={register} className="signinScreen__link">
            s'inscrire maintenant.
          </span>
        </h4>
      </form>
    </div>
  );
}
