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
import OrderSuccess from "./page/orderSuccess"
import RevenueManagement from "./page/admin/revenueManagement"
import ManagementFeedback from "./page/admin/feedback"
import Feedback from "./page/feedbacks";
import ConginmentCare from "./page/consingmentCare";
import WalletManager from "./page/admin/wallet";
import WalletUser from "./page/walletUser";
import ConsignmentForm from "./page/cosingmentForm";
import PendingPage from "./page/pending";
import CancelManagement from "./page/admin/cancleManagement";
import CustomerAccount from "./page/admin/customerAccount";
import FishSellManagement from "./page/admin/fishSellManagement";
import CareManagement from "./page/admin/careManagement";
import OrderManagement from "./page/admin/orderManagement";
import History from "./page/history";
import ShippingManagement from "./page/admin/shippingManagement";
import Certificate from "./page/admin/Certificate";

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
          path: "/history",
          element: <History />,
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
          path:"wallet",
          element: <WalletUser />,
        },
        {
          path:"PendingPage",
          element: <PendingPage />,
        },
        {
          path:"cancelManagement",
          element: <CancelManagement />,
        },
        {
          path:"customerAccount",
          element: <CustomerAccount />,
        },
        {
          path:"fishSellManagement",
          element: <FishSellManagement />,
        },
        {
          path: "history",
          element: <History />,
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
          path: "careManagement",
          element: <CareManagement />,
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
        {
          path: "shippingManagement",
          element: <ShippingManagement />,
        },
        {
          path: "certificate",
          element: <Certificate />,
        },

      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
