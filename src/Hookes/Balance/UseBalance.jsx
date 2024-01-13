import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosPublic from "../AxiosPublic/UseAxiosPublic";

const UseBalance = () => {
  const { user } = UseAuth();
  const AxiosPublic = UseAxiosPublic();
  const { data: cash = 0, refetch } = useQuery({
    queryKey: ["CashValue", user?.email],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/api/balance?email=${user?.email}`);
      return res.data.netCash;
    },
  });
  return [cash, refetch];
};

export default UseBalance;
