import  { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ResumeModel } from './3d model/resumemodel';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function Hero() {
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated);
  const navigate=useNavigate();
  const handelBuildResume=()=>{
    if(!isAuthenticated) return navigate('/auth/sign-in');
    navigate('/dashboard');
  }
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-blue-900/20 pt-0 overflow-hidden">
   
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-blue-900/20" />
      </div>

     
      <div className="model absolute inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#4F46E5" />
          <Suspense fallback={<div>Loading...</div>}>
            <ResumeModel />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex items-center justify-center mb-6">
            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm font-medium flex items-center">
              <Sparkles className="h-4 w-4 mr-2" />
              AI-Powered Resume Builder
            </span>
          </div>
          
          <h1 className="text-xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-200 to-purple-400">
            Create the Perfect Resume with
            <span className="block mt-2">AI Technology</span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="model-text mt-8 text-xl  text-blue-100/80 max-w-3xl mx-auto"
          >
            Build professional resumes in minutes with our AI-powered platform.
            Stand out from the crowd and land your dream job faster.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-wrap justify-center gap-4"
          >
            <button onClick={handelBuildResume} className=" group font-bold px-8 py-5 shadow-custom-lg bg-[#0ef] text-xl/3 text-[#323946] rounded-xl   transform hover:scale-105 transition-all flex items-center ">
              Build Your Resume
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 text-white border shadow-2xl border-white/10 rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all backdrop-blur-sm">
              View Examples
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { value: '10K+', label: 'Resumes Created' },
              { value: '95%', label: 'Success Rate' },
              { value: '24/7', label: 'AI Support' },
              { value: '100+', label: 'Templates' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  {stat.value}
                </div>
                <div className="mt-2 text-blue-200/60 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
    </div>
  );
}