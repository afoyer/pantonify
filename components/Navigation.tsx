import { motion } from "framer-motion";
import { createLogicalOr } from "typescript";

export default function Navigation({
  username,
  signOut,
  setTimeRange,
  timeRange,
  color,
}) {
  return (
    <motion.nav
      className="navigation"
      initial={false}
      animate={{
        backgroundColor: color,
        transition: {
          staggerChildren: 0.5,
        },
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5 },
        }}
        className="hey"
      >
        Hey {username.substr(0, username.indexOf(" "))}
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.5 } }}
        whileHover={{ backgroundColor: "#b71c1c", color: "#FFFFFF" }}
        className="btn btn-primary"
        onClick={() => {
          signOut({ redirect: false });
        }}
      >
        Log Out
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={
          timeRange === "short_term"
            ? {
                opacity: 1,
                backgroundColor: "#80e27e",
                transition: { duration: 0.5 },
              }
            : {
                opacity: 1,
                backgroundColor: "#448bdb",
                transition: { duration: 0.5 },
              }
        }
        whileHover={{ backgroundColor: "#80e27e" }}
        className="btn btn-primary"
        onClick={() => {
          setTimeRange("short_term");
        }}
      >
        1 Month
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={
          timeRange === "medium_term"
            ? {
                opacity: 1,
                backgroundColor: "#4caf50",
                transition: { duration: 0.5 },
              }
            : {
                opacity: 1,
                backgroundColor: "#448bdb",
                transition: { duration: 0.5 },
              }
        }
        whileHover={{ backgroundColor: "#4caf50" }}
        className="btn btn-primary"
        onClick={() => {
          setTimeRange("medium_term");
        }}
      >
        6 Months
      </motion.button>
      <motion.button
        initial={{ opacity: 0 }}
        animate={
          timeRange === "long_term"
            ? {
                opacity: 1,
                backgroundColor: "#519657",
                transition: { duration: 0.5 },
              }
            : {
                opacity: 1,
                backgroundColor: "#448bdb",
                transition: { duration: 0.5 },
              }
        }
        whileHover={{ backgroundColor: "#519657" }}
        className="btn btn-primary"
        onClick={() => {
          setTimeRange("long_term");
        }}
      >
        All Time
      </motion.button>
    </motion.nav>
  );
}
