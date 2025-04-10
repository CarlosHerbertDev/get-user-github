
"use client"

import { motion, Variants } from "motion/react"

function LoadingThreeDotsJumping() {
    const dotVariants: Variants = {
        jump: {
            y: -30,
            transition: {
                duration: 0.8,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            },
        },
    }

    return (
        <motion.div
            animate="jump"
            transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
            className="flex justify-center items-center gap-[10px] mt-20"
        >
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <motion.div className="dot" variants={dotVariants} />
            <StyleSheet />
        </motion.div>
    )
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
    return (
        <style>
            {`
          
            .dot {
              
            }
            `}
        </style>
    )
}

export default LoadingThreeDotsJumping
