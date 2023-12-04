import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAuth from "../AuthUser/UseAuth";

const AxiosPrivate = axios.create({
  baseURL: "https://backend-tan-ten.vercel.app",
});

//Functions Creating
const UseAxiosSecure = () => {
  const navigate = useNavigate();
  const { handleLogOut } = UseAuth();

  //Axios Request
  AxiosPrivate.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add a response interceptor
  AxiosPrivate.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) {
        await handleLogOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
  return AxiosPrivate;
};
export default UseAxiosSecure;
