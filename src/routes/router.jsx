import { createBrowserRouter } from "react-router";
import ErrorListing from "../components/ErrorListing";
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
import PrivateRoute from "./PrivateRoute";

const apiURI = import.meta.env.VITE_API_URI;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
        loader: () => fetch(`${apiURI}/featured`),
        hydrateFallbackElement: <Loading />,
      },

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
        path: "listings/:id",
        element: (
          <PrivateRoute>
            <DetailsPage />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`${apiURI}/listings/${params.id}`);
          if (!res.ok) throw new Response("Not Found", { status: res.status });
          return res;
        },
        errorElement: <ErrorListing />, // or <ErrorListing /> if specific
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
