import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import { toast } from 'react-toastify';

const Order = () => {
  const { cartItems, clearCart, user } = useStore();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 4.99 : 0;
  const total = subtotal + shipping;

  const placeOrder = async () => {
    if (!user) {
      toast.error("Please login to place an order");
      return navigate('/auth');
    }
    try {
      const orderData = {
        products: cartItems.map(item => ({ product: item._id, quantity: item.quantity })),
        totalAmount: total,
        address: "Sample Address" // For now, could add input later
      };
      await API.post('/orders', orderData);
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/');
    } catch (err) {
      toast.error('Failed to place order');
    }
  };

  return (
    <div className="container section">
      <h2>Order Summary</h2>
      {cartItems.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <div className="order">
          <div className="items">
            {cartItems.map(item => (
              <div key={item._id} className="order-item">
                <span>{item.title} × {item.quantity}</span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="totals">
            <div><span>Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            <div><span>Shipping</span><span>₹{shipping.toFixed(2)}</span></div>
            <div className="total"><span>Total</span><span>₹{total.toFixed(2)}</span></div>
            {!user && <p className="muted">Tip: Login for a faster checkout.</p>}
            <button className="btn" onClick={placeOrder}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;


