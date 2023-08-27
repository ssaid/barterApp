import { createBrowserRouter } from "react-router-dom";

import { App } from "../App";
import {
  Home,
  Login,
  Register,
} from '../pages'


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
    // errorElement: <ErrorView />,
  },
]);
