import { Navigate, useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, SERVER_URL } from "./main";

function App() {
  const { setUser, setIsAuthenticated, isAuthenticated, setLoading } =
    useContext(Context);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${SERVER_URL}/users/me`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setLoading(false);
      })
      .catch((error) => {
        setUser({});
        setIsAuthenticated(false);
        setLoading(false);
      });
  }, []);


  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
