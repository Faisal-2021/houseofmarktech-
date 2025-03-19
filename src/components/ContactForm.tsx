
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters' }),
});

type FormValues = z.infer<typeof formSchema>;

const ContactForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });
  
  const { formState } = form;
  const { isSubmitting } = formState;
  
  const onSubmit = async (data: FormValues) => {
    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Message sent successfully!');
      form.reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error('Error submitting form:', error);
    }
  };
  
  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-gray-100 opacity-70 z-0"
        aria-hidden="true"
      ></div>
      
      {/* Decorative elements */}
      <div 
        className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        aria-hidden="true"
      ></div>
      <div 
        className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        aria-hidden="true"
      ></div>
      
      <div className="container mx-auto px-6 md:px-10 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">Get in touch</h2>
            <p className="text-gray-600 md:text-lg">
              We'd love to hear from you. Complete the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 p-8 md:p-10 animate-fade-up">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Your name" 
                          className="bg-gray-50/50 border-gray-200 focus:border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300 transition-all" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="you@example.com" 
                          type="email"
                          className="bg-gray-50/50 border-gray-200 focus:border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300 transition-all" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700 flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Message
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[120px] bg-gray-50/50 border-gray-200 focus:border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-300 transition-all" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full flex items-center justify-center gap-2 bg-black hover:bg-gray-800 text-white py-3 h-auto transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loader mr-2"></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
