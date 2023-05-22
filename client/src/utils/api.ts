import axios from "axios";
import env from "./env";
axios.defaults.baseURL = env.BASE_URL;

export default axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  },
});
