import { Link } from "react-router-dom";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseAllMeals from "../../Hookes/AllMeals/UseAllMeals";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const AllReviews = () => {
  const [meals, , refetch] = UseAllMeals();
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const SectionTitle = UseSectionTitle("Meals", "Review");
  //
  const handleDeleteBtn = (data, reviews) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        AxiosSecure.patch(
          `/api/meals/reviews/count?id=${data}&email=${user?.email}`,
          {
            reviews: reviews - 1,
          }
        ).then(async () => {
          await AxiosSecure.delete(
            `/reviews/delete/${data}?email=${user?.email}`
          ).then(() => {
            Swal.fire({
              title: "Deleted!",
              text: "First Reviews Was Deleted",
              icon: "success",
            });
            refetch();
          });
        });
      }
    });
  };
  return (
    <div>
      <HelmetHookes title={"All Reviews || Admin pages"}></HelmetHookes>
      {SectionTitle}
      <div>
        <div className="overflow-x-auto rounded-[3%]">
          <table className="table table-zebra w-full text-center">
            {/* head */}
            <thead>
              <tr className="bg-orange-400 text-white  text-center">
                <th>#</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>Delete</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((data, idx) => {
                return (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>{data.title}</td>
                    <td>{data.likes}</td>
                    <td>{data.reviews}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteBtn(data._id, data.reviews)}
                        className="hover:text-black text-red-600 font-bold p-2"
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button className="bg-orange-400 hover:text-black hover:bg-gray-300 p-2  text-white rounded">
                        <Link to={`/meals/details/meal/${data?._id}`}>
                          Details
                        </Link>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
