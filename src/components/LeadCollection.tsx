import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { 
  User, 
  Mail, 
  Building, 
  Globe, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Instagram, 
  MessageSquare, 
  UserPlus,
  CheckCircle
} from 'lucide-react';
import { LeadFormData } from '@/types/lead';
import { LeadService } from '@/lib/leadService';

const LeadCollection = () => {
  const leadCollectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<LeadFormData>({
    name: '',
    email: '',
    company: '',
    website: '',
    linkedin: '',
    twitter: '',
    facebook: '',
    instagram: '',
    notes: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.lead-form',
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power2.out', 
          scrollTrigger: { 
            trigger: '.lead-form', 
            start: 'top 80%' 
          } 
        }
      );
    }, leadCollectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      LeadService.saveLead(formData);
      setStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        website: '',
        linkedin: '',
        twitter: '',
        facebook: '',
        instagram: '',
        notes: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <section id="lead-collection" ref={leadCollectionRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Collect <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Leads</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Capture potential customer information including emails, social media accounts, and websites
          </p>
        </div>

        <div className="lead-form">
          {status === 'idle' && (
            <form onSubmit={handleSubmit} className="space-y-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name *"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Company and Website */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <input
                    type="url"
                    name="website"
                    placeholder="Website URL"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Social Media */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground mb-4">Social Media Profiles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400 z-10" />
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="LinkedIn Profile"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <Twitter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-cyan-400 z-10" />
                    <input
                      type="url"
                      name="twitter"
                      placeholder="Twitter Profile"
                      value={formData.twitter}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <Facebook className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 z-10" />
                    <input
                      type="url"
                      name="facebook"
                      placeholder="Facebook Profile"
                      value={formData.facebook}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
                    />
                  </div>

                  <div className="relative">
                    <Instagram className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-pink-400 z-10" />
                    <input
                      type="url"
                      name="instagram"
                      placeholder="Instagram Profile"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-400/20 transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="relative">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-foreground z-10" />
                <textarea
                  name="notes"
                  placeholder="Additional notes about this lead..."
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all duration-300 resize-none"
                />
              </div>

              <button 
                type="submit" 
                className="group w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 flex items-center justify-center gap-3"
              >
                Add Lead <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </form>
          )}

          {status === 'success' && (
            <div className="bg-green-500/10 border border-green-400/20 text-green-300 p-8 rounded-2xl text-center shadow-lg backdrop-blur-sm transition-all duration-500">
              <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-2xl font-semibold mb-2">Lead Added Successfully!</h3>
              <p className="text-green-200">The lead has been saved and can be managed in the leads dashboard.</p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-red-500/10 border border-red-400/20 text-red-300 p-8 rounded-2xl text-center shadow-lg backdrop-blur-sm transition-all duration-500">
              <h3 className="text-2xl font-semibold mb-2">Error Adding Lead</h3>
              <p className="text-red-200">There was an error saving the lead. Please try again.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LeadCollection;