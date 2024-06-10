import React, { useEffect } from "react";
import "./App.css";
import Homescreen from "./screens/HomeScreen";
import { Route, Routes } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/ProfileScreen";
import FavoritesScreen from "./screens/FavoritesScreen";
import FilmDetails from "./screens/FilmDetails";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // Logged In
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
          })
        );
      } else {
        // Logged Out
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <LoginScreen />
      ) : (
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/favoris" element={<FavoritesScreen />} />
          <Route path="/details/:id" element={<FilmDetails />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
