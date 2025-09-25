import { motion } from "framer-motion";

interface AnimatedSendButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

const AnimatedSendButton = ({ onClick, disabled = false, isLoading = false }: AnimatedSendButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isLoading}
      whileHover={{ scale: isLoading ? 1 : 1.05 }}
      whileTap={{ scale: isLoading ? 1 : 0.95 }}
      className="relative rounded-2xl p-2.5 sm:p-3 overflow-hidden 
                 bg-gradient-to-r from-[#de7fdf] to-[#a881fa] 
                 hover:from-[#e68ae6] hover:to-[#b48dfc]
                 transition-all duration-200 shadow-md
                 disabled:opacity-50 disabled:cursor-not-allowed
                 group"
    >
      {/* Background pulse animation when loading */}
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#f0a0f0] to-[#c4a0ff] opacity-30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Send icon container */}
      <div className="relative z-10 w-6 h-6 flex items-center justify-center">
        {isLoading ? (
          // AI processing animation
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Central core */}
            <motion.div
              className="w-2 h-2 bg-white rounded-full absolute"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.7, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Orbiting particles */}
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className="w-1 h-1 bg-white rounded-full absolute"
                animate={{
                  rotate: 360,
                  scale: [0.8, 1.2, 0.8]
                }}
                transition={{
                  rotate: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.33
                  },
                  scale: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.2
                  }
                }}
                style={{
                  transformOrigin: `${8 * Math.cos((index * 120 * Math.PI) / 180)}px ${8 * Math.sin((index * 120 * Math.PI) / 180)}px`
                }}
              />
            ))}
          </motion.div>
        ) : (
          // Send arrow icon
          <motion.svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            initial={{ x: 0, opacity: 1 }}
            animate={{
              x: isLoading ? 20 : 0,
              opacity: isLoading ? 0 : 1
            }}
            transition={{ duration: 0.3 }}
          >
            <motion.path
              d="M22 2L11 13"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            <motion.path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="currentColor"
              fillOpacity="0.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            />
          </motion.svg>
        )}
      </div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 -skew-x-12"
        animate={{
          x: disabled || isLoading ? "-100%" : ["-100%", "100%", "-100%"]
        }}
        transition={{
          x: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            times: [0, 0.5, 1]
          }
        }}
        style={{
          opacity: disabled || isLoading ? 0 : 0.3
        }}
      />

      {/* Success ripple effect (can be triggered externally) */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-white"
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0 }}
        transition={{ duration: 0.6 }}
      />
    </motion.button>
  );
};

export default AnimatedSendButton;