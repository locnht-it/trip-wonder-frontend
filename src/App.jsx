import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders";
import Tours from "./components/tours/Tours";
import Users from "./components/users/Users";
import Rating_Reviews from "./components/rating-reviews/Rating-Reviews";
import Provinces from "./components/provinces/Provinces";
import AddNewTour from "./components/tours/TourAddNew";
import TourUpdate from "./components/tours/TourUpdate";
import TourDetails from "./components/tours/TourDetails";
import OrderDetails from "./components/orders/OrderDetails";
import UserAddNew from "./components/users/UserAddNew";
import UserDetails from "./components/users/UserDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tours" element={<Tours />} />
          <Route path="tours/save" element={<AddNewTour />} />
          <Route path="tours/update/:id" element={<TourUpdate />} />
          <Route path="tours/:id" element={<TourDetails />} />

          <Route path="orders" element={<Orders />} />
          <Route path="orders/:id" element={<OrderDetails />} />

          <Route path="users" element={<Users />} />
          <Route path="users/save" element={<UserAddNew />} />
          <Route path="users/:id" element={<UserDetails />} />

          <Route path="rating-reviews" element={<Rating_Reviews />} />
          <Route path="provinces" element={<Provinces />} />
        </Route>
        <Route path="login" element={<div>This is login page</div>} />
      </Routes>
    </Router>
  );
}

export default App;
