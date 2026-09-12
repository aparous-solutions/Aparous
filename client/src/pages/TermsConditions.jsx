import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mail, Phone, MapPin } from 'lucide-react';

export default function TermsConditions() {
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
          <FileText size={14} /> Official Terms
        </div>

        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
          Terms & Conditions
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '40px' }}>
          Last Updated: September 12, 2026 • Effective Date: January 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: '1.7', color: 'var(--text-normal)', fontSize: '0.95rem' }}>
          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>1. Acceptance of Terms</h2>
            <p>
              By accessing our website (<a href="https://aparoussolutions.dev" style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>https://aparoussolutions.dev</a>), submitting project requirements, or purchasing service packages/retainers through <strong>Aparous Solutions</strong>, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services or website.
            </p>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>2. Services & Scope</h2>
            <p style={{ marginBottom: '10px' }}>Aparous Solutions provides specialized digital software services, including:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Custom React & Full-Stack Web Development</li>
              <li>AI Automations, Chatbots & LLM Integrations</li>
              <li>UI/UX Experience Design & Brand Architecture</li>
              <li>Ongoing Technical Retainers & Server Maintenance</li>
            </ul>
            <p style={{ marginTop: '10px' }}>
              All project deliverables, timelines, and payment milestones are governed by agreed project scopes or digital package parameters displayed during order checkout.
            </p>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>3. Payment Terms & Razorpay Gateway</h2>
            <p style={{ marginBottom: '10px' }}>
              Payments for service packages, deposits, or milestones are processed digitally via Razorpay Payment Gateway.
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>All pricing listed on the website is transparent and specified in INR (₹) and USD ($).</li>
              <li>Payments must be cleared according to the package terms or project milestone agreements prior to final production source code delivery.</li>
              <li>Invoices and transaction receipts are generated automatically and sent to the client's corporate email upon successful authorization by Razorpay.</li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>4. Intellectual Property Rights</h2>
            <p>
              Upon 100% full payment settlement of project fees, client retains full ownership rights to custom source code, graphics, and digital assets crafted specifically for their project. Aparous Solutions retains ownership of proprietary agency starter frameworks, pre-existing tools, and generalized AI model components utilized across projects.
            </p>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>5. Governing Law & Contact Details</h2>
            <p style={{ marginBottom: '15px' }}>
              These terms shall be governed by and construed in accordance with the laws of India. Legal disputes are subject to the exclusive jurisdiction of the courts in Anantapur, Andhra Pradesh, India.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(124, 58, 237, 0.04)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(124, 58, 237, 0.12)' }}>
              <div><strong>Business Name:</strong> Aparous Solutions</div>
              <div><strong>Owner / Founder:</strong> Mohammad Sabeel</div>
              <div><strong>Support Email:</strong> <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)' }}>aparous.solutions@gmail.com</a></div>
              <div><strong>Phone Number:</strong> +91 9849836092</div>
              <div><strong>Physical Address:</strong> Anantapur, Andhra Pradesh, India - 515004</div>
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
