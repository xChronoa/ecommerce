import { BrowserRouter, Route, Routes } from "react-router-dom";

// User
import UserLayout from "./User/components/UserLayout";
import Home from "./User/components/Home";
import UserProduct from "./User/components/Product";
import ViewCart from "./User/components/ViewCart";
import CheckOut from "./User/components/CheckOut";

// Admin
import AdminLayout from "./Admin/components/AdminLayout";
import AdminProduct from "./Admin/components/Product";
import AdminUser from "./Admin/components/User";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {/* User Layout */}
                    <Route path="/" element={<UserLayout />}>
                        <Route index element={<Home />} />
                        <Route path="home" element={<Home />} />
                        <Route path="product" element={<UserProduct />} />
                        <Route path="viewcart" element={<ViewCart />} />
                        <Route path="checkout" element={<CheckOut />} />
                    </Route>

                    {/* Admin Layout */}
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminProduct />} />
                        <Route path="home" element={<AdminProduct />} />
                        <Route path="manage/products" element={<AdminProduct />} />
                        <Route path="manage/users" element={<AdminUser />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
