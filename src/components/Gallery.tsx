
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ExternalLink } from 'lucide-react';
import { link } from 'fs';

const Gallery = () => {
  const galleryRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      title: 'portfolio websites',
      description: 'Elegant photography in Aarhus. Weddings, portraits, and events captured by Emilie Nørgaard.',
      image: 'https://we-enspyre.github.io/fotograf/fotograf.png',
      tech: ['Vite.js', 'TypeScript', 'React', 'Tailwind CSS'],
      link: 'https://we-enspyre.github.io/fotograf/'
    },
    {
      title: 'SaaS Dashboard',
      description: 'Analytics platform with real-time data visualization',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center',
      tech: ['Vue.js', 'Python', 'D3.js'],
      link: 'https://we-enspyre.github.io/fotograf/'
    },
    {
      title: 'Restaurant Website',
      description: 'Elegant dining experience with online reservations',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&crop=center',
      tech: ['Next.js', 'Tailwind', 'Prisma'],
      link: 'https://we-enspyre.github.io/fotograf/'
    },
    {
      title: 'Mobile App Landing',
      description: 'App showcase with interactive prototypes',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop&crop=center',
      tech: ['React', 'Framer Motion', 'Firebase'],
      link: 'https://we-enspyre.github.io/fotograf/'
    },
    {
      title: 'Portfolio Website',
      description: 'Creative showcase for digital artist',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center',
      tech: ['Gatsby', 'GraphQL', 'Netlify CMS'],
      link: 'https://we-enspyre.github.io/fotograf/'
    },
    {
      title: 'Corporate Platform',
      description: 'Enterprise solution with team collaboration',
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&crop=center',
      tech: ['Angular', 'TypeScript', 'AWS'],
      link: 'https://we-enspyre.github.io/fotograf/'
    }
  ];
      
  // Gallery items animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-item', 
        { opacity: 0, y: 100, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.gallery-grid',
            start: 'top 80%'
          }
        }
      );
    }, galleryRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={galleryRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Our <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Gallery</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our portfolio of cutting-edge web solutions that drive business growth
          </p>
        </div>

        <div className="gallery-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="gallery-item group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 block"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <ExternalLink className="w-6 h-6 text-foreground" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-500/20 text-foreground rounded-full text-sm border border-blue-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;