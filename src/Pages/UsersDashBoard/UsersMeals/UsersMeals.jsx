import Swal from "sweetalert2";
import HelmetHookes from "../../../Hookes/ReactHelmet/Helmet";
import UseUserMeals from "../../../Hookes/UserMeals/UseUserMeals";
import UseAxiosSecure from "../../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../../Hookes/AuthUser/UseAuth";

const UsersMeals = () => {
  const [reqMeals, refetch] = UseUserMeals();
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  //Handle Cancle Button
  const handleCancleBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosSecure.delete(
          `/orders/delete/${id}?email=${user?.email}`
        ).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "First Reviews Was Deleted",
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
      <HelmetHookes title={"User Reviews || pages"}></HelmetHookes>
      <div className="my-16">
        <div className="overflow-x-auto rounded-[3%]">
          <table className="table table-zebra w-full text-lg text-center">
            {/* head */}
            <thead>
              <tr className="text-center text-lg">
                <th>#</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>Status</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {reqMeals.map((data, idx) => {
                return (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>{data.title}</td>
                    <td>{data.likes}</td>
                    <td>{data.reviews}</td>
                    <td>
                      {data?.status ? (
                        <span className="text-green-600 font-bold">
                          {data?.status}
                        </span>
                      ) : (
                        <span className="text-orange-600 font-bold">
                          Pending
                        </span>
                      )}
                    </td>
                    <td>
                      <button
                        onClick={() => handleCancleBtn(data._id)}
                        className="hover:text-black text-red-600 font-bold p-2"
                      >
                        Cancel
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

export default UsersMeals;
