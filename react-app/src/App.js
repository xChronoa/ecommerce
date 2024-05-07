import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Product from "./components/Product";
import ViewCart from "./components/ViewCart";
import CheckOut from "./components/CheckOut";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route exact path="/product" element={<Product />} />
                    <Route path="/viewcart" element={<ViewCart />} />
                    <Route path="/checkout" element={<CheckOut />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
