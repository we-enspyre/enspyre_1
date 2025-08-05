
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Github, Linkedin, Twitter } from 'lucide-react';

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  const developers = [
    {
      name: 'Alex Chen',
      role: 'Full-Stack Developer',
      bio: 'Passionate about creating scalable web applications with modern technologies. Specializes in React, Node.js, and cloud architecture.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Sarah Johnson',
      role: 'UI/UX Designer',
      bio: 'Design-focused developer who bridges the gap between beautiful interfaces and seamless user experiences. Loves crafting pixel-perfect designs.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Marcus Rodriguez',
      role: 'DevOps Engineer',
      bio: 'Infrastructure enthusiast who ensures our applications run smoothly at scale. Expert in cloud platforms and automation.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: {
        github: '#',
        linkedin: '#',
        twitter: '#'
      }
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.developer-card', 
        { opacity: 0, y: 100, rotationY: 45 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '.developers-grid',
            start: 'top 80%'
          }
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={aboutRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Meet The <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The creative minds behind Enspyre, dedicated to bringing your digital dreams to reality
          </p>
        </div>

        <div className="developers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((developer, index) => (
            <div
              key={index}
              className="developer-card group bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="relative">
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-semibold text-foreground mb-1">
                    {developer.name}
                  </h3>
                  <p className="text-blue-300 font-medium">
                    {developer.role}
                  </p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {developer.bio}
                </p>
                
                <div className="flex gap-4">
                  <a
                    href={developer.social.github}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 text-muted-foreground hover:text-white"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href={developer.social.linkedin}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 text-muted-foreground hover:text-blue-400"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={developer.social.twitter}
                    className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300 hover:scale-110 text-muted-foreground hover:text-cyan-400"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
