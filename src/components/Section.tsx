import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  amount?: number;
  once?: boolean;
}

export default function Section({ 
  children, 
  className = '', 
  animate = true,
  amount = 0.15,
  once = false,
  ...rest 
}: SectionProps) {
  const variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.15, once: false }}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.section>
  )
}
