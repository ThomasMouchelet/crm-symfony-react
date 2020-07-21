import React, { useState, useEffect } from "react";
import Field from "../components/forms/Field";
import CustomersAPI from "../services/customersAPI";
import Select from "../components/forms/Select";
import InvoicesAPI from "../services/invoicesAPI";
import { Link } from "react-router-dom";

const InvoicePage = (props) => {
  const { id = "new" } = props.match.params;
  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "",
  });
  const [error, setError] = useState({
    amount: "",
    customer: "",
    status: "",
  });
  const [customers, setCustomers] = useState([]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      getInvoice();
    }
    setInvoice({
      amount: "",
      customer: "",
      status: "",
    });
    fetchCustomers();
  }, [id]);

  const getInvoice = async () => {
    try {
      const { amount, customer, status } = await InvoicesAPI.findOne(id);

      setInvoice({
        amount,
        customer: customer.id,
        status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      if (!invoice.customer) setInvoice({ customer: data[0].id });
      if (!invoice.status) setInvoice({ status: "SENT" });
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        const response = await InvoicesAPI.editInvoice(id, invoice);
      } else {
        const response = await InvoicesAPI.setInvoice(invoice);

        props.history.push(`/invoices/${response.id}`);
      }
      setError({});
    } catch (error) {
      console.log(error.response.data);
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
      <div className="d-flex justify-content-between align-items-center">
        <h1>{editing ? "Edition" : "Création"} d'une facture</h1>

        <Link to="/invoices/new" className="btn btn-primary">
          Ajouter une facture
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Field
          onChange={handleChange}
          name="amount"
          label="Montant de la facture"
          placeholder="Montant de la facture"
          type="number"
          value={invoice.amount || ""}
          error={error.amount}
        ></Field>

        <Select
          label="Client"
          name="customer"
          options={invoice.customer}
          error={error.customer}
          value={invoice.customer || ""}
          onChange={handleChange}
        >
          {customers.map((option) => {
            return (
              <option key={option.id} value={option.id}>
                {option.company}
              </option>
            );
          })}
        </Select>
        <Select
          label="Status"
          name="status"
          options={invoice.status}
          error={error.status}
          value={invoice.status || ""}
          onChange={handleChange}
        >
          <option value="SENT">Envoyé</option>
          <option value="PAID">Payée</option>
          <option value="CANCELLED">Annulée</option>
        </Select>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            {editing ? "Editer" : "Ajouter"}
          </button>
        </div>
      </form>
    </>
  );
};

export default InvoicePage;
