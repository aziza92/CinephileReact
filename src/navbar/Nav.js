import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import search from "../assets/chercher.png";
import profile from "../assets/profil.png";
import Search from "../screens/Search";
import logo from "../assets/logo.png";

export default function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();
  const searchRef = useRef();

  const handleClick = () => {
    // 👇️ navigate programmatically
    navigate("/profile");
  };
  const goHome = () => {
    // 👇️ navigate programmatically
    navigate("/");
  };

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  function handleClickOpen(event) {
    event.preventDefault();
    setIsOpen(!isOpen);
  }
  function handleClickOutside(event) {
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !searchRef.current.contains(event.target)
    ) {
      //console.log("doc is clicked")
      setIsOpen(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__content">
        <img
          className="loginScreen__logo"
          src={logo}
          alt="logo"
          onClick={goHome}
        />
        <img
          className="nav__search"
          src={search}
          alt=""
          onClick={(event) => handleClickOpen(event)}
        />
        <div ref={searchRef}>
          <Search isOpen={isOpen} />
        </div>
        <img
          className="nav__avatar"
          src={profile}
          alt=""
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
