/**
 * ARCO Micro-Animations System
 * Elegant micro-interactions using Framer Motion for enhanced UX
 */

import { Variants } from 'framer-motion';

// === PAGE TRANSITIONS ===
export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: "easeOut" }
};

// === STAGGER ANIMATIONS ===
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      duration: 0.6
    }
  }
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// === HOVER ANIMATIONS ===
export const hoverLift = {
  hover: { 
    scale: 1.02, 
    y: -2,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const hoverScale = {
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  tap: { 
    scale: 0.95,
    transition: { duration: 0.1 }
  }
};

export const hoverGlow = {
  hover: {
    boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)",
    transition: { duration: 0.3 }
  }
};

// === ENTRANCE ANIMATIONS ===
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "backOut" }
  }
};

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 100 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

// === LOADING ANIMATIONS ===
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

export const spinAnimation = {
  rotate: 360,
  transition: {
    duration: 1,
    repeat: Infinity,
    ease: "linear"
  }
};

export const bounceAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 0.6,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// === ATTENTION ANIMATIONS ===
export const shakeAnimation = {
  x: [0, -2, 2, -2, 2, 0],
  transition: {
    duration: 0.5,
    ease: "easeInOut"
  }
};

export const wobbleAnimation = {
  rotate: [0, -3, 3, -3, 3, 0],
  transition: {
    duration: 0.6,
    ease: "easeInOut"
  }
};

export const flashAnimation = {
  opacity: [1, 0.5, 1],
  transition: {
    duration: 0.4,
    ease: "easeInOut"
  }
};

// === SCROLL ANIMATIONS ===
export const scrollFadeIn: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

export const scrollSlideIn: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export const scrollScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.3 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "backOut" }
  }
};

// === MORPHING ANIMATIONS ===
export const morphButton = {
  idle: { borderRadius: "8px" },
  hover: { 
    borderRadius: "20px",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

export const morphCard = {
  idle: { borderRadius: "12px" },
  hover: { 
    borderRadius: "24px",
    transition: { duration: 0.4, ease: "easeInOut" }
  }
};

// === NAVIGATION ANIMATIONS ===
export const navItemAnimation = {
  hover: {
    scale: 1.1,
    color: "#3b82f6",
    transition: { duration: 0.2 }
  }
};

export const mobileMenuAnimation: Variants = {
  closed: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: "easeInOut" }
  },
  open: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

// === MODAL ANIMATIONS ===
export const modalOverlay: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  }
};

export const modalContent: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.9,
    y: 20
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { 
      duration: 0.4, 
      ease: "easeOut",
      delay: 0.1
    }
  }
};

// === PROGRESS ANIMATIONS ===
export const progressBar = {
  initial: { width: "0%" },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: { duration: 0.8, ease: "easeOut" }
  })
};

export const counterAnimation = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.3 }
  }
};

// === BACKGROUND ANIMATIONS ===
export const gradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

// === CUSTOM EASING CURVES ===
export const customEasing = {
  gentle: [0.25, 0.46, 0.45, 0.94],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
  dramatic: [0.25, 0.46, 0.45, 0.94]
};

// === VIEWPORT SETTINGS ===
export const defaultViewport = {
  once: true,
  margin: "-50px",
  amount: 0.3
};

export const lazyViewport = {
  once: true,
  margin: "-100px",
  amount: 0.1
};

export const eagerViewport = {
  once: false,
  margin: "0px",
  amount: 0.5
};
