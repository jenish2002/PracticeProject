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

import Login from "./pages/authentication/login";
import ForgotPassword from "./pages/authentication/forgot-password";
import ResetPassword from "./pages/authentication/reset-password";
import Students from "./pages/students";

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
                      <Navigate to="students" />
                    ) : (
                      <Navigate to="login" />
                    )
                  }
                />
                <Route path="login" element={<Login />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="students/*" element={<Students />} />
              </Routes>
            </AuthenticatedRoute>
          </AuthContextProvider>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
