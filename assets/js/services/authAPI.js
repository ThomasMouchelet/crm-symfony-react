import axios from "axios";
import jwtDecode from "jwt-decode";

function logout() {
  window.localStorage.removeItem("authToken");
  delete axios.defaults.headers["Authorization"];
}

function authenticate(credentials) {
  return axios
    .post("https://127.0.0.1:8000/api/login_check", credentials)
    .then((res) => res.data.token)
    .then((token) => {
      window.localStorage.setItem("authToken", token);
      setAxiosToken(token);
    });
}

function setAxiosToken(token) {
  axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup() {
  if (isAuthenticated) {
    const token = window.localStorage.getItem("authToken");
    setAxiosToken(token);
  }
}

function isAuthenticated() {
  const token = window.localStorage.getItem("authToken");
  if (token) {
    const jwtData = jwtDecode(token);
    // convertir exp en milisecondes
    if (jwtData.exp * 1000 > new Date().getTime()) {
      return true;
    }
    return false;
  }
  return false;
}
function register(credentials) {
  return axios
    .post("https://127.0.0.1:8000/api/users", credentials)
    .then((res) => res);
}

export default {
  authenticate,
  logout,
  setup,
  isAuthenticated,
  register,
};
