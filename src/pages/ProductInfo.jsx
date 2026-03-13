import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import { useState } from 'react';

const ProductInfo = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="container section"><p>Loading...</p></div>;
  if (!product) return (
    <div className="container section">
      <p>Product not found.</p>
      <Link to="/products" className="btn">Back to Products</Link>
    </div>
  );

  return (
    <div className="container section">
      <div className="product-info">
        <img src={product.imageUrl} alt={product.title} />
        <div>
          <h2>{product.title}</h2>
          <p className="price">₹{product.price.toFixed(2)}</p>
          <p>{product.description}</p>
          <div className="actions">
            <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
            <Link to="/cart" className="btn btn-outline">Go to Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;


