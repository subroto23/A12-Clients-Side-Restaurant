import { Link } from "react-router-dom";
import UseUserReviews from "../../../Hookes/UserReviews/UseUserReviews";
import HelmetHookes from "../../../Hookes/ReactHelmet/Helmet";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../../Hookes/AuthUser/UseAuth";
import { useState } from "react";

const UserReviews = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [reviewsData, refetch] = UseUserReviews();
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const handleDeleteBtn = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await AxiosSecure.delete(
          `/reviews/delete/user/review/${id}?email=${user?.email}`
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
  const handleReviewData = async (e) => {
    e.preventDefault();
    const reviewValue = e.target.reviews.value;
    await AxiosSecure.put(
      `/reviews/update/${selectedId}/?email=${user?.email}`,
      { reviews: reviewValue }
    ).then((res) => {
      if (res.data) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Successfully Updated Your Data`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  return (
    <div>
      <HelmetHookes title={"Reviews || Admin pages"}></HelmetHookes>
      <div>
        <div className="overflow-x-auto rounded-[3%] my-8">
          <table className="table table-zebra w-full text-center text-xl">
            {/* head */}
            <thead>
              <tr className="text-center text-lg font-semibold">
                <th>#</th>
                <th>Title</th>
                <th>Likes</th>
                <th>Reviews</th>
                <th>Update</th>
                <th>Delete</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {reviewsData.map((data, idx) => {
                return (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>{data.title}</td>
                    <td>{data.likes}</td>
                    <td>{data.reviews}</td>
                    <td>
                      <button
                        className="text-green-600 font-bold"
                        onClick={() => {
                          document.getElementById("my_modal_5").showModal();
                          setSelectedId(data?._id);
                        }}
                      >
                        Edit
                      </button>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <form onSubmit={handleReviewData}>
                            <div className="w-full">
                              <label className="form-control w-full max-w-xs">
                                <span className="label-text text-lg mb-1 text-orange-400 font-bold">
                                  Review
                                </span>
                                <textarea
                                  name="reviews"
                                  placeholder="Type here"
                                  className="h-32 p-2 border-2 text-lg"
                                />
                              </label>
                            </div>
                            <div className="text-center">
                              <button
                                type="submit"
                                className="py-3 w-1/3 bg-orange-400 text-white rounded-md mt-4"
                              >
                                Submit
                              </button>
                            </div>
                          </form>

                          <div className="modal-action">
                            <form method="dialog">
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
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

export default UserReviews;
