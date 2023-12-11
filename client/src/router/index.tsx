import { RouteObject, createBrowserRouter } from "react-router-dom";

import { PrivateRoutes } from "../components/PrivateRoutes";
import { PublicRoutes } from "../components/PublicRoutes";

import { App } from "../App";

import {
  Favourites,
  Detail,
  Home,
  Login,
  Register,
  BasicInformation,
  CreatePost,
  Logout,
  MyPosts,
  Fallback,
  EditPost,
} from '../pages'
import { Suspense } from "react";


const wrapWithSuspense = (element: JSX.Element) => (
  <Suspense fallback={<Fallback />}>
    {element}
  </Suspense>
);

const wrapElementsWithSuspense = (routes: any[]): RouteObject[] => {
  return routes.map((route) => ({
    ...route,
    element: wrapWithSuspense(route.element),
    children: route.children ? wrapElementsWithSuspense(route.children) : null,
  }));
}

const config = wrapElementsWithSuspense([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/posts/:slug", element: <Detail /> },
      { 
        path: "/", 
        element: <PrivateRoutes />,
        children: [
          { path: "user/edit-profile", element: <BasicInformation /> },
          { path: "user/new-post", element: <CreatePost /> },
          { path: "user/my-posts", element: <MyPosts /> },
          { path: "user/favourites", element: <Favourites /> },
          { path: "user/edit-post/:id", element: <EditPost /> },
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
])

export const router = createBrowserRouter(config);
