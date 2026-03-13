import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Navbar = () => {
  const { cartItems, user, logout } = useStore();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="navbar">
      <div className="container nav-content">
        <Link to="/" className="logo">EcoCart</Link>
        <nav className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/cart">Cart ({cartCount})</NavLink>
          {user ? (
            <>
              {user.role === 'admin' && <NavLink to="/admin" className="admin-link">Admin</NavLink>}
              <button className="btn btn-outline" onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink to="/auth" className="btn btn-outline">Login</NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;


