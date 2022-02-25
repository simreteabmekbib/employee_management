import axios from "axios";

export default axios.create({
  baseURL: "http://backend-simret.herokuapp.com/employees/",
  headers: {
    "Content-type": "application/json"
  }
});