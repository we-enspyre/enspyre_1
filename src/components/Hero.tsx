import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-title', 
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
      )
      .fromTo('.hero-subtitle', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.6'
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
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6">
      {/* Floating decorative elements */}
      <div className="floating-sparkle absolute top-1/4 left-1/4 text-blue-400/30">
        <Sparkles size={24} />
      </div>
      <div className="floating-sparkle absolute top-1/3 right-1/4 text-purple-400/30">
        <Sparkles size={32} />
      </div>
      <div className="floating-sparkle absolute bottom-1/3 left-1/3 text-cyan-400/30">
        <Sparkles size={20} />
      </div>

      <div className="text-center max-w-4xl mx-auto">
        <h1 className="hero-title text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight">
          Crafting Digital
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experiences
          </span>
        </h1>
        
        <p className="hero-subtitle text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          We create stunning, modern websites that captivate your audience and drive results. 
          From concept to launch, we bring your digital vision to life.
        </p>
        
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
