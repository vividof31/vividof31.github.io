import React, { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface FadeInWhenVisibleProps {
  children: ReactNode;
  delay?: number; // Optional delay in seconds
  duration?: number; // Optional duration in seconds
  className?: string; // Optional additional class names
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  delay = 0,
  duration = 0.5,
  className = ''
}) => {
  const ref = useRef(null);
  // `once: true` ensures the animation only runs once when it enters view
  // `amount: 0.2` triggers the animation when 20% of the element is visible
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const variants = {
    hidden: { opacity: 0, y: 20 }, // Start slightly down and invisible
    visible: { opacity: 1, y: 0 }, // End fully visible and at original position
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: duration, delay: delay }}
      className={className} // Apply any additional classes passed as props
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
