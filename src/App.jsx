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
        }
      ],
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App