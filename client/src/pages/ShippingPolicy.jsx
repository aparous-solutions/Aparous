import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, Mail, Phone, MapPin, CheckCircle, Globe } from 'lucide-react';

export default function ShippingPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 8% 80px 8%' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(124, 58, 237, 0.08)', padding: '6px 16px', borderRadius: '20px', color: 'var(--accent-purple)', fontSize: '0.8rem', fontWeight: '600', marginBottom: '20px' }}>
          <Truck size={14} /> Digital Shipping & Delivery Policy
        </div>

        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
          Shipping & Digital Delivery Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '40px' }}>
          Last Updated: September 12, 2026 • Effective Date: January 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: '1.7', color: 'var(--text-normal)', fontSize: '0.95rem' }}>
          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>1. Nature of Products & Digital Delivery</h2>
            <p>
              <strong>Aparous Solutions</strong> specializes exclusively in custom web development, AI automation workflows, UI/UX design, and digital software engineering services. We do <strong>NOT</strong> sell or ship physical tangible products. All deliverables are transmitted digitally over secure online channels.
            </p>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>2. Digital Fulfillment Timeline</h2>
            <p style={{ marginBottom: '12px' }}>
              Upon successful payment authorization via Razorpay, digital project onboarding begins immediately:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <strong>Order Confirmation & Onboarding:</strong> Sent via email within <strong>24 hours</strong> of order authorization.
              </li>
              <li>
                <strong>Starter Web Packages:</strong> Digital delivery completed within <strong>5 to 7 business days</strong>.
              </li>
              <li>
                <strong>Professional AI & Full-Stack Projects:</strong> Digital delivery completed within <strong>7 to 14 business days</strong> (or per agreed project milestones).
              </li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>3. Methods of Digital Delivery</h2>
            <p style={{ marginBottom: '12px' }}>Deliverables are transferred directly to clients through the following secure digital mechanisms:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <Globe size={20} color="var(--accent-purple)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Live Web Deployment</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Direct deployment to client custom domains or cloud servers (Vercel, AWS, Hostinger).</p>
              </div>
              <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <CheckCircle size={20} color="var(--accent-cyan)" style={{ marginBottom: '8px' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>Source Code Repositories</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Granting private GitHub / GitLab access or direct zip package transfers.</p>
              </div>
            </div>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>4. Customer Delivery Assistance & Inquiries</h2>
            <p style={{ marginBottom: '15px' }}>
              If you experience any delay in receiving project onboarding links, source code access, or project milestone updates, please contact our support desk immediately:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(124, 58, 237, 0.04)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(124, 58, 237, 0.12)' }}>
              <div><strong>Business Name:</strong> Aparous Solutions</div>
              <div><strong>Owner / Founder:</strong> Mohammed Aadil</div>
              <div><strong>Support Email:</strong> <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)' }}>aparous.solutions@gmail.com</a> / <a href="mailto:support@aparous.com" style={{ color: 'var(--accent-purple)' }}>support@aparous.com</a></div>
              <div><strong>Direct Phone:</strong> +91 9849836092</div>
              <div><strong>Registered Office:</strong> Hyderabad, Telangana, India - 500008</div>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '30px 8%', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Aparous Solutions. All rights reserved.
      </footer>
    </div>
  );
}
