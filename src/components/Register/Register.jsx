import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: 0,
    password: "",
    password2: "",
  });
  const { name, email, age, password, password2 } = formData;
  const dispatch = useDispatch();
  const { isSuccess, message, isError } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess) {
      notification.success({
        message: "Success",
        description: message,
      });
    }
    if(isError){
        notification.error({
            message: "Error",
            description: message,
          });  
    }
    dispatch(reset())
  }, [isSuccess,isError,message]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      return notification.error({
        message: "Error",
        description: "No coinciden las contraseñas",
      });
    } else {
      dispatch(register(formData));
    }
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={onChange}
        placeholder="Nombre"
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Correo"
      />
      <input
        type="number"
        name="age"
        value={age}
        onChange={onChange}
        placeholder="Edad"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Contraseña"
      />
      <input
        type="password"
        name="password2"
        value={password2}
        onChange={onChange}
        placeholder="Repite contraseña"
      />
      <button type="submit">Register</button>
    </form>
  );
};
export default Register;
