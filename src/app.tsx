import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { lazy } from "react";
import AuthenticatedRoute from "./pages/hooks/authenticated-route";
import { AuthContextProvider } from "./context/auth-context";
import Cookies from "js-cookie";

const Login = lazy(() => import("./pages/authentication/login"));
const ForgotPassword = lazy(
  () => import("./pages/authentication/forgot-password")
);
const ResetPassword = lazy(
  () => import("./pages/authentication/reset-password")
);
const Home = lazy(() => import("./pages/home"));

const App = () => {
  return (
    <div className="app-main">
      <Router>
        <AuthContextProvider>
          <AuthenticatedRoute>
            <Routes>
              <Route
                path="/"
                element={
                  Cookies.get("userLoggedIn") === "true" ? (
                    <Navigate to="/home" />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </AuthenticatedRoute>
        </AuthContextProvider>
      </Router>
    </div>
  );
};

export default App;
