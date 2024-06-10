import React, { useState } from "react";
import "./LoginScreen.css";
import SigninScreen from "./SigninScreen";
import logo from "../assets/logo.png";

export default function LoginScreen() {
  const [signIn, setSignIn] = useState(false);

  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen__logo" src={logo} alt="logo" />
        <button onClick={() => setSignIn(true)} className="signIn__button">
          {" "}
          Connexion{" "}
        </button>
        <div className="loginScreen__gradient" />
      </div>

      <div className="loginScreen__body">
        {signIn ? (
          <SigninScreen />
        ) : (
          <>
            <h1>Films illimités, programmes de télévision et plus encore</h1>
            <h2> Enjoy Cinéphile ... </h2>
            <h3>
              {" "}
              Prêt à découvrir ? Entrez votre email pour vous connecter ou créer
              votre compte.{" "}
            </h3>

            <div className="loginScreen__input">
              <form>
                <input type="email" placeholder="Email Address" />

                <button
                  onClick={() => setSignIn(true)}
                  className="button__login"
                >
                  Créer un compte
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
