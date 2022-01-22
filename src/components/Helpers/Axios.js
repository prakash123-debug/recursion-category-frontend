import axios from "axios";
const baseURL = "http://localhost:5000/";
export const baseLink = "http://localhost:5000/";

let headers = {};
if (localStorage.token) {
  headers.Authorization = `token ${localStorage.token}`;
}
const axiosInstance = axios.create({
  baseURL: baseURL,
  headers,
});
export default axiosInstance;
