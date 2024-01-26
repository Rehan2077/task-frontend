import React, { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context, SERVER_URL } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const navigate = useNavigate();
  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.get(`${SERVER_URL}/users/logout`, {
        withCredentials: true,
      });
      toast.success("Logged Out Successfull");
      setIsAuthenticated(false);
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setIsAuthenticated(true);
      setLoading(false);
      console.log(error.response.data.message);
    }
  };
  return (
    <nav className="header">
      <div>
        <h2>TASKER</h2>
      </div>
      <article>
        <Link to={"/"}>Home</Link>
        <Link to={"/profile"}>Profile</Link>
        {isAuthenticated ? (
          <Link className="btn" onClick={logoutHandler}>
            Logout
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </article>
    </nav>
  );
};

export default Header;
