import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosPrivate = UseAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPrivate.get(`/api/users/all/users`);
      return res.data;
    },
  });
  const handleMakeAdmin = (user) => {
    axiosPrivate
      .patch(
        `/api/users/user/make-admin?email=${user?.email}&name=${user?.name}`
      )
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} Admin Now`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      });
  };
  return (
    <div>
      <HelmetHookes title={"Manage Users | Pages"}></HelmetHookes>
      <div className="overflow-x-auto">
        <table className="table w-full text-center">
          {/* head */}
          <thead>
            <tr className="bg-orange-400 text-white text-lg text-center rounded-t rounded-b">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, idx) => {
              return (
                <tr key={data._id}>
                  <th>{idx + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>
                    <button onClick={() => handleMakeAdmin(data)}>
                      {data?.role === "admin" ? (
                        <>
                          <span className="text-center font-semibold">
                            Admin
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="bg-orange-400 md:p-2 delay-100 ease-out text-white hover:bg-gray-200  hover:text-black">
                            Make Admin
                          </span>
                        </>
                      )}
                    </button>
                  </td>
                  <td>{data?.status ? data?.status : "Bronze"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
