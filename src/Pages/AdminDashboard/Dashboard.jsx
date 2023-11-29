import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-1/6 h-screen bg-orange-500">
        <div>
          <div className="text-center text-md py-4">
            <NavLink to="/addmeal" className="hover:text-white">
              Add Meals
            </NavLink>
          </div>
        </div>
      </div>
      {/* //Outlet Decleara */}
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
