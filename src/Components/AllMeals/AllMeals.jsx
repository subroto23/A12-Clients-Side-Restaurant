import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import Swal from "sweetalert2";
import UseAllMeals from "../../Hookes/AllMeals/UseAllMeals";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../Hookes/AxiosPublic/UseAxiosPublic";
import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";

const AllMeals = () => {
  const [meals, loader, refetch] = UseAllMeals();
  const SectionTitle = UseSectionTitle("All Posted", "Meals");
  if (loader) {
    return <span className="loading loading-spinner text-error"></span>;
  }
  const AxiosPublic = UseAxiosPublic();
  //
  const handleDeleteBtn = (data) => {
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
        await AxiosPublic.delete(`/api/meals/delete/${data}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };
  return (
    <div>
      <HelmetHookes title={"All Meals || pages"}></HelmetHookes>
      {SectionTitle}
      <div>
        <div className="overflow-x-auto rounded-[3%]">
          <table className="table table-zebra w-full text-center">
            {/* head */}
            <thead>
              <tr className="bg-orange-400 text-white text-center">
                <th>#</th>
                <th>Distributor Email</th>
                <th>Distributor Name</th>
                <th>Meal Title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {meals.map((data, idx) => {
                return (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>{data.email}</td>
                    <td>{data.distributor}</td>
                    <td>{data.title}</td>
                    <td>{data.likes}</td>
                    <td>{data.reviews}</td>
                    <td>
                      <button className="hover:text-black text-green-600 font-bold">
                        <Link to={`/admin/dashboard/update/${data?._id}`}>
                          Edit
                        </Link>
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDeleteBtn(data._id)}
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

export default AllMeals;
