import { useQuery } from "@tanstack/react-query";
import UseAuth from "../AuthUser/UseAuth";
import UseAxiosSecure from "../AxiosPrivate/UseAxiosSecure";

const UseUserReviews = () => {
  const { user } = UseAuth();
  const AxiosSecure = UseAxiosSecure();
  const {
    data: reviewsData = [],
    refetch,
    isPending: reviewsDataLoading,
  } = useQuery({
    queryKey: ["UseusersReviews"],
    queryFn: async () => {
      const res = await AxiosSecure.get(`/reviews/review/${user?.email}`);
      return res.data;
    },
  });
  refetch();
  return [reviewsData, refetch, reviewsDataLoading];
};

export default UseUserReviews;
