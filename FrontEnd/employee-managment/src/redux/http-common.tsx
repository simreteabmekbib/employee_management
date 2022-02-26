import axios from "axios";

export default axios.create({
  baseURL: "https://backend-simret.herokuapp.com/employees/",
  headers: {
    "Content-type": "application/json"
  }
});