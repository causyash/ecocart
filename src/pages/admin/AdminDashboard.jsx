import { useEffect, useState } from 'react';
import API from '../../utils/api';
import { ShoppingBag, Package, Users, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, orderRes, userRes] = await Promise.all([
          API.get('/products'),
          API.get('/orders'),
          API.get('/users')
        ]);
        
        const totalRevenue = orderRes.data.reduce((acc, order) => acc + (order.totalAmount || 0), 0);

        setStats({
          products: prodRes.data.length,
          orders: orderRes.data.length,
          users: userRes.data.length,
          revenue: totalRevenue
        });
      } catch (error) {
        console.error("Error fetching stats", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <h1 className="page-title">Dashboard Overview</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon products"><Package size={24} /></div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <p>{stats.products}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orders"><ShoppingBag size={24} /></div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <p>{stats.orders}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon users"><Users size={24} /></div>
          <div className="stat-info">
            <h3>Total Users</h3>
            <p>{stats.users}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon revenue"><DollarSign size={24} /></div>
          <div className="stat-info">
            <h3>Total Revenue</h3>
            <p>₹{stats.revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="recent-activity">
        <h2>Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/admin/products" className="action-card">
            <Package size={24} />
            Add New Product
          </Link>
          <Link to="/admin/orders" className="action-card">
            <ShoppingBag size={24} />
            Review Orders
          </Link>
          <Link to="/admin/users" className="action-card">
            <Users size={24} />
            Manage Team
          </Link>
        </div>
      </div>
    </div>
  );
};


export default AdminDashboard;
