import { Layout } from "./layouts/Layout";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
