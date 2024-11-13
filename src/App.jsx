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
import Checkout from "./page/checkout"; 
import AboutUs from "./page/aboutUs"
import FishShop from "./page/shopFish"
import ConsignmentScreen from "./page/consignmentScreen"
import ProductDetails from "./page/ProductDetails"
import ConsignmentPage from "./page/consigment"
import CreateStaffAccount from "./page/admin/createStaffAccount"
import OrderHistory from "./page/orderHistory"
import OrderManagement from "./page/admin/orderManagement"
import OrderSuccess from "./page/orderSuccess"
import RevenueManagement from "./page/admin/revenueManagement"
import ManagementFeedback from "./page/admin/feedback"
import Feedback from "./page/feedbacks";
import ConginmentCare from "./page/consingmentCare";
import ConsignmentManager from "./page/admin/consigmentManager";
import WalletManager from "./page/admin/wallet";
import WalletUser from "./page/walletUser";
import ConsignmentForm from "./page/cosingmentForm";
import ConsignmentHistory from "./page/consignmentHistory";
import PendingPage from "./page/pending";
import FishSellHistory from "./page/fishSellHistory";
import CancelManagement from "./page/admin/cancleManagement";
import CustomerAccount from "./page/admin/customerAccount";
import FishSellManagement from "./page/admin/fishSellManagement";

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
          path: "/forgot-Password",
          element: <ForgotPassword />,
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "/checkout", // Add the checkout route
          element: <Checkout />,
        },
        {
          path: "/FishShop", // Add the checkout route
          element: <FishShop />,
        },
        {
          path: "/ConsignmentScreen",
          element: <ConsignmentScreen />,
        },
        {
          path: "/ConsignmentPage",
          element: <ConsignmentPage />,
        },
        {
          path: "/aboutUs",
          element: <AboutUs />,
        },

        {
          path: "/product-details/:id",
          element: <ProductDetails />,
        },
        {
          path: "/consignmentForm",
          element: <ConsignmentForm />,
        },
        {
          path: "/order-history",
          element: <OrderHistory />,
        },
        {
          path: "orderSuccess",
          element: <OrderSuccess />,
        },
        {
          path: "consignment",
          element: <ConsignmentPage />
        },
        {
          path: "feedback",
          element: <Feedback />,
        },

        {
          path: "consignment",
          element: <ConsignmentPage />,
        },
        {
          path: "consignmentCare",
          element: <ConginmentCare />,
        },
        {
          path:"walletUser",
          element: <WalletUser />,
        },
        {
          path:"ConsignmentHistory",
          element: <ConsignmentHistory />,
        },

        {
          path:"PendingPage",
          element: <PendingPage />,
        },
        {
          path:"fishSellHistory",
          element: <FishSellHistory />,
        },
       
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
        {
          path: "staff",
          element: <CreateStaffAccount />,
        },
        {
          path: "orderManagement", // Remove the leading slash
          element: <OrderManagement />,
        },
        {
          path: "revenueManagement",
          element: <RevenueManagement />,
        },
        {
          path: "feedback",
          element: <ManagementFeedback />,
        },
        {
          path: "consignmentManagement",
          element: <ConsignmentManager />,
        },
        {
          path: "walletManager",
          element: <WalletManager />,
        },
        {
          path: "cancelManagement",
          element: <CancelManagement />,
        },
        {
          path: "customerAccount",
          element: <CustomerAccount />,
        },
        {
          path: "fishSellManagement",
          element: <FishSellManagement />,
        },

      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
