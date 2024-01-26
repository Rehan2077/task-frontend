import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context, SERVER_URL } from "../main";
import toast from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
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
        `${SERVER_URL}/users/register`,
        {
          name,
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
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    isAuthenticated && navigate("/login");
  });

  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
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
          />
          <button disabled={loading} type="submit">
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
