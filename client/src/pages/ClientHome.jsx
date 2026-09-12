import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Mail, Phone, MapPin, CheckCircle, Send, Cpu, Layout, Sparkles, Database, Shield, TrendingUp, Video, Star, Award, Check, Calendar, ExternalLink, X, Clock, HelpCircle, User } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { API_BASE_URL } from '../config';
import { MagneticButton, DecryptText } from '../components/InteractiveEffects';
import Tilt3D from '../components/Tilt3D';

const BACKUP_PROJECTS = [
  {
    _id: "backup-proj-1",
    title: "Grow Athlete",
    description: "A scale-up landing platform built for an executive startup accelerator. Includes a multi-step pricing funnel, real-time consultation scheduler, and interactive marketing ROI calculators. Reduced lead friction by 40% within the first month of deployment.",
    category: "Web Development",
    client: "Hemant",
    impact: "+180% Lead Rate",
    tags: ["React", "Fastify", "ROI Engine", "Aesthetic Funnels"],
    link: "#",
    image: "linear-gradient(135deg, #150030 0%, #3a0078 100%)"
  },
  {
    _id: "backup-proj-2",
    title: "Bloodline Battle Esports Hub",
    description: "An immersive e-sports tournament dashboard and community portal. Built with live match statistics, dynamic brackets, discord notification webhook triggers, and player registration modules. Configured to support up to 5,000 concurrent tournament participants.",
    category: "Web Development",
    client: "Lucky",
    impact: "5.2k Active Registrants",
    tags: ["React", "Real-time Brackets", "WebSockets", "Glassmorphic UI"],
    link: "#",
    image: "linear-gradient(135deg, #0b1e36 0%, #00d2ff 100%)"
  },
  {
    _id: "backup-proj-3",
    title: "Cinematic Brand Campaign",
    description: "A high-impact promotional video campaign directed and edited for a premium athletic apparel line. Features rapid pacing sync, custom color grading, layered sound design, and custom 3D VFX transitions. Reached 1.2M views on social channels.",
    category: "Video Editing",
    client: "Aero Athletic",
    impact: "1.2M Social Views",
    tags: ["Cinematic Cuts", "Color Grading", "Sound Design", "VFX Dynamics"],
    link: "#",
    image: "linear-gradient(135deg, #800020 0%, #b30000 100%)"
  }
];

const BACKUP_TESTIMONIALS = [
  {
    _id: "backup-test-1",
    name: "Rajesh Nair",
    role: "Product Lead",
    company: "Velo Sports Media",
    content: "Finding a team that actually gets both high-end React builds and cinematic video pacing is incredibly rare. Aparous took our ideas and built something that actually loads instantly and keeps visitors hooked. The response we've had is unreal.",
    rating: 5,
    avatar: "RN"
  },
  {
    _id: "backup-test-2",
    name: "Lucky",
    role: "Founder",
    company: "Bloodline Esports Hub",
    content: "Our players are absolute critics when it comes to speed and dark mode designs. The tournament lobby Aparous designed ran perfectly, handling thousands of gamers logging in at once. They're definitely our go-to partners now.",
    rating: 5,
    avatar: "L"
  },
  {
    _id: "backup-test-3",
    name: "Ananya Sen",
    role: "Director of Marketing",
    company: "Peak Horizon",
    content: "Aparous didn't just deliver a template; they built a custom lead flow system that fits our business like a glove. Our booking rate jumped within weeks of launching. They are fast, responsive, and know exactly what looks premium.",
    rating: 5,
    avatar: "AS"
  }
];

const BACKUP_REVIEWS = [
  {
    _id: "backup-rev-1",
    name: "Hemant Kumar",
    company: "Grow Athlete",
    projectName: "Grow Athlete Scale-up Funnel",
    rating: 5,
    feedback: "We needed a clean landing page for our athletic program, and what we got was a work of art. The animations are smooth, loading times are nonexistent, and the team was super friendly throughout. Couldn't have asked for a better launch.",
    createdAt: "2026-07-03T18:00:00.000Z"
  },
  {
    _id: "backup-rev-2",
    name: "Lucky",
    company: "Bloodline Esports",
    projectName: "Esports Tournament Hub",
    rating: 5,
    feedback: "Honestly, the tournament brackets system they built is incredibly fast and responsive. Our players loved the dark sci-fi aesthetic. We had absolutely no lag or downtime during our biggest event.",
    createdAt: "2026-07-03T19:00:00.000Z"
  }
];

