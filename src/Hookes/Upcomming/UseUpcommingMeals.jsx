import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosPublic from "../AxiosPublic/UseAxiosPublic";

const UseUpcommingMeals = () => {
  const AxiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const {
    data: upcommingMeals = [],
    isLoading: loader,
    refetch,
  } = useQuery({
    queryKey: ["upcommingDatas"],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/api/upcomming/${user.email}`);
      return res.data;
    },
  });
  refetch();
  return [upcommingMeals, loader, refetch];
};

export default UseUpcommingMeals;
