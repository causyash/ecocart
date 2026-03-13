import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const { products, setProducts } = useStore();

  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length === 0) {
        try {
          const { data } = await API.get('/products');
          setProducts(data);
        } catch (err) {
          console.error("Failed to fetch products", err);
        }
      }
    };
    fetchProducts();
  }, [products, setProducts]);

  const featured = products.slice(0, 3);

  return (
    <div className="container">
      <section className="banner">
        <div className="banner-content">
          <h1>Shop Green. Live Clean.</h1>
          <p>Eco-friendly essentials for a sustainable lifestyle.</p>
          <Link className="btn" to="/products">Shop Now</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <h2>Featured Products</h2>
          <Link to="/products" className="link">View all</Link>
        </div>
        <div className="grid">
          {featured.map(p => (<ProductCard key={p._id} product={p} />))}
        </div>
      </section>
    </div>
  );
};

export default Home;


