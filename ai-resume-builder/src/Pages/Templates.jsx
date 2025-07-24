import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TemplateSection } from './ResumetemplateSection/TemplateSection';

const templates = [
  { id: '1', name: 'Modern Professional', description: 'Clean and contemporary design with a focus on readability', popular: true, preview: 'TemplateImage/template1.png' },
  { id: '2', name: 'Creative Portfolio', description: 'Stand out with a unique layout perfect for creative roles', preview: '/TemplateImage/template2.png' },
  { id: '3', name: 'Executive Suite', description: 'Professional template ideal for senior positions', preview: '/TemplateImage/template3.png' },
  { id: '4', name: 'Minimal Classic', description: 'Traditional layout with a modern minimal twist', preview: '/TemplateImage/template4.png' },
  { id: '5', name: 'Minimal Classic', description: 'Traditional layout with a modern minimal twist', preview: '/TemplateImage/template5.png' },
  { id: '6', name: 'Minimal Classic', description: 'Traditional layout with a modern minimal twist', preview: '/TemplateImage/template6.png' },
  { id: '7', name: 'Minimal Classic', description: 'Traditional layout with a modern minimal twist', preview: '/TemplateImage/template7.png' },
  { id: '8', name: 'Fresher Template', description: 'Traditional layout with a modern minimal twist', preview: '/TemplateImage/template8.png' },
];

export function Templates() {
  return (
    <section id="templates" className="py-20 bg-gray-900 relative overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-white">
            Professional Resume Templates
          </h2>
          <p className="mt-4 text-xl text-blue-200">
            Choose from our collection of ATS-friendly templates
          </p>
        </motion.div>

       
        <div className="mt-16 w-full overflow-hidden relative">
          <motion.div
            className="flex space-x-6"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          >
            {[...templates, ...templates].map((template, index) => (
              <div key={index} className="flex-shrink-0 w-64 ">
                <TemplateSection key={template.id} {...template} />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
