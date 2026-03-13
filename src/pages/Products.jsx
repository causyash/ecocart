import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';

const CATEGORY_OPTIONS = ['All products', 'Bags', 'Towels', 'Bottles'];

const Products = () => {
  const { products, setProducts } = useStore();
  const [category, setCategory] = useState('All products');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get('/products');
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const filtered = useMemo(() => {
    if (category === 'All products') return products;
    return products.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  }, [products, category]);

  return (
    <div className="container section">
      <h2>Products</h2>

      <div className="filter-bar">
        <label className="filter">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </label>
      </div>

      <div className="grid">
        {filtered.map(p => (<ProductCard key={p._id} product={p} />))}
      </div>
    </div>
  );
};

export default Products;


