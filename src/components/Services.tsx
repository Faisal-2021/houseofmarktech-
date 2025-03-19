
import React from 'react';
import { Code, Layers, Shield, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
  colorClass: string;
}

const ServiceCard = ({ title, description, icon, className, colorClass }: ServiceCardProps) => (
  <div 
    className={cn(
      "group relative overflow-hidden rounded-xl p-8 transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]",
      className
    )}
  >
    {/* Background gradient and effects */}
    <div className="absolute inset-0 bg-white opacity-90"></div>
    <div className={cn(
      "absolute bottom-0 left-0 h-1 w-full transition-all duration-300 group-hover:h-2", 
      colorClass
    )}></div>
    
    {/* Content */}
    <div className="relative z-10">
      <div className={cn(
        "flex h-12 w-12 items-center justify-center rounded-lg mb-6 transition-all duration-300 group-hover:scale-110",
        colorClass
      )}>
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <section id="services" className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50"></div>
      <div className="absolute w-[800px] h-[800px] rounded-full bg-blue-50 -top-96 -right-96 blur-3xl"></div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Exceptional services for exceptional results
            </h2>
            <p className="text-gray-600">Our comprehensive range of services is designed to elevate your experience and deliver meaningful outcomes.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Zap className="h-6 w-6 text-white" />}
              title="Lightning Fast"
              description="Optimized for speed at every level, providing a seamless experience that responds instantly to user interaction."
              className="animate-fade-up"
              colorClass="bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
            />
            <ServiceCard
              icon={<Layers className="h-6 w-6 text-white" />}
              title="Meticulously Crafted"
              description="Built with precision and attention to detail, ensuring every element serves a purpose in the overall design."
              className="animate-fade-up animation-delay-100"
              colorClass="bg-gradient-to-r from-blue-400 to-indigo-500 text-white"
            />
            <ServiceCard
              icon={<Code className="h-6 w-6 text-white" />}
              title="Technically Superior"
              description="Engineered using cutting-edge technologies that push the boundaries of what's possible in digital experiences."
              className="animate-fade-up animation-delay-200"
              colorClass="bg-gradient-to-r from-purple-400 to-pink-500 text-white"
            />
            <ServiceCard
              icon={<Shield className="h-6 w-6 text-white" />}
              title="Inherently Secure"
              description="Security built into every layer, protecting your data and privacy without compromising on performance."
              className="animate-fade-up animation-delay-300"
              colorClass="bg-gradient-to-r from-green-400 to-teal-500 text-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
