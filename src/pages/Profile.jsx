import React, { useContext, useEffect } from "react";
import { Context } from "../main";
import userLogo from "../assets/user.png";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, loading, isAuthenticated } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    !isAuthenticated && navigate("/login");
  });
  return loading ? (
    <Loader />
  ) : (
    <div className="profile">
      <section>
        <img src={userLogo} alt="" width={100} height={100} />
        <h1>Name: {user?.name}</h1>
        <p>Email: {user?.email}</p>
      </section>
    </div>
  );
};

export default Profile;
