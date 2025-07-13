
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Send, Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    email: '',
    message: ''
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-form', 
        { opacity: 0, x: -50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%'
          }
        }
      );

      gsap.fromTo('.contact-info', 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%'
          }
        }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // TODO: Connect with email service
  };

  return (
    <section id="contact" ref={contactRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Get In <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Ready to bring your digital vision to life? Let's start the conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Form */}
          <div className="contact-form">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                />
              </div>

              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3"
              >
                Send Message
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="contact-info space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-white mb-4">
                Let's Build Something Amazing
              </h3>
              <p className="text-gray-300 mb-6">
                We're passionate about creating digital experiences that make a difference. 
                Whether you're a startup looking to make your mark or an established business 
                ready to evolve, we're here to help.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span>Custom Web Development</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span>UI/UX Design</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>E-commerce Solutions</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Performance Optimization</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
