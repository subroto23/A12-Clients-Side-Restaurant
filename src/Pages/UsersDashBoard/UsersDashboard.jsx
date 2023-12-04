import { IoMdArrowRoundBack } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import UseAuth from "../../Hookes/AuthUser/UseAuth";

const UsersDashboard = () => {
  const { user } = UseAuth();
  const activeRouteStyle = ({ isActive }) => {
    return {
      color: isActive ? "#2ecc71" : "",
      fontWeight: isActive ? "bold" : "",
    };
  };
  return (
    <div className="max-w-screen-xl mx-auto h-fit md:border-r md:border-t md:border-orange-400 ">
      <div className="flex md:flex-row flex-col">
        <div className="md:w-1/4 w-full">
          <div className="border-r shadow-lg bg-[#071e34]  h-full">
            <div className="flex-col min-h-screen px-2  flex flex-wrap items-center justify-between w-full mx-auto overflow-y-auto overflow-x-hidden">
              <div className="flex h-auto text-white flex-col  opacity-100 relative mt-4 overflow-y-auto overflow-x-hidden  items-center flex-1 rounded w-full">
                <img
                  src={user?.photoURL}
                  alt=""
                  className="rounded-full w-36 h-36 mt-8 border-4 mb-6"
                />
                <div className="md:flex-col md:min-w-full flex flex-col md:justify-center md:items-center list-none mb-6">
                  <hr className="my-4 md:min-w-full" />
                  <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-2 no-underline md:pl-6">
                    Information
                  </h6>
                  <ul className="text-md my-4 px-4 space-y-3">
                    <li>
                      <NavLink
                        style={activeRouteStyle}
                        to="/dashboard/profile"
                        className="pl-3 hover:text-orange-400 text-md hover:font-bold"
                      >
                        Profile
                      </NavLink>
                    </li>
                  </ul>
                  <hr className="my-4 md:min-w-full" />
                  <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-2 no-underline md:pl-6">
                    Meal Management
                  </h6>
                  {/* className="text-xs uppercase py-3 font-bold block text-blueGray-800 hover:text-blueGray-500" */}
                  <ul className="text-md my-4 px-4 space-y-3">
                    <li>
                      <NavLink
                        style={activeRouteStyle}
                        to="/dashboard/order-meal"
                        className="pl-3 hover:text-orange-400 text-md hover:font-bold"
                      >
                        Requested Meals
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        style={activeRouteStyle}
                        to="/dashboard/reviews"
                        className="pl-3 hover:text-orange-400 text-md hover:font-bold"
                      >
                        My Reviews
                      </NavLink>
                    </li>
                  </ul>
                  <hr className="my-4 md:min-w-full" />
                  <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-2 no-underline md:pl-6">
                    Back To
                  </h6>
                  <ul className="text-md my-4 px-4 space-y-3">
                    <li>
                      <NavLink
                        style={activeRouteStyle}
                        to="/"
                        className="pl-3 hover:text-orange-400 text-md flex items-center hover:font-bold"
                      >
                        <IoMdArrowRoundBack />{" "}
                        <span className="ml-2">Home</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* //Outlet Decleara */}
        <div className="flex-1 ">
          <div className="bg-orange-400 py-6 flex items-center justify-center">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
