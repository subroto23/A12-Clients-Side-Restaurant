import { Link, NavLink } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
// import { GrLogin } from "react-icons/gr";
import { IoMenuSharp } from "react-icons/io5";
import UseAuth from "../../Hookes/AuthUser/UseAuth";
import Swal from "sweetalert2";
import UseAdmin from "../../Hookes/AdminVerify/UseAdmin";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { user, loading, handleLogOut } = UseAuth();
  const [isAdmin, adminLoading] = UseAdmin();
  const [stickyClass, setStickyClass] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);
    return () => window.removeEventListener("scroll", stickNavbar);
  }, []);
  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      // window height changed for the demo
      windowHeight > 50
        ? setStickyClass(
            `fixed top-0 transition bg-orange-400 bg-opacity-100 duration-1000 ease-in-out`
          )
        : setStickyClass("");
    }
  };

  //Navlik Active Class
  const activeRouteStyle = ({ isActive }) => {
    return {
      color: isActive ? "#C3FCF1" : "",
      fontWeight: isActive ? "bold" : "",
    };
  };
  const navLink = (
    <>
      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-orange-700 uppercase font-medium"
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-orange-700 uppercase font-medium"
        to="/meals"
      >
        Meals
      </NavLink>

      <NavLink
        style={activeRouteStyle}
        className="mx-5 hover:text-orange-700 uppercase font-medium"
        to="/upcomming"
      >
        Upcomming
      </NavLink>
      <div className="indicator">
        <NavLink
          style={activeRouteStyle}
          className="mx-5 hover:text-orange-700 uppercase font-medium"
          to="/noticification"
        >
          <span className="text-2xl">
            <IoIosNotifications />
          </span>
          <span className="indicator-item badge bg-orange-200 text-black">
            99+
          </span>
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
      <div
        className={`z-50 bg-black bg-opacity-80 max-w-screen-xl top-0 mx-auto w-full text-white ${stickyClass}`}
      >
        <div className={`navbar mx-auto flex justify-between items-center`}>
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
                className="menu menu-sm bg-green-500 dropdown-content mt-3 z-[1] space-y-4 shadow rounded-box w-52"
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
              <span className="text-white font-semibold hover:">
                <span className="text-lg text-blue-700">IU</span>meal
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
          {loading || user ? (
            <>
              <div
                className="dropdown dropdown-end tooltip tooltip-left"
                data-tip={user?.displayName}
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
                  {user && isAdmin && !adminLoading && (
                    <li className="hover:font-semibold  border-b py-2">
                      <button>
                        <Link to="/admin/dashboard">Dashboard</Link>
                      </button>
                    </li>
                  )}
                  {user && !isAdmin && (
                    <>
                      <li className="hover:font-semibold  border-b py-2">
                        <button>
                          <Link to="/dashboard">Dashboard</Link>
                        </button>
                      </li>
                    </>
                  )}
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
