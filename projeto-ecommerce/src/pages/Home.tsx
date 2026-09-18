import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Home = () => {
  const { user, logout } = useAuth();

  return (
    <>
      {user ? <h1>{user.username}</h1> : null}

      <Link to="/register">Register</Link>
      <Link to="/products">Produtos</Link>
      <Link to="/cart">Cart</Link>
      <button onClick={logout}>Logout</button>
    </>
  );
};
