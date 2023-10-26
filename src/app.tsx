import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { queryClient } from "./query-client";

import { AuthenticatedRoute } from "./pages/hooks";
import { AuthContextProvider } from "./context";

import Login from "./pages/authentication/login/login";
import ForgotPassword from "./pages/authentication/forgot-password/forgot-password";
import ResetPassword from "./pages/authentication/reset-password/reset-password";
import Home from "./pages/home/home";

const App = () => {
  return (
    <div className="app-main">
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthContextProvider>
            <AuthenticatedRoute>
              <Routes>
                <Route
                  path="/"
                  element={
                    Cookies.get("userLoggedIn") === "true" ? (
                      <Navigate to="home" />
                    ) : (
                      <Navigate to="login" />
                    )
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="home/*" element={<Home />} />
              </Routes>
            </AuthenticatedRoute>
          </AuthContextProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
