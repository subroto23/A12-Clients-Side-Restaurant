import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "https://backend-tan-ten.vercel.app",
});
const UseAxiosPublic = () => {
  return AxiosPublic;
};

export default UseAxiosPublic;
