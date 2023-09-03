import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import {
  Home,
  Login,
  Register,
} from '../pages'
import { BasicInformation } from "../pages/BasicInformation";
import { CreatePost } from "../pages/CreatePost";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "user/edit-profile", element: <BasicInformation /> },
      { path: "user/new-post", element: <CreatePost /> },
    ],
    // errorElement: <ErrorView />,
  },
]);
