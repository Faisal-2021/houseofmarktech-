
import React from 'react';
import { Check, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  delay?: string;
}

const PricingTier = ({ name, price, description, features, isPopular, delay }: PricingTierProps) => (
  <Card 
    className={cn(
      "relative h-full transition-all duration-300 border-transparent overflow-hidden",
      isPopular ? "shadow-lg shadow-primary/10" : "hover:shadow-md",
      delay
    )}
  >
    {isPopular && (
      <div className="absolute top-0 right-0 left-0">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-medium py-1.5 px-3 text-center">
          Most Popular
        </div>
      </div>
    )}
    
    <div className={cn(
      "absolute top-0 left-0 w-full h-1", 
      isPopular ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-gray-200 to-gray-300"
    )}/>
    
    <CardHeader className={cn(isPopular ? "pt-10" : "pt-6")}>
      <CardTitle className="text-xl font-semibold">{name}</CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
      <div className="flex items-baseline mt-4">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-gray-600 ml-2">/month</span>}
      </div>
    </CardHeader>
    
    <CardContent>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <span className="text-gray-600 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </CardContent>
    
    <CardFooter>
      <a 
        href="#contact" 
        className={cn(
          "w-full inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-1",
          isPopular 
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md hover:shadow-lg" 
            : "bg-gray-100 hover:bg-gray-200 text-gray-800"
        )}
      >
        Get started
      </a>
    </CardFooter>
  </Card>
);

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-4 max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Simple, transparent pricing
            </h2>
            <p className="text-gray-600">Choose the plan that aligns with your needs, with no hidden fees or surprises.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingTier
              name="Essential"
              price="$49"
              description="Perfect for small projects and individuals."
              features={[
                "Core feature set",
                "Up to 5 users",
                "20GB storage",
                "Basic support",
                "Monthly updates"
              ]}
              delay="animate-fade-up animation-delay-100"
            />
            
            <PricingTier
              name="Professional"
              price="$99"
              description="Ideal for growing teams and businesses."
              features={[
                "Everything in Essential",
                "Up to 20 users",
                "100GB storage",
                "Priority support",
                "Weekly updates",
                "Advanced analytics"
              ]}
              isPopular={true}
              delay="animate-fade-up animation-delay-200"
            />
            
            <PricingTier
              name="Enterprise"
              price="Custom"
              description="For organizations with specific requirements."
              features={[
                "Everything in Professional",
                "Unlimited users",
                "Unlimited storage",
                "24/7 dedicated support",
                "Daily updates",
                "Custom integrations",
                "Dedicated success manager"
              ]}
              delay="animate-fade-up animation-delay-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
