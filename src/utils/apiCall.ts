import axios from "axios";

export function apicall(url: string, method: string, user: unknown) {
  return axios({
    baseURL: "https://fakebackend-gm5s.onrender.com",
    url,
    method,
    data: user,
  });
}
