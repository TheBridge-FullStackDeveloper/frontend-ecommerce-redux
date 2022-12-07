import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  if(!user){
    return <p>Cargando...</p>
  }
  return (
    <div>
      <p>{user.user.name}</p>
    </div>
  );
};

export default Profile;
