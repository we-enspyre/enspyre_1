import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';
import PlayCard from './ui/playcard';
import './ui/playcard.css';
import { useIsMobile } from "@/hooks/use-mobile" // adjust path

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null)
  ];
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.hero-cta', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' },
        '-=0.4'
      );
      // Floating animation for sparkles
      gsap.to('.floating-sparkle', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.3
      });

      // Animate playcards
      const angles = [-60, -20, 20, 60];
      cardRefs.forEach((ref, i) => {
        if (ref.current) {
          ref.current.style.transform = 'translate(-50%, 0) rotate(0deg)';
          ref.current.style.opacity = '0';
          ref.current.style.transformOrigin = '50% 100%';
        }
      });
      setTimeout(() => {
        cardRefs.forEach((ref, i) => {
          if (ref.current) {
            gsap.to(ref.current, {
              opacity: 1,
              transform: `translate(-50%, 0) rotate(${angles[i]}deg)`,
              duration: 1,
              ease: 'power2.out',
              delay: i * 0.08,
            });
          }
        });
      }, 400);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToGallery = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: '#gallery', offsetY: 80 },
      ease: 'power2.inOut'
    });
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden"
    >
      {/* PlayCard background animation */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none z-0 translate-y-24 max-w-full overflow-hidden">
        <div className="playcard-fan-container" style={{ transform: isMobile ? "scale(0.8)" : "scale(1)" }}>

          <div ref={cardRefs[0]} className="playcard-fan-card">
            <PlayCard image="ShamNet.png" />
          </div>
          <div ref={cardRefs[1]} className="playcard-fan-card">
            <PlayCard image="fotografer.png" />
          </div>
          <div ref={cardRefs[2]} className="playcard-fan-card">
            <PlayCard image="pizza.png" />
          </div>
          <div ref={cardRefs[3]} className="playcard-fan-card">
            <PlayCard image="frisør.png" />
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="floating-sparkle absolute top-1/4 left-1/4 text-blue-400/30 z-10">
        <Sparkles size={24} />
      </div>
      <div className="floating-sparkle absolute top-1/3 right-1/4 text-purple-400/30 z-10">
        <Sparkles size={32} />
      </div>
      <div className="floating-sparkle absolute bottom-1/3 left-1/3 text-cyan-400/30 z-10">
        <Sparkles size={20} />
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-20">
        <h1 className="hero-title text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight">
          Crafting Digital
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experiences
          </span>
        </h1>

        <button 
          onClick={scrollToGallery}
          className="hero-cta group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-3 mx-auto"
        >
          Explore Our Work
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
