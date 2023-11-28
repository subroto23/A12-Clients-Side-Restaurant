import { useContext } from "react";
import { Authcontext } from "../../Components/AuthProvider/AuthProvider";

const UseAuth = () => {
  const AuthUser = useContext(Authcontext);
  return AuthUser;
};

export default UseAuth;
