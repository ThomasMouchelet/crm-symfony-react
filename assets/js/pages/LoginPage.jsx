import React, { useState, useContext } from "react";
import authAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";

const LoginPage = ({ onLogin, history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const handleChange = (event) => {
    const value = event.currentTarget.value;
    const name = event.currentTarget.name;

    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await authAPI.authenticate(credentials);
      setError(false);
      setIsAuthenticated(true);
      toast("Welcome on the best incredible app 🦄");
      history.replace("/customers");
    } catch (error) {
      setError(true);
      console.log(error);
      toast.error("Erreur dans le formulaire");
    }
  };

  return (
    <>
      <h1>Login</h1>
      <form action="" onSubmit={handleSubmit}>
        <Field
          value={credentials.email}
          type="email"
          label="Email"
          name="username"
          placeholder="Email"
          onChange={handleChange}
        />
        <Field
          value={credentials.password}
          type="password"
          label="Password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Connexion
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
