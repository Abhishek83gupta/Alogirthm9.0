// components/Sidebar.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaHeartbeat, 
  FaLungs, 
  FaNotesMedical, 
  FaVials, 
  FaHome,
  FaBrain,
  FaChartLine 
} from 'react-icons/fa';

function Sidebar({ setActiveComponent, active }) {
  const menuItems = [
    { id: 'general', name: 'General Health', icon: FaHome },
    { id: 'diabetes', name: 'Diabetes', icon: FaVials },
    { id: 'cancer', name: 'Cancer', icon: FaLungs },
    { id: 'heart', name: 'Heart Disease', icon: FaHeartbeat },
    { id: 'liver', name: 'Liver Disease', icon: FaNotesMedical },
    { id: 'brain', name: 'Brain Tumor', icon: FaBrain },
    { id: 'mental', name: 'Mental Health', icon: FaChartLine }
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8
      }}
      className="w-64 bg-gray-800 min-h-screen p-6"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-8"
      >
        <h1 className="text-2xl font-bold text-white mb-2">
          Disease Prediction
        </h1>
        <p className="text-gray-400 text-sm">
          AI-Powered Health Analysis
        </p>
      </motion.div>

      <nav className="space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut"
            }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            whileTap={{ 
              scale: 0.98,
              transition: { duration: 0.3 }
            }}
            onClick={() => setActiveComponent(item.id)}
            className={`
              relative flex items-center w-full p-3 rounded-lg
              transition-all duration-300 ease-in-out
              ${active === item.id 
                ? 'bg-blue-600 text-white shadow-lg' 
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }
            `}
          >
            <item.icon className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">{item.name}</span>
            
            {active === item.id && (
              <motion.div
                className="absolute right-0 top-0 h-full w-1 bg-blue-400 rounded-r-lg"
                layoutId="activeIndicator"
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-6 left-6 right-6"
      >
        <div className="bg-gray-700 rounded-lg p-4 text-gray-300 text-sm hover:bg-gray-600 transition-colors duration-300">
          <h3 className="font-medium mb-2">Need Help?</h3>
          <p className="text-gray-400">
            Contact our support team for assistance
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default Sidebar;