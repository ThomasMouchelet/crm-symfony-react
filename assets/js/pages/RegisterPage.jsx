import React, { useContext, useState } from "react";
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";

const RegisterPage = ({ onLogin, history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm = "Erreur confirm password";
      setError(apiErrors);
      return;
    }

    try {
      const response = await authAPI.register(user);
      console.log(response);
      setError({});
      toast("Wow congrats register success 🦄", {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      history.push("/login");
    } catch (error) {
      console.log(error.response);
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.map((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setError(...error, apiErrors);
      }
    }
  };
  return (
    <>
      <h1>Register</h1>
      <form action="" onSubmit={handleSubmit}>
        <Field
          value={user.firstName}
          error={error.firstName}
          type="text"
          label="Prénom"
          name="firstName"
          placeholder="Prénom"
          onChange={handleChange}
        />
        <Field
          value={user.lastName}
          error={error.lastName}
          type="text"
          label="Nom"
          name="lastName"
          placeholder="Nom"
          onChange={handleChange}
        />
        <Field
          value={user.email}
          error={error.email}
          type="email"
          label="Email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <Field
          value={user.password}
          error={error.password}
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Field
          value={user.passwordConfirm}
          error={error.passwordConfirm}
          type="password"
          label="Confirmation du password"
          name="passwordConfirm"
          placeholder="Confirmation du password"
          onChange={handleChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </div>
      </form>
    </>
  );
};

export default RegisterPage;
