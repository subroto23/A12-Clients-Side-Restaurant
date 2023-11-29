import { createBrowserRouter } from "react-router-dom";
import Root from "./Root/Root";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import Addmeal from "./Components/AddMeal/Addmeal";
import Dashboard from "./Pages/AdminDashboard/Dashboard";

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
      ///////////////////////////////////////////////////////////////
      {
        path: "/addmeal",
        element: <Addmeal />,
      },
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
