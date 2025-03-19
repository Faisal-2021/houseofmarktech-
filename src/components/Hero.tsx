import React, { useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;

      const { clientX, clientY } = e;
      const rect = heroRef.current.getBoundingClientRect();

      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      // Subtle parallax effect
      const moveX = (x - 0.5) * 15;
      const moveY = (y - 0.5) * 15;

      const bgElement = heroRef.current.querySelector(
        ".hero-bg"
      ) as HTMLElement;
      if (bgElement) {
        bgElement.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background */}
      <div className="hero-bg absolute inset-0 transition-transform duration-500 ease-out">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-gray-100/90"></div>

        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/hero-bg.jpg')" }}
        ></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-3xl mx-auto md:mx-0">
          <div className="flex flex-col gap-6 items-start">
            <div className="inline-flex px-4 py-1 rounded-full bg-gradient-to-r from-gray-100 to-blue-100 text-xs font-medium animate-fade-in">
              Introducing the next generation of Marketing
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight animate-fade-up bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
              Marketing Ignites, Technology Transforms,
              <br />
              Sales Soar!
            </h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-2xl animate-fade-up animation-delay-100">
              We ignite your ideas with creative marketing, bring them to life
              with cutting-edge technology, and propel your success with
              exceptional sales. Ready to transform your vision into reality?
              Let’s achieve greatness together!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4 pb-5 animate-fade-up animation-delay-200">
              <a
                href="#services"
                className="group inline-flex items-center justify-center rounded-md bg-black px-6 py-3 text-sm font-medium text-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                Explore features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* animated arrow */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="animate-bounce w-6 h-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-full h-full"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
