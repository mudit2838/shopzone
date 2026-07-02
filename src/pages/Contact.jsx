import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="contact-page">
      <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Get in Touch</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        Have questions? We'd love to hear from you. Send us a message below.
      </p>

      <div className="contact-container">
        {submitted && (
          <div className="contact-success" id="contact-success-msg">
            <h4>Thank You!</h4>
            <p>Your message has been received. We'll get back to you shortly.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} id="contact-form">
          <div className="form-group">
            <label htmlFor="contact-name" className="form-label">Full Name</label>
            <input
              type="text"
              id="contact-name"
              name="name"
              className="form-input"
              placeholder="mudit kumar"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-email" className="form-label">Email Address</label>
            <input
              type="email"
              id="contact-email"
              name="email"
              className="form-input"
              placeholder="xyz@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact-message" className="form-label">Message</label>
            <textarea
              id="contact-message"
              name="message"
              className="form-input"
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} id="contact-submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
