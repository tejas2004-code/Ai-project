import React from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ModernTemplate } from './Template/Template4';
import {CreativeTemplate} from './Template/Template1';
import { ExecutiveTemplate } from './Template/Template2';
import { MinimalTemplate } from './Template/Template3';

import { Template5, Template6, Template7, Template8 } from './Template/Template5';





const templates = {
  1: ModernTemplate,
  2: CreativeTemplate,
  3: ExecutiveTemplate,
  4: MinimalTemplate,
  5: Template5,
  6:Template6,
  7:Template7,
  8:Template8

};


export function PreviewModal({ isOpen, onClose, templateId }) {
  const Template = templates[templateId ];

  return (

    <AnimatePresence className='z-50' >
      {isOpen && (

        
        <div className=" scroll fixed inset-0  z-50 overflow-auto ">
         
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50"
              onClick={onClose}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-xl shadow-xl max-w-4xl w-full mx-auto"
            >
              <button
                onClick={onClose}
                className="absolute top-4 text-gray-900 right-4 p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            
              <div className="p-6">
             
                <div className="bg-white shadow-sm border rounded-lg">
                  {Template && <Template />}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  
  );
}