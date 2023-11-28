import { Link, NavLink } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { GrLogin } from "react-icons/gr";
import { IoMenuSharp } from "react-icons/io5";
import UseAuth from "../Hooks/UseAuth";
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
        to="/all-jobs"
      >
        All Jobs
      </NavLink>
      {user && (
        <>
          <NavLink
            style={activeRouteStyle}
            className="mx-5 hover:text-green-500 uppercase font-medium"
            to="/apply/job"
          >
            Applied Jobs
          </NavLink>
          <NavLink
            style={activeRouteStyle}
            className="mx-5 hover:text-green-500 uppercase font-medium"
            to="/add-jobs"
          >
            Add A Job
          </NavLink>
          <NavLink
            style={activeRouteStyle}
            className="mx-5 hover:text-green-500 uppercase font-medium"
            to="/my-jobs/post"
          >
            My Jobs
          </NavLink>
        </>
      )}
      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-green-500 uppercase font-medium"
        to="/blogs"
      >
        Blogs
      </NavLink>

      <NavLink
        style={activeRouteStyle}
        to="/sign-up"
        className="mx-5 uppercase btn-gradent-swipe-l2r "
      >
        <span className="relative z-10 hover:text-white">
          <FaUserPlus className="inline mr-1" /> Sign Up
        </span>
      </NavLink>
    </>
  );
  return (
    <>
      <div className=" text-gray-500 shadow-md fixed top-0 z-50 w-full bg-white">
        <div className=" navbar max-w-7xl mx-auto flex justify-between items-center">
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
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52"
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
                src="https://i.ibb.co/kg6zdzt/png-clipart-computer-icons-farm-garden-logo-farming-technology-food-leaf.png"
                alt=""
              />
              <span className="text-green-500 font-semibold hover:text-gray-500">
                JobSearch
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
                  className=" menu-sm dropdown-content mt-3 z-[1]  shadow rounded-lg w-52  text-white btn-toggle-style"
                >
                  <li className="hover:text-green-500 hover:bg-white hover:font-semibold py-2 border-b">
                    <button>
                      <Link>{user?.displayName}</Link>
                    </button>
                  </li>
                  <li className="hover:text-green-500 hover:bg-white hover:font-semibold py-2">
                    <button onClick={() => handleLogOut()}>
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
                  <GrLogin className="mr-2 md:inline-block hidden " />
                  Log In
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
