
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Dashboard } from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import { ForgotPassword } from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashBoard from "./pages/Admin/AdminDashBoard";
import CreateCategory from "./pages/Admin/CreateCategory";
import AddGame from "./pages/Admin/AddGame";
import Users from "./pages/Admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import { Games } from "./pages/Admin/Games";
import UpdateGame from "./pages/Admin/UpdateGame";
import Cart from "./pages/Cart";
import CategorySearch from "./pages/CategorySearch";
import GamesByCategory from "./pages/GamesByCategory";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<PrivateRoute />} >
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />} >
          <Route path="admin" element={<AdminDashBoard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-game" element={<AddGame />} />
          <Route path="admin/update-game/:id" element={<UpdateGame />} />
          <Route path="admin/game" element={<Games />} />
          <Route path="admin/users" element={<Users />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/category/search" element={<CategorySearch />} />
        <Route path="/category/search/byname/:name" element={<GamesByCategory />} />
      </Routes>
    </>
  );
}
export default App;