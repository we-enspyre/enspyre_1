import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Send, Mail, MessageSquare } from 'lucide-react';
import { useTranslation } from "react-i18next";

type Service = { label: string; color: string };

const Contact = () => {
  const { t } = useTranslation();
  const contactRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({ email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-form',
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.contact-form', start: 'top 80%' } }
      );
      gsap.fromTo('.contact-info',
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: 'power2.out', scrollTrigger: { trigger: '.contact-info', start: 'top 80%' } }
      );
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('https://formspree.io/f/mvgqzekb', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, message: formData.message })
      });
      if (res.ok) { setStatus('success'); setFormData({ email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  const services = t("contact.services", { returnObjects: true }) as Service[];

  return (
    <section id="contact" ref={contactRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t("contact.titlePrefix")} <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{t("contact.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t("contact.description")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="contact-form">
            {status === 'idle' && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground z-10" />
                  <input
                    type="email" name="email" placeholder={t("contact.emailPlaceholder")}
                    value={formData.email} onChange={handleInputChange} required
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                  />
                </div>

                <div className="relative">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-foreground z-10" />
                  <textarea
                    name="message" placeholder={t("contact.messagePlaceholder")}
                    value={formData.message} onChange={handleInputChange} required rows={6}
                    className="w-full pl-12 pr-4 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 resize-none"
                  />
                </div>

                <button type="submit" className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center gap-3">
                  {t("contact.sendButton")} <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            )}

            {status === 'success' && (
              <div className="bg-green-500/10 border border-green-400/20 text-green-300 p-6 rounded-xl text-center shadow-lg backdrop-blur-sm transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-2">{t("contact.successTitle")}</h3>
                <p className="text-green-200">{t("contact.successMessage")}</p>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-500/10 border border-red-400/20 text-red-300 p-6 rounded-xl text-center shadow-lg backdrop-blur-sm transition-all duration-500">
                <h3 className="text-2xl font-semibold mb-2">{t("contact.errorTitle")}</h3>
                <p className="text-red-200">{t("contact.errorMessage")}</p>
              </div>
            )}
          </div>

          <div className="contact-info space-y-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
              <h3 className="text-2xl font-semibold text-foreground mb-4">{t("contact.infoTitle")}</h3>
              <p className="text-muted-foreground mb-6">{t("contact.infoDescription")}</p>
              <div className="space-y-4">
                {services.map((service, i) => (
                  <div key={i} className="flex items-center gap-3 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.color }}></div>
                    <span>{service.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
