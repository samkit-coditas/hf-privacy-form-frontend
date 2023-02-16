import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;
const token = process.env.NEXT_PUBLIC_REACT_APP_TOKEN;
const axiosInstance = axios.create({
  baseURL: baseURL,
});
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem("accessToken");
  const temp: any = {
    ...config.headers,
    Authorization: token || "",
    "Content-Type": "multipart/form-data",
  };
  config.headers = temp;
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error?.response?.status == 401 || error?.response.status == 403
    ) {
      originalRequest._retry = true;
      return;
    } else {
      return;
    }
  }
);

export default axiosInstance;
