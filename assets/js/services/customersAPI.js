import axios from "axios";

function findAll() {
  return axios
    .get("https://127.0.0.1:8000/api/customers")
    .then((response) => response.data["hydra:member"]);
}
function deleteCustomer(id) {
  return axios
    .delete(`https://127.0.0.1:8000/api/customers/${id}`)
    .then((response) => {
      console.log("Success");
    });
}
function findOne(id) {
  return axios
    .get(`https://127.0.0.1:8000/api/customers/${id}`)
    .then((response) => response.data);
}
function setCustomer(credentials) {
  return axios
    .post(`https://127.0.0.1:8000/api/customers`, credentials)
    .then((response) => response.data);
}
function editCustomer(id, credentials) {
  return axios
    .put(`https://127.0.0.1:8000/api/customers/${id}`, credentials)
    .then((response) => response.data);
}

export default {
  findAll,
  deleteCustomer,
  setCustomer,
  editCustomer,
  findOne,
};
