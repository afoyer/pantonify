import { motion } from "framer-motion";

export default function TimedOut() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.5 },
      }}
      className="timed-out"
    >
      <h1>Session Timed Out.</h1>
      <h2>Please Log Back In.</h2>
    </motion.div>
  );
}
