import { useEffect, useMemo, useState } from 'react';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import ProductCard from '../components/ProductCard';


const Products = () => {
  const { products, setProducts } = useStore();
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('All products');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          API.get('/products'),
          API.get('/categories')
        ]);
        setProducts(prodRes.data);
        setCategories(catRes.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    fetchData();
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
            <option value="All products">All products</option>
            {categories.map(cat => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
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


