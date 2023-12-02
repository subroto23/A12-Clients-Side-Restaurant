import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosSecure from "../AxiosPrivate/UseAxiosSecure";

const UseAdmin = () => {
  const { user, loading } = UseAuth();
  const AxiosSecure = UseAxiosSecure();
  const { data: isAdmin, isPending: adminLoading } = useQuery({
    queryKey: [user?.email, "isAdmin"],
    enabled: !loading,
    queryFn: async () => {
      if (!user) {
        return;
      }
      const res = await AxiosSecure.get(`/api/users/admin/${user?.email}`);
      return res.data?.role === "admin";
    },
  });
  return [isAdmin, adminLoading];
};

export default UseAdmin;
