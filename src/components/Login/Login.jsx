import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const { isError, message, isSuccess } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    if (isSuccess) {
        notification.open({
            message: 'Notification Title',
            description:message,
            duration: 1,
          });
    //   notification.success({
    //     message: "Success",
    //     description: message,
    //     duration: 0,
    //   });
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    }
    if (isError) {
      notification.error({
        message: "Error",
        description: message,
      });
    }
    dispatch(reset());
  }, [isError, message, isSuccess]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };
  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Correo"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Contraseña"
      />
      <button type="submit">Login</button>
    </form>
  );
};
export default Login;
