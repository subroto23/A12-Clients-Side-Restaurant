import axios from "axios";

const AxiosPublic = axios.create({
  baseURL: "http://localhost:5001",
});
const UseAxiosPublic = () => {
  return AxiosPublic;
};

export default UseAxiosPublic;
