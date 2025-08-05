
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Gallery from '../components/Gallery';
import Contact from '../components/Contact';
import About from '../components/About';
import AnimatedBackground from '../components/AnimatedBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.animate-on-scroll').forEach((element: any) => {
        ScrollTrigger.create({
          trigger: element,
          start: 'top 80%',
          animation: gsap.fromTo(element, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
          ),
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-background overflow-x-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Gallery />
      <Contact />
      <About />
    </div>
  );
};

export default Index;
