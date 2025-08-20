import { API_URL } from "@/constants/api";
import axios, { AxiosInstance } from "axios";
import { toast } from "sonner";

class HTTP {
  public instance: AxiosInstance = null;

  constructor() {
    this.instance = axios.create({
      baseURL: API_URL,
      timeout: 60000,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });

    this.instance.interceptors.request.use(config => {
      return config;
    });

    this.instance.interceptors.response.use(
      response => response,
      error => {
        const res = error.response;
        console.log(res);
        toast(res.message);
      }
    );
  }
}

const http = new HTTP().instance;
export default http;
