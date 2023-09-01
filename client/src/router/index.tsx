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
      { path: "/welcome", element: <BasicInformation /> },
      { path: "/create_post", element: <CreatePost /> },
    ],
    // errorElement: <ErrorView />,
  },
]);
