import axios from "axios";

const AxiosPrivate = axios.create({
  baseURL: "http://localhost:5001",
});

//Functions Creating
const UseAxiosSecure = () => {
  return AxiosPrivate;
};

export default UseAxiosSecure;
