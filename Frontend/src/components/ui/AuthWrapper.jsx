import { motion } from 'framer-motion';

export const AuthWrapper = ({ children, title }) => (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <motion.div 
        initial={{ opacity: 0, x: 100 }}  // Starts off-screen to the right
        animate={{ opacity: 1, x: 0 }}  // Moves to its final position
        transition={{ duration: 0.9, ease: "easeOut" }} // Slower and smoother
        className="w-full max-w-md bg-[#0a0a0a] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <h2 className="text-4xl font-bold text-white text-center mb-6">{title}</h2>
          {children}
        </div>
      </motion.div>
    </div>
);
