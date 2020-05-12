import { history } from "./../../index";
import axios, { AxiosResponse } from "axios";
import { IDriver } from "../models/driver";
import { toast } from "react-toastify";

axios.defaults.baseURL = "http://localhost:5000/api";

axios.interceptors.response.use(undefined, (error) => {
 if(error.message === 'Network Error' && !error.response) {
   toast.error('Network Error in connection!')
 }

  const { status, data, config } = error.response;
  if (status === 404) {
    history.push("/not found");
  }
  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/not found");
  }

  if (status === 500) {
    toast.error("Server error - check the terminal for info !");
  }
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );
const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Drivers = {
  list: (): Promise<IDriver[]> => requests.get("/driver"),
  details: (id: string) => requests.get(`/driver/${id}`),
  create: (driver: IDriver) => requests.post("/driver", driver),
  update: (driver: IDriver) => requests.put(`/driver/${driver.id}`, driver),
  delete: (id: string) => requests.del(`/driver/${id}`),
};
export default {
  Drivers,
};
