import { useQuery } from "@tanstack/react-query";
import UseAllMeals from "../../Hookes/AllMeals/UseAllMeals";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
const AdminDashBoard = () => {
  const [meals] = UseAllMeals();
  const axiosPrivate = UseAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["usersDatas"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/api/users/all/users`);
      return res.data;
    },
  });
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-8 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2 bg-gradient-to-r from-green-500 via-green-200">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {users.length}
              </h2>
              <p className="leading-relaxed">Users</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2 bg-gradient-to-tl from-orange-500 via-orange-200">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                1.8K
              </h2>
              <p className="leading-relaxed">Revenue</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2  bg-gradient-to-tl from-orange-500 via-orange-200">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                35
              </h2>
              <p className="leading-relaxed">Orders</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2 bg-gradient-to-l from-green-500 via-green-200">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-900">
                {meals?.length}
              </h2>
              <p className="leading-relaxed">Items</p>
            </div>
          </div>
        </div>
      </section>
      <div className="grid md:grid-cols-2 grid-cols-1 my-16"></div>
    </div>
  );
};

export default AdminDashBoard;
