"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import Marquee from "react-fast-marquee"

// Add TypeScript declaration for Calendly to fix linter error
declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
    };
  }
}

export default function EntalogicsHero() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const lastOffset = useRef({ x: 0, y: 0 })
  const lastTouchDistance = useRef(0)
  const lastTouchCenter = useRef({ x: 0, y: 0 })
  const doubleTapTimeout = useRef<NodeJS.Timeout | null>(null)
  const lastTap = useRef(0)
  const autoScrollPaused = useRef(false)
  const marqueeDrag = useRef({ dragging: false, startX: 0, scrollLeft: 0 })
  const [emblaApi, setEmblaApi] = useState<any>(null)

  // Add scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Load Calendly script
  useEffect(() => {
    // Add Calendly CSS
    const link = document.createElement("link")
    link.href = "https://assets.calendly.com/assets/external/widget.css"
    link.rel = "stylesheet"
    document.head.appendChild(link)

    // Add Calendly JS
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.type = "text/javascript"
    script.async = true
    document.head.appendChild(script)

    return () => {
      // Cleanup
      document.head.removeChild(link)
      document.head.removeChild(script)
    }
  }, [])

  // Calendly popup function
  const openCalendly = () => {
    if (typeof window !== "undefined" && window.Calendly?.initPopupWidget) {
      window.Calendly.initPopupWidget({ url: "https://calendly.com/danialahmad2318" })
    }
  }

  // Theme toggle function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Theme classes with stark contrast
  const themeClasses = {
    // Main backgrounds - stark contrast
    mainBg: isDarkMode
      ? "bg-gradient-to-br from-black via-gray-900 to-black"
      : "bg-gradient-to-br from-white via-gray-50 to-white",

    // Text colors - maximum contrast
    primaryText: isDarkMode ? "text-white" : "text-black",
    secondaryText: isDarkMode ? "text-gray-300" : "text-gray-800",
    mutedText: isDarkMode ? "text-gray-500" : "text-gray-600",

    // Card backgrounds - subtle depth
    cardBg: isDarkMode
      ? "bg-gray-900/60 backdrop-blur-sm border-gray-800"
      : "bg-white/60 backdrop-blur-sm border-gray-200",

    // Header background - glassmorphism
    headerBg: isDarkMode
      ? "backdrop-blur-xl bg-black/40 border-gray-800"
      : "backdrop-blur-xl bg-white/40 border-gray-200",

    // Accent colors - electric neon
    accentPrimary: "from-cyan-400 to-cyan-500", // Neon cyan
    accentSecondary: "from-orange-400 to-orange-500", // Electric orange
    accentPrimaryHover: "from-cyan-300 to-cyan-400",
    accentSecondaryHover: "from-orange-300 to-orange-400",

    // Button styles - stark with neon accents
    primaryButton: isDarkMode
      ? "bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 text-black font-bold shadow-lg shadow-cyan-500/25"
      : "bg-black hover:bg-gray-900 text-white font-bold shadow-lg",

    secondaryButton: isDarkMode
      ? "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-black font-bold shadow-lg shadow-orange-500/25"
      : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-300 hover:to-orange-400 text-white font-bold shadow-lg",

    // Special elements
    glowEffect: isDarkMode ? "shadow-cyan-500/20" : "shadow-gray-900/20",
    borderAccent: isDarkMode ? "border-cyan-400/30" : "border-gray-900/30",
  }

  const portfolioItems = [
    {
      id: 1,
      title: "Coming Soon",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-gray-800 to-gray-900" : "from-gray-100 to-gray-200",
      isComingSoon: true,
    },
    {
      id: 2,
      title: "Yoga & Fitness Website",
      image: "/portfolio-sample.jpg",
      color: isDarkMode ? "from-cyan-900/30 to-cyan-800/30" : "from-cyan-50 to-cyan-100",
      isComingSoon: false,
      link: "https://entalogics.com/",
      linkLabel: "Software Agency",
    },
    {
      id: 3,
      title: "Dental Clinic Website",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-orange-900/30 to-orange-800/30" : "from-orange-50 to-orange-100",
      isComingSoon: false,
    },
    {
      id: 4,
      title: "Real Estate Platform",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-gray-800 to-gray-700" : "from-gray-200 to-gray-300",
      isComingSoon: false,
    },
    {
      id: 5,
      title: "E-Commerce Store",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-green-900/30 to-green-800/30" : "from-green-50 to-green-100",
      isComingSoon: false,
    },
    {
      id: 6,
      title: "Portfolio Website",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-blue-900/30 to-blue-800/30" : "from-blue-50 to-blue-100",
      isComingSoon: false,
    },
    {
      id: 7,
      title: "Restaurant Website",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-red-900/30 to-red-800/30" : "from-red-50 to-red-100",
      isComingSoon: false,
    },
    {
      id: 8,
      title: "Travel Blog",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-yellow-900/30 to-yellow-800/30" : "from-yellow-50 to-yellow-100",
      isComingSoon: false,
    },
    {
      id: 9,
      title: "Corporate Landing Page",
      image: "/placeholder.svg?height=400&width=600",
      color: isDarkMode ? "from-purple-900/30 to-purple-800/30" : "from-purple-50 to-purple-100",
      isComingSoon: false,
    },
  ]

  const services = [
    "END-TO-END WEB DEVELOPMENT",
    "CUSTOM WEBSITE DESIGN",
    "LANDING PAGE",
    "E-COMMERCE WEBSITE",
    "WEBSITE OPTIMIZATION",
    "SEO (SEARCH ENGINE OPTIMIZATION)",
  ]

  const processSteps = [
    {
      id: 1,
      title: "Discovery & Strategy",
      description:
        "We dive deep into your business goals, target audience, and competitive landscape to create a strategic roadmap for your digital success.",
    },
    {
      id: 2,
      title: "Design & Development",
      description:
        "Our expert team brings your vision to life with pixel-perfect designs and clean, scalable code that performs flawlessly.",
    },
    {
      id: 3,
      title: "Testing & Optimization",
      description:
        "We rigorously test every element, optimize for speed and SEO, and ensure your website converts visitors into customers.",
    },
    {
      id: 4,
      title: "Launch & Support",
      description: "After a smooth launch, we provide ongoing support, maintenance, and optimization to keep your website ahead of the competition.",
    },
  ]

  const faqData = [
    {
      id: 1,
      question: "What WordPress development services do you offer?",
      answer:
        "We offer comprehensive WordPress development including custom themes, plugins, WooCommerce stores, membership sites, and integrations with popular page builders like Elementor, WPBakery, and Divi. We also handle ongoing maintenance and performance optimization.",
    },
    {
      id: 2,
      question: "Can you help with eCommerce website development?",
      answer:
        "Absolutely! We specialize in WooCommerce development, marketplace solutions, payment gateway integrations, and conversion optimization. We can build anything from simple online stores to complex multi-vendor marketplaces.",
    },
    {
      id: 3,
      question: "Do you develop custom web applications?",
      answer:
        "Yes, we build custom web applications using modern technologies like React, Next.js, Laravel, and Node.js. From admin dashboards to SaaS platforms, we create scalable solutions tailored to your specific business needs.",
    },
    {
      id: 4,
      question: "How do you handle SEO and performance optimization?",
      answer:
        "We implement technical SEO best practices, optimize Core Web Vitals, set up proper meta tags and schema markup, and ensure your website loads fast. We also provide ongoing SEO maintenance and performance monitoring.",
    },
    {
      id: 5,
      question: "Can you migrate my existing website to a new platform?",
      answer:
        "Yes, we handle website migrations from any platform to WordPress, Shopify, or custom solutions. We ensure zero downtime, preserve your SEO rankings, and optimize the new site for better performance.",
    },
    {
      id: 6,
      question: "What are your pricing and project timelines?",
      answer:
        "Our pricing varies based on project complexity and requirements. Simple websites typically take 1-2 weeks, while complex projects may take 3-4 weeks. We offer transparent pricing with no hidden fees and provide detailed proposals before starting any project.",
    },
  ]

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  // Smooth scroll to section function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const ZoomControls = () => (
    <div className="absolute top-2 right-16 flex space-x-2 z-10">
      <button
        onClick={e => { e.stopPropagation(); setZoom(z => Math.max(1, z - 0.2)) }}
        className="bg-white/80 hover:bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow border border-gray-300 text-xl font-bold"
        aria-label="Zoom out"
        tabIndex={0}
      >
        -
      </button>
      <button
        onClick={e => { e.stopPropagation(); setZoom(z => Math.min(3, z + 0.2)) }}
        className="bg-white/80 hover:bg-white text-black rounded-full w-9 h-9 flex items-center justify-center shadow border border-gray-300 text-xl font-bold"
        aria-label="Zoom in"
        tabIndex={0}
      >
        +
      </button>
    </div>
  )

  // Prevent page scroll/zoom when popup is open
  useEffect(() => {
    // Store original viewport meta
    let originalViewport: string | null = null;
    const meta = document.querySelector('meta[name="viewport"]');
    if (selectedImage) {
      document.body.classList.add('overflow-hidden');
      document.documentElement.style.touchAction = 'none';
      // Disable pinch-zoom
      if (meta) {
        originalViewport = meta.getAttribute('content');
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      } else {
        const newMeta = document.createElement('meta');
        newMeta.name = 'viewport';
        newMeta.content = 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no';
        document.head.appendChild(newMeta);
      }
    } else {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.style.touchAction = '';
      // Restore pinch-zoom
      if (meta && originalViewport) {
        meta.setAttribute('content', originalViewport);
      }
      setZoom(1)
      setOffset({ x: 0, y: 0 })
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.documentElement.style.touchAction = '';
      // Restore pinch-zoom
      if (meta && originalViewport) {
        meta.setAttribute('content', originalViewport);
      }
    };
  }, [selectedImage]);

  // Helper for pinch distance
  function getTouchDistance(e: TouchEvent | React.TouchEvent) {
    if (e.touches.length < 2) return 0;
    const [a, b] = Array.from(e.touches);
    return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
  }
  function getTouchCenter(e: TouchEvent | React.TouchEvent) {
    if (e.touches.length < 2) return { x: 0, y: 0 };
    const [a, b] = Array.from(e.touches);
    return { x: (a.clientX + b.clientX) / 2, y: (a.clientY + b.clientY) / 2 };
  }

  // Mouse/touch drag handlers
  function handlePointerDown(e: React.MouseEvent | React.TouchEvent) {
    if (zoom === 1) return;
    setIsDragging(true);
    if ('touches' in e) {
      if (e.touches.length === 1) {
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        lastOffset.current = { ...offset };
      } else if (e.touches.length === 2) {
        lastTouchDistance.current = getTouchDistance(e);
        lastTouchCenter.current = getTouchCenter(e);
        lastOffset.current = { ...offset };
      }
    } else {
      dragStart.current = { x: e.clientX, y: e.clientY };
      lastOffset.current = { ...offset };
    }
  }
  function handlePointerMove(e: React.MouseEvent | React.TouchEvent) {
    if (!isDragging && !('touches' in e && e.touches && e.touches.length === 2)) return;
    if ('touches' in e) {
      if (e.touches.length === 1 && isDragging) {
        const dx = e.touches[0].clientX - dragStart.current.x;
        const dy = e.touches[0].clientY - dragStart.current.y;
        setOffset({ x: lastOffset.current.x + dx, y: lastOffset.current.y + dy });
      } else if (e.touches.length === 2) {
        // Pinch to zoom
        const dist = getTouchDistance(e);
        const center = getTouchCenter(e);
        let newZoom = zoom * (dist / (lastTouchDistance.current || dist));
        newZoom = Math.max(1, Math.min(3, newZoom));
        // Adjust offset so pinch center stays fixed
        const scaleChange = newZoom / zoom;
        setOffset(prev => ({
          x: (prev.x - center.x) * scaleChange + center.x,
          y: (prev.y - center.y) * scaleChange + center.y,
        }));
        setZoom(newZoom);
        // Move image with pinch center
        const dx = center.x - lastTouchCenter.current.x;
        const dy = center.y - lastTouchCenter.current.y;
        setOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      }
    } else if (isDragging) {
      const dx = (e as React.MouseEvent).clientX - dragStart.current.x;
      const dy = (e as React.MouseEvent).clientY - dragStart.current.y;
      setOffset({ x: lastOffset.current.x + dx, y: lastOffset.current.y + dy });
    }
  }
  function handlePointerUp(e: React.MouseEvent | React.TouchEvent) {
    setIsDragging(false);
  }

  // Double-click/double-tap to zoom
  function handleDoubleClick(e: React.MouseEvent | React.TouchEvent) {
    e.preventDefault();
    if (zoom === 1) {
      setZoom(2);
    } else {
      setZoom(1);
      setOffset({ x: 0, y: 0 });
    }
  }
  function handleTouchEnd(e: React.TouchEvent) {
    setIsDragging(false);
    // Double-tap detection
    const now = Date.now();
    if (now - lastTap.current < 300) {
      handleDoubleClick(e);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  }

  // Smooth auto-scroll using Embla API
  useEffect(() => {
    console.log('Auto-scroll useEffect triggered, emblaApi:', emblaApi);
    if (!emblaApi) {
      console.log('No emblaApi available, returning');
      return;
    }
    console.log('Setting up auto-scroll interval');
    const interval = setInterval(() => {
      if (!autoScrollPaused.current && emblaApi) {
        console.log('Auto-scrolling to next slide');
        emblaApi.scrollNext();
      }
    }, 2000); // Change 2000 to your desired interval in ms
    return () => {
      console.log('Clearing auto-scroll interval');
      clearInterval(interval);
    };
  }, [emblaApi]);

  function handleMarqueeDragStart(e: React.MouseEvent | React.TouchEvent) {
    marqueeDrag.current.dragging = true
    marqueeDrag.current.startX = 'touches' in e ? e.touches[0].clientX : e.clientX
    marqueeDrag.current.scrollLeft = e.currentTarget.scrollLeft
  }
  function handleMarqueeDragMove(e: React.MouseEvent | React.TouchEvent) {
    if (!marqueeDrag.current.dragging) return
    const x = 'touches' in e ? e.touches[0].clientX : e.clientX
    const walk = marqueeDrag.current.startX - x
    e.currentTarget.scrollLeft = marqueeDrag.current.scrollLeft + walk
  }
  function handleMarqueeDragEnd(e: React.MouseEvent | React.TouchEvent) {
    marqueeDrag.current.dragging = false
  }

  return (
    <div
      className={`min-h-screen ${themeClasses.mainBg} ${themeClasses.primaryText} relative overflow-hidden transition-all duration-700`}
    >
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-slide {
          animation: slide 25s linear infinite;
        }
        
        .animate-slide:hover {
          animation-play-state: paused;
        }

        @keyframes glow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
      `}</style>

      {/* Background Pattern - Minimal dots */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: isDarkMode
              ? `radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                 radial-gradient(circle at 75% 75%, rgba(251, 146, 60, 0.1) 1px, transparent 1px)`
              : `radial-gradient(circle at 25% 25%, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
                 radial-gradient(circle at 75% 75%, rgba(0, 0, 0, 0.05) 1px, transparent 1px)`,
            backgroundSize: "80px 80px, 120px 120px",
          }}
        ></div>
      </div>

      {/* Mobile-Responsive Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className={`transition-all duration-700 ${isScrolled ? "pt-4 px-4" : "py-4 px-4"}`}>
          <div
            className={`transition-all duration-700 ${
              isScrolled
                ? "bg-black/95 backdrop-blur-xl rounded-2xl py-3 px-6 max-w-2xl mx-auto shadow-lg shadow-black/20"
                : "bg-transparent py-0 px-0 max-w-7xl mx-auto"
            }`}
          >
            {/* Mobile Layout */}
            <div className="flex md:hidden items-center justify-between">
              {/* Logo */}
              <div
                className={`font-bold transition-all duration-500 ${
                  isScrolled ? "text-white text-lg" : `${themeClasses.primaryText} text-lg`
                }`}
              >
                {isScrolled ? "E." : "Evokode"}
              </div>

              {/* Mobile Actions */}
              <div className="flex items-center space-x-3">
                {/* Theme Toggle - Hide when scrolled */}
                {!isScrolled && (
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
                        : "bg-gray-100 hover:bg-gray-200 text-orange-500 hover:shadow-lg"
                    }`}
                  >
                    {isDarkMode ? (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                )}

                {/* Mobile CTA Button */}
                <button
                  onClick={openCalendly}
                  className={`transition-all duration-500 hover:transform hover:-translate-y-0.5 px-3 py-2 rounded-lg text-sm font-medium shadow-lg
                    bg-[rgb(81,47,235)] text-white
                    sm:${themeClasses.primaryButton} sm:rounded-lg sm:px-3 sm:py-2 sm:text-sm`}
                >
                  {isScrolled ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  ) : (
                    "Chat →"
                  )}
                </button>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between relative w-full" style={{zIndex: 20}}>
              {/* Logo */}
              <div
                className={`font-bold transition-all duration-500 ${
                  isScrolled ? "text-white text-xl" : `${themeClasses.primaryText} text-xl`
                }`}
                style={{ minWidth: 120 }}
              >
                {isScrolled ? "E." : "Evokode"}
              </div>

              {/* Navigation - Absolutely centered, with pointer-events-none to avoid overlap issues */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-max">
                <nav className="flex space-x-8 pointer-events-auto nav-menu">
                  <button
                    onClick={() => scrollToSection("works")}
                    className={`transition-all duration-500 font-medium whitespace-nowrap relative group text-lg ${
                      isScrolled
                        ? "text-gray-300 hover:text-[rgb(81,47,235)]"
                        : `${themeClasses.secondaryText} hover:text-[rgb(81,47,235)]`
                    }`}
                  >
                    Works
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        isScrolled
                          ? "bg-gradient-to-r from-purple-400 to-blue-400"
                          : "bg-gradient-to-r from-cyan-400 to-cyan-500"
                      }`}
                    ></span>
                  </button>
                  <button
                    onClick={() => scrollToSection("benefits")}
                    className={`transition-all duration-500 font-medium whitespace-nowrap relative group text-lg ${
                      isScrolled
                        ? "text-gray-300 hover:text-[rgb(81,47,235)]"
                        : `${themeClasses.secondaryText} hover:text-[rgb(81,47,235)]`
                    }`}
                  >
                    Benefits
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        isScrolled
                          ? "bg-gradient-to-r from-purple-400 to-blue-400"
                          : "bg-gradient-to-r from-cyan-400 to-cyan-500"
                      }`}
                    ></span>
                  </button>
                  <button
                    onClick={() => scrollToSection("comparison")}
                    className={`transition-all duration-500 font-medium whitespace-nowrap relative group text-lg ${
                      isScrolled
                        ? "text-gray-300 hover:text-[rgb(81,47,235)]"
                        : `${themeClasses.secondaryText} hover:text-[rgb(81,47,235)]`
                    }`}
                  >
                    Comparison
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 ${
                        isScrolled
                          ? "bg-gradient-to-r from-purple-400 to-blue-400"
                          : "bg-gradient-to-r from-cyan-400 to-cyan-500"
                      }`}
                    ></span>
                  </button>
                </nav>
              </div>

              {/* Desktop Actions */}
              <div className="flex items-center space-x-4 justify-end" style={{ minWidth: 180, zIndex: 30 }}>
                {/* Theme Toggle - Always show */}
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gray-800 hover:bg-gray-700 text-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
                        : "bg-gray-100 hover:bg-gray-200 text-orange-500 hover:shadow-lg"
                    }`}
                  >
                    {isDarkMode ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>

                {/* CTA Button */}
                <button
                  onClick={openCalendly}
                  className={`transition-all duration-500 hover:transform hover:-translate-y-0.5 whitespace-nowrap bg-[rgb(81,47,235)] text-white px-4 py-2.5 rounded-full font-medium shadow-lg`}
                >
                  {isScrolled ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  ) : (
                    "Chat Now →"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Spacer for sticky header */}
        <div className={`transition-all duration-700 ${isScrolled ? "h-16" : "h-20"}`}></div>

        {/* Hero Section */}
        <main className="text-center py-8 lg:py-12">
          <div className="mb-6"></div>
          <div className="flex justify-center mb-4">
            <span className="inline-block px-3 sm:px-7 py-1 rounded-full border border-[rgb(81,47,235)] bg-white text-[rgb(31,41,55)] text-base font-medium shadow-[0_0_16px_2px_rgba(81,47,235,0.25)]">
              Evokode.com – Your Website Partner
            </span>
          </div>
          <h1
            className={`font-black leading-tight mb-6 max-w-3xl mx-auto ${themeClasses.primaryText} font-[Poppins] text-[30px] leading-[1.2] sm:text-[45px] sm:leading-[1.1]`}
            style={{
              fontFamily: 'Poppins, sans-serif',
            }}
          >
            We Don't Just Build Websites, We Build Brands That <span style={{ color: 'rgb(81,47,235)' }}>Convert.</span>
          </h1>
          <p
            className={`text-lg ${themeClasses.secondaryText} mb-10 max-w-xl mx-auto leading-relaxed font-[Inter] text-[16px] leading-[22px] sm:text-[18px] sm:leading-[29px]`}
            style={{
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Your online presence deserves more than just a pretty layout. We deliver high-performing websites that are optimized, scalable, and designed to generate results.
          </p>
          <button
            onClick={openCalendly}
            className="bg-[rgb(81,47,235)] text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-200 hover:transform hover:-translate-y-0.5 mb-16 shadow-lg font-[Inter]"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Book a Strategy Call
          </button>

          {/* Sliding Company Logos */}
          <div className="relative overflow-hidden mb-4 sm:mb-16">
            <div className="flex animate-slide space-x-12 items-center justify-center opacity-80">
              {/* SVG Logos: Fiverr, Upwork, LinkedIn, Freelancer, Meta, Netflix, Adobe, Spotify, Slack, Dropbox, Twitter, Uber, Airbnb, PayPal */}
              {/* Fiverr */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#1DBF73"/>
                  <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="25" font-family="Arial" font-weight="bold" dy=".3em">f</text>
                </svg>
                  </div>
              {/* Upwork */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#6FDA44"/>
                  <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="20" font-family="Arial" font-weight="bold" dy=".3em">U</text>
                </svg>
                </div>
              {/* LinkedIn */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="60" rx="12" fill="#0077B5"/>
                  <text x="50%" y="55%" text-anchor="middle" fill="white" font-size="20" font-family="Arial" font-weight="bold" dy=".3em">in</text>
                </svg>
              </div>
              {/* Freelancer */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,50 30,10 50,50" fill="#29B2FE"/>
                </svg>
                  </div>
              {/* Meta */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 40C15 30 45 30 45 40C45 50 15 50 15 40Z" stroke="#555" stroke-width="3" fill="none"/>
                  <ellipse cx="30" cy="35" rx="10" ry="15" stroke="#555" stroke-width="3" fill="none"/>
                </svg>
                </div>
              {/* Netflix */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="55%" text-anchor="middle" fill="#E50914" font-size="25" font-family="Arial" font-weight="bold" dy=".3em">N</text>
                </svg>
              </div>
              {/* Adobe */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="10,50 30,10 50,50" fill="#F44336"/>
                  <polygon points="20,45 30,25 40,45" fill="white"/>
                </svg>
                  </div>
              {/* Spotify */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="30" cy="30" r="30" fill="#1ED760"/>
                  <path d="M20 35C30 32 40 36 40 36" stroke="white" stroke-width="3" stroke-linecap="round"/>
                  <path d="M22 40C30 38 38 41 38 41" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
                </div>
              {/* Slack */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="25" y="10" width="10" height="40" rx="5" fill="#ECB22E"/>
                  <rect x="10" y="25" width="40" height="10" rx="5" fill="#36C5F0"/>
                </svg>
              </div>
              {/* Dropbox */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <polygon points="15,20 30,10 45,20 30,30" fill="#0061FF"/>
                  <polygon points="15,40 30,30 45,40 30,50" fill="#0061FF"/>
                </svg>
                  </div>
              {/* Twitter */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 20c-1.5.7-3 .9-4.5 1.1A7.5 7.5 0 0050 15.5a15 15 0 01-4.8 1.8A7.5 7.5 0 0030 27.5c0 .6.1 1.2.2 1.8A21.3 21.3 0 0110 17.5s-8 18 10 25c-2 .5-4 .7-6 .3 2 1.5 4.5 2.3 7 2.3A21.2 21.2 0 0050 20z" fill="#1DA1F2"/>
                </svg>
                </div>
              {/* Uber */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <text x="50%" y="55%" text-anchor="middle" fill="#222" font-size="20" font-family="Arial" font-weight="bold" dy=".3em">Uber</text>
                </svg>
              </div>
              {/* Airbnb */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 15C35 25 45 40 30 50C15 40 25 25 30 15Z" stroke="#FF5A5F" stroke-width="3" fill="none"/>
                </svg>
                  </div>
              {/* PayPal */}
              <div className="flex items-center justify-center min-w-[90px] h-14">
                <svg width="54" height="54" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="10" y="10" width="40" height="40" rx="8" fill="#003087"/>
                  <text x="50%" y="55%" text-anchor="middle" fill="#009CDE" font-size="20" font-family="Arial" font-weight="bold" dy=".3em">P</text>
                </svg>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Portfolio Image Slider - Full Width */}
      <div id="works" className="mb-20 relative">
        <h2 className={`portfolio-heading text-center mb-8 ${themeClasses.primaryText} leading-[1.2]`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '25px', lineHeight: 1.2,  }}>
          Our Portfolio
          <style>{`
            @media (min-width: 640px) {
              .portfolio-heading { font-size: 30px !important; }
            }
            @media (max-width: 639px) {
              .portfolio-heading { font-size: 25px !important; }
            }
          `}</style>
        </h2>
        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setEmblaApi}
          className="w-full"
          onMouseEnter={() => { autoScrollPaused.current = true; }}
          onMouseLeave={() => { autoScrollPaused.current = false; }}
        >
          <CarouselPrevious />
          <CarouselNext />
          <CarouselContent className="ml-0">
            {portfolioItems.map((item, idx) => (
              <CarouselItem
                key={item.id}
                className="basis-full max-w-full px-2 md:basis-1/3 md:max-w-[320px]"
              >
                <div
                  className={`w-full h-[340px] ${isDarkMode ? 'bg-[#23232b] border-[#2d2d36]' : 'bg-white border-gray-200'} rounded-3xl border shadow-xl flex flex-col items-center justify-between p-0 overflow-hidden ${!item.isComingSoon ? 'cursor-pointer hover:shadow-2xl hover:scale-[1.03] transition-transform duration-200' : ''}`}
                  onClick={() => {
                    if (!item.isComingSoon) setSelectedImage(item.image)
                  }}
                  tabIndex={!item.isComingSoon ? 0 : -1}
                  role={!item.isComingSoon ? 'button' : undefined}
                  aria-label={!item.isComingSoon ? `View full image of ${item.title}` : undefined}
                  style={{marginBottom: 0}}
                >
                  {item.isComingSoon ? (
                    <div className="flex flex-1 flex-col items-center justify-center w-full h-full p-6 bg-[rgb(81,47,235)]">
                      <span className="text-xl font-bold text-center text-white">Other works<br/>will be<br/>updated soon.</span>
                    </div>
                  ) : (
                    <>
                      {/* Header/Hero section at the top of the card */}
                      <div className="w-full h-[60px] flex items-center justify-center bg-white"></div>
                      {/* Image fills the rest of the card */}
                      <div className="w-full aspect-[3/4] flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </>
                  )}
                </div>
                {/* Dedicated row for link below the card, always same height for all cards */}
                <div style={{height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  {item.image === "/portfolio-sample.jpg" && (
                    <a 
                      href="https://entalogics.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`underline font-medium text-2xl ${isDarkMode ? 'text-white' : 'text-black'}`}
                    >
                      Software Agency
                    </a>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Services Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className={`text-center mb-8 ${themeClasses.primaryText} text-[25px] leading-[1.2] sm:text-[30px]`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}>
            Everything You Need to Grow Online—Handled by Experts
                  </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "WordPress Development & CMS Solutions",
                subtitle: "Smart CMS, Built to Scale",
                desc: "From personal blogs to enterprise-grade portals, we build WordPress solutions that scale.",
                icon: (
                  <svg className="w-8 h-8 text-[rgb(81,47,235)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                ),
              bullets: ["Custom themes & plugin development", "Builders: Elementor, WPBakery, Oxygen, Divi, Gutenberg", "ACF & Custom Post Types for dynamic content", "Membership sites", "Ongoing maintenance & speed boost"]
              },
              {
                title: "WooCommerce & eCommerce Development",
                subtitle: "Convert Browsers into Buyers",
                desc: "Tailored eCommerce solutions for single sellers to large marketplaces.",
                icon: (
                  <svg className="w-8 h-8 text-[rgb(81,47,235)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                ),
                bullets: ["Full WooCommerce setup & optimization", "Marketplace & multi-vendor functionality", "Payment gateway integrations (Stripe, PayPal, etc.)", "Speed tuning & conversion optimization", "Product SEO and user journey enhancements"]
              },
              {
                title: "Custom Web & Desktop App Development",
                subtitle: "Modern Applications, Built to Perform",
                desc: "We create powerful, scalable digital tools using modern stacks.",
                icon: (
                  <svg className="w-8 h-8 text-[rgb(81,47,235)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                ),
                bullets: ["Web apps using Laravel, React, Next.js", "Custom backend with PHP or Node.js", "Admin panels, dashboards, and internal tools", "Electron-based cross-platform desktop apps", "Secure API integrations and SaaS platforms"]
              },
              {
                title: "SEO Optimization & Performance Enhancements",
                subtitle: "Rank Better, Load Faster",
                desc: "We ensure your website is not just live, but found and fast.",
                icon: (
                  <svg className="w-8 h-8 text-[rgb(81,47,235)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ),
                bullets: ["Core Web Vitals and technical SEO setup", "GTmetrix & PageSpeed Insights optimization", "Meta tags, schema markup, robots.txt, sitemaps", "Image lazy loading, compression & CDN integration", "Caching solutions (WP Rocket, LiteSpeed)"]
              },
              {
                title: "Website Migrations & Security Hardening",
                subtitle: "Seamless, Secure Transitions",
                desc: "Whether moving platforms or boosting defense, we've got you covered.",
                icon: (
                  <svg className="w-8 h-8 text-[rgb(81,47,235)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                ),
                bullets: ["Platform migrations (Shopify, Wix, Webflow to WordPress)", "SSL setup, firewall, malware removal", "Broken link fixes & plugin conflict resolution", "Scheduled backups and disaster recovery plans", "Security audits & hardening best practices"]
              },
              {
                title: "Full Stack Platforms & Custom Development",
                subtitle: "Build Without Limits",
                desc: "From MVPs to full systems, we build robust platforms across any stack.",
                icon: (
                  <svg className="w-8 h-8 text-[rgb(81,47,235)]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                ),
                bullets: ["Frontend: HTML, CSS, JS, React, Next.js", "Backend: PHP, MySQL, Node.js, Laravel", "Platforms: Webflow, Shopify, Squarespace, Bubble.io", "API integrations & third-party services", "Scalable architecture & cloud deployment"]
              }
            ].map((service, idx) => (
              <div key={idx} className={`${themeClasses.cardBg} rounded-2xl p-6 border transition-all duration-300 hover:shadow-lg`}>
              <div className="mb-1">{service.icon}</div>
              <h3 className={`service-card-heading text-xl font-bold ${themeClasses.primaryText} mb-0`} style={{ marginBottom: 0 }}>{service.title}</h3>
              <h4 className={`service-card-heading text-lg font-semibold text-[rgb(81,47,235)] mb-0`} style={{ marginBottom: 0 }}>{service.subtitle}</h4>
              <p className={`service-card-body ${themeClasses.secondaryText} mb-2`} style={{ lineHeight: 1.1 }}>{service.desc}</p>
              <ul className="service-card-body space-y-1">
                  {service.bullets.map((bullet, i) => (
                  <li key={i} className={`flex items-start text-sm ${themeClasses.mutedText}`} style={{ lineHeight: 1.1 }}>
                      <span className="mr-2 text-[rgb(81,47,235)] mt-0.5">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                </div>
              ))}
        </div>
      </div>

      {/* Benefits Section */}
      <div id="benefits" className="relative z-10 max-w-6xl mx-auto px-3 sm:px-5 lg:px-6 mb-16">
        {/* Benefits Badge */}
        <div className="flex justify-center mb-10">
          <div className="inline-block px-5 py-1 rounded-full border transition-all duration-700 shadow-[0_0_16px_2px_rgb(81,47,235,0.7)] border-[rgb(81,47,235)]">
            <span className={`${themeClasses.mutedText} text-base font-medium`}>Benefits</span>
          </div>
        </div>

        {/* Benefits Main Heading */}
        <h2 className={`text-center mb-12 ${themeClasses.primaryText}`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '25px', lineHeight: '30px' }}>
          Because results matter.
        </h2>

        {/* Benefits Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* End-to-End Service */}
          <div
            className={`${themeClasses.cardBg} border rounded-2xl p-7 hover:${themeClasses.borderAccent} transition-all duration-300 group`}
          >
            <div className="w-10 h-10 bg-[rgb(81,47,235)] rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`text-lg font-bold ${themeClasses.primaryText} mb-3`}>End-to-End Service</h3>
            <p className={`${themeClasses.secondaryText} leading-relaxed text-sm`}>
              From ideation to launch, we handle every step of your website's journey, ensuring a seamless process.
            </p>
          </div>

          {/* Budget-Friendly Packages */}
          <div
            className={`${themeClasses.cardBg} border rounded-2xl p-7 hover:border-orange-400/30 transition-all duration-300 group`}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className={`text-lg font-bold ${themeClasses.primaryText} mb-3`}>Budget-Friendly Packages</h3>
            <p className={`${themeClasses.secondaryText} leading-relaxed text-sm`}>
              No hidden fees. We offer clear and upfront pricing, so you know exactly what you're investing in.
            </p>
          </div>

          {/* Long-Term Partnership */}
          <div
            className={`${themeClasses.cardBg} border rounded-2xl p-7 hover:${themeClasses.borderAccent} transition-all duration-300 group`}
          >
            <div className="w-10 h-10 bg-[rgb(81,47,235)] rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            </div>
            <h3 className={`text-lg font-bold ${themeClasses.primaryText} mb-3`}>Long-Term Partnership</h3>
            <p className={`${themeClasses.secondaryText} leading-relaxed text-sm`}>
              Our work doesn't stop at launch. We continually optimize your website to keep it ahead of the competition.
            </p>
          </div>
        </div>
      </div>

      {/* Process Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-5 lg:px-6 mb-16">
        {/* Process Badge */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-7 py-2 rounded-full border border-[rgb(81,47,235)] bg-white text-[rgb(31,41,55)] text-base font-medium shadow-[0_0_16px_2px_rgba(81,47,235,0.25)]">
            How it starts?
          </div>
        </motion.div>

        {/* Process Main Heading */}
        <motion.h2
          className={`text-center mb-12 ${themeClasses.primaryText} text-[25px] sm:text-[30px]`}
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, lineHeight: '30px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          See what you can expect.
        </motion.h2>

        {/* Process Cards */}
        <div className="space-y-5" style={{ perspective: "1000px" }}>
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className={`${themeClasses.cardBg} border rounded-2xl p-7 hover:${themeClasses.borderAccent} transition-all duration-300`}
              initial={{
                opacity: 0,
                y: 50,
                rotateX: 15,
                scale: 0.95,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.25, 0.25, 0, 1],
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                scale: 1.02,
                rotateX: -2,
                transition: { duration: 0.3 },
              }}
            >
              <div className="flex items-start space-x-5">
                <motion.div
                  className="w-10 h-10 bg-[rgb(81,47,235)] rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15 + 0.3,
                    type: "spring",
                    stiffness: 200,
                  }}
                  viewport={{ once: true }}
                >
                  <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </motion.div>
                <div className="flex-1">
                  <motion.h3
                    className={`text-lg font-bold ${themeClasses.primaryText} mb-2`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.4,
                    }}
                    viewport={{ once: true }}
                  >
                    {step.title}
                  </motion.h3>
                  <motion.p
                    className={`${themeClasses.secondaryText} leading-relaxed text-sm`}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15 + 0.5,
                    }}
                    viewport={{ once: true }}
                  >
                    {step.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Comparison Section */}
      <div id="comparison" className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 mb-16">
        {/* Comparison Badge */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-5 py-1 rounded-full border transition-all duration-700 shadow-[0_0_16px_2px_rgb(81,47,235,0.7)] border-[rgb(81,47,235)]">
            <span className={`${themeClasses.mutedText} text-base font-medium`}>Comparison</span>
          </div>
        </motion.div>

        {/* Comparison Main Heading */}
        <motion.h2
          className={`text-center mb-8 ${themeClasses.primaryText} text-[25px] sm:text-[30px]`}
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, lineHeight: '30px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          What makes us unique?
        </motion.h2>

        {/* Book Intro Call Button */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <button
            onClick={openCalendly}
            className="bg-[rgb(81,47,235)] text-white px-7 py-2 rounded-full font-bold transition-all duration-300 hover:transform hover:-translate-y-0.5 shadow-lg text-base"
          >
            Book an Intro Call →
          </button>
        </motion.div>

        {/* Comparison Headers */}
        <motion.div
          className="grid md:grid-cols-2 gap-6 mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center space-x-2">
            <div className="w-7 h-7 bg-[rgb(81,47,235)] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-[rgb(81,47,235)] text-base font-bold">With Evokode:</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-7 h-7 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-red-400 text-base font-bold">Without Evokode:</span>
          </div>
        </motion.div>

        {/* Comparison Cards */}
        <div className="space-y-5">
          <motion.div
            className={`${isDarkMode ? "bg-white" : "bg-black"} rounded-3xl p-6 shadow-2xl relative z-30`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Positive Side */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-black" : "text-white"}`}>
                  Expert Developer and Designer.
                </h3>
                <p className={`${isDarkMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                  Experience and expertise at your fingertips, ensuring exceptional design quality.
                </p>
              </div>

              {/* Negative Side */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-black" : "text-white"}`}>
                  Junior Developer and Designer.
                </h3>
                <p className={`${isDarkMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                  Inexperienced designers may compromise on quality and attention to detail.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Additional comparison cards with similar styling... */}
          <motion.div
            className={`${isDarkMode ? "bg-white" : "bg-black"} rounded-3xl p-6 shadow-2xl relative z-20`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-black" : "text-white"}`}>
                  Dedicated Project Management.
                </h3>
                <p className={`${isDarkMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                  Personal project manager ensures timely delivery and clear communication throughout.
                </p>
              </div>
              <div className="space-y-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-black" : "text-white"}`}>
                  No Project Management.
                </h3>
                <p className={`${isDarkMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                  Lack of coordination leads to delays, miscommunication, and project scope creep.
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div
            className={`${isDarkMode ? "bg-white" : "bg-black"} rounded-3xl p-6 shadow-2xl relative z-10`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              {/* Positive Side */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-black" : "text-white"}`}>Cost Efficient.</h3>
                <p className={`${isDarkMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                  Transparent pricing and optimized resources for maximum value.
                </p>
              </div>

              {/* Negative Side */}
              <div className="space-y-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className={`text-lg font-bold ${isDarkMode ? "text-black" : "text-white"}`}>
                  Never-ending Invoices.
                </h3>
                <p className={`${isDarkMode ? "text-gray-700" : "text-gray-300"} leading-relaxed`}>
                  Unclear pricing and hidden costs can drain your budget & your bank.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-5 lg:px-6 mb-16">
        {/* Testimonials Badge */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-5 py-1 rounded-full border transition-all duration-700 shadow-[0_0_16px_2px_rgb(81,47,235,0.7)] border-[rgb(81,47,235)]">
            <span className={`${themeClasses.mutedText} text-base font-medium`}>Testimonials</span>
          </div>
        </motion.div>

        {/* Testimonials Main Heading */}
        <motion.h2
          className={`text-center mb-12 ${themeClasses.primaryText} text-[25px] sm:text-[30px]`}
          style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, lineHeight: '30px' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Trusted by businesses worldwide
        </motion.h2>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Sample testimonials with neon accent avatars */}
          <motion.div
            className={`${themeClasses.cardBg} border rounded-2xl p-6 hover:${themeClasses.borderAccent} transition-all duration-300`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}>
              "I found Sunny in a moment with high urgency for a project. He was quickly available and flexible, he pick
              up the tasks easily and worked very hard on short deadlines. Recommend!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <span className="text-black text-sm font-bold">VC</span>
              </div>
              <div>
                <h4 className={`${themeClasses.primaryText} font-bold`}>Valentina Coletti</h4>
                <p className={`${themeClasses.mutedText} text-sm`}>UX Designer</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${themeClasses.cardBg} border rounded-2xl p-6 hover:border-orange-400/30 transition-all duration-300`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}>
              "It's really amazing! The team evokode.com exceeded my expectations. The website they designed is not
              just visually stunning but also highly functional and user-friendly."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/25">
                <span className="text-white text-sm font-bold">AA</span>
              </div>
              <div>
                <h4 className={`${themeClasses.primaryText} font-bold`}>Atheek Ahamath</h4>
                <p className={`${themeClasses.mutedText} text-sm`}>UX Consultant</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className={`${themeClasses.cardBg} border rounded-2xl p-6 hover:${themeClasses.borderAccent} transition-all duration-300`}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <p className={`${themeClasses.secondaryText} mb-6 leading-relaxed`}>
              "Great work! The whole process was smooth, communication was clear, and the final result exceeded our
              expectations. It was a pleasure working together, and I would definitely recommend to anyone!"
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/25">
                <span className="text-black text-sm font-bold">CL</span>
              </div>
              <div>
                <h4 className={`${themeClasses.primaryText} font-bold`}>Dr. Chia Jung Lee</h4>
                <p className={`${themeClasses.mutedText} text-sm`}>Head : 70Dental</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-3 sm:px-5 lg:px-6 mb-16">
        {/* Main Heading */}
        <h2 className={`text-center mb-12 ${themeClasses.primaryText} text-[25px] sm:text-[30px]`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, lineHeight: '30px' }}>
          Questions? Answers.
        </h2>
        {/* FAQ Cards */}
        <div className="space-y-5">
          {faqData.map((faq, index) => (
            <div
              key={faq.id}
              className={`border rounded-2xl transition-all duration-300 cursor-pointer ${isDarkMode ? themeClasses.cardBg : 'bg-white border-gray-200'}`}
              onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
              style={{ boxShadow: openFAQ === faq.id ? '0 0 0 2px #512FEB22' : 'none', padding: '1.5rem' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-col w-full">
                  <div className="flex items-center w-full">
                    <h3
                      className={`flex-1 font-bold`}
                      style={{
                        fontFamily: 'sans-serif',
                        fontSize: '18px',
                        fontWeight: 700,
                        lineHeight: '28px',
                        color: isDarkMode ? '#fff' : '#111',
                      }}
                    >
                      {faq.question}
                    </h3>
                    <span
                      className="ml-4 select-none"
                      style={{ display: 'flex', alignItems: 'center', color: '#36c6f0' }}
                >
                  <svg
                        width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                        style={{ transition: 'transform 0.3s', transform: openFAQ === faq.id ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <path d="M6 8L10 12L14 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                    </span>
                    </div>
                  {openFAQ === faq.id && (
                    <div className={`w-full mt-2 mb-2 rounded-full bg-gradient-to-r ${isDarkMode ? 'from-cyan-400 to-orange-400' : 'from-cyan-500 to-orange-300'}`} style={{ height: '1px' }} />
                )}
        </div>
      </div>
              <div
              style={{
                  maxHeight: openFAQ === faq.id ? 500 : 0,
                  opacity: openFAQ === faq.id ? 1 : 0,
                  paddingTop: openFAQ === faq.id ? 12 : 0,
                  paddingBottom: openFAQ === faq.id ? 12 : 0,
                  overflow: 'hidden',
                  transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, padding 0.4s',
                }}
              >
                <p className={`text-sm sm:text-base`} style={{
                    lineHeight: 1.5,
                    color: isDarkMode ? themeClasses.secondaryText.replace('text-', '').replace('-', '#') : '#444',
                  }}>
                     {faq.answer}
                   </p>
                  </div>
                  </div>
          ))}
                  </div>
                </div>

      {/* Contact Section and Footer */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 lg:px-6 mb-20">
        <div className={`rounded-2xl border p-8 shadow-xl flex flex-col md:flex-row gap-8 items-stretch ${isDarkMode ? 'bg-[#10131a] border-gray-800' : 'bg-white border-gray-200'}`}
          style={{ minHeight: 400 }}>
          {/* Left: Info */}
          <div className="flex-1 flex flex-col justify-center">
            <h2 className={`mb-2 ${themeClasses.primaryText} text-[25px] sm:text-[30px]`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, lineHeight: '30px' }}>Ready to Build Something Amazing?</h2>
            <p className={`mb-6 text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Let's discuss your project and turn your vision into a high-performing website that drives results.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-500 text-white text-2xl">✉️</span>
                <span className="text-base font-medium select-all">hello@evokode.com</span>
                  </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-orange-400 text-white text-2xl">📞</span>
                <span className="text-base font-medium select-all">+1 (555) 123-4567</span>
                  </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-cyan-400 text-white text-2xl">📍</span>
                <span className="text-base font-medium">San Francisco, CA</span>
                </div>
            </div>
          </div>
          {/* Right: Form */}
          <form className="flex-1 space-y-5 flex flex-col justify-center">
                <div>
              <label className={`block mb-1 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Name</label>
              <input type="text" placeholder="Jane Smith" className={`w-full px-4 py-3 rounded-lg border bg-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(81,47,235)] ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`} />
                </div>
                <div>
              <label className={`block mb-1 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Email</label>
              <input type="email" placeholder="jane@framer.com" className={`w-full px-4 py-3 rounded-lg border bg-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(81,47,235)] ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`} />
                </div>
                <div>
              <label className={`block mb-1 font-semibold ${isDarkMode ? 'text-white' : 'text-black'}`}>Message</label>
              <textarea placeholder="Hi, I am reaching out for..." rows={4} className={`w-full px-4 py-3 rounded-lg border bg-transparent text-base font-medium focus:outline-none focus:ring-2 focus:ring-[rgb(81,47,235)] ${isDarkMode ? 'border-gray-700 text-white' : 'border-gray-300 text-black'}`}></textarea>
                </div>
            <button type="submit" className="w-full bg-[rgb(81,47,235)] text-white py-3 rounded-lg font-bold text-lg transition-all hover:bg-cyan-600">Submit</button>
              </form>
          </div>
      </div>

      {/* Footer */}
<footer className={`w-full py-10 mt-10 ${isDarkMode ? 'bg-gradient-to-br from-[#10131a] via-[#181A20] to-[#10131a]' : 'bg-gray-50'}`}>
  <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center md:items-end justify-between gap-4">
    
    {/* Text Content */}
    <div className="text-left w-full md:w-auto">
      <span className={`font-extrabold text-2xl block ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        evokode.com
      </span>
      <span className={`block mt-2 text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        Building high-performing websites and digital solutions that drive real business results. Your success is our mission.
      </span>
          </div>

    {/* Social Icons */}
    <div className="flex gap-3 mt-6 md:mt-0">
      {/* LinkedIn */}
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center rounded-lg ${isDarkMode ? 'bg-[#23232b]' : 'bg-gray-200'} hover:bg-[rgb(81,47,235)] transition-colors`}>
        <svg width="22" height="22" fill={isDarkMode ? "#fff" : "#000"} viewBox="0 0 24 24">
          <path d="M6.94 19H3.67V8.56h3.27V19zM5.3 7.22a1.9 1.9 0 1 1 0-3.8 1.9 1.9 0 0 1 0 3.8zM20.33 19h-3.27v-5.1c0-1.22-.02-2.8-1.71-2.8-1.7 0-1.96 1.33-1.96 2.7V19h-3.27V8.56h3.14v1.43h.04c.44-.83 1.52-1.7 3.13-1.7 3.35 0 3.97 2.2 3.97 5.06V19z"/>
        </svg>
      </a>

      {/* Instagram */}
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
        className={`w-10 h-10 flex items-center justify-center rounded-lg ${isDarkMode ? 'bg-[#23232b]' : 'bg-gray-200'} hover:bg-[rgb(81,47,235)] transition-colors`}>
        <svg width="22" height="22" fill={isDarkMode ? "#fff" : "#000"} viewBox="0 0 24 24">
          <path d="M12 8.6a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8zm0 5.6a2.2 2.2 0 1 1 0-4.4 2.2 2.2 0 0 1 0 4.4zm4.5-5.7a.8.8 0 1 1-1.6 0 .8.8 0 0 1 1.6 0z"/>
          <path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.07 1.9.25 2.4.42.6.23 1 .5 1.44.94.44.44.7.84.94 1.44.17.5.35 1.2.42 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.07 1.2-.25 1.9-.42 2.4-.23.6-.5 1-.94 1.44-.44.44-.84.7-1.44.94-.5.17-1.2.35-2.4.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.07-1.9-.25-2.4-.42-.6-.23-1-.5-1.44-.94-.44-.44-.7-.84-.94-1.44-.17-.5-.35-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.07-1.2.25-1.9.42-2.4.23-.6.5-1 .94-1.44.44-.44.84-.7 1.44-.94.5-.17 1.2-.35 2.4-.42C8.4 2.2 8.8 2.2 12 2.2zm0-2.2C8.7 0 8.3 0 7 .07c-1.3.07-2.2.25-3 .5-.8.3-1.5.7-2.2 1.4C1.2 2.8.8 3.5.5 4.3c-.25.8-.43 1.7-.5 3C0 8.3 0 8.7 0 12c0 3.3 0 3.7.07 5 .07 1.3.25 2.2.5 3 .3.8.7 1.5 1.4 2.2.7.7 1.4 1.1 2.2 1.4.8.25 1.7.43 3 .5C8.3 24 8.7 24 12 24s3.7 0 5-.07c1.3-.07 2.2-.25 3-.5.8-.3 1.5-.7 2.2-1.4.7-.7 1.1-1.4 1.4-2.2.25-.8.43-1.7.5-3 .07-1.3.07-1.7.07-5s0-3.7-.07-5c-.07-1.3-.25-2.2-.5-3-.3-.8-.7-1.5-1.4-2.2-.7-.7-1.4-1.1-2.2-1.4-.8-.25-1.7-.43-3-.5C15.7 0 15.3 0 12 0z"/>
        </svg>
            </a>
          </div>

        </div>
      </footer>


    </div>
  )
}