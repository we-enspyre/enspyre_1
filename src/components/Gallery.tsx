import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
};

const techVariantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'React': 'default',
  'Vue.js': 'secondary',
  'Angular': 'destructive',
  'Next.js': 'default',
  'Gatsby': 'secondary',
  'TypeScript': 'default',
  'Python': 'destructive',
  'D3.js': 'outline',
  'Tailwind CSS': 'secondary',
  'Tailwind': 'secondary',
  'Framer Motion': 'default',
  'Firebase': 'destructive',
  'Prisma': 'default',
  'GraphQL': 'secondary',
  'Netlify CMS': 'default',
  'AWS': 'destructive',
  'Vite.js': 'secondary'
};

const Gallery = () => {
  const { t } = useTranslation();
  const galleryRef = useRef<HTMLDivElement>(null);

  const projects = t('gallery.projects', { returnObjects: true }) as Project[];

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
            {t('gallery.titlePrefix')} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t('gallery.titleHighlight')}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t('gallery.description')}</p>
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
                <p className="text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant={techVariantMap[tech] || 'outline'}>
                      {tech}
                    </Badge>
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
