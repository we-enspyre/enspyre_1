import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Github, Linkedin, Twitter } from "lucide-react";
import { useTranslation } from "react-i18next";
import { features } from "process";

const About = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const service = [
    {
      type: t("services.service.0.type"),
      price: t("services.service.0.price"),
      description: t("services.service.0.description"),
      features: t("services.service.0.features", { returnObjects: true }),
    },
    {
      type: t("services.service.1.type"),
      price: t("services.service.1.price"),
      description: t("services.service.1.description"),
      features: t("services.service.1.features", { returnObjects: true }),
    },
    {
      type: t("services.service.2.type"),
      price: t("services.service.2.price"),
      description: t("services.service.2.description"),
      features: t("services.service.2.features", { returnObjects: true }),
    },
    {
      type: t("services.service.3.type"),
      price: t("services.service.3.price"),
      description: t("services.service.3.description"),
      features: t("services.service.3.features", { returnObjects: true }),
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".developer-card",
        { opacity: 0, y: 100, rotationY: 45 },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".developers-grid",
            start: "top 90%",
          },
        }
      );
    }, aboutRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={aboutRef} className="animate-on-scroll py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            {t("services.title")}{" "}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </div>

        <div className="developers-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.map((item, index) => (
            <div
              key={index}
              className="developer-card bg-white/10 border border-blue-200/20 rounded-xl shadow-lg p-8 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
            >
              <div>
                <h3 className="text-2xl font-bold text-blue-600 mb-2">
                  {item.type}
                </h3>
                <p className="text-lg text-blue-400 font-semibold mb-2">
                  {item.price}
                </p>
                <p className="text-base text-muted-foreground mb-4">
                  {item.description}
                </p>
                {item.features && Array.isArray(item.features) && (
                  <ul className="list-disc pl-5 space-y-1 mb-4">
                    {item.features.map((feature: string, idx: number) => (
                      <li key={idx} className="text-sm text-foreground">
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg"
                  onClick={() => {
                    const contactSection = document.getElementById("contact");
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  Select {item.type}
                </button>
              </div>
            </div>
          ))}
        </div>
        <h4 className="text-4xl md:text-4xl font-bold text-foreground display-flex justify-center flex 1">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent flex justify-center mt-6">
            {t("services.highlight")}
          </span>
        </h4>
      </div>
    </section>
  );
};

export default About;
