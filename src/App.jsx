import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./page/home"
import Layout from "./components/layout"
import Login from "./page/login/index"
import Register from "./page/register"
import Profile from "./page/Profile"
import Dashboard from "./components/dashboard"
import ManageCategory from "./page/admin/category"
import ManageVoucher from "./page/admin/voucher"
import ManagementFish from "./page/admin/fish"
import Cart from "./page/cart"
import ForgotPassword from "./page/forgotPassword"
import ResetPassword from "./page/resetPassword"
import Checkout from "./page/checkout"; // Import the Checkout component
import AboutUs from "./page/aboutUs"
import FishShop from "./page/shopFish"
import ConsignmentScreen from "./page/consignmentScreen"
import ProductDetails from "./page/ProductDetails"
import ConsignmentPage from "./page/consigment"
import ConsignmentForm from "./components/cosingmentForm"

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path:"",
          element: <Home />,
        },
        {
          path:"/login",
          element: <Login />,
        },
        {
          path:"/register",
          element: <Register />,
        },
        {
          path:"/profile",
          element: <Profile />,
        },
        {
          path:"/cart",
          element: <Cart />,
        },
        {
          path:"/forgot-Password",
          element:<ForgotPassword />
        },
        {
          path:"/resetPassword",
          element:<ResetPassword />

        },
        {
          path:"/checkout", // Add the checkout route
          element: <Checkout />
        },
        {
          path: "/FishShop", // Add the checkout route
          element: <FishShop />,
        },
        {
          path: "/ConsignmentScreen",
          element: <ConsignmentScreen />
        },
        {
          path: "/consignment",
          element: <ConsignmentPage />
        },
        {
          path:"/about-us",
          element: <AboutUs />
        },
        
        {
          path:"/product-details",
          element: <ProductDetails />
        },
        {
          path:"/consignmentForm",
          element: <ConsignmentForm />
        }
      ],
    },
    {
      path: "/dashboard", element: <Dashboard />,
      children: [
        {
          path: "category",
          element: <ManageCategory />
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
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App