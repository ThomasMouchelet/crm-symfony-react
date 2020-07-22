import axios from "axios";
import CustomersAPI from "../services/customersAPI";
import { INVOICES_API } from "../config";

function findAll() {
  return axios
    .get(`${INVOICES_API}`)
    .then((response) => response.data["hydra:member"]);
}
function findOne(id) {
  return axios.get(`${INVOICES_API}/${id}`).then((response) => response.data);
}
function deleteInvoice(id) {
  return axios
    .delete(`${INVOICES_API}/${id}`)
    .then((response) =>
      console.log(`La facture numéro ${id} a bien été supprimée`)
    );
}
function setInvoice(credentials) {
  return axios
    .post(`${INVOICES_API}`, {
      ...credentials,
      customer: `/api/customers/${credentials.customer}`,
    })
    .then((response) => response.data);
}
function editInvoice(id, credentials) {
  return axios
    .put(`${INVOICES_API}/${id}`, {
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
