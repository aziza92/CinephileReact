import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { auth } from "../firebase";
import Nav from "../navbar/Nav";
import "./ProfileScreen.css";
import profile from "../assets/profil.png";
//import { useNavigate } from "react-router-dom";

export default function ProfileScreen() {
  const user = useSelector(selectUser);

  const logOutUser = () => {
    auth.signOut();
  };

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1> Réglage de profil </h1>
        <div className="profileScreen__info">
          <img src={profile} alt="" />
          <div className="profileScreen__details">
            <h2>{user.email}</h2>

            <div className="profileScreen__plans">
              <div className="divider" />

              <button className="signOut" onClick={logOutUser}>
                Se déconnecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
