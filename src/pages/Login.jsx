import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context, SERVER_URL } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${SERVER_URL}/users/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setLoading(false);
      toast.success(data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    isAuthenticated && navigate("/");
  });

  return (
    <div className="login">
      <section className="loginSection">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />{" "}
          <button disabled={loading} type="submit">
            Login
          </button>
          {!isAuthenticated && (
            <>
              <h4>Or</h4>
              <Link to={"/register"}>Sign Up</Link>
            </>
          )}
        </form>
      </section>
    </div>
  );
};

export default Login;
