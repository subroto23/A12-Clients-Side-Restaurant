import { useQuery } from "@tanstack/react-query";
import UseAxiosPublic from "../../Hookes/AxiosPublic/UseAxiosPublic";
import UseAuth from "../../Hookes/AuthUser/UseAuth";

const ReviewsItemsBased = ({ itemsId }) => {
  const AxiosPublic = UseAxiosPublic();
  const { user } = UseAuth();
  const { data: reviewDatas = [], refetch } = useQuery({
    queryKey: ["reviewsArrays"],
    queryFn: async () => {
      const res = await AxiosPublic.get(
        `/reviews?id=${itemsId}&email=${user?.email}`
      );
      return res.data;
    },
  });
  refetch();
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 md:my-16 gap-16">
      {reviewDatas.map((data) => {
        return (
          <div key={data._id}>
            <div className="flex items-center mb-4">
              <img
                src={data.photoUrl}
                alt=""
                className="w-16 h-16 rounded-full border-2"
              />
              <h1 className="ml-6 text-3xl font-bold ">{data.name}</h1>
            </div>
            <div className="ml-8 text-xl font-medium text-gray-500">
              <p className="text-justify">{data.reviews}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReviewsItemsBased;
