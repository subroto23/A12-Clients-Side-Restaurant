import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import UseAxiosPublic from "../../Hookes/AxiosPublic/UseAxiosPublic";
// import UseSectionTitle from "../../Hookes/SectionTitle/UseSectionTitle";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import UsePagination from "../../Hookes/Pagination/UsePagination";
import UseAuth from "../../Hookes/AuthUser/UseAuth";

const AllMeals = () => {
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  // Pagination
  const [count, setCount] = useState(null);
  const [skipValue, setSkipValue] = useState(1);
  const size = 5;
  const [paginationPage, currentPage] = UsePagination(count, size, skipValue);
  const {
    data: meals = [],
    isLoading: loader,
    refetch,
  } = useQuery({
    queryKey: ["mealsValue", currentPage],
    queryFn: async () => {
      const res = await AxiosSecure.get(
        `/api/meals/admin?email=${user?.email}&page=${currentPage}&limit=${size}`
      );
      setCount(res?.data?.totalCount);
      setSkipValue(res?.data?.skipValue);
      return res.data;
    },
  });
  // const SectionTitle = UseSectionTitle("All Posted", "Meals");
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
      {/* {SectionTitle} */}
      <div className="my-8">
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
              {meals?.datas?.map((data, idx) => {
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
          {paginationPage}
        </div>
      </div>
    </div>
  );
};

export default AllMeals;
