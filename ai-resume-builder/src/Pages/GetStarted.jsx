import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import image from '../assets/bg4.jpg';

export function CallToAction() {
  return (
    <section >
    <div className="absolute top-1/4 right-1/4 w-64 h-44 bg-blue-500/30 rounded-full filter blur-3xl animate-blob" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-44 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
    
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative "
      >
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white"
          >
            Ready to Build Your Perfect Resume?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-xl text-blue-100"
          >
            Join thousands of job seekers who have successfully landed their dream jobs
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            className="big-get mt-10 px-8 py-4 shadow-custom-lg font-semibold text-xl bg-[#0ef] text-black rounded-xl hover: flex items-center mx-auto "
          >
           <a href='/sign-in'>Get Started Now</a> <ArrowRight className="ml-2 h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
      
    </section>
  );
}