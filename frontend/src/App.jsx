import { Route, Routes } from "react-router-dom";
import AuthLayout from "./components/auth/Layout";
import AuthLogin from "./pages/auth/login";
import AuthSignup from "./pages/auth/signup";
import AdminLayout from "./components/admin-view/Layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminFeatures from "./pages/admin-view/features";
import AdminOrders from "./pages/admin-view/orders";
import AdminProducts from "./pages/admin-view/products";
import NotFound from "./pages/not-found";
import ShoppingLayout from "./components/shopping-view/layout";
import ShoppingHome from "./pages/shopping-view/home";
import ShoppingListing from "./pages/shopping-view/listing";
import ShoppingAccount from "./pages/shopping-view/account";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<AuthLogin />} />
          <Route path="signup" element={<AuthSignup />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProducts />} />
        </Route>
        <Route path="/shop" element={<ShoppingLayout/>}>
          <Route path="home" element={<ShoppingHome/>}/>
          <Route path="listing" element={<ShoppingListing/>}/>
          <Route path="checkout" element={<ShoppingHome/>}/>
          <Route path="account" element={<ShoppingAccount/>}/>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
