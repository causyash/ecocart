import { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', images: [''], category: '', stock: ''
  });

  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await API.get('/products');
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to fetch products");
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({ ...formData, images: newImages });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Filter out empty image URLs
    const sanitizedData = {
      ...formData,
      images: formData.images.filter(img => img.trim() !== '')
    };

    try {
      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, sanitizedData);
        toast.success("Product updated");
      } else {
        await API.post('/products', sanitizedData);
        toast.success("Product added");
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ title: '', description: '', price: '', images: [''], category: '', stock: '' });
      fetchProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images && product.images.length > 0 ? product.images : [''],
      category: product.category,
      stock: product.stock
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await API.delete(`/products/${id}`);
        toast.success("Product deleted");
        fetchProducts();
      } catch (err) {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="admin-products">
      <div className="header-actions">
        <h1 className="page-title">Manage Products</h1>
        <button className="add-btn" onClick={() => { setEditingProduct(null); setFormData({ title: '', description: '', price: '', images: [''], category: '', stock: '' }); setShowModal(true); }}>
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td><img src={product.images?.[0] || 'https://via.placeholder.com/50'} alt={product.title} className="table-img" /></td>
                <td>{product.title}</td>
                <td>{product.category}</td>
                <td>₹{product.price}</td>
                <td>{product.stock}</td>
                <td className="actions">
                  <button onClick={() => handleEdit(product)} className="edit-btn"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(product._id)} className="delete-btn"><Trash2 size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content admin-modal">
            <div className="modal-header">
              <h2>{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
              <button onClick={() => setShowModal(false)} className="close-btn"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-sections">
                <div className="form-left">
                  <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Price (₹)</label>
                      <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                      <label>Stock</label>
                      <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select name="category" value={formData.category} onChange={handleInputChange} required>
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat._id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4"></textarea>
                  </div>
                </div>

                <div className="form-right">
                  <label>Product Images</label>
                  <div className="image-inputs">
                    {formData.images.map((img, idx) => (
                      <div key={idx} className="image-input-group">
                        <input 
                          type="text" 
                          placeholder="Image URL" 
                          value={img} 
                          onChange={(e) => handleImageChange(idx, e.target.value)} 
                        />
                        {formData.images.length > 1 && (
                          <button type="button" onClick={() => removeImageField(idx)} className="remove-img-btn">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    ))}
                    <button type="button" onClick={addImageField} className="add-img-btn">
                      <Plus size={14} /> Add Another Image
                    </button>
                  </div>

                  <div className="image-previews-container">
                    <label>Previews</label>
                    <div className="image-previews">
                      {formData.images.map((img, idx) => img && (
                        <div key={idx} className="preview-item">
                          <img src={img} alt={`Preview ${idx}`} onError={(e) => e.target.src = 'https://via.placeholder.com/100?text=Invalid+URL'} />
                        </div>
                      ))}
                      {formData.images.every(img => !img) && <p className="no-previews">No images to preview</p>}
                    </div>
                  </div>
                </div>
              </div>
              <button type="submit" className="submit-btn">{editingProduct ? 'Update Product' : 'Create Product'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );

};

export default AdminProducts;
