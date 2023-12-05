import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosSecure from "../AxiosPrivate/UseAxiosSecure";

const UseAllUserOrders = () => {
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const {
    data: allUsermeals = [],
    refetch,
    isPending: allUserMealsPLoading,
  } = useQuery({
    queryKey: ["UsersOrder"],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/orders/all-users-order/?email=${user?.email}`
      );
      return res.data;
    },
  });
  refetch();
  return [allUsermeals, refetch, allUserMealsPLoading];
};

export default UseAllUserOrders;
