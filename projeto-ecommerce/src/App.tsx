import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductsContext";
import { ProductPage } from "./pages/ProductPage";
import { CartProvider } from "./context/CartContext";
import { CartPage } from "./pages/CartPage";
import { UserPage } from "./pages/User/UserPage";
import { CustomThemeProvider } from "./components/ControlColors";
import { FilterProvider } from "./context/FilterContext";
import { MainLayout } from "./pages/MainLayout";
import { ShipProductPage } from "./pages/ShipProductPage";
import { AddressProvider } from "./context/AddressContext";
import { FavoriteProvider } from "./context/FavoritesContext";
import { PersonalDetails } from "./pages/User/PersonalDetails";
import { FavoritesPage } from "./pages/User/FavoritesPage";
import { OrderProvider } from "./context/OrderContext";
import { OrderHistoryPage } from "./pages/User/OrdersHistoryPage";
import { ProductDetails } from "./pages/ProductDetails";

function App() {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <AuthProvider>
          <AddressProvider>
            <OrderProvider>
              <FavoriteProvider>
                <ProductProvider>
                  <FilterProvider>
                    <CartProvider>
                      <Routes>
                        <Route element={<MainLayout />}>
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<ProductPage />} />
                          <Route path="/cart" element={<CartPage />} />
                          <Route path="/me" element={<UserPage />}>
                            <Route path="dados" element={<PersonalDetails />} />
                            <Route
                              path="favoritos"
                              element={<FavoritesPage />}
                            />
                            <Route
                              path="encomendas"
                              element={<OrderHistoryPage />}
                            />
                          </Route>
                          <Route
                            path="/products/:id"
                            element={<ProductDetails />}
                          />
                        </Route>
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/ship" element={<ShipProductPage />} />
                      </Routes>
                    </CartProvider>
                  </FilterProvider>
                </ProductProvider>
              </FavoriteProvider>
            </OrderProvider>
          </AddressProvider>
        </AuthProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
