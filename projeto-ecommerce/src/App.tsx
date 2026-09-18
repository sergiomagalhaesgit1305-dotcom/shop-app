import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import { ProductPage } from "./pages/ProductPage";
import { CartProvider } from "./context/CartContext";
import { CartPage } from "./pages/CartPage";
import { UserPage } from "./pages/UserPage";
import { CustomThemeProvider } from "./components/ControlColors";
import { SearchProvider } from "./context/SearchContext";
import { MainLayout } from "./pages/MainLayout";
import { ShipProductPage } from "./pages/ShipProductPage";
import { AddressProvider } from "./context/AddressContext";

function App() {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <AuthProvider>
          <AddressProvider>
            <ProductProvider>
              <SearchProvider>
                <CartProvider>
                  <Routes>
                    <Route element={<MainLayout />}>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<ProductPage />} />
                      <Route path="/cart" element={<CartPage />} />
                      <Route path="/me" element={<UserPage />} />
                    </Route>
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/ship" element={<ShipProductPage />} />
                  </Routes>
                </CartProvider>
              </SearchProvider>
            </ProductProvider>
          </AddressProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
