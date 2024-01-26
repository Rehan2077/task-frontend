import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/app.scss";

export const SERVER_URL = import.meta.env.VITE_BACKEND_URL;

export const Context = createContext({isAuthenticated: false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        user,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
