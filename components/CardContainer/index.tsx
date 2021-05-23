import React from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Container for the pantone card.
 * @param timeRange used to animate out components.
 * @param children children components
 * @param ref
 * @returns the pantone card.
 */
export default function CardContainer({ children, ref, timeRange }) {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={"Card" + timeRange}
          style={{ originX: 0.9, originY: 0.9 }}
          exit={{
            backgroundColor: "#ECECEA",
            opacity: 0,
            y: 20,
            rotate: -2,
            transition: { duration: 0.5 },
          }}
          initial={{
            opacity: 0,
            y: 20,
            rotate: -2,
          }}
          animate={{
            backgroundColor: "#ECECEA",
            opacity: 1,
            y: 0,
            rotate: 0,

            transition: { duration: 0.5 },
          }}
          className="pantone-card"
          id="PANTONECARD"
          ref={ref}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
