import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo animation on load
      gsap.fromTo('.logo', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
      );

      // Nav items stagger animation
      gsap.fromTo('.nav-item', 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.3 }
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: sectionId, offsetY: 80 },
      ease: 'power2.inOut'
    });
  };

  return (
    <nav 
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/10 border-b border-white/10' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="logo">
          <h1 className="text-2xl font-bold text-white">
            En<span className="text-blue-400">spyre</span>
          </h1>
        </div>

        {/* Navigation Items */}
        <div className="flex space-x-6">
          {[
            { name: 'Gallery', target: '#gallery' },
            { name: 'Contact Us', target: '#contact' },
            { name: 'About Us', target: '#about' }
          ].map((item, index) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.target)}
              className="nav-item px-6 py-2 text-white/90 hover:text-white hover:bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 transition-all duration-300 hover:scale-105"
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
