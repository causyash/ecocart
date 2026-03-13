import { useState } from 'react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return alert('Please fill in all fields');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="container section center contact-page">
        <h2>Thank you!</h2>
        <p>Your message has been received. We'll get back to you soon.</p>
      </div>
    );
  }

  return (
    <div className="container section center contact-page">
      <h2>Contact Us</h2>
      <form className="form" onSubmit={onSubmit}>
        <label>
          Name
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </label>
        <label>
          Email
          <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
        <label>
          Message
          <textarea rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </label>
        <button className="btn" type="submit">Send</button>
      </form>
    </div>
  );
};

export default Contact;


