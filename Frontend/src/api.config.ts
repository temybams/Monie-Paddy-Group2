import axios from "axios";

const { VITE_APP_NODE_ENV } = import.meta.env;
const baseURL =
  VITE_APP_NODE_ENV === "development"
    ? "http://localhost:5500"
    : "http://tobeactivated.onrender.com/";
const Api = axios.create({
  baseURL,
  withCredentials: true,
});

export default Api;
export { baseURL };
