import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex md:flex-row flex-col gap-x-6">
      <div className="md:w-1/6 w-full md:min-h-screen bg-orange-400">
        <div>
          <ul className="text-md my-4 px-4 space-y-3">
            <li>
              <NavLink to="/" className="hover:text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/profile"
                className="hover:text-white"
              >
                Admin Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/dashboard/users" className="hover:text-white">
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/addmeal"
                className="hover:text-white"
              >
                Add Meals
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/dashboard/meals" className="hover:text-white">
                All Meals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/reviews"
                className="hover:text-white"
              >
                All Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/serve-meals"
                className="hover:text-white"
              >
                Serve Meals
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/upcomming"
                className="hover:text-white"
              >
                Upcomming Meals
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
      {/* //Outlet Decleara */}
      <div>
        Todo: DashBoard Design
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