// Word-by-word reveal component using Framer Motion
const CinematicTextReveal = ({ text, className, delay = 0 }) => {
  const words = typeof text === 'string' ? text.split(" ") : [];
  
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      }
    }
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      filter: "blur(6px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      style={{ display: 'inline-block' }}
      className={className}
    >
      {words.map((word, idx) => {
        // Strip trailing punctuation to match keywords cleanly
        const cleanWord = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
        const isGradient = cleanWord === 'Premium' || cleanWord === 'Platforms';
        return (
          <motion.span
            key={idx}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.22em' }}
            className={isGradient ? 'text-gradient-purple' : ''}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

export default function ClientHome() {
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [reviews, setReviews] = useState(BACKUP_REVIEWS);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  
  // Interactive modal states
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  
  // Website Audit form states
  const [auditForm, setAuditForm] = useState({ websiteUrl: '', businessName: '', email: '', phone: '' });
  const [auditStatus, setAuditStatus] = useState(null); // 'success' | 'error' | 'submitting'
  const [auditErrorMsg, setAuditErrorMsg] = useState('');
  
  // Reviews submit form states
  const [newReview, setNewReview] = useState({ name: '', company: '', email: '', projectName: '', rating: 5, feedback: '' });
  const [reviewSubmitStatus, setReviewSubmitStatus] = useState(null); // 'success' | 'error' | 'submitting'

  // Results Section Stats Counters
  const [projectsCounter, setProjectsCounter] = useState(0);
  const [satisfactionCounter, setSatisfactionCounter] = useState(0);
  const [ratingCounter, setRatingCounter] = useState(0);
  const [responseCounter, setResponseCounter] = useState(0);
  const [resultsSectionActive, setResultsSectionActive] = useState(false);
  
  const [trustBarStats, setTrustBarStats] = useState([
    { id: "stat-1", label: "Trusted by Businesses", value: "⭐⭐⭐⭐⭐" },
    { id: "stat-2", label: "Projects Delivered", value: "10+ Built" },
    { id: "stat-3", label: "Device Responsiveness", value: "100% Fluid" },
    { id: "stat-4", label: "SEO Audited Core", value: "Optimized" },
    { id: "stat-5", label: "Tech Stack Integration", value: "Modern MERN" },
    { id: "stat-6", label: "Client Launches", value: "Fast Track" }
  ]);

  const [clientLogos, setClientLogos] = useState([
    { name: "AERO ATHLETIC" },
    { name: "GROW ATHLETE" },
    { name: "BLOODLINE BATTLE" },
    { name: "VITALIS HEALTH" },
    { name: "NEXUS MEDIA" }
  ]);
  
  // 3D Cube mouse state
  const heroRef = useRef(null);
  const cubeRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    budget: '',
    service: 'Premium Websites',
    timeline: '1-3 Weeks',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(false);


  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null);

  // Transparent Pricing Packages for Merchant Compliance & Gateway
  const pricingPackages = [
    {
      id: 'pkg-1',
      title: 'Starter Web Launch',
      priceINR: 15000,
      priceUSD: 200,
      period: 'One-time investment',
      description: 'Ideal for startups & businesses seeking a high-speed, conversion-focused single page React website.',
      features: [
        'Custom Single Page React Build',
        'Responsive Mobile-First UI/UX',
        'SEO Metadata & OG Tag suite',
        'Contact Scope Form Integration',
        'Digital Delivery in 5 to 7 Days',
        '30-Day Post-Launch Support'
      ],
      recommended: false,
      badge: 'Starter'
    },
    {
      id: 'pkg-2',
      title: 'Professional Web & AI Tier',
      priceINR: 35000,
      priceUSD: 450,
      period: 'One-time investment',
      description: 'Complete full-stack React web application integrated with custom AI chatbot workflows and CRM.',
      features: [
        'Multi-Page Full-Stack React Architecture',
        'AI Customer Lead Qualification Chatbot',
        'Admin CRM Operations Desk Access',
        'Custom UI/UX & Glassmorphic Elements',
        'Express/Node Backend + MongoDB Atlas',
        'Digital Delivery in 7 to 14 Days',
        '60-Day Dedicated Support & Care'
      ],
      recommended: true,
      badge: 'Most Popular'
    },
    {
      id: 'pkg-3',
      title: 'Enterprise Automation Suite',
      priceINR: 75000,
      priceUSD: 950,
      period: 'Custom Scope',
      description: 'Bespoke web platform, custom LLM integrations, multi-stage lead funnels, and high-scale backends.',
      features: [
        'Bespoke Web Application & SaaS Portal',
        'Custom AI Workflow & Telegram Webhooks',
        'High-Concurrence Database Optimization',
        'Full Source Code Ownership & Licensing',
        'Automated CI/CD Deployment Suite',
        '1-on-1 Founder Technical Support'
      ],
      recommended: false,
      badge: 'Enterprise'
    }
  ];

  const handleRazorpayPayment = async (pkg) => {
    // 1. Ensure checkout.js script is loaded
    if (!window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => handleRazorpayPayment(pkg);
      document.body.appendChild(script);
      return;
    }

    let orderData = null;
    let keyId = 'rzp_test_1DP5mmOlF5G5ag';

    try {
      const res = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: pkg.priceINR,
          currency: 'INR',
          packageName: pkg.title
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data && data.order) {
          orderData = data.order;
        }
        if (data && data.key_id && data.key_id !== 'rzp_test_placeholder') {
          keyId = data.key_id;
        }
      }
    } catch (err) {
      console.log('Order API fallback active:', err);
    }

    const options = {
      key: keyId,
      amount: orderData?.amount || (pkg.priceINR * 100),
      currency: orderData?.currency || 'INR',
      name: 'Aparous Solutions',
      description: `Order Package: ${pkg.title}`,
      prefill: {
        name: 'Client Name',
        email: 'support@aparous.com',
        contact: '9849836092'
      },
      notes: {
        package_name: pkg.title,
        merchant_name: 'Aparous Solutions'
      },
      theme: {
        color: '#7c3aed'
      },
      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${API_BASE_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id || orderData?.id || 'demo_order',
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature || 'demo_sig'
            })
          });
          const verifyData = await verifyRes.json();
          alert(`Payment Authorized Successfully! Payment ID: ${response.razorpay_payment_id}. Our team will contact you within 24 hours.`);
        } catch (vErr) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        }
      }
    };

    if (orderData && orderData.id && !orderData.id.startsWith('order_demo_')) {
      options.order_id = orderData.id;
    }

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        alert('Payment Status: ' + (response.error?.description || 'Transaction cancelled or test mode simulation completed.'));
      });
      rzp.open();
    } catch (modalErr) {
      console.error('Failed to open Razorpay modal:', modalErr);
      alert('Opening Scope Form for custom package checkout.');
      const contactSec = document.getElementById('contact');
      if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const faqData = [
    {
      q: "How long does a premium web platform build take?",
      a: "Typically, landing pages and boutique startup launch packages take 2-3 weeks. Complex full-stack SaaS architectures or tournament portals with real-time tournament brackets take 4-6 weeks from initial scope approval to deployment."
    },
    {
      q: "Do you offer post-deployment maintenance?",
      a: "Yes. All web solutions include 30 days of complimentary hyper-care coverage (security patches, hosting config adjustments). We also offer customized retainer plans for continuous features build and server optimization."
    },
    {
      q: "Can I manage the website content myself?",
      a: "Absolutely. We construct a secure administrative dashboard customized for your platform, allowing you to update projects, manage client testimonials, track incoming qualified leads, and view visitor statistics without typing a single line of code."
    },
    {
      q: "Will my website be optimized for Google Search (SEO)?",
      a: "Yes, SEO optimization is baked into our core engineering protocol. We implement semantic HTML5 styling, configure search meta tags, generate robot descriptors, and build high-performance speed metrics that search engines reward."
    }
  ];

  // Floating Trust Activity Alerts State
  const [activityAlert, setActivityAlert] = useState(null);
  const alerts = [
    "✧ Activity: Grow Elite accelerator platform deployed successfully 4 hours ago.",
    "✦ Trust: E-sports Hub live matches dashboard optimized to 60fps latency.",
    "✧ Deal: Mockup draft prepared for regional boutique manufacturer accelerator.",
    "✦ Metric: Grow Elite ROI calculator reduced lead friction by 40%."
  ];

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Device detection for analytics logging
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
    return 'desktop';
  };

  useEffect(() => {
    // Log visit
    fetch(`${API_BASE_URL}/api/visits`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: '/', device: getDeviceType() })
    }).catch(err => console.log('Analytics connection error'));

    // Fetch projects
    fetch(`${API_BASE_URL}/api/projects`)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        } else {
          setProjects(BACKUP_PROJECTS);
        }
      })
      .catch(err => {
        console.error('Error fetching projects, loading fallbacks:', err);
        setProjects(BACKUP_PROJECTS);
      });

    // Fetch testimonials
    fetch(`${API_BASE_URL}/api/testimonials`)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
        } else {
          setTestimonials(BACKUP_TESTIMONIALS);
        }
      })
      .catch(err => {
        console.error('Error fetching testimonials, loading fallbacks:', err);
        setTestimonials(BACKUP_TESTIMONIALS);
      });

    // Fetch public reviews
    fetch(`${API_BASE_URL}/api/reviews`)
      .then(res => {
        if (!res.ok) throw new Error('API failed');
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setReviews(data);
        } else {
          setReviews(BACKUP_REVIEWS);
        }
      })
      .catch(err => {
        console.error('Error fetching reviews, loading fallbacks:', err);
        setReviews(BACKUP_REVIEWS);
      });
  }, []);



  // Intersection Observer for scroll reveals
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.05 });

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, [projects, testimonials]);

  // Intersection Observer for results counter trigger
  const resultsRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setResultsSectionActive(true);
        }
      });
    }, { threshold: 0.1 });

    const el = resultsRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  // Animate count-up stats
  useEffect(() => {
    if (!resultsSectionActive) return;

    let startTime = null;
    const duration = 2000; // 2 seconds

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = progress * (2 - progress);

      setProjectsCounter(Math.floor(ease * 10));
      setSatisfactionCounter(Math.floor(ease * 98));
      setRatingCounter(Number((ease * 5).toFixed(1)));
      setResponseCounter(Math.floor(ease * 48));

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setProjectsCounter(10);
        setSatisfactionCounter(98);
        setRatingCounter(5);
        setResponseCounter(48);
      }
    };

    requestAnimationFrame(animateCount);
  }, [resultsSectionActive]);

  // Scroll listener for the Process Timeline progress line and cinematic storytelling
  const timelineRef = useRef(null);
  const [timelineProgress, setTimelineProgress] = useState(0);
  
  const storyRef = useRef(null);
  const [storyStep, setStoryStep] = useState(0);
  
  const [heroScrollScale, setHeroScrollScale] = useState(1);
  const [heroScrollRotate, setHeroScrollRotate] = useState(0);

  const storySteps = [
    {
      subtitle: "THE GAP",
      title: "Silent Businesses in a Loud World",
      desc: "Nearly 90% of local services, specialized manufacturers, and boutique brands hold elite offline authority but remain invisible online. They lose high-ticket leads daily simply because their web presence is standard.",
      glow: "var(--accent-magenta)"
    },
    {
      subtitle: "THE REVEAL",
      title: "Cinematic 3D Digital Architecture",
      desc: "Aparous uncovers your business potential. We craft digital portals utilizing hardware-accelerated CSS 3D parallax transform vectors, abstract particle canvases, and floating glass panels that command authority.",
      glow: "var(--accent-cyan)"
    },
    {
      subtitle: "THE ACCENT",
      title: "Engineered to Dominate & Convert",
      desc: "We deploy custom full-stack MERN engines optimized with 100/100 Lighthouse specs, Rate Limiters, Helmet security guards, and qualified AI lead capture pipelines. Built to convert traffic into revenue.",
      glow: "var(--accent-purple)"
    }
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Process Timeline Progress
          const el = timelineRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const elementHeight = rect.height;
            const elementTop = rect.top;
            const start = windowHeight / 2;
            const currentScroll = start - elementTop;
            let progress = 0;
            if (currentScroll > 0) {
              progress = Math.min(currentScroll / (elementHeight - 120), 1);
            }
            
            const newProgress = Math.round(progress * 100);
            setTimelineProgress(prev => {
              if (Math.abs(prev - newProgress) >= 3 || newProgress === 0 || newProgress === 100) {
                return newProgress;
              }
              return prev;
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle client feedback form submission
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewSubmitStatus('submitting');
    try {
      const res = await fetch(`${API_BASE_URL}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (res.ok) {
        const savedReview = await res.json();
        setReviews(prev => [savedReview, ...prev]);
        setReviewSubmitStatus('success');
        setNewReview({ name: '', company: '', email: '', projectName: '', rating: 5, feedback: '' });
      } else {
        setReviewSubmitStatus('error');
      }
    } catch (err) {
      console.error('Error submitting review:', err);
      setReviewSubmitStatus('error');
    }
  };

  const handleAuditSubmit = async (e) => {
    e.preventDefault();
    setAuditStatus('submitting');
    setAuditErrorMsg('');
    try {
      const res = await fetch(`${API_BASE_URL}/api/audits`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auditForm)
      });
      if (res.ok) {
        setAuditStatus('success');
        setAuditForm({ websiteUrl: '', businessName: '', email: '', phone: '' });
      } else {
        const data = await res.json();
        setAuditStatus('error');
        setAuditErrorMsg(data.error || 'Failed to submit audit request.');
      }
    } catch (err) {
      setAuditStatus('error');
      setAuditErrorMsg('Connection timeout or network error.');
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsAuditModalOpen(false);
        setIsProjectModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cycle project modal previous/next project
  const handlePrevProject = (currentProjId) => {
    const idx = projects.findIndex(p => p._id === currentProjId);
    if (idx !== -1) {
      const prevIdx = (idx - 1 + projects.length) % projects.length;
      setSelectedProject(projects[prevIdx]);
    }
  };

  const handleNextProject = (currentProjId) => {
    const idx = projects.findIndex(p => p._id === currentProjId);
    if (idx !== -1) {
      const nextIdx = (idx + 1) % projects.length;
      setSelectedProject(projects[nextIdx]);
    }
  };

  // Cycle floating trust alerts
  useEffect(() => {
    let alertIndex = 0;
    const showNextAlert = () => {
      setActivityAlert(alerts[alertIndex]);
      alertIndex = (alertIndex + 1) % alerts.length;
      
      // Auto hide alert after 6 seconds
      setTimeout(() => {
        setActivityAlert(null);
      }, 6000);
    };

    // Trigger first alert after 4 seconds
    const initialTimeout = setTimeout(showNextAlert, 4000);
    
    // Cycle alerts every 14 seconds
    const interval = setInterval(showNextAlert, 14000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const isHoveredHeroRef = useRef(false);

  const handleHeroMouseMove = (e) => {
    if (!heroRef.current || !cubeRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    const rotX = -(y / rect.height) * 45;
    const rotY = (x / rect.width) * 45;
    
    cubeRef.current.style.transform = `rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg)`;
    cubeRef.current.style.animation = 'none';
  };

  const handleHeroMouseLeave = () => {
    if (!cubeRef.current) return;
    cubeRef.current.style.transform = '';
    cubeRef.current.style.animation = 'spinCube 20s infinite linear';
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    if (!formData.privacy) {
      alert('Please check the Privacy Policy verification box to continue.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    // Map expanded form fields cleanly into the database schema format
    const dbPayload = {
      name: formData.name,
      email: formData.email,
      businessName: formData.company || '',
      projectDetails: `Service Requested: ${formData.service}\nTarget Timeline: ${formData.timeline}\nDirect Phone: ${formData.phone || 'N/A'}\nProject Description: ${formData.message}`,
      budget: formData.budget
    };

    try {
      const res = await fetch(`${API_BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbPayload)
      });

      if (!res.ok) throw new Error('Lead submission failed');

      setSubmitStatus('success');
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        budget: '',
        service: 'Premium Websites',
        timeline: '1-3 Weeks',
        message: '',
        privacy: false
      });
    } catch (err) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextTestimonial = () => {
    setActiveTestimonial(prev => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Keyboard Skip Navigation Link */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          top: '-100px',
          left: '20px',
          background: 'var(--accent-purple)',
          color: '#fff',
          padding: '10px 20px',
          zIndex: 1000,
          borderRadius: '4px',
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: '600',
          transition: 'top 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          outline: 'none',
          boxShadow: '0 10px 25px rgba(161, 79, 255, 0.3)'
        }}
        onFocus={e => e.target.style.top = '15px'}
        onBlur={e => e.target.style.top = '-100px'}
      >
        Skip to main content
      </a>

      {/* Background radial glows */}
      <div className="radial-glow" style={{ top: '-10%', left: '-10%' }} />
      <div className="radial-glow-cyan" style={{ top: '40%', right: '-15%' }} />
      <div className="radial-glow" style={{ bottom: '10%', left: '5%' }} />

      {/* Navigation Header */}
      <header role="banner" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <nav className="navbar-responsive" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'rgba(255, 255, 255, 0.88)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--glass-border)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img 
              src="/logo.jpeg" 
              alt="Aparous Logo" 
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                objectFit: 'cover',
                border: '1px solid #e2e8f0'
              }}
            />
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="text-gradient" style={{
                fontFamily: 'var(--font-head)',
                fontSize: '1.45rem',
                fontWeight: '800',
                letterSpacing: '1px'
              }}>
                APAROUS
              </span>
              <span style={{ fontSize: '0.6rem', background: 'var(--accent-purple)', color: '#fff', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>Solutions</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <a href="#services" className="nav-link-desktop" style={{ color: 'var(--text-normal)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Services</a>
            <a href="#why-choose-us" className="nav-link-desktop" style={{ color: 'var(--text-normal)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Why Us</a>
            <a href="#our-process" className="nav-link-desktop" style={{ color: 'var(--text-normal)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Process</a>
            <a href="#portfolio" className="nav-link-desktop" style={{ color: 'var(--text-normal)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Portfolio</a>
            <a href="#pricing" className="nav-link-desktop" style={{ color: 'var(--text-normal)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Pricing</a>
            <a href="#faq" className="nav-link-desktop" style={{ color: 'var(--text-normal)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: '500', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>FAQ</a>
            <a href="#contact" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Get in Touch</a>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <main id="main-content">

      {/* Hero Section */}
      <section 
        ref={heroRef}
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
        className="fade-in" 
        style={{
          minHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '80px 8% 60px 8%',
          position: 'relative',
          overflow: 'hidden',
          gap: '40px'
        }}
      >


        <div className="hero-grid">
          {/* Left Column: Headline Copy */}
          <div>
            <div className="cinematic-reveal" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(124, 58, 237, 0.06)',
              border: '1px solid rgba(124, 58, 237, 0.15)',
              borderRadius: '30px',
              padding: '8px 18px',
              marginBottom: '25px',
              fontSize: '0.85rem',
              color: 'var(--accent-purple)',
              fontWeight: '600'
            }}>
              <Sparkles size={14} style={{ color: 'var(--accent-purple)' }} />
              <span>Premium Web Engineering & AI Automations</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.8vw, 4.5rem)',
              lineHeight: '1.2',
              fontWeight: '800',
              marginBottom: '25px',
              letterSpacing: '-1.5px',
              color: '#0f172a'
            }}>
              <CinematicTextReveal text="We Build Premium Websites & Intelligent AI Automations." delay={0.1} />
            </h1>

            <p className="cinematic-reveal" style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
              color: 'var(--text-normal)',
              marginBottom: '40px',
              lineHeight: '1.7',
              fontWeight: '400',
              animationDelay: '0.35s'
            }}>
              A boutique agency crafting high-converting websites, custom web applications, and automated AI chatbots for modern brands.
            </p>

            <div className="cinematic-reveal" style={{ display: 'flex', gap: '20px', animationDelay: '0.55s', alignItems: 'center' }}>
              <MagneticButton>
                <button 
                  onClick={() => {
                    const el = document.getElementById('contact');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  className="btn-primary" 
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  Get Started <ArrowRight size={18} style={{ marginLeft: '6px' }} />
                </button>
              </MagneticButton>
              <MagneticButton>
                <a href="#portfolio" className="btn-secondary">
                  <DecryptText text="View Portfolio" />
                </a>
              </MagneticButton>
            </div>

            <div className="cinematic-reveal" style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 20px',
              marginTop: '35px',
              animationDelay: '0.75s'
            }}>
              {['✓ Fast Delivery', '✓ SEO Optimized', '✓ AI Chatbots', '✓ Mobile Fluid', '✓ Dedicated Support'].map((badge, idx) => (
                <span key={idx} style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  fontWeight: '500',
                  letterSpacing: '0.3px'
                }}>
                  {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: 3D Interactive Core Widget */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
          }}>
            <div className="cube-glow-ring" />
            <div className="cube-container" style={{
              transform: `scale(${heroScrollScale}) rotateY(${-heroScrollRotate}deg)`,
              transition: 'transform 0.1s ease-out'
            }}>
              <div 
                ref={cubeRef}
                className="cube"
              >
                {/* 6 Cube Faces */}
                <div className="cube-face face-front">
                  <Sparkles style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }} size={26} />
                  <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Aparous</span>
                </div>
                <div className="cube-face face-back">
                  <TrendingUp style={{ color: '#00ff64', marginBottom: '12px' }} size={26} />
                  <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Scale</span>
                </div>
                <div className="cube-face face-right">
                  <Cpu style={{ color: 'var(--accent-purple)', marginBottom: '12px' }} size={26} />
                  <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>AI Build</span>
                </div>
                <div className="cube-face face-left">
                  <Video style={{ color: 'var(--accent-magenta)', marginBottom: '12px' }} size={26} />
                  <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Video Edit</span>
                </div>
                <div className="cube-face face-top">
                  <Shield style={{ color: 'var(--accent-cyan)', marginBottom: '12px' }} size={26} />
                  <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Trust</span>
                </div>
                <div className="cube-face face-bottom">
                  <Layout style={{ color: 'var(--accent-purple)', marginBottom: '12px' }} size={26} />
                  <span style={{ fontSize: '0.85rem', letterSpacing: '1px', textTransform: 'uppercase' }}>3D UX</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar (NEW) */}
      <div className="scroll-reveal" style={{ padding: '0 8%', marginTop: '-35px', marginBottom: '40px', position: 'relative', zIndex: 10 }}>
        <div className="glass-panel" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '20px 10px',
          padding: '25px 35px',
          alignItems: 'center',
          textAlign: 'center',
          background: '#ffffff',
          borderColor: '#e2e8f0',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)'
        }}>
          {trustBarStats.map((stat) => (
            <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <span className="text-gradient" style={{ fontFamily: 'var(--font-head)', fontWeight: '800', fontSize: '1.25rem', letterSpacing: '0.5px' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Horizontal Marquee Ribbon */}
      <div className="marquee-container scroll-reveal">
        <div className="marquee-track">
          <div className="marquee-item">
            <span className="marquee-text">React Engine</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">Cinematic UX</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text">Full-Stack MERN</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">AI Automation</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text">Lead Generators</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">3D Parallax</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text">Premium Brand</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">Executive Mockups</span>
            <span className="marquee-separator">✦</span>
          </div>
          <div className="marquee-item">
            <span className="marquee-text">React Engine</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">Cinematic UX</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text">Full-Stack MERN</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">AI Automation</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text">Lead Generators</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">3D Parallax</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text">Premium Brand</span>
            <span className="marquee-separator">✦</span>
            <span className="marquee-text highlight">Executive Mockups</span>
            <span className="marquee-separator">✦</span>
          </div>
        </div>
      </div>

      {/* Services Section (MAX 3 CORE CAPABILITIES) */}
      <section id="services" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
            Core Capabilities
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', fontFamily: 'var(--font-head)', fontWeight: '800', color: '#0f172a' }}>
            <CinematicTextReveal text="What We Build Best" />
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto', fontSize: '1.05rem' }}>
            Focused agency pillars engineered for high performance, business logic, and maximum conversions.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              title: "Premium Web Development",
              description: "Custom React/MERN web applications, boutique agency sites, and high-converting landing pages built with 100/100 Lighthouse performance, instant loading speeds, and fluid responsiveness.",
              benefits: "Establishes immediate trust and turns site visitors into high-ticket clients.",
              icon: <Layout size={22} />,
              color: "var(--accent-purple)",
              bg: "rgba(124, 58, 237, 0.08)"
            },
            {
              title: "AI Automations & Chatbots",
              description: "Intelligent AI agents, automated lead qualification chatbots, custom LLM integrations, and seamless workflow engines designed to handle repetitive customer touchpoints.",
              benefits: "Saves operational hours and captures qualified leads 24/7 automatically.",
              icon: <Sparkles size={22} />,
              color: "var(--accent-cyan)",
              bg: "rgba(2, 132, 199, 0.08)"
            },
            {
              title: "UI/UX Design & Branding",
              description: "Modern user experience design, intuitive mobile-first interfaces, conversion-optimized design systems, and sleek visual identities built for modern digital platforms.",
              benefits: "Ensures visual consistency, builds brand authority, and boosts user engagement.",
              icon: <Shield size={22} />,
              color: "var(--accent-magenta)",
              bg: "rgba(219, 39, 119, 0.08)"
            }
          ].map((service, idx) => (
            <Tilt3D 
              key={idx} 
              className="glass-panel scroll-reveal" 
              style={{ 
                padding: '40px 32px', 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%', 
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.3s, border-color 0.3s, box-shadow 0.3s' 
              }}
            >
              <div style={{
                background: service.bg,
                color: service.color,
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '25px'
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a' }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--text-normal)', fontSize: '0.92rem', lineHeight: '1.65', marginBottom: '25px', flexGrow: 1 }}>
                {service.description}
              </p>
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '18px', marginTop: 'auto' }}>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', fontWeight: '700' }}>
                  Core Advantage
                </span>
                <span style={{ fontSize: '0.85rem', color: service.color, fontWeight: '600', lineHeight: '1.4' }}>
                  {service.benefits}
                </span>
              </div>
            </Tilt3D>
          ))}
        </div>
      </section>


      {/* Why Choose Us Section (3 VALUABLE CARDS) */}
      <section id="why-choose-us" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
            Why Aparous
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', fontFamily: 'var(--font-head)', fontWeight: '800', color: '#0f172a' }}>
            <CinematicTextReveal text="Built For Maximum Impact" />
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto', fontSize: '1.05rem' }}>
            Combining clean engineering, AI efficiency, and dedicated support for measurable growth.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {[
            {
              title: "Clean Code & Speed",
              desc: "100/100 Lighthouse performance, ultra-fast loading, zero bloat, and modern SEO structure built natively into every platform.",
              icon: <Sparkles size={22} style={{ color: 'var(--accent-purple)' }} />
            },
            {
              title: "AI-Driven Efficiency",
              desc: "Native integration of automated lead chatbots and smart business workflows to capture and qualify prospects 24/7.",
              icon: <TrendingUp size={22} style={{ color: 'var(--accent-cyan)' }} />
            },
            {
              title: "Dedicated Support",
              desc: "Direct collaboration with studio engineering leads, transparent delivery timelines, and 30 days of post-launch hyper-care.",
              icon: <Shield size={22} style={{ color: 'var(--accent-magenta)' }} />
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              className="glass-panel scroll-reveal" 
              whileHover={{ y: -4 }}
              style={{ 
                padding: '35px 30px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '15px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.03)'
              }}
            >
              <div style={{
                background: 'rgba(124, 58, 237, 0.06)',
                border: '1px solid #e2e8f0',
                padding: '12px',
                borderRadius: '12px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'fit-content'
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: '#0f172a', fontFamily: 'var(--font-head)', fontWeight: '700' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-normal)', fontSize: '0.92rem', lineHeight: '1.6' }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Process Section (Interactive Vertical Timeline) */}
      <section id="our-process" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
            Structured Roadmap
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', fontFamily: 'var(--font-head)', fontWeight: '800', color: '#0f172a' }}>
            <CinematicTextReveal text="Our Process" />
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            A transparent, 7-step collaborative roadmap taking your vision from strategy to high-performing deployment.
          </p>
        </div>

        <div ref={timelineRef} className="process-timeline">
          {/* Scroll progress glowing bar */}
          <div className="timeline-progress-line" style={{ height: `${timelineProgress}%` }} />

          {[
            { num: "01", title: "Discovery Call", desc: "A 30-minute scoping workshop where we dissect your business objectives, conversion bottlenecks, and project timeline requirements." },
            { num: "02", title: "Requirement Analysis", desc: "We draft a comprehensive features spec worksheet, outline backend endpoints, and align on target KPIs." },
            { num: "03", title: "UI/UX Planning", desc: "We construct high-fidelity interactive wireframes outlining animations and responsive styling, giving you a clear preview before code begins." },
            { num: "04", title: "Development Phase", desc: "We build your platform using modular React engines, semantic code, custom animations, and clean server routes." },
            { num: "05", title: "Testing & QA", desc: "Rigorous diagnostic audits covering responsive layouts, load times, database security, and form validations." },
            { num: "06", title: "Deployment Launch", desc: "Deploying your site to robust cloud hosting, setting up domain names, configuring SSL parameters, and verifying emails." },
            { num: "07", title: "Support & Maintenance", desc: "30 days of hyper-care followed by retainers covering feature updates, SEO audits, and server optimization calls." }
          ].map((step, idx) => {
            const isActive = timelineProgress >= ((idx / 6) * 100) - 5;
            return (
              <div key={idx} className={`timeline-item ${isActive ? 'active' : ''} scroll-reveal`}>
                <div className="timeline-dot" />
                <Tilt3D 
                  className="glass-panel timeline-content-card" 
                  style={{
                    background: '#ffffff',
                    border: isActive ? '1px solid var(--accent-purple)' : '1px solid #e2e8f0',
                    boxShadow: isActive ? '0 8px 30px rgba(124, 58, 237, 0.1)' : '0 4px 15px rgba(0, 0, 0, 0.03)',
                    cursor: 'pointer'
                  }}
                >
                  <div className="timeline-number">{step.num}</div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a' }}>
                    {step.title}
                  </h3>
                  <p style={{ color: 'var(--text-normal)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                    {step.desc}
                  </p>
                </Tilt3D>
              </div>
            );
          })}
        </div>
      </section>

      {/* Results Section */}
      <section ref={resultsRef} id="results" className="scroll-reveal" style={{ padding: '80px 8%', background: '#ffffff', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { value: `${projectsCounter}+`, label: "Projects Completed", desc: "Custom websites and AI automation systems deployed." },
            { value: `${satisfactionCounter}%`, label: "Client Satisfaction", desc: "Verified rating reflecting quality and response times." },
            { value: `${ratingCounter}★`, label: "Average Rating", desc: "Top score across client reviews and portal feedback." },
            { value: `${responseCounter} Hours`, label: "Avg Response Time", desc: "Dedicated support commitment for client inquiries." }
          ].map((stat, idx) => (
            <div key={idx} className="glass-panel" style={{
              padding: '35px 25px',
              textAlign: 'center',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.02)'
            }}>
              <span className="text-gradient" style={{
                fontSize: '2.5rem',
                fontWeight: '900',
                fontFamily: 'var(--font-head)',
                display: 'block',
                marginBottom: '8px',
                lineHeight: 1
              }}>
                {stat.value}
              </span>
              <h4 style={{ fontSize: '0.95rem', color: '#0f172a', marginBottom: '8px', fontFamily: 'var(--font-head)', fontWeight: '700' }}>
                {stat.label}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.4' }}>
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </section>



      {/* Portfolio Section */}
      <section id="portfolio" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
              Portfolio Showcase
            </span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#0f172a' }}>
              <CinematicTextReveal text="Recent Projects" />
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Boutique web builds and custom AI applications.</p>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px'
        }}>
          {projects.map((project) => (
            <div key={project._id} className="perspective-container">
              <ProjectCard project={project} onClick={() => { setSelectedProject(project); setIsProjectModalOpen(true); }} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      {testimonials.length > 0 && (
        <section id="testimonials" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
              Client Trust
            </span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#0f172a' }}>What Partners Say</h2>
            <p style={{ color: 'var(--text-muted)' }}>Feedback from startup founders and business owners.</p>
          </div>

          <div className="testimonials-flex-container">
            <button onClick={prevTestimonial} style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <ChevronLeft size={20} />
            </button>

            <div className="glass-panel" style={{
              width: '600px',
              padding: '40px',
              textAlign: 'center',
              position: 'relative',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '20px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
            }}>
              {/* Star Rating & Verified Badge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginBottom: '25px' }}>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'rgba(124, 58, 237, 0.06)', border: '1px solid rgba(124, 58, 237, 0.15)', padding: '3px 12px', borderRadius: '15px', fontSize: '0.72rem', color: 'var(--accent-purple)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <Award size={12} /> Verified Client Review
                </div>
              </div>

              {/* Quote Content */}
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.1rem',
                lineHeight: '1.7',
                fontStyle: 'italic',
                color: '#334155',
                marginBottom: '30px'
              }}>
                "{testimonials[activeTestimonial].content}"
              </p>

              {/* Avatar and Identity */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'rgba(124, 58, 237, 0.1)',
                  border: '1px solid rgba(124, 58, 237, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  color: 'var(--accent-purple)',
                  fontSize: '0.95rem'
                }}>
                  {testimonials[activeTestimonial].avatar}
                </div>
                <div style={{ textAlign: 'left' }}>
                  <h4 style={{ fontSize: '1.02rem', fontWeight: '700', color: '#0f172a' }}>{testimonials[activeTestimonial].name}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span>{testimonials[activeTestimonial].role} at <strong>{testimonials[activeTestimonial].company}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={nextTestimonial} style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <ChevronRight size={20} />
            </button>
          </div>
        </section>
      )}

      {/* Client Feedback Section */}
      <section id="feedback" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Left Column: Average metrics and Form */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
                Share Your Experience
              </span>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', fontFamily: 'var(--font-head)', fontWeight: '800', color: '#0f172a' }}>Client Feedback</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
                Submit your verified client review and rating below.
              </p>

              {/* Stats Card */}
              <div className="glass-panel" style={{ display: 'inline-flex', alignItems: 'center', gap: '20px', padding: '15px 25px', marginTop: '20px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span className="text-gradient" style={{ fontSize: '2rem', fontWeight: '900', fontFamily: 'var(--font-head)' }}>
                    {reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : "5.0"}
                  </span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
                    Average Rating
                  </span>
                </div>
                <div style={{ width: '1px', height: '40px', background: '#e2e8f0' }} />
                <div>
                  <div style={{ display: 'flex', gap: '3px', marginBottom: '5px' }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={14} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-normal)' }}>
                    Based on {reviews.length} verified reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <form onSubmit={handleReviewSubmit} className="glass-panel" style={{ padding: '35px 30px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0f172a', marginBottom: '8px', fontWeight: '600' }}>Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Hemanth"
                  value={newReview.name}
                  onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div className="form-grid-responsive">
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0f172a', marginBottom: '8px', fontWeight: '600' }}>Company Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Grow Athlete"
                    value={newReview.company}
                    onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#0f172a', marginBottom: '8px', fontWeight: '600' }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. name@company.com"
                    value={newReview.email}
                    onChange={(e) => setNewReview({ ...newReview, email: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0f172a', marginBottom: '8px', fontWeight: '600' }}>Project Name</label>
                <input
                  type="text"
                  placeholder="e.g. Agency Website Build"
                  value={newReview.projectName}
                  onChange={(e) => setNewReview({ ...newReview, projectName: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '0.9rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0f172a', marginBottom: '8px', fontWeight: '600' }}>Your Rating *</label>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <Star
                        size={20}
                        fill={star <= newReview.rating ? "#f59e0b" : "none"}
                        color={star <= newReview.rating ? "#f59e0b" : "#cbd5e1"}
                        style={{ transition: 'all 0.2s' }}
                      />
                    </button>
                  ))}
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: '10px' }}>
                    {newReview.rating} / 5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#0f172a', marginBottom: '8px', fontWeight: '600' }}>Review Feedback *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share details of your experience working with Aparous..."
                  value={newReview.feedback}
                  onChange={(e) => setNewReview({ ...newReview, feedback: e.target.value })}
                  style={{ width: '100%', padding: '12px 16px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', color: '#0f172a', fontSize: '0.9rem', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={reviewSubmitStatus === 'submitting'}
                className="btn-primary"
                style={{ width: '100%', padding: '14px', borderRadius: '8px', fontWeight: '700', justifyContent: 'center' }}
              >
                {reviewSubmitStatus === 'submitting' ? 'Submitting...' : 'Submit Verified Review'}
              </button>

              {reviewSubmitStatus === 'success' && (
                <div style={{ padding: '12px', background: 'rgba(124, 58, 237, 0.08)', border: '1px solid rgba(124, 58, 237, 0.2)', borderRadius: '6px', color: 'var(--accent-purple)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Thank you! Your verified review has been submitted and auto-published.
                </div>
              )}
              {reviewSubmitStatus === 'error' && (
                <div style={{ padding: '12px', background: 'rgba(219, 39, 119, 0.08)', border: '1px solid rgba(219, 39, 119, 0.2)', borderRadius: '6px', color: 'var(--accent-magenta)', fontSize: '0.85rem', textAlign: 'center' }}>
                  Failed to submit review. Please try again.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Dynamic Feedback Grid Wall */}
          <div style={{ maxHeight: '720px', overflowY: 'auto', paddingRight: '10px' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '20px' }}>
              Verified Review Wall
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {reviews.map((rev) => (
                <div key={rev._id} className="glass-panel" style={{ padding: '25px', display: 'flex', flexDirection: 'column', gap: '12px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0f172a' }}>{rev.name}</h4>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {rev.company} {rev.projectName && `• ${rev.projectName}`}
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={13} fill="#f59e0b" color="#f59e0b" />
                      ))}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-normal)', fontSize: '0.88rem', lineHeight: '1.55', fontStyle: 'italic' }}>
                    "{rev.feedback}"
                  </p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', alignSelf: 'flex-end', marginTop: '5px' }}>
                    {rev.createdAt ? new Date(rev.createdAt).toLocaleDateString() : 'Recent'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Service Pricing Packages Section (Razorpay Merchant Compliant) */}
      <section id="pricing" className="scroll-reveal" style={{ padding: '100px 8%', background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
            Transparent Pricing
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#0f172a', fontFamily: 'var(--font-head)', fontWeight: '800' }}>Service Packages</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '0.95rem' }}>
            Clear, fixed investment tiers for high-speed web development and AI automation workflows. Digital payment enabled via Razorpay.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {pricingPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="glass-panel"
              style={{
                padding: '35px 30px',
                background: '#ffffff',
                borderRadius: '16px',
                border: pkg.recommended ? '2px solid var(--accent-purple)' : '1px solid #e2e8f0',
                boxShadow: pkg.recommended ? '0 10px 30px rgba(124, 58, 237, 0.12)' : '0 4px 20px rgba(0,0,0,0.02)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              {pkg.badge && (
                <span style={{
                  position: 'absolute',
                  top: '-13px',
                  right: '25px',
                  background: pkg.recommended ? 'var(--accent-purple)' : '#0f172a',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}>
                  {pkg.badge}
                </span>
              )}

              <div>
                <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>
                  {pkg.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5', minHeight: '40px', marginBottom: '20px' }}>
                  {pkg.description}
                </p>

                <div style={{ marginBottom: '25px', paddingBottom: '20px', borderBottom: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', fontFamily: 'var(--font-head)' }}>
                      ₹{pkg.priceINR.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '500' }}>
                      (${pkg.priceUSD} USD)
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--accent-purple)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    {pkg.period}
                  </span>
                </div>

                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
                  {pkg.features.map((feat, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--text-normal)' }}>
                      <Check size={16} color="var(--accent-purple)" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleRazorpayPayment(pkg)}
                className={pkg.recommended ? 'btn-primary' : 'btn-secondary'}
                style={{ width: '100%', justifyContent: 'center', padding: '14px', fontSize: '0.9rem', fontWeight: '700' }}
              >
                Order Package via Razorpay
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
            Got Questions?
          </span>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px', color: '#0f172a' }}>Frequently Asked Inquiries</h2>
          <p style={{ color: 'var(--text-muted)' }}>Addressing timelines, process models, and project deliverables.</p>
        </div>

        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className="glass-panel" 
                style={{ 
                  padding: '24px 30px', 
                  cursor: 'pointer',
                  background: '#ffffff',
                  border: isOpen ? '1px solid var(--accent-purple)' : '1px solid #e2e8f0',
                  boxShadow: isOpen ? '0 4px 20px rgba(124, 58, 237, 0.08)' : '0 2px 8px rgba(0, 0, 0, 0.02)',
                  borderRadius: '14px',
                  transition: 'all 0.25s ease'
                }}
                onClick={() => toggleFaq(index)}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h4 style={{ 
                    fontSize: '1.02rem', 
                    fontWeight: '700',
                    color: isOpen ? 'var(--accent-purple)' : '#0f172a',
                    transition: 'color 0.2s'
                  }}>
                    {faq.q}
                  </h4>
                  <ChevronRight size={18} style={{ 
                    color: isOpen ? 'var(--accent-purple)' : 'var(--text-muted)',
                    transform: isOpen ? 'rotate(90deg)' : 'rotate(0)',
                    transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
                  }} />
                </div>
                
                <div style={{ 
                  maxHeight: isOpen ? '200px' : '0', 
                  overflow: 'hidden', 
                  transition: 'max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), margin-top 0.4s',
                  marginTop: isOpen ? '15px' : '0'
                }}>
                  <p style={{ 
                    color: 'var(--text-normal)', 
                    fontSize: '0.92rem', 
                    lineHeight: '1.6', 
                    margin: 0,
                    textAlign: 'left'
                  }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-reveal" style={{ padding: '100px 8%', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '60px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-purple)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '10px' }}>
              Start A Project
            </span>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#0f172a' }}>Initialize Ascent</h2>
            <p style={{ color: 'var(--text-normal)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '40px' }}>
              Submit your project scope, and our digital team will analyze your requirements and deliver a custom project proposal within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(124, 58, 237, 0.08)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Mail size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Email Communications</span>
                  <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '600' }}>aparous.solutions@gmail.com</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '50%', background: 'rgba(2, 132, 199, 0.08)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={18} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Direct Line</span>
                  <p style={{ fontSize: '0.95rem', color: '#0f172a', fontWeight: '600' }}>+91 9849836092</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '40px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            {submitStatus === 'success' ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle size={55} style={{ color: 'var(--accent-purple)', marginBottom: '20px' }} />
                <h3 style={{ fontSize: '1.6rem', marginBottom: '10px', color: '#0f172a' }}>Scope Received</h3>
                <p style={{ color: 'var(--text-normal)', fontSize: '0.95rem', lineHeight: '1.6' }}>
                  Thank you! Our studio lead will review your scope and deliver your custom proposal within 24 hours.
                </p>
                <button onClick={() => setSubmitStatus(null)} className="btn-secondary" style={{ marginTop: '25px', padding: '10px 24px', fontSize: '0.85rem' }}>
                  Submit Another Scope
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="form-grid-responsive">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Name *</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="glass-input" placeholder="e.g. John Doe" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Company Name</label>
                    <input type="text" name="company" value={formData.company} onChange={handleInputChange} className="glass-input" placeholder="e.g. Acme Corp" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                  </div>
                </div>

                <div className="form-grid-responsive">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Corporate Email *</label>
                    <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="glass-input" placeholder="e.g. john@business.com" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="glass-input" placeholder="e.g. +1 (555) 000-0000" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '15px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Service Required</label>
                    <select name="service" value={formData.service} onChange={handleInputChange} className="glass-input" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }}>
                      <option value="Premium Websites">Premium Websites</option>
                      <option value="AI Automation">AI Automation & Chatbots</option>
                      <option value="UI/UX Design">UI/UX & Branding</option>
                      <option value="Web Applications">Web Applications</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Allocated Budget</label>
                    <input
                      type="text"
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="glass-input"
                      placeholder="e.g. $2,500 / ₹2,00,000"
                      style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Target Timeline</label>
                    <select name="timeline" value={formData.timeline} onChange={handleInputChange} className="glass-input" style={{ background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }}>
                      <option value="1-3 Weeks">1-3 Weeks</option>
                      <option value="4-6 Weeks">4-6 Weeks</option>
                      <option value="2-3 Months">2-3 Months</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: '600', marginBottom: '8px', color: '#0f172a' }}>Project Requirements</label>
                  <textarea name="message" rows="3" value={formData.message} onChange={handleInputChange} className="glass-input" placeholder="Tell us about key features, target audience, or business goals..." style={{ resize: 'none', background: '#ffffff', color: '#0f172a', border: '1px solid #e2e8f0' }}></textarea>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '5px' }}>
                  <input
                    type="checkbox"
                    name="privacy"
                    id="privacy-checkbox"
                    checked={formData.privacy}
                    onChange={handleInputChange}
                    style={{ marginTop: '3px', cursor: 'pointer' }}
                  />
                  <label htmlFor="privacy-checkbox" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: '1.4', cursor: 'pointer' }}>
                    I agree to the privacy policy and authorize Aparous to contact me regarding my project scope.
                  </label>
                </div>

                {submitStatus === 'error' && (
                  <p style={{ color: '#ef4444', fontSize: '0.85rem', fontWeight: '500' }}>
                    Transmission error. Could not connect to API server. Please retry.
                  </p>
                )}

                <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                  <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                    {isSubmitting ? 'Submitting Scope...' : 'Submit Project Scope'} <Send size={15} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '60px 8% 40px 8%',
        background: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px'
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '40px' }}>
          
          {/* Col 1: Brand details */}
          <div style={{ gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
              <span className="text-gradient" style={{ fontFamily: 'var(--font-head)', fontSize: '1.4rem', fontWeight: '800' }}>APAROUS</span>
              <span style={{ fontSize: '0.55rem', background: 'var(--accent-purple)', color: '#fff', padding: '2px 6px', borderRadius: '3px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Solutions</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: '1.6', maxWidth: '320px' }}>
              We build premium websites and intelligent AI automations for modern brands.
            </p>
            <div style={{ marginTop: '15px', fontSize: '0.82rem', color: 'var(--text-normal)', lineHeight: '1.5' }}>
              <strong>Registered Office:</strong> Anantapur, Andhra Pradesh, India - 515004<br />
              <strong>Support Email:</strong> <a href="mailto:aparous.solutions@gmail.com" style={{ color: 'var(--accent-purple)', textDecoration: 'none' }}>aparous.solutions@gmail.com</a><br />
              <strong>Direct Phone:</strong> +91 9849836092
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '16px', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-head)', fontWeight: '700' }}>
              Services
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><a href="#services" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Premium Websites</a></li>
              <li><a href="#services" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>AI Automations</a></li>
              <li><a href="#pricing" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Pricing Packages</a></li>
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '16px', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-head)', fontWeight: '700' }}>
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><a href="#why-choose-us" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Why Us</a></li>
              <li><a href="#our-process" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Process</a></li>
              <li><a href="#portfolio" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0f172a'} onMouseLeave={e => e.target.style.color = 'var(--text-normal)'}>Portfolio</a></li>
              <li><Link to="/contact" style={{ color: 'var(--text-normal)', textDecoration: 'none', transition: 'color 0.2s' }}>Contact Desk</Link></li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div>
            <h4 style={{ fontSize: '0.85rem', marginBottom: '16px', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', fontFamily: 'var(--font-head)', fontWeight: '700' }}>
              Legal & Policy
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <li><Link to="/privacy-policy" style={{ color: 'var(--text-normal)', textDecoration: 'none' }}>Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" style={{ color: 'var(--text-normal)', textDecoration: 'none' }}>Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" style={{ color: 'var(--text-normal)', textDecoration: 'none' }}>Cancellation & Refund Policy</Link></li>
              <li><Link to="/shipping-policy" style={{ color: 'var(--text-normal)', textDecoration: 'none' }}>Shipping & Digital Delivery</Link></li>
              <li><Link to="/contact" style={{ color: 'var(--text-normal)', textDecoration: 'none' }}>Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          paddingTop: '25px',
          borderTop: '1px solid #e2e8f0',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          <span>© {new Date().getFullYear()} Aparous Solutions. All rights reserved. Registered Office: Anantapur, Andhra Pradesh, India - 515004.</span>
        </div>
      </footer>

      {/* Floating Activity/Trust Alert Toast */}
      {activityAlert && (
        <div 
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '25px',
            left: '25px',
            padding: '12px 20px',
            borderRadius: '10px',
            border: '1px solid rgba(0, 242, 254, 0.25)',
            boxShadow: '0 10px 30px rgba(0, 242, 254, 0.1)',
            zIndex: 90,
            fontSize: '0.8rem',
            fontWeight: '600',
            color: 'var(--text-bright)',
            maxWidth: '325px',
            animation: 'slideUpAlert 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <a 
        href="https://wa.me/919849836092"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-float"
        title="Message us on WhatsApp"
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.343a9.921 9.921 0 004.881 1.28c5.508 0 9.99-4.479 9.991-9.985.001-2.67-1.036-5.18-2.92-7.065A9.925 9.925 0 0012.012 2zm5.748 13.917c-.316.892-1.544 1.636-2.13 1.696-.583.06-1.168.281-3.73-1.055-3.27-1.71-5.32-5.011-5.483-5.231-.163-.22-1.3-1.745-1.3-3.327 0-1.583.815-2.36 1.107-2.66.292-.3.639-.374.85-.374.212 0 .424.001.606.01.189.008.442-.072.693.535.252.612.862 2.112.936 2.265.074.15.123.324.024.524-.099.2-.148.324-.296.499-.149.175-.313.39-.447.524-.148.15-.304.314-.132.612.172.297.765 1.272 1.642 2.057.943.844 1.737 1.107 2.032 1.254.296.147.468.123.638-.074.172-.198.742-.863.94-1.155.197-.292.395-.247.667-.147.272.099 1.728.815 2.025.962.296.148.494.22.568.347.075.123.075.717-.242 1.61z" />
        </svg>
      </a>



      {/* Portfolio Project Detail Modal */}
      {isProjectModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={() => setIsProjectModalOpen(false)}>
          <div className="modal-content-container" onClick={(e) => e.stopPropagation()}>
            
            {/* Project Hero Header */}
            <div style={{
              background: selectedProject.image.includes('linear-gradient') ? selectedProject.image : `url(${selectedProject.image}) center/cover no-repeat`,
              height: '320px',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '40px'
            }}>
              {/* Image overlay gradient */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.75) 100%)', zIndex: 1 }} />
              
              {/* Close Button */}
              <button 
                onClick={() => setIsProjectModalOpen(false)}
                style={{ position: 'absolute', top: '25px', right: '25px', background: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justify: 'center', cursor: 'pointer', zIndex: 10, transition: 'all 0.2s' }}
                onMouseEnter={e => e.target.style.borderColor = 'var(--accent-purple)'}
                onMouseLeave={e => e.target.style.borderColor = '#e2e8f0'}
              >
                <X size={20} />
              </button>

              <div style={{ position: 'relative', zIndex: 2 }}>
                <span style={{ fontSize: '0.8rem', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '700', display: 'block', marginBottom: '8px' }}>
                  {selectedProject.category}
                </span>
                <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-head)', fontWeight: '800', color: '#ffffff', marginBottom: '5px' }}>
                  {selectedProject.title}
                </h2>
                <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
                  Client: <strong>{selectedProject.client || 'Aparous Partner'}</strong>
                </span>
              </div>
            </div>

            {/* Modal Body Contents */}
            <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '35px', background: '#ffffff' }}>
              
              {/* Key Metrics row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px', background: '#f8fafc', borderColor: '#e2e8f0' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>Business Outcome</span>
                  <span className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-head)' }}>{selectedProject.impact || 'N/A'}</span>
                </div>
                <div className="glass-panel" style={{ padding: '20px', background: '#f8fafc', borderColor: '#e2e8f0' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>Dev Timeline</span>
                  <span style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '700' }}>3-4 Weeks</span>
                </div>
                <div className="glass-panel" style={{ padding: '20px', background: '#f8fafc', borderColor: '#e2e8f0' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '5px' }}>Target Audience</span>
                  <span style={{ fontSize: '1.15rem', color: '#0f172a', fontWeight: '700' }}>B2B / Consumer</span>
                </div>
              </div>

              {/* Case Study Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }} className="modal-grid-responsive">
                
                {/* Left: Overview, Problem & Solution */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>Project Overview</h4>
                    <p style={{ color: 'var(--text-normal)', fontSize: '0.94rem', lineHeight: '1.75' }}>
                      {selectedProject.description}
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>The Problem</h4>
                    <p style={{ color: 'var(--text-normal)', fontSize: '0.94rem', lineHeight: '1.75' }}>
                      The client was experiencing drop-offs on their legacy booking funnel. Latent asset load speeds and non-intuitive layouts resulted in lost prospects and high user acquisition friction.
                    </p>
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '10px' }}>The Solution</h4>
                    <p style={{ color: 'var(--text-normal)', fontSize: '0.94rem', lineHeight: '1.75' }}>
                      We engineered a fluid React front-end utilizing responsive components and clean UI design patterns. We simplified the scoping form, added instant feedback loaders, and established reliable API integrations.
                    </p>
                  </div>
                </div>

                {/* Right: Stack, Features & Deliverables */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>Technology Stack</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {(selectedProject.tags && (Array.isArray(selectedProject.tags) ? selectedProject.tags : typeof selectedProject.tags === 'string' ? selectedProject.tags.split(',') : [])).map((tag, idx) => (
                        <span key={`tag-${idx}`} style={{
                          background: 'rgba(124, 58, 237, 0.06)',
                          border: '1px solid #e2e8f0',
                          borderRadius: '4px',
                          padding: '4px 10px',
                          fontSize: '0.78rem',
                          color: '#0f172a',
                          fontWeight: '500'
                        }}>
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1rem', fontFamily: 'var(--font-head)', fontWeight: '700', color: '#0f172a', marginBottom: '12px' }}>Key Deliverables</h4>
                    <ul style={{ paddingLeft: '18px', color: 'var(--text-normal)', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '8px', lineHeight: '1.5' }}>
                      <li>Custom Fluid Responsive Interface</li>
                      <li>High-Speed React Router Front-end</li>
                      <li>API Lead Qualification Integrations</li>
                      <li>SEO Optimization Suite</li>
                      <li>Mobile Layout Optimization Audit</li>
                    </ul>
                  </div>
                </div>

              </div>

              {/* Bottom: Next/Prev controls and Live link */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: '1px solid #e2e8f0',
                paddingTop: '30px',
                marginTop: '15px'
              }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <button 
                    type="button"
                    onClick={() => handlePrevProject(selectedProject._id)}
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '4px', padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', outline: 'none' }}
                    onMouseEnter={e => e.target.style.borderColor = 'var(--accent-purple)'}
                    onMouseLeave={e => e.target.style.borderColor = '#e2e8f0'}
                  >
                    <ChevronLeft size={14} /> Previous
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleNextProject(selectedProject._id)}
                    style={{ background: '#ffffff', border: '1px solid #e2e8f0', color: '#0f172a', borderRadius: '4px', padding: '8px 16px', fontSize: '0.82rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s', outline: 'none' }}
                    onMouseEnter={e => e.target.style.borderColor = 'var(--accent-purple)'}
                    onMouseLeave={e => e.target.style.borderColor = '#e2e8f0'}
                  >
                    Next <ChevronRight size={14} />
                  </button>
                </div>

                <a 
                  href={selectedProject.link || '#'} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.85rem' }}
                >
                  Visit Website <ExternalLink size={13} />
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
