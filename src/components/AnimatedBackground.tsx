
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const AnimatedBackground = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the gradient background
      gsap.to('.gradient-1', {
        x: '100px',
        y: '50px',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });

      gsap.to('.gradient-2', {
        x: '-80px',
        y: '100px',
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });

      gsap.to('.gradient-3', {
        x: '60px',
        y: '-80px',
        duration: 12,
        repeat: -1,
        yoyo: true,
        ease: 'none'
      });
    }, bgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 -z-10">
      {/* Animated gradient orbs */}
      <div className="gradient-1 absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-600/30 to-purple-600/30 rounded-full blur-3xl"></div>
      <div className="gradient-2 absolute top-1/2 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>
      <div className="gradient-3 absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-cyan-600/25 to-blue-600/25 rounded-full blur-3xl"></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3Ccircle cx='27' cy='7' r='1'/%3E%3Ccircle cx='47' cy='7' r='1'/%3E%3Ccircle cx='7' cy='27' r='1'/%3E%3Ccircle cx='27' cy='27' r='1'/%3E%3Ccircle cx='47' cy='27' r='1'/%3E%3Ccircle cx='7' cy='47' r='1'/%3E%3Ccircle cx='27' cy='47' r='1'/%3E%3Ccircle cx='47' cy='47' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;
