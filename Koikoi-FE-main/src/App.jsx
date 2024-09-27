import { createBrowserRouter,  RouterProvider } from "react-router-dom"
import Home from "./page/home"
import Layout from "./components/layout"
import Login from "./page/login/index"
import Register from "./page/register"
import Profile from "./page/Profile"
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
          path:"/profile/:id",
          element: <Profile />,
        },
      ],
    },
  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App