import axios from "axios";
import { CUSTOMERS_API } from "../config";

function findAll() {
  return axios
    .get(`${CUSTOMERS_API}`)
    .then((response) => response.data["hydra:member"]);
}
function deleteCustomer(id) {
  return axios.delete(`${CUSTOMERS_API}/${id}`).then((response) => {
    console.log("Success");
  });
}
function findOne(id) {
  return axios.get(`${CUSTOMERS_API}/${id}`).then((response) => response.data);
}
function setCustomer(credentials) {
  return axios
    .post(`${CUSTOMERS_API}`, credentials)
    .then((response) => response.data);
}
function editCustomer(id, credentials) {
  return axios
    .put(`${CUSTOMERS_API}/${id}`, credentials)
    .then((response) => response.data);
}

export default {
  findAll,
  deleteCustomer,
  setCustomer,
  editCustomer,
  findOne,
};
