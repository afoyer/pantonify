import { motion } from "framer-motion";
import { signOut } from "next-auth/client";

export default function TimedOut({ signOut }) {
  return (
    <motion.div
      onTap={signOut}
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
