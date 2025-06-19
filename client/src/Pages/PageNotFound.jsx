import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center bg-gradient-to-tr from-green-200 to-white px-4">
      
     
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ rotate: [0, 10, -10, 0], scale: [0.9, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="text-[100px] mb-4"
      >
        👻 
      </motion.div>
    
    
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-extrabold text-gray-800 mb-2"
      >
        Oops! Lost in Space?
      </motion.h1>

      
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg text-gray-600 mb-6 max-w-md"
      >
        The page you're looking for doesn't seem to exist. Maybe it's hiding or got deleted.
      </motion.p>

     
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/" className="green-button !py-2">
          Take Me Home
        </Link>
      </motion.div>
    </div>
  );
};

export default PageNotFound;
