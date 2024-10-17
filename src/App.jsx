import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders";
import Tours from "./components/tours/Tours";
import Users from "./components/users/Users";
import Provinces from "./components/provinces/Provinces";
import AddNewTour from "./components/tours/TourAddNew";
import TourUpdate from "./components/tours/TourUpdate";
import TourDetails from "./components/tours/TourDetails";
import OrderDetails from "./components/orders/OrderDetails";
import UserAddNew from "./components/users/UserAddNew";
import UserDetails from "./components/users/UserDetails";
import Suppliers from "./components/suppliers/Suppliers";
import SupplierAddNew from "./components/suppliers/SupplierAddNew";
import SupplierUpdate from "./components/suppliers/SupplierUpdate";
import ProvinceAddNew from "./components/provinces/ProvinceAddNew";
import ProvinceUpdate from "./components/provinces/ProvinceUpdate";
import Support from "./components/support/Support";
import Profile from "./components/profiles/Profiles";
import ProfileUpdate from "./components/profiles/ProfileUpdate";
import ChangePassword from "./components/changepassword/ChangePassword";
import LogIn from "./components/login/LogIn";
import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Category from "./components/category/Category";
import CategoryUpdate from "./components/category/CategoryUpdate";
import CategoryAddNew from "./components/category/CategoryAddNew";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="login" element={<LogIn />} />

          {/* Admin Routes */}
          <Route path="/" element={<Layout />}>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={<Dashboard />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="tours"
              element={
                <ProtectedRoute
                  element={<Tours />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="tours/save"
              element={
                <ProtectedRoute
                  element={<AddNewTour />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="tours/update/:id"
              element={
                <ProtectedRoute
                  element={<TourUpdate />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="tours/:id"
              element={
                <ProtectedRoute
                  element={<TourDetails />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />

            <Route
              path="orders"
              element={
                <ProtectedRoute
                  element={<Orders />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="orders/:id"
              element={
                <ProtectedRoute
                  element={<OrderDetails />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />

            <Route
              path="users"
              element={
                <ProtectedRoute element={<Users />} requiredRole={"ADMIN"} />
              }
            />
            <Route
              path="users/save"
              element={
                <ProtectedRoute
                  element={<UserAddNew />}
                  requiredRole={"ADMIN"}
                />
              }
            />
            <Route
              path="users/:id"
              element={
                <ProtectedRoute
                  element={<UserDetails />}
                  requiredRole={"ADMIN"}
                />
              }
            />

            <Route
              path="suppliers"
              element={
                <ProtectedRoute
                  element={<Suppliers />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="suppliers/save"
              element={
                <ProtectedRoute
                  element={<SupplierAddNew />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="suppliers/update/:id"
              element={
                <ProtectedRoute
                  element={<SupplierUpdate />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />

            <Route
              path="provinces"
              element={
                <ProtectedRoute
                  element={<Provinces />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="provinces/save"
              element={
                <ProtectedRoute
                  element={<ProvinceAddNew />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="provinces/update/:id"
              element={
                <ProtectedRoute
                  element={<ProvinceUpdate />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />

            <Route
              path="category"
              element={
                <ProtectedRoute
                  element={<Category />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="category/save"
              element={
                <ProtectedRoute
                  element={<CategoryAddNew />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="category/update/:id"
              element={
                <ProtectedRoute
                  element={<CategoryUpdate />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />

            <Route
              path="support"
              element={
                <ProtectedRoute
                  element={<Support />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />

            <Route
              path="profiles/:id"
              element={
                <ProtectedRoute
                  element={<Profile />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
            <Route
              path="profiles/edit/:id"
              element={
                <ProtectedRoute
                  element={<ProfileUpdate />}
                  requiredRole={["ADMIN", "STAFF"]}
                />
              }
            />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
