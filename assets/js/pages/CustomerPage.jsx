import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import { Link, Redirect } from "react-router-dom";
import customersAPI from "../services/customersAPI";

const CustomerPage = (props) => {
  const { id = "new" } = props.match.params;

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });
  const [error, setError] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      getCustomer();
    }
  }, [id]);

  const getCustomer = async () => {
    try {
      const {
        lastName,
        firstName,
        email,
        company,
      } = await customersAPI.findOne(id);
      setCustomer({
        lastName,
        firstName,
        email,
        company,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        const response = await customersAPI.editCustomer(id, customer);
      } else {
        const response = await customersAPI.setCustomer(customer);
        props.history.push(`/customers/${response.id}`);
      }
      setError({});
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.map((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setError(apiErrors);
      }
    }
  };

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <Link to="/customers" className="btn btn-primary">
          Retour
        </Link>
        <h1>{editing ? "Edition" : "Création"} d'un client</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <Field
          onChange={handleChange}
          name="firstName"
          label="Prénom"
          placeholder="Prénom"
          type="text"
          value={customer.firstName}
          error={error.firstName}
        ></Field>
        <Field
          onChange={handleChange}
          name="lastName"
          label="Nom"
          placeholder="Nom"
          type="text"
          value={customer.lastName}
          error={error.lastName}
        ></Field>
        <Field
          onChange={handleChange}
          name="email"
          label="Email"
          placeholder="Email"
          type="email"
          value={customer.email}
          error={error.email}
        ></Field>
        <Field
          onChange={handleChange}
          name="company"
          label="Company"
          placeholder="Company"
          type="text"
          value={customer.company}
          error={error.company}
        ></Field>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            {editing ? "Editer" : "Ajouter"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CustomerPage;
