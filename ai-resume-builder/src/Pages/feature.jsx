import React from 'react';
import { Sparkles, Clock, Layout, Shield, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import image from '../assets/bg2.jpg';
import { CallToAction } from './GetStarted';


const features = [
  {
    icon: <Sparkles className="group-hover:text-[#0ef]  duration-300 transition-colors h-6 w-6 text-[#101324] " />,
    title: 'AI-Powered Writing',
    description: 'Our advanced AI helps you write compelling content that highlights your achievements.'
  },
  {
    icon: <Clock className="h-6 w-6 text-[#101324] duration-300 transition-colors group-hover:text-[#0ef]" />,
    title: 'Quick & Easy',
    description: 'Create a professional resume in minutes, not hours. Save time with our intuitive interface.'
  },
  {
    icon: <Layout className="h-6 w-6 text-[#101324] duration-300 transition-colors group-hover:text-[#0ef]" />,
    title: 'Beautiful Templates',
    description: 'Choose from dozens of ATS-friendly templates designed by recruitment experts.'
  },
  {
    icon: <Shield className="h-6 w-6 text-[#101324] duration-300 transition-colors group-hover:text-[#0ef]  " />,
    title: 'ATS Optimized',
    description: 'Ensure your resume passes Applicant Tracking Systems with our optimized formats.'
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
console.log("hettt",image);
export function Features() {
  return (

<section id="features" className="py-20 bg-gray-900   relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-purple-900/20" />
      
      {/* Animated Particles */}
      <div className="absolute inset-0">

         <div className="absolute inset-0 bg-cover bg-center opacity-10"  style={{ backgroundImage: `url(${image})` }} />
        
        <div className="absolute top-1/4 right-1/4 w-64 h-50 bg-blue-500/30 rounded-full filter blur-3xl animate-blob z-20" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-54 bg-purple-500/30 rounded-full filter blur-3xl animate-blob animation-delay-2000 z-20" />
  
       
      </div>
      
 
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative ">  
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center"
        >
          <h2 className="text-4xl font-bold text-white">
            Features that Make Us Stand Out
          </h2>
          <p className="mt-4 text-xl text-blue-200">
            Everything you need to create a standout resume
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="bg-gray-800/50 backdrop-blur-lg p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="group p-3 bg-[#0ef] rounded-xl inline-block hover:bg-blue-500/10 hover:shadow-none  shadow-custom-lg">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '10K+', label: 'Resumes Created' },
            { value: '95%', label: 'Success Rate' },
            { value: '24/7', label: 'AI Support' },
            { value: '100+', label: 'Templates' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent  bg-[#0ef]">
                {stat.value}
              </div>
              <div className="mt-2 text-blue-200/60 text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
        <div className='w-100 relative h-1 my-12 bg-[#0ef] right-0 transform shadow-custom-lg rounded'></div>
    
      <CallToAction/>
      </div>
   
    </section>
  );
}