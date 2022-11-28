import axios from "axios";
import { config } from "../config";

export function registerUser(cred) {
  return axios.post(`${config.api}/user/register`, {
    email: cred.email,
    password: cred.password,
  });
}

export function loginUser(cred) {
  return axios.post(`${config.api}/user/login`, cred);
}
