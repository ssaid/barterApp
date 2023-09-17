import { createBrowserRouter } from "react-router-dom";

import { PrivateRoutes } from "../components/PrivateRoutes";
import { PublicRoutes } from "../components/PublicRoutes";

import { App } from "../App";

import {
    Favourites,
  Home,
  Login,
  Register,
  BasicInformation,
  CreatePost,
  Logout,
  MyPosts,
  Fallback,

} from '../pages'


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
          { path: "user/favourites", element: <Favourites /> },
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
    errorElement: <Fallback />,
  },
]);
