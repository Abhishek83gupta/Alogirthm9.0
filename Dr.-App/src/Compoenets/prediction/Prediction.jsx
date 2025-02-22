// App.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeartbeat,FaNotesMedical, FaVials, FaClinicMedical } from 'react-icons/fa';
import GeneralPrediction from './GeneralPrediction';
import DiabetesPrediction from './DiabetesPrediction';
// import CancerPrediction from './CancerPrediction';
import HeartPrediction from './HeartPrediction';
import LiverPrediction from './LiverPrediction';

function prediction() {
  const [activeComponent, setActiveComponent] = useState('general');

  const components = {
    general: { component: GeneralPrediction, icon: FaClinicMedical },
    diabetes: { component: DiabetesPrediction, icon: FaVials },
    // cancer: { component: CancerPrediction, icon: FaLungs },
    heart: { component: HeartPrediction, icon: FaHeartbeat },
    liver: { component: LiverPrediction, icon: FaNotesMedical }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8
        }}
        className="w-64 bg-gray-800 p-6"
      >
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-2xl font-bold text-white mb-8"
        >
          Disease Prediction
        </motion.h1>
        <nav className="space-y-2">
          {Object.entries(components).map(([key, { icon: Icon }], index) => (
            <motion.button
              key={key}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02,
                backgroundColor: '#374151',
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.98,
                transition: { duration: 0.3 }
              }}
              onClick={() => setActiveComponent(key)}
              className={`flex items-center w-full p-3 rounded-lg transition-colors duration-300 ${
                activeComponent === key ? 'bg-blue-500 text-white' : 'text-gray-300'
              }`}
            >
              <Icon className="mr-3" />
              {key.charAt(0).toUpperCase() + key.slice(1)} Prediction
            </motion.button>
          ))}
        </nav>
      </motion.div>

      <div className="flex-1 p-8">
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeComponent}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.5
            }}
          >
            {React.createElement(components[activeComponent].component)}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default prediction;