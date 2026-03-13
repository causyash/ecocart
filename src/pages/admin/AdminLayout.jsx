import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { LayoutDashboard, ShoppingBag, Package, Users, LogOut } from 'lucide-react';

const AdminLayout = () => {
  const { user, logout } = useStore();

  if (!user || user.role !== 'admin') {
    return <Navigate to="/auth" />;
  }

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <h2>Admin Panel</h2>
        </div>
        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Package size={20} />
            <span>Products</span>
          </NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <ShoppingBag size={20} />
            <span>Orders</span>
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <Users size={20} />
            <span>Users</span>
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
      <main className="admin-content">
        <header className="admin-header">
          <div className="header-user">
            <span>Welcome, <strong>{user.name}</strong></span>
          </div>
        </header>
        <div className="admin-body">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
