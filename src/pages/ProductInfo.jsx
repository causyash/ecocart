import { useParams, Link } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import { useState } from 'react';

const ProductInfo = () => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);
        if (data.images && data.images.length > 0) {
          setMainImage(data.images[0]);
        }
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
        <div className="product-gallery">
          <div className="main-image">
            <img src={mainImage || product.images?.[0] || 'https://via.placeholder.com/600'} alt={product.title} />
          </div>
          {product.images?.length > 1 && (
            <div className="thumbnails">
              {product.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`thumbnail ${mainImage === img ? 'active' : ''}`}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt={`thumbnail ${idx}`} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="product-details">
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


