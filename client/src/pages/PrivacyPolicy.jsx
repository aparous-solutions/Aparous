import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Mail, Phone, MapPin } from 'lucide-react';

export default function PrivacyPolicy() {
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
          <Shield size={14} /> Official Policy
        </div>

        <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: '800', marginBottom: '10px', color: '#0f172a' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '40px' }}>
          Last Updated: September 12, 2026 • Effective Date: January 1, 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', lineHeight: '1.7', color: 'var(--text-normal)', fontSize: '0.95rem' }}>
          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>1. Overview & Commitment</h2>
            <p>
              At <strong>Aparous Solutions</strong> ("we", "our", "us"), accessible from <a href="https://aparoussolutions.dev" style={{ color: 'var(--accent-purple)', fontWeight: '600' }}>https://aparoussolutions.dev</a>, protecting your personal privacy and business information is our fundamental commitment. This Privacy Policy details how we collect, process, store, and safeguard customer data when you interact with our website, request project proposals, or process payments via our integrated payment gateways (including Razorpay).
            </p>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>2. Information We Collect</h2>
            <p style={{ marginBottom: '10px' }}>We collect information directly provided by clients during scoping, ordering, or consultation inquiries:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Contact Information:</strong> Full name, corporate email address, contact phone number, and physical office address.</li>
              <li><strong>Project Details:</strong> Business requirements, feature specifications, timeline expectations, and budget allocations.</li>
              <li><strong>Payment Metadata:</strong> Transaction reference IDs, order numbers, and payment status collected securely via payment partners (Razorpay). <em>Note: We do NOT store credit card numbers, CVVs, or net banking credentials on our servers. All financial transactions are encrypted and processed by PCI-DSS compliant partners.</em></li>
              <li><strong>Technical Data:</strong> IP addresses, browser types, device identifiers, and page visit analytics collected automatically for performance optimization.</li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>3. How We Use Your Information</h2>
            <p style={{ marginBottom: '10px' }}>Collected information is strictly utilized to:</p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Deliver custom web development, AI automation, and UI/UX design deliverables.</li>
              <li>Process service invoices, retainer deposits, and package order transactions via Razorpay.</li>
              <li>Communicate project updates, milestones, technical deliverables, and post-launch hyper-care support.</li>
              <li>Maintain database security, combat fraudulent transactions, and meet statutory accounting regulations.</li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>4. Third-Party Data Sharing & Security</h2>
            <p style={{ marginBottom: '12px' }}>
              We do <strong>NOT</strong> sell, rent, trade, or monetize client data under any circumstances. Data is shared exclusively with necessary service providers:
            </p>
            <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Razorpay Software Private Limited:</strong> To securely initiate, authorize, and verify digital payment transactions.</li>
              <li><strong>Cloud Infrastructure Providers (Vercel, MongoDB Atlas):</strong> For secure hosting and encrypted database storage.</li>
            </ul>
          </section>

          <section className="glass-panel" style={{ padding: '30px', background: '#ffffff', borderRadius: '14px' }}>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)' }}>5. Customer Rights & Contact Details</h2>
            <p style={{ marginBottom: '15px' }}>
              Clients hold full rights to request access, correction, or deletion of their personal data stored in our CRM system. For any privacy queries or compliance requests, reach out directly:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(124, 58, 237, 0.04)', padding: '20px', borderRadius: '10px', border: '1px solid rgba(124, 58, 237, 0.12)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} color="var(--accent-purple)" />
                <span><strong>Support Email:</strong> <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)' }}>aparous.solutions@gmail.com</a> / <a href="mailto:support@aparous.com" style={{ color: 'var(--accent-purple)' }}>support@aparous.com</a></span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={16} color="var(--accent-cyan)" />
                <span><strong>Direct Line:</strong> +91 9849836092</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={16} color="var(--accent-magenta)" />
                <span><strong>Registered Office:</strong> Anantapur, Andhra Pradesh, India - 515004</span>
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* Simple Legal Footer */}
      <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '30px 8%', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} Aparous Solutions. All rights reserved.
      </footer>
    </div>
  );
}
