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
import Upcomming from "./Components/Upcomming/Upcomming";
import Payment from "./Components/Payment/Payment";
import UsersDashboard from "./Pages/UsersDashBoard/UsersDashboard";
import UsersHomePage from "./Pages/UsersDashBoard/UsersHomePage";
import Profile from "./Pages/UsersDashBoard/Profile/Profile";
import UsersMeals from "./Pages/UsersDashBoard/UsersMeals/UsersMeals";
import ServeMeal from "./Components/ServeMeal/ServeMeal";
import UserReviews from "./Pages/UsersDashBoard/UserReviews/UserReviews";
import MealsPages from "./Pages/MealsPages/MealsPages";

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
        element: <MealsPages />,
      },
      {
        path: "/upcomming",
        element: <Upcomming />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <Payment />
          </PrivateRoute>
        ),
      },
      {
        path: "/meals/details/meal/:id",
        element: (
          <PrivateRoute>
            <MealsDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://backend-tan-ten.vercel.app/api/meals/${params.id}`, {
            credentials: "include",
          }),
      },
    ],
  },
  // Users Dashboard
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <UsersDashboard />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/dashboard",
        element: <UsersHomePage></UsersHomePage>,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/order-meal",
        element: <UsersMeals />,
      },
      {
        path: "/dashboard/reviews",
        element: <UserReviews />,
      },
    ],
  },
  // Admin Dashboard
  {
    path: "/admin/dashboard",
    element: (
      <PrivateRoute>
        <AdminRoute>
          <RootDashboard />
        </AdminRoute>
      </PrivateRoute>
    ),
    errorElement: <ErrorPage></ErrorPage>,
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
          fetch(`https://backend-tan-ten.vercel.app/api/meals/${params.id}`, {
            credentials: "include",
          }),
      },
      {
        path: "/admin/dashboard/reviews",
        element: <AllReviews />,
      },
      {
        path: "/admin/dashboard/serve-meals",
        element: <ServeMeal />,
      },
      {
        path: "/admin/dashboard/upcomming",
        element: <UpCommingMeals />,
      },
    ],
  },
]);

export default router;
