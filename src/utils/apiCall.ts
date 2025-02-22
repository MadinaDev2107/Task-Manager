import axios from "axios";

export function apicall(url: string, method: string, data: unknown) {
  return axios({
    baseURL: "http://localhost:3000",
    url,
    method,
    data,
  });
}
