import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import PrivateRouteAlt from "../manageRoute/PrivateRouteAlt";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Assignments from "../pages/Assignments";
import CreateAssignment from "../pages/CreateAssignment";
import MyAssignments from "../pages/MyAssignments";
import SubmittedAssignments from "../pages/SubmittedAssignments";
import PrivateRoute from "../manageRoute/PrivateRoute";
import AssignmentDetails from "../pages/AssignmentDetails";

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
      },
      {
        path: '/assignments',
        element: <Assignments />
      },
      {
        path: '/assignments/:id',
        element: <PrivateRoute><AssignmentDetails /></PrivateRoute>
      },
      {
        path: '/create-assignment',
        element: <PrivateRoute><CreateAssignment /></PrivateRoute>
      },
      {
        path: '/my-assignments',
        element: <PrivateRoute><MyAssignments /></PrivateRoute>
      },
      {
        path: '/submitted-assignments',
        element: <PrivateRoute><SubmittedAssignments /></PrivateRoute>
      }
    ]
  }
])