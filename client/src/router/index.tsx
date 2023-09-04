import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import {
  Home,
  Login,
  Register,
} from '../pages'
import { BasicInformation } from "../pages/BasicInformation";
import { CreatePost } from "../pages/CreatePost";
import { Logout } from "../pages/Logout";
import { PublicRoute } from "../components/PublicRoute";
import { PrivateRoute } from "../components/PrivateRoute";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <PublicRoute><Login /></PublicRoute> },
      { path: "/register", element: <PublicRoute><Register /></PublicRoute> },
      { path: "user/edit-profile", element: <PrivateRoute><BasicInformation /></PrivateRoute> },
      { path: "user/new-post", element: <PrivateRoute><CreatePost /></PrivateRoute> },
      { path: "user/logout", element: <Logout /> },
    ],
    // errorElement: <ErrorView />,
  },
]);
