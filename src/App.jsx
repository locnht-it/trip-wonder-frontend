import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import Orders from "./components/orders/Orders";
import Tours from "./components/tours/Tours";
import Users from "./components/users/Users";
import Rating_Reviews from "./components/rating-reviews/Rating-Reviews";
import Provinces from "./components/provinces/Provinces";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="tours" element={<Tours />} />
          <Route path="orders" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="rating-reviews" element={<Rating_Reviews />} />
          <Route path="provinces" element={<Provinces />} />
        </Route>
        <Route path="login" element={<div>This is login page</div>} />
      </Routes>
    </Router>
  );
}

export default App;