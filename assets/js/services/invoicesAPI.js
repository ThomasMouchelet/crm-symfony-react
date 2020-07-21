import axios from "axios";
import CustomersAPI from "../services/customersAPI";

function findAll() {
  return axios
    .get("https://127.0.0.1:8000/api/invoices")
    .then((response) => response.data["hydra:member"]);
}
function findOne(id) {
  return axios
    .get(`https://127.0.0.1:8000/api/invoices/${id}`)
    .then((response) => response.data);
}
function deleteInvoice(id) {
  return axios
    .delete(`https://127.0.0.1:8000/api/invoices/${id}`)
    .then((response) =>
      console.log(`La facture numéro ${id} a bien été supprimée`)
    );
}
function setInvoice(credentials) {
  return axios
    .post(`https://127.0.0.1:8000/api/invoices`, {
      ...credentials,
      customer: `/api/customers/${credentials.customer}`,
    })
    .then((response) => response.data);
}
function editInvoice(id, credentials) {
  return axios
    .put(`https://127.0.0.1:8000/api/invoices/${id}`, {
      ...credentials,
      customer: `/api/customers/${credentials.customer}`,
    })
    .then((response) => response.data);
}

export default {
  findAll,
  deleteInvoice,
  setInvoice,
  findOne,
  editInvoice,
};
