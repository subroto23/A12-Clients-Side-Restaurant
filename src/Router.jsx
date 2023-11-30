import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import Addmeal from "./Components/AddMeal/Addmeal";
import Dashboard from "./Layout/AdminDashboard/Dashboard";
import Root from "./Layout/Root/Root";
import ManageUsers from "./Components/ManageUsers/ManageUsers";
import AllMeals from "./Components/AllMeals/AllMeals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
    ],
  },
  {
    path: "/admin/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/admin/dashboard/addmeal",
        element: <Addmeal />,
      },
      {
        path: "/admin/dashboard/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/dashboard/meals",
        element: <AllMeals />,
      },
    ],
  },
]);

export default router;
