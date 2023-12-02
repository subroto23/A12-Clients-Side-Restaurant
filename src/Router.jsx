import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import Addmeal from "./Components/AddMeal/Addmeal";
import Dashboard from "./Layout/AdminDashboard/Dashboard";
import Root from "./Layout/Root/Root";
import ManageUsers from "./Components/ManageUsers/ManageUsers";
import AllMeals from "./Components/AllMeals/AllMeals";
import UpdateMeals from "./Components/UpdateMeals/UpdateMeals";
import MealsDetails from "./Components/MealsDetails/MealsDetails";
import AllReviews from "./Components/AllReviews/AllReviews";
import UpCommingMeals from "./Components/UpCommingMeals/UpCommingMeals";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";

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
      {
        path: "/meals/details/meal/:id",
        element: (
          <PrivateRoute>
            <MealsDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:5001/api/meals/${params.id}`),
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
      {
        path: "/admin/dashboard/update/:id",
        element: <UpdateMeals />,
        loader: ({ params }) =>
          fetch(`http://localhost:5001/api/meals/${params.id}`),
      },
      {
        path: "/admin/dashboard/reviews",
        element: <AllReviews />,
      },
      {
        path: "/admin/dashboard/upcomming",
        element: <UpCommingMeals />,
      },
    ],
  },
]);

export default router;
