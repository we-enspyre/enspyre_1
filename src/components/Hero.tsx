import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import PlayCard from "./ui/playcard";
import "./ui/playcard.css";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const cardRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const isMobile = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const angles = [-60, -20, 20, 60];

      // Title & CTA animations
      const tl = gsap.timeline();
      tl.fromTo(".hero-title", { opacity: 0, y: 100 }, { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" })
        .fromTo(".hero-cta", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");

      // Floating sparkles
      gsap.to(".floating-sparkle", { y: -20, duration: 2, repeat: -1, yoyo: true, ease: "power2.inOut", stagger: 0.3 });

      // Initial fan animation
      cardRefs.forEach((ref, i) => {
        if (!ref.current) return;
        ref.current.style.transformOrigin = "50% 100%";
        ref.current.style.opacity = "0";
        gsap.to(ref.current, {
          opacity: 1,
          rotate: angles[i],
          duration: 1,
          ease: "power2.out",
          delay: i * 0.08,
        });
      });

      // Scroll-triggered smooth animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Fan → aligned (scale 0.8, spaced 120px, full opacity)
      cardRefs.forEach((ref, i) => {
        if (!ref.current) return;
        const xAlign = (i - 1.5) * 120;
        scrollTl.to(ref.current, {
          rotate: 0,
          x: xAlign,
          scale: 0.8,
          opacity: 1,
          duration: 1,
          ease: "power1.inOut",
        }, 0);
      });
      //Check later for more controlled scrolling effects
      // Aligned → slide up & fade out
      cardRefs.forEach((ref) => {
        if (!ref.current) return;
        scrollTl.to(ref.current, {
          y: -200,
          opacity: 0,
          duration: 1,
          ease: "power1.in",
        }, 1);
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToGallery = () => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: "#gallery", offsetY: 80 },
      ease: "power2.inOut",
    });
  };

  return (
    <section ref={heroRef} className="min-h-screen flex items-center justify-center relative px-6 overflow-hidden">
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none select-none z-0 translate-y-24 max-w-full overflow-hidden">
        <div className="playcard-fan-container" style={{ transform: isMobile ? "scale(0.7)" : "scale(1)" }}>
          {cardRefs.map((ref, i) => (
            <div key={i} ref={ref} className="playcard-fan-card">
              <PlayCard image={["ShamNet.png", "fotografer.png", "pizza.png", "frisør.png"][i]} />
            </div>
          ))}
        </div>
      </div>

      <div className="floating-sparkle absolute top-1/4 left-1/4 text-blue-400/30 z-10"><Sparkles size={24} /></div>
      <div className="floating-sparkle absolute top-1/3 right-1/4 text-purple-400/30 z-10"><Sparkles size={32} /></div>
      <div className="floating-sparkle absolute bottom-1/3 left-1/3 text-cyan-400/30 z-10"><Sparkles size={20} /></div>

      <div className="text-center max-w-4xl mx-auto relative z-20">
        <h1 className="hero-title text-6xl md:text-8xl font-bold text-foreground mb-6 leading-tight">
          {t("hero.title")}<br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {t("hero.highlight")}
          </span>
        </h1>

        <button onClick={scrollToGallery} className="hero-cta group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 flex items-center gap-3 mx-auto">
          {t("hero.cta")}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
