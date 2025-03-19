
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import UserSearch from '@/components/UserSearch';
import ContactForm from '@/components/ContactForm';

const Index = () => {
  // Lazy load images for performance
  useEffect(() => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    // If the browser doesn't support lazy loading
    if (!('loading' in HTMLImageElement.prototype)) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target as HTMLImageElement;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
            }
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
      
      lazyImages.forEach((lazyImage) => {
        lazyImageObserver.observe(lazyImage);
      });
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Pricing />
      <UserSearch />
      <ContactForm />
      
      <footer className="py-8 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} houseofmarktech. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-800 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
