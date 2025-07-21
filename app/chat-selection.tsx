"use client"

import React from 'react';
import styles from './chat-selection.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from "react"
import { VenetianMaskIcon as Mask, Lock, Headphones, X } from "lucide-react"
import Image from "next/image"
import GalaxyStarfield from "@/components/galaxy-starfield"
import { RocketIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ChatSelectionProps {
  onClose: () => void
}

const ChatSelection: React.FC<ChatSelectionProps> = ({ onClose }) => {
  const router = useRouter();
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [showingDevelopmentMessageId, setShowingDevelopmentMessageId] = useState<string | null>(null);

  // Handle click outside - improved version
  useEffect(() => {
    // We'll use mousedown for detecting the start of a click
    const handleMouseDown = (event: MouseEvent) => {
      // If the click started outside of content area
      if (containerRef.current && !contentRef.current?.contains(event.target as Node)) {
        // Check if we're not clicking on a button that might trigger other actions
        const target = event.target as HTMLElement;
        const isButton = target.tagName === 'BUTTON' || 
                        target.closest('button') || 
                        target.role === 'button';
        
        if (!isButton) {
          // Force visibility of animation elements
          document.querySelectorAll(
            '.scroll-animate, .stagger-item, .scroll-fade-in, .scroll-scale-in'
          ).forEach(el => {
            el.classList.add('visible');
          });
          
          onClose();
          event.preventDefault();
          event.stopPropagation();
        }
      }
    };
    
    // Use a slight delay to prevent immediate closing when opening
    const timer = setTimeout(() => {
      // Add the event listener directly to containerRef for better accuracy
      containerRef.current?.addEventListener('mousedown', handleMouseDown as EventListener);
    }, 150);

    return () => {
      clearTimeout(timer);
      containerRef.current?.removeEventListener('mousedown', handleMouseDown as EventListener);
      // Also clean up the document event listener as a fallback
      document.removeEventListener('mousedown', handleMouseDown);
    };
  }, [onClose]);

  // Handle cleanup and state management
  useEffect(() => {
    // Store the current scroll position
    const scrollPos = window.scrollY;
    
    // Prevent body scroll while chat selection is open
    document.body.style.overflow = "hidden";
    
    // Add a class to the body for additional styling if needed
    document.body.classList.add('chat-selection-open');
    
    return () => {
      // Cleanup function
      document.body.style.overflow = "";
      document.body.classList.remove('chat-selection-open');
      
      // Restore scroll position after a short delay
      // to ensure the DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo(0, scrollPos);
      });
    };
  }, []);

  const handleClose = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    
    // Force all animation elements to be visible before closing
    document.querySelectorAll(
      '.scroll-animate, .stagger-item, .scroll-fade-in, .scroll-scale-in'
    ).forEach(el => {
      el.classList.add('visible');
    });
    
    // Apply inline styles to ensure all sections are visible
    document.querySelectorAll('section').forEach(section => {
      section.style.opacity = '1';
      section.style.visibility = 'visible';
    });
    
    // Then trigger the close callback
    onClose();
  }, [onClose]);

  const chatOptions = [
    {
      id: "anonymous",
      title: "Anonymous Chat",
      description: "Chat without revealing your identity",
      icon: <Mask className="w-12 h-12" />,
    },
    {
      id: "private",
      title: "Private Chat",
      description: "Secure, encrypted conversations",
      icon: <Lock className="w-12 h-12" />,
      isComingSoon: true,
    },
    {
      id: "voice",
      title: "Voice Chat",
      description: "Talk in real-time with others",
      icon: <Headphones className="w-12 h-12" />,
      // isComingSoon: true, // Remove this line to enable the button
    },
    {
        id: "comingSoon",
        title: "COMING SOON...",
        description: "Exciting new features are on the way!",
        icon: <RocketIcon className="w-12 h-12" />,
        isComingSoon: true,
    }
  ]

  const handleChatSelect = (optionId: string, isComingSoon: boolean) => {
    if (isComingSoon) {
      // Show development message inside the button
      if (showingDevelopmentMessageId !== optionId) { // Prevent multiple clicks on the same button from resetting timer
        setShowingDevelopmentMessageId(optionId);
        // Hide the message after 4 seconds
        setTimeout(() => {
          setShowingDevelopmentMessageId(null);
        }, 4000);
      }
    } else { // Proceed only if not a coming soon button
        onClose();
        // Use Next.js router for navigation
        router.push(`/${optionId}`);
    }
  }

  // Variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  }

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24, delay: 0.2 },
    },
    exit: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  }

  return (
    <motion.div
      ref={containerRef}
      className={styles.overlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Galaxy Starfield Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GalaxyStarfield />
      </div>

      <motion.div
        ref={contentRef}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={handleClose} className={styles.closeButton}>
          <X size={24} />
        </button>
        <h2 className={styles.title}>Choose Chat Type</h2>
        <div className={styles.options}>
          {chatOptions.map((option) => (
            <motion.button
              key={option.id}
              variants={itemVariants}
              className={`${styles.option} ${styles[option.id]} ${option.isComingSoon ? styles.comingSoon : ''}`}
              onMouseEnter={() => setHoveredButton(option.id)}
              onMouseLeave={() => setHoveredButton(null)}
              onClick={() => handleChatSelect(option.id, !!option.isComingSoon)}
              whileHover={option.isComingSoon ? {} : { y: -3 }}
              whileTap={option.isComingSoon ? {} : { y: 0, scale: 0.98 }}
            >
              <div className={styles.card}>
                <AnimatePresence mode="wait">
                  {showingDevelopmentMessageId === option.id ? (
                    <motion.div
                      key="developmentMessage"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={styles.developmentMessageContent}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', textAlign: 'center' }}
                    >
                      This feature is currently under development.
                      <div className={styles.developmentMessageIndicator} style={{ animation: `${styles.hideDevelopmentMessageIndicator} 4s linear forwards` }}></div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="buttonContent"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={styles.buttonContent}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', width: '100%', textAlign: 'center' }}
                    >
                      <div className={styles.iconContainer}>
                        <div className={styles.iconInner}>{option.icon}</div>
                      </div>
                      <h3 className={styles.optionTitle}>{option.title}</h3>
                      <p className={styles.description}>{option.description}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ChatSelection
