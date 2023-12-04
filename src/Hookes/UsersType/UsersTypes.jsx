import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosSecure from "../AxiosPrivate/UseAxiosSecure";

const UseUsersTypes = () => {
  const { user, loading } = UseAuth();
  const AxiosSecure = UseAxiosSecure();
  const { data: userCheck, isPending: usersTypesLoading } = useQuery({
    queryKey: [user?.email, "usersTypes"],
    enabled: !loading,
    queryFn: async () => {
      if (!user) {
        return;
      }
      const res = await AxiosSecure.get(`/api/users/admin/${user?.email}`);
      return res.data;
    },
  });
  return [userCheck, usersTypesLoading];
};

export default UseUsersTypes;
