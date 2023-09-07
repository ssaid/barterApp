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
import { PrivateRoutes } from "../components/PrivateRoutes";
import { PublicRoutes } from "../components/PublicRoutes";
import { MyPosts } from "../pages/MyPosts";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { 
        path: "/", 
        element: <PrivateRoutes />,
        children: [
          { path: "user/edit-profile", element: <BasicInformation /> },
          { path: "user/new-post", element: <CreatePost /> },
          { path: "user/my-posts", element: <MyPosts /> },
        ]
      },
      {
        path: "/", 
        element: <PublicRoutes />,
        children: [
          { path: "/login", element: <Login /> },
          { path: "/register", element: <Register /> },
        ]

      },
      { path: "user/logout", element: <Logout /> },
    ],
    // errorElement: <ErrorView />,
  },
]);
