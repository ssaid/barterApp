import { AuthProvider } from "./context/auth";
import { useTheme } from "./hooks/useTheme";
import { Layout } from "./layouts/Layout";
import { Outlet } from "react-router-dom";

export const App = () => {
  useTheme()
  return (
    <AuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AuthProvider>
  );
}
