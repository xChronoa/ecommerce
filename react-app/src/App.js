import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useCart } from "./components/utils";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Product from "./components/Product";
import ViewCart from "./components/ViewCart";

function App() {
    const { cart, addToCart, removeFromCart, checkOut } = useCart();

    return (
        <div className="App">
            <BrowserRouter>
                <Navigation />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route
                        exact
                        path="/product"
                        element={<Product cart={cart} addToCart={addToCart} />}
                    />
                    <Route
                        path="/viewcart"
                        element={
                            <ViewCart
                                cart={cart}
                                removeFromCart={removeFromCart}
                                checkOut={checkOut}
                            />
                        }
                    />
                </Routes>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
