import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosSecure from "../AxiosPrivate/UseAxiosSecure";

const UseUserMeals = () => {
  const { user } = UseAuth();
  const AxiosSecure = UseAxiosSecure();
  const {
    data: reqMeals = [],
    refetch,
    isPending: reqMealsPLoading,
  } = useQuery({
    queryKey: ["UseusersMealsData"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/orders/allmeals/${user?.email}`);
      return res.data;
    },
  });
  refetch();
  return [reqMeals, refetch, reqMealsPLoading];
};

export default UseUserMeals;
