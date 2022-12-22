import axios from "axios";
import { getCookie } from "../../shared/Cookie";

export const instance = axios.create({
  baseURL: "http://43.201.111.129",
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});



// export const baseURL = axios.create({
//   baseURL: "http://43.201.111.129",
//   headers: {
//     "Access-Control-Allow-Origin": "*",
//   },
// });

//인스턴스 request header
instance.interceptors.request.use((config) => {
  if (config.headers === undefined) return;
  const token = getCookie("is_login");
  config.headers["Authorization"] = `${token}`;
  return config;
});
