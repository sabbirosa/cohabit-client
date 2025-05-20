import { createBrowserRouter } from "react-router";
import Loading from "../components/Loading";
import AuthLayout from "../layouts/AuthLayout";
import Root from "../layouts/Root";
import AddListing from "../pages/AddListing";
import BrowseListings from "../pages/BrowseListings";
import DetailsPage from "../pages/DetailsPage";
import ErrorPage from "../pages/ErrorPage";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyListings from "../pages/MyListings";
import Register from "../pages/Register";
import UpdateListing from "../pages/UpdateListing";
import PrivateRoute from "./PrivateRoute";

const apiURI = import.meta.env.VITE_API_URI;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },

      {
        path: "add-listing",
        element: (
          <PrivateRoute>
            <AddListing />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },

      {
        path: "listings",
        element: <BrowseListings />,
        loader: () => fetch(`${apiURI}/listings`),
        hydrateFallbackElement: <Loading />,
      },

      {
        path: "my-listings",
        element: (
          <PrivateRoute>
            <MyListings />
          </PrivateRoute>
        ),
        loader: () => fetch(`${apiURI}/listings`),
        hydrateFallbackElement: <Loading />,
      },

      {
        path: "listing-details/:id",
        element: (
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${apiURI}/listings/${params.id}`),
        hydrateFallbackElement: <Loading />,
      },

      {
        path: "update/:id",
        element: (
          <PrivateRoute>
            <UpdateListing />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${apiURI}/listings/${params.id}`),
        hydrateFallbackElement: <Loading />,
      },
    ],
  },

  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default router;
