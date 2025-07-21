"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, Variants, useScroll, useTransform } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { ChevronDown, Shield, Headphones, Zap, Lock, Github, Twitter, Instagram, ArrowUp, Coffee } from "lucide-react"
import Image from "next/image"
import React, { Suspense } from 'react'
import ChatSelection from "./chat-selection"    
import Head from 'next/head'
import Link from 'next/link'
import { getOptimalAnimationSettings, shouldReduceAnimations, debounce } from "@/lib/performance-utils"

const GalaxyStarfield = React.lazy(() => import('@/components/galaxy-starfield'))

export default function Home() {
  // Add a key to force re-render when toggling chat selection
  const [renderKey, setRenderKey] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [showChatSelection, setShowChatSelection] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<HTMLElement[]>([]);
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Performance optimization state
  const [animationSettings, setAnimationSettings] = useState(() => {
    // Only call performance functions on client side
    if (typeof window !== 'undefined') {
      return getOptimalAnimationSettings();
    }
    return {
      animationComplexity: 'full',
      enableHeavyAnimations: true,
      reduceMotion: false,
      touchOptimized: false,
      targetFrameRate: 60
    };
  });
  
  const [shouldReduce, setShouldReduce] = useState(false);
  
  // Update performance settings after component mounts
  useEffect(() => {
    setShouldReduce(shouldReduceAnimations());
  }, []);

  // Animation variants with mobile optimization
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduce ? 0.4 : 0.6, 
        ease: [0.4, 0, 0.2, 1],
        type: "tween" as const
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduce ? 0.05 : 0.1,
        when: "beforeChildren"
      }
    }
  };

  const { scrollY } = useScroll();

  const backgroundColor = useTransform(scrollY, [0, 500], ['rgba(10, 0, 10, 0.3)', 'rgba(10, 0, 10, 0.9)']);
  const boxShadow = useTransform(scrollY, [0, 50], ['none', '0 4px 30px rgba(0, 0, 0, 0.1)']);
  const scrollArrowOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  // Helper function to force all content to be visible
  const forceContentVisibility = useCallback(() => {
    console.log('Forcing content visibility');
    
    // Apply the special CSS class to the body
    document.body.classList.add('content-force-visible');
    
    // First pass - Make all animation elements visible
    document.querySelectorAll(
      '.scroll-animate, .stagger-item, .scroll-fade-in, .scroll-scale-in'
    ).forEach(el => {
      el.classList.add('visible');
      // Also apply inline styles as a backup
      (el as HTMLElement).style.opacity = '1';
      (el as HTMLElement).style.visibility = 'visible';
    });
    
    // Second pass - Ensure all sections are visible
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
      section.style.display = 'block';
    });
  }, []);
  
  // Prevent body scroll when chat selection is open
  // and fix visibility when closing
  useEffect(() => {
    if (showChatSelection) {
      document.body.style.overflow = "hidden";
      document.body.classList.remove('content-force-visible');
    } else {
      document.body.style.overflow = "";
      document.body.classList.add('content-force-visible');
      forceContentVisibility();
      setTimeout(forceContentVisibility, 50);
      setTimeout(forceContentVisibility, 300);
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [showChatSelection, forceContentVisibility])

  // Setup intersection observer for initial animations only
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    // Set loading to false after initial render
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Observe all animation elements after initial render
      const animationElements = document.querySelectorAll(
        '.scroll-animate, .stagger-item, .scroll-fade-in, .scroll-scale-in'
      );
      
      animationElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []); // Only run on initial mount

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const testimonials = [
    "The most fun I've had chatting online at Trinity College!",
    "Perfect for Trinity College students and friends!",
    "Finally, a chat app that respects privacy at Trinity!",
    "Love the anonymous feature - no awkward introductions!",
    "GAFADI CHAT changed how our Trinity connects!",
  ]

  // Animation variants for page transitions
  const pageVariants: Variants = {
    initial: { 
      opacity: 0,
      y: 20
    },
    in: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.2, 1],
        type: "tween" as const
      }
    },
    out: { 
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 1, 1],
        type: "tween" as const
      }
    }
  };

  // Add section refs to the array
  const addToSectionsRef = useCallback((element: HTMLElement | null) => {
    if (element && !sectionRefs.current.includes(element)) {
      sectionRefs.current.push(element);
    }
  }, []);

  // Add a section to refs
  const addToSections = useCallback((el: HTMLDivElement | null) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  }, []);

  // Handle PWA installation prompt
  useEffect(() => {
    const handler = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e);
      // Update UI to notify the user they can add to home screen
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    
    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null);
    
    // Hide our custom install prompt
    setShowInstallPrompt(false);
  };

  // Handle scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle scroll restoration when returning from chat
  useEffect(() => {
    const handlePopState = () => {
      // Reset body styles
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      
      // Force scroll to top
      window.scrollTo(0, 0);
      
      // Force content visibility
      forceContentVisibility();
    };

    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [forceContentVisibility]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-screen bg-black text-white overflow-hidden"
    >
      <Head>
        <title>GAFADI CHAT</title>
        <meta name="description" content="GAFADI CHAT is the official chat platform for Trinity International College and other colleges in Nepal. Created by Saksham Jaiswal, it offers anonymous, private, and fast communication for students." />
        <meta name="keywords" content="gafadi chat, guff chat, guffadi chat, saksham jaiswal, who is creator of gafadi chat, trinity college, nepal college chat" />
        <link rel="preload" href="/images/gafadi-logo.webp" as="image" />
      </Head>
      {/* Galaxy Starfield Background */}
      <div className="fixed top-0 left-0 w-screen h-screen pointer-events-none z-0">
        <Suspense fallback={null}>
          <GalaxyStarfield />
        </Suspense>
      </div>
      
      <AnimatePresence mode="wait">
        {showChatSelection ? (
          <ChatSelection key="chat-selection" onClose={() => {
            setShowChatSelection(false);
            // Force rerender without layout changes
            setRenderKey(prev => prev + 1);
            // Immediately try to force content visibility
            setTimeout(() => forceContentVisibility(), 0);
          }} />
        ) : (
          <motion.div
            key={`main-content-${renderKey}`}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="w-full"
          >
            {/* Navigation */}
            <motion.nav
              className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center backdrop-blur-sm bg-black/30 transition-all duration-300"
              style={{
                backgroundColor,
                boxShadow,
              }}
            >
              <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="w-8 h-8 sm:w-10 sm:h-10 relative gafadi-logo-glow"
                >
                  <Image
                    src="/images/gafadi-logo.webp"
                    alt="GAFADI CHAT Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                    priority
                  />
                </motion.div>
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg sm:text-xl font-bold tracking-tight text-gafadi-gold"
                >
                  GAFADI
                </motion.span>
              </div>
              <div className="flex space-x-2 sm:space-x-4">
                <motion.button
                  onClick={() => window.open('https://forms.gle/BW2eYZYjPagbtZiF9', '_blank')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white transition-all shadow-lg hover:shadow-gafadi-gold/20 hover:opacity-90"
                >
                  <Coffee className="w-4 h-4" />
                  <span>Donate us</span>
                </motion.button>
              </div>
            </motion.nav>

            {/* Hero Section */}
            <section
              className="relative z-10 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-32"
              style={{ minHeight: "calc(100vh - 1rem)" }}
            >
              {/* Animated background and effects */}
              <div className="animated-hero-bg"></div>
              {/* Parallax layer (can be used for future parallax content) */}
              <div className="parallax-layer"></div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                className="w-full max-w-2xl mx-auto flex flex-col items-center z-20 mt-[-4rem]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="mb-6 flex flex-col items-center hero-logo-container"
                >
                  <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mb-4 gafadi-logo-glow hero-glow">
                    <Image
                      src="/images/gafadi-logo.webp"
                      alt="GAFADI CHAT - Official Chat Platform for Trinity International College"
                      width={192}
                      height={192}
                      className="object-contain w-full h-full clip-triangle"
                      priority
                    />
                  </div>
                  <h1 className="tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl hero-text-glow pop-black-shadow">
                    <span className="text-white font-komika">
                      GAFADI CHAT
                    </span>
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-200 mt-4">
                    The Next Generation of College Communication
                  </p>
                  <p className="text-sm text-gray-300 mt-2">
                    Under SJCRUX
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="font-light mb-8 h-8 text-lg sm:text-xl md:text-2xl lg:text-3xl"
                >
                  <TypeAnimation
                    sequence={["Anonymous.", 1000, "Anonymous. Private.", 1000, "Anonymous. Private. Voice Chat.", 2000]}
                    wrapper="span"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                    className="text-gray-300"
                  />
                </motion.div>

                <motion.button
                  onClick={() => {
                    setShowChatSelection(true);
                    const animationElements = document.querySelectorAll(
                      '.scroll-animate, .stagger-item, .scroll-fade-in, .scroll-scale-in'
                    );
                    animationElements.forEach((el) => el.classList.remove('visible'));
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 text-lg md:text-xl font-medium rounded-2xl bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white transition-all shadow-lg hover:shadow-gafadi-gold/20 mt-4 hero-btn-glow pop-black-shadow hover:opacity-90"
                >
                  Start Chatting
                </motion.button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
                className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center bottom-2 md:bottom-2 lg:bottom-2 xl:bottom-0 scroll-arrow-glow z-20 md:hidden"
                style={{ opacity: scrollArrowOpacity }}
              >
                <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
                >
                  <ChevronDown className="w-6 h-6 text-gafadi-gold" />
                </motion.div>
              </motion.div>
            </section>

            {/* Features Section */}
            <section
              ref={addToSectionsRef}
              className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-[#0A000A] scroll-animate"
            >
              <div className="max-w-7xl mx-auto">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-center mb-16 scroll-animate"
                >
                  <span className="animate-gradient-shift animate-medium">
                    Features for College Students
                  </span>
                </h2>

                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gafadi-gold/20 animate-pulse">
                        <div className="w-8 h-8 bg-gafadi-gold/20 rounded-full mb-4"></div>
                        <div className="h-6 bg-gafadi-gold/20 rounded w-3/4 mb-2"></div>
                        <div className="h-4 bg-gafadi-gold/20 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      {
                        icon: <Shield className="w-8 h-8 text-gafadi-gold" />,
                        title: "Secure & Private",
                        description: "End-to-end encryption for all college student conversations"
                      },
                      {
                        icon: <Zap className="w-8 h-8 text-gafadi-gold" />,
                        title: "Lightning Fast",
                        description: "Real-time messaging with minimal latency for college students"
                      },
                      {
                        icon: <Headphones className="w-8 h-8 text-gafadi-gold" />,
                        title: "24/7 Support",
                        description: "Our team is always here to help college students"
                      }
                    ].map((feature, index) => (
                      <div
                        key={index}
                        className="bg-black/30 backdrop-blur-sm p-6 rounded-lg border border-gafadi-gold/20 hover:border-gafadi-gold/50 transition-all duration-300 scroll-animate"
                      >
                        <div className="mb-4">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-200">{feature.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* How It Works */}
            <section ref={addToSectionsRef} className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-black md:-mt-20">
              <div className="max-w-7xl mx-auto">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-center mb-16 scroll-animate"
                >
                  <span className="animate-gradient-shift animate-medium">
                    How Students Use GAFADI
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                  {[
                    {
                      number: "01",
                      title: "Easy Interface",
                      description: "Simple, intuitive design that any college student can use without a learning curve.",
                    },
                    {
                      number: "02",
                      title: "Fast Real-time Messaging",
                      description: "Messages deliver instantly with typing indicators and read receipts for students.",
                    },
                    {
                      number: "03",
                      title: "Secure and Private",
                      description: "End-to-end encryption and privacy-first approach to keep college conversations safe.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="relative stagger-item scroll-animate"
                    >
                      <div className="flex items-start">
                        <span className="text-5xl font-bold text-gafadi-gold/60 mr-4">{step.number}</span>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                          <p className="text-gray-200">{step.description}</p>
                        </div>
                      </div>
                      {index < 2 && (
                        <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                          <div className="w-12 h-0.5 bg-gradient-to-r from-gafadi-gold to-transparent"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Testimonials - Fixed to show one testimonial at a time clearly */}
            <section
              ref={addToSectionsRef}
              className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A000A] to-black overflow-hidden scroll-animate"
            >
              <div className="max-w-7xl mx-auto">
                <h2
                  className="text-3xl sm:text-4xl font-bold text-center mb-16 scroll-animate"
                >
                  <span className="animate-gradient-shift animate-medium">
                    What Students Say
                  </span>
                </h2>

                <div className="relative h-32 overflow-hidden scroll-scale-in">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentTestimonial}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 flex items-center justify-center text-center"
                    >
                      <p className="text-xl md:text-2xl font-light italic text-gray-200">
                        "{testimonials[currentTestimonial]}"
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Testimonial indicators */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-3 mt-4">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-4 h-4 rounded-full transition-all ${
                          currentTestimonial === index ? "bg-gafadi-gold w-6" : "bg-gray-400"
                        }`}
                        aria-label={`View testimonial ${index + 1}`}
                      ></button>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 text-center scroll-animate">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl sm:text-4xl font-bold mb-8">
                  Ready to experience the future of chat?
                </h2>
                <button
                  onClick={() => setShowChatSelection(true)}
                  className="px-6 py-3 text-lg font-medium rounded-2xl bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white transition-all shadow-lg hover:shadow-gafadi-gold/20 hover:opacity-90"
                >
                  Start Chatting Now
                </button>
              </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 bg-black border-t border-gafadi-gold/10 mt-8">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
                {/* Logo & About */}
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 relative gafadi-logo-glow">
                      <Image
                        src="/images/gafadi-logo.webp"
                        alt="GAFADI CHAT - Trinity International College Official Chat Platform"
                        width={40}
                        height={40}
                        className="object-contain w-full h-full"
                        priority
                      />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-gafadi-gold">GAFADI CHAT</span>
                  </div>
                  <p className="text-gray-400 text-sm max-w-xs">
                    GAFADI CHAT is the next generation of college communication platform. Created by Saksham Jaiswal, it enables students to connect, chat, and collaborate securely and anonymously with their college community.
                  </p>
                </div>
                {/* Useful Links */}
                <div>
                  <h3 className="text-lg font-semibold text-gafadi-gold mb-4">Useful Links</h3>
                  <ul className="space-y-2">
                    <li>
                      <div className="inline-block rounded-md bg-gradient-to-r from-gafadi-gold to-gafadi-red p-[1.5px] gradient-outline-animated">
                        <Link href="/creator" className="relative z-10 block px-2 py-1 rounded-[calc(0.25rem-1.5px)] bg-black text-gray-200 hover:text-gafadi-gold transition-colors">
                          Creator's Info
                        </Link>
                      </div>
                    </li>
                    <li><Link href="/about" className="text-gray-200 hover:text-gafadi-gold transition-colors">About</Link></li>
                    <li><Link href="/features" className="text-gray-200 hover:text-gafadi-gold transition-colors">Features</Link></li>
                    <li><Link href="/privacy" className="text-gray-200 hover:text-gafadi-gold transition-colors">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="text-gray-200 hover:text-gafadi-gold transition-colors">Terms</Link></li>
                    <li><Link href="/contact" className="text-gray-200 hover:text-gafadi-gold transition-colors">Contact</Link></li>
                  </ul>
                </div>
                {/* Social Media */}
                <div>
                  <h3 className="text-lg font-semibold text-gafadi-gold mb-4">Follow Us</h3>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://www.facebook.com/profile.php?id=61577880167661" className="flex items-center space-x-2 text-gray-200 hover:text-gafadi-gold transition-colors" target="_blank" rel="noopener noreferrer">
                        {/* Facebook SVG icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="20" height="20"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0z"/></svg>
                        <span>Facebook</span>
                      </a>
                    </li>
                    <li>
                      <a href="https://www.instagram.com/gafadichat/" className="flex items-center space-x-2 text-gray-200 hover:text-gafadi-gold transition-colors" target="_blank" rel="noopener noreferrer">
                        <Instagram size={20} />
                        <span>Instagram</span>
                      </a>
                    </li>
                  </ul>
                </div>
                {/* Newsletter or Contact */}
                <div>
                  <h3 className="text-lg font-semibold text-gafadi-gold mb-4">Send Message</h3>
                  <form
                    className="flex flex-col space-y-3"
                    onSubmit={e => {
                      e.preventDefault();
                      const form = e.target as HTMLFormElement;
                      const emailInput = form.elements.namedItem('sender-email') as HTMLInputElement;
                      const email = emailInput.value;
                      window.location.href = `mailto:cgafadi@gmail.com?subject=Message%20from%20${encodeURIComponent(email)}`;
                    }}
                  >
                    <input
                      type="email"
                      name="sender-email"
                      placeholder="Your email address"
                      required
                      className="px-3 py-2 rounded bg-black border border-gafadi-gold/20 text-gray-200 focus:outline-none focus:border-gafadi-gold"
                      aria-label="Your email address"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white font-medium transition-all hover:opacity-90"
                    >
                      Send Email
                    </button>
                  </form>
                </div>
              </div>
              <div className="max-w-7xl mx-auto mt-8 border-t border-gafadi-gold/10 pt-6 flex flex-col md:flex-row justify-between items-center text-gray-300 text-sm">
                <span>&copy; {new Date().getFullYear()} GAFADI CHAT. All rights reserved.</span>
                <span>Made with <span className="text-gafadi-gold">&#10084;</span> by Saksham Jaiswal</span>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install PWA Prompt */}
      <AnimatePresence>
        {showInstallPrompt && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 z-50 bg-black/90 backdrop-blur-sm border border-gafadi-gold/20 rounded-lg p-4 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                <Image
                  src="/images/gafadi-logo.webp"
                  alt="GAFADI CHAT Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div className="flex-grow">
                <p className="text-sm text-white">Install GAFADI CHAT for a better experience</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowInstallPrompt(false)}
                  className="px-3 py-1 text-sm text-gray-400 hover:text-white transition-colors"
                >
                  Not now
                </button>
                <button
                  onClick={handleInstallClick}
                  className="px-3 py-1 text-sm bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white rounded hover:opacity-90"
                >
                  Install
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="fixed bottom-4 left-4 z-50 p-3 rounded-full bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white shadow-lg transition-all hover:shadow-gafadi-gold/20 hover:opacity-90"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}