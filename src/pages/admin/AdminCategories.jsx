import { useEffect, useState } from 'react';
import API from '../../utils/api';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import { toast } from 'react-toastify';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '', description: '', image: ''
  });

  const fetchCategories = async () => {
    try {
      const res = await API.get('/categories');
      setCategories(res.data);
    } catch (err) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await API.put(`/categories/${editingCategory._id}`, formData);
        toast.success("Category updated");
      } else {
        await API.post('/categories', formData);
        toast.success("Category added");
      }
      setShowModal(false);
      setEditingCategory(null);
      setFormData({ name: '', description: '', image: '' });
      fetchCategories();
    } catch (err) {
      toast.error(err.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await API.delete(`/categories/${id}`);
        toast.success("Category deleted");
        fetchCategories();
      } catch (err) {
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className="admin-products">
      <div className="header-actions">
        <h1 className="page-title">Manage Categories</h1>
        <button className="add-btn" onClick={() => { setEditingCategory(null); setFormData({ name: '', description: '', image: '' }); setShowModal(true); }}>
          <Plus size={20} /> Add Category
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category._id}>
                <td><img src={category.image || 'https://via.placeholder.com/50'} alt={category.name} className="table-img" /></td>
                <td>{category.name}</td>
                <td>{category.description?.substring(0, 50)}...</td>
                <td className="actions">
                  <button onClick={() => handleEdit(category)} className="edit-btn"><Edit size={16} /></button>
                  <button onClick={() => handleDelete(category._id)} className="delete-btn"><Trash2 size={16} /></button>
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
              <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
              <button onClick={() => setShowModal(false)} className="close-btn"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4"></textarea>
              </div>
              <div className="form-group">
                <label>Image URL</label>
                <input type="text" name="image" value={formData.image} onChange={handleInputChange} />
              </div>
              {formData.image && (
                <div className="preview-item" style={{ marginTop: '10px' }}>
                  <img src={formData.image} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }} />
                </div>
              )}
              <button type="submit" className="submit-btn">{editingCategory ? 'Update Category' : 'Create Category'}</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
