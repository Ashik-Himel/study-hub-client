import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PrivateRouteAlt from "../manageRoute/PrivateRouteAlt";
import Login from "../pages/Login";
import Register from "../pages/Register";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <PrivateRouteAlt><Login /></PrivateRouteAlt>
      },
      {
        path: '/register',
        element: <PrivateRouteAlt><Register /></PrivateRouteAlt>
      }
    ]
  }
])