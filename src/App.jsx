import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./page/home";
import Layout from "./components/layout";
import Login from "./page/login/index";
import Register from "./page/register";
import Profile from "./page/Profile";
import Dashboard from "./components/dashboard";
import ManageCategory from "./page/admin/category";
import ManageVoucher from "./page/admin/voucher";
import ManagementFish from "./page/admin/fish";
import Cart from "./page/cart";
import ForgotPassword from "./page/forgotPassword";
import ResetPassword from "./page/resetPassword";
import Checkout from "./page/checkout"; // Import the Checkout component
<<<<<<< HEAD
import FishShop from "./page/shopFish"; // Import the Checkout component
=======
import AboutUs from "./page/aboutUs"
>>>>>>> 48e5ea28042386ca14e7add27b4d0327edacc567

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
        },
        {
<<<<<<< HEAD
          path: "/checkout", // Add the checkout route
          element: <Checkout />,
        },
        {
          path: "/FishShop", // Add the checkout route
          element: <FishShop />,
        },
=======
          path:"/checkout", // Add the checkout route
          element: <Checkout />
        },
        {
          path:"/about-us",
          element: <AboutUs />
        }
>>>>>>> 48e5ea28042386ca14e7add27b4d0327edacc567
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [
        {
          path: "category",
          element: <ManageCategory />,
        },
        {
          path: "voucher",
          element: <ManageVoucher />,
        },
        {
          path: "fish",
          element: <ManagementFish />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
