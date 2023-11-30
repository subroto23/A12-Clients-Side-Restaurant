import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../AxiosPublic/UseAxiosPublic";

const UseAllMeals = () => {
  const AxiosPublic = UseAxiosPublic();
  const {
    data: meals = [],
    isLoading: loader,
    refetch,
  } = useQuery({
    queryKey: ["allmeals"],
    queryFn: async () => {
      const res = await AxiosPublic.get(`/api/meals`);
      return res.data;
    },
  });
  refetch();
  return [meals, loader, refetch];
};

export default UseAllMeals;
