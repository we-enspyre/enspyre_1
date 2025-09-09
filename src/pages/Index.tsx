
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
import LeadCollection from '../components/LeadCollection';
import LeadsManagement from '../components/LeadsManagement';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
        ScrollTrigger.create({
          trigger: element as Element,
          start: 'top 80%',
          animation: gsap.fromTo(element as Element, 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
          ),
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="relative min-h-screen bg-background overflow-x-hidden overflow-y-hidden">
      <AnimatedBackground />
      <Navbar />
      <Hero />
      <Gallery />
      <LeadCollection />
      <LeadsManagement />
      <Contact />
      <About />
    </div>
  );
};

export default Index;
