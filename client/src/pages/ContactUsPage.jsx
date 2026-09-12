import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, CheckCircle, Clock, Shield } from 'lucide-react';
import { API_BASE_URL } from '../config';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: 'Premium Websites', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', service: 'Premium Websites', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', fontFamily: 'var(--font-body)' }}>
      {/* Header Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--glass-border)',
        padding: '16px 8%'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0f172a', textDecoration: 'none', fontWeight: '600', fontSize: '0.9rem' }}>
            <ArrowLeft size={18} /> Back to Aparous
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="text-gradient" style={{ fontFamily: 'var(--font-head)', fontSize: '1.25rem', fontWeight: '800' }}>APAROUS</span>
            <span style={{ fontSize: '0.55rem', background: 'var(--accent-purple)', color: '#fff', padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solutions</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 8% 80px 8%' }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124, 58, 237, 0.08)', padding: '6px 16px', borderRadius: '20px', color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '15px' }}>
            <Mail size={14} /> Get In Touch
          </div>
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
            Contact Aparous Solutions
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: '600px', margin: '0 auto' }}>
            Have a project in mind or need assistance with your digital services? Reach out to our team directly.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
          {/* Contact Details Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>
                Corporate Contact Details
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Physical Office Address</span>
                    <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '600', margin: '4px 0 0 0', lineHeight: '1.5' }}>
                      Anantapur, Andhra Pradesh, India - 515004
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Support Email</span>
                    <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '600', margin: '4px 0 0 0' }}>
                      <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>aparous.solutions@gmail.com</a>
                    </p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                      <a href="mailto:support@aparous.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>support@aparous.com</a>
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(217, 70, 239, 0.08)', color: 'var(--accent-magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Direct Telephone</span>
                    <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '600', margin: '4px 0 0 0' }}>
                      +91 9849836092
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.08)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '600' }}>Business Working Hours</span>
                    <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '600', margin: '4px 0 0 0' }}>
                      Monday – Saturday: 9:00 AM – 7:00 PM (IST)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'rgba(124, 58, 237, 0.04)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(124, 58, 237, 0.12)', fontSize: '0.85rem', color: 'var(--text-normal)', lineHeight: '1.6' }}>
              <strong>Business Legal Name:</strong> Aparous Solutions<br />
              <strong>Founder / Owner:</strong> Mohammad Sabeel<br />
              <strong>Merchant Country:</strong> India (Andhra Pradesh)
            </div>
          </div>

          {/* Interactive Direct Message Form */}
          <div className="glass-panel" style={{ padding: '35px', background: '#ffffff', borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '20px' }}>
              Send Direct Inquiry
            </h3>

            {submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle size={50} color="var(--accent-purple)" style={{ marginBottom: '15px' }} />
                <h4 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '10px' }}>Message Delivered!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Thank you for reaching out. Our team will respond to your email within 24 business hours.
                </p>
                <button onClick={() => setSubmitStatus(null)} className="btn-secondary" style={{ marginTop: '20px', padding: '8px 20px', fontSize: '0.85rem' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: '#0f172a' }}>Full Name *</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="glass-input" placeholder="e.g. Rahul Sharma" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: '#0f172a' }}>Email Address *</label>
                  <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="glass-input" placeholder="e.g. rahul@example.com" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: '#0f172a' }}>Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="glass-input" placeholder="e.g. +91 9876543210" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: '#0f172a' }}>Subject / Service Inquired</label>
                  <select name="service" value={formData.service} onChange={handleInputChange} className="glass-input" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }}>
                    <option value="Premium Websites">Premium Websites</option>
                    <option value="AI Automation">AI Automation & Chatbots</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="General Inquiry">General Merchant Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '6px', color: '#0f172a' }}>Message Details *</label>
                  <textarea name="message" required rows="4" value={formData.message} onChange={handleInputChange} className="glass-input" placeholder="How can Aparous Solutions assist you today?..." style={{ resize: 'none', background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }}></textarea>
                </div>

                {submitStatus === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>Failed to submit. Please email us directly at aparous.solutions@gmail.com</p>
                )}

                <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ marginTop: '5px', justifyContent: 'center' }}>
                  {isSubmitting ? 'Sending Message...' : 'Send Message'} <Send size={15} />
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '30px 8%', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Aparous Solutions. All rights reserved. Registered Office: Anantapur, Andhra Pradesh, India - 515004.
      </footer>
    </div>
  );
}
