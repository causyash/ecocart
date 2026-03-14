import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart } = useStore();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container section center">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/products" className="link">Shop products</Link></p>
      ) : (
        <div className="cart">
          {cartItems.map(item => (
            <div className="cart-item" key={item._id}>
              <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.title} />
              <div className="details">
                <h3>{item.title}</h3>
                <p>₹{item.price.toFixed(2)}</p>
                <div className="qty">
                  <button onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}>-</button>
                  <input value={item.quantity} onChange={(e) => updateQuantity(item._id, Math.max(1, Number(e.target.value) || 1))} />
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
                </div>
              </div>
              <div className="actions">
                <button className="btn btn-outline" onClick={() => removeFromCart(item._id)}>Remove</button>
              </div>
            </div>
          ))}
          <div className="summary">
            <p>Subtotal: <strong>₹{subtotal.toFixed(2)}</strong></p>
            <button className="btn" onClick={() => navigate('/order')}>Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;


