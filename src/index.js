import React from 'react';
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { createRoot } from "react-dom/client";
import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import './index.css';



const container = document.getElementById("root");
const root = createRoot(container);
const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <Router>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
