import UseAllUserOrders from "../../Hookes/AllUserOrder/UseAllUserOrders";
import HelmetHookes from "../../Hookes/ReactHelmet/Helmet";
import UseAxiosSecure from "../../Hookes/AxiosPrivate/UseAxiosSecure";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";

const ServeMeal = () => {
  const [allUsermeals, refetch] = UseAllUserOrders();
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const handleStatusChangeBtn = async (data) => {
    if (data.status) {
      return Swal.fire("Already Delivered This Meal");
    }
    AxiosSecure.patch(
      `/orders/status/changes/${data._id}?email=${user?.email}`,
      {
        status: "Delivered",
      }
    ).then(() => {
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
      <HelmetHookes title={"Admin ALL Orders|| Serve page"}></HelmetHookes>
      <div>
        <div className="overflow-x-auto rounded-[3%]">
          <table className="table table-zebra w-full text-center">
            {/* head */}
            <thead>
              <tr className="bg-orange-400 text-white  text-center">
                <th>#</th>
                <th>Email</th>
                <th>Price</th>
                <th>Name</th>
                <th>Status</th>
                <th>Serve</th>
              </tr>
            </thead>
            <tbody>
              {allUsermeals.map((data, idx) => {
                return (
                  <tr key={data._id}>
                    <th>{idx + 1}</th>
                    <td>{data.email}</td>
                    <td>{data.price}</td>
                    <td>{data.name}</td>
                    <td>
                      {data?.status ? (
                        <span className="text-green-600 font-bold text-xl">
                          {data?.status}
                        </span>
                      ) : (
                        "Pending"
                      )}
                    </td>
                    <td>
                      <button className="bg-orange-400 hover:text-black hover:bg-gray-300 p-2  text-white rounded">
                        <button
                          onClick={() => handleStatusChangeBtn(data)}
                          className="hover:text-black font-bold p-2"
                        >
                          Serve
                        </button>
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

export default ServeMeal;
