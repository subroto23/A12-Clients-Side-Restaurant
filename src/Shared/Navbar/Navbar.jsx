import { Link, NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
// import { GrLogin } from "react-icons/gr";
import { IoMenuSharp } from "react-icons/io5";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, loading, handleLogOut } = UseAuth();
  const activeRouteStyle = ({ isActive }) => {
    return {
      color: isActive ? "#2ecc71" : "",
      fontWeight: isActive ? "bold" : "",
    };
  };
  const navLink = (
    <>
      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-green-500 uppercase font-medium"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-green-500 uppercase font-medium"
        to="/meals"
      >
        Meals
      </NavLink>

      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-green-500 uppercase font-medium"
        to="/upcomming"
      >
        Upcomming
      </NavLink>
      <div className="indicator">
        <NavLink
          style={activeRouteStyle}
          className="mx-5 hover:text-green-500 uppercase font-medium"
          to="/noticification"
        >
          <span className="text-2xl">
            <IoIosNotifications />
          </span>
          <span className="indicator-item badge badge-secondary">99+</span>
        </NavLink>
      </div>
    </>
  );
  // LogOut Handler
  const handleLogoutUsers = async () => {
    await handleLogOut().then(() => {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully Log Out",
        showConfirmButton: false,
        timer: 1500,
      });
    });
  };
  return (
    <>
      <div className="  shadow-md z-10 w-full">
        <div className="navbar mx-auto flex justify-between items-center">
          {/* Nav Logo */}
          <div>
            <div className="dropdown">
              <div>
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                  <IoMenuSharp className="text-2xl" />
                </label>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm bg-green-200 dropdown-content mt-3 z-[1] space-y-4 shadow rounded-box w-52"
              >
                {navLink}
              </ul>
            </div>
            <NavLink
              to="/"
              className="flex items-center justify-center normal-case"
            >
              <img
                className="h-6 w-6 mr-2"
                src="https://image.similarpng.com/very-thumbnail/2020/06/Restaurant-logo-with-chef-drawing-template-on-transparent-background-PNG.png"
                alt=""
              />
              <span className="text-green-500 font-semibold hover:">
                <span className="text-lg text-red-600">M</span>eal
              </span>
            </NavLink>
          </div>

          {/* NavLink */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1 justify-center items-center flex">
              {navLink}
            </ul>
          </div>

          {/* Profile */}
          {loading ? null : user ? (
            <>
              <div
                className="dropdown dropdown-end tooltip tooltip-left"
                data-tip={user.displayName}
              >
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ">
                    <img src={user?.photoURL} alt="userPhoto" />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className=" menu-sm dropdown-content mt-3 z-[1] shadow rounded-lg w-52  text-white btn-toggle-style bg-green-500"
                >
                  <li className="hover:font-semibold py-2 border-b">
                    {user?.displayName}
                  </li>
                  <li className="hover:font-semibold  border-b py-2">
                    <button>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </button>
                  </li>
                  <li className="hover:font-semibold py-2">
                    <button onClick={handleLogoutUsers}>
                      <Link>Logout</Link>
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div>
              <NavLink to="/login" className="btn-gradent-swipe-r2l">
                <span className="relative z-10">
                  {/* <GrLogin className="mr-2 md:inline-block hidden " /> */}
                  Join Us
                </span>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
