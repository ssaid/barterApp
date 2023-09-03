import { AuthProvider } from "./context/auth";
import { Layout } from "./layouts/Layout";
import { Outlet } from "react-router-dom";

export const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  );
}
