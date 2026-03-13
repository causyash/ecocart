import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import API from '../utils/api';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';

const Auth = () => {
  const { login } = useStore();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (isSignup && !form.name)) {
      return toast.error('Please fill in required fields');
    }
    try {
      if (isSignup) {
        const { data } = await API.post('/auth/register', form);
        login(data);
        toast.success('Account created successfully');
      } else {
        const { data } = await API.post('/auth/login', { email: form.email, password: form.password });
        login(data);
        toast.success('Logged in successfully');
      }
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="container section center">
      <div className="auth">
        <h2>{isSignup ? 'Create Account' : 'Login'}</h2>
        <form className="form" onSubmit={onSubmit}>
          {isSignup && (
            <label>
              Name
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </label>
          )}
          <label>
            Email
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </label>
          <label className="password-label">
            Password
            <div className="password-input-wrapper">
              <input 
                type={showPassword ? "text" : "password"} 
                value={form.password} 
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
              />
              <button 
                type="button" 
                className="password-toggle" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </label>
          <button className="btn" type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
        </form>
        <button className="link" type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? 'Have an account? Login' : "Don't have an account? Sign up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;


