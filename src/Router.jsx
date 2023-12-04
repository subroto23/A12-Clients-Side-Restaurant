import { createBrowserRouter } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from "./Pages/Signup/SignUp";
import LogIn from "./Pages/LogIn/LogIn";
import Addmeal from "./Components/AddMeal/Addmeal";
import RootDashboard from "./Layout/AdminRoot/DashboardRoot";
import Root from "./Layout/Root/Root";
import ManageUsers from "./Components/ManageUsers/ManageUsers";
import AllMeals from "./Components/AllMeals/AllMeals";
import UpdateMeals from "./Components/UpdateMeals/UpdateMeals";
import MealsDetails from "./Components/MealsDetails/MealsDetails";
import AllReviews from "./Components/AllReviews/AllReviews";
import UpCommingMeals from "./Components/UpCommingMeals/UpCommingMeals";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import AdminRoute from "./Components/AdminRoute/AdminRoute";
import AdminDashBoard from "./Layout/AdminDashboard/AdminDashBoard";
import AdminProfile from "./Components/AdminProfile/AdminProfile";
import ErrorPage from "./Components/ErrorPages/ErrorPages";
import TabSystemCatagory from "./Pages/Home/TabSystem/TabSystemCatagory";
import Upcomming from "./Components/Upcomming/Upcomming";
import Payment from "./Components/Payment/Payment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage></ErrorPage>,
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
        path: "/meals",
        element: <TabSystemCatagory />,
      },
      {
        path: "/upcomming",
        element: <Upcomming />,
      },
      {
        path: "/payment/:name",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
        loader: ({ params }) => params?.name,
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
    element: (
      <PrivateRoute>
        <AdminRoute>
          <RootDashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <AdminDashBoard />,
      },
      {
        path: "/admin/dashboard/users",
        element: <ManageUsers />,
      },
      {
        path: "/admin/dashboard/profile",
        element: <AdminProfile />,
      },
      {
        path: "/admin/dashboard/addmeal",
        element: <Addmeal />,
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
