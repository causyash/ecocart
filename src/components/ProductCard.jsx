import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useStore();

  return (
    <div className="card">
      <img src={product.images?.[0] || 'https://via.placeholder.com/300'} alt={product.title} className="card-img" />

      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">₹{product.price.toFixed(2)}</p>
        <p className="card-desc">{product.description?.substring(0, 50)}...</p>
        <div className="card-actions">
          <button className="btn" onClick={() => addToCart(product)}>Add to Cart</button>
          <Link to={`/products/${product._id}`} className="btn btn-outline">View</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;


