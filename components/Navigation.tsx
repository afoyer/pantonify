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
        backgroundColor: "#282828",
        color: "#FEFFFE",
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
        PANTONIFY
      </motion.div>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          backgroundColor: "#7f0000",
          color: "#FEFFFE",
          transition: { duration: 0.5 },
        }}
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
                backgroundColor: "#282828",
                color: "#FEFFFE",
                transition: { duration: 0.5 },
              }
            : {
                opacity: 1,
                backgroundColor: "#282828",
                color: "#898989",
                transition: { duration: 0.5 },
              }
        }
        whileHover={
          timeRange === "short_term"
            ? {}
            : {
                backgroundColor: "#80e27e",
                color: "#FEFFFE",
                cursor: "pointer",
              }
        }
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
                backgroundColor: "#282828",
                color: "#FEFFFE",
                transition: { duration: 0.5 },
              }
            : {
                opacity: 1,
                backgroundColor: "#282828",
                color: "#898989",
                transition: { duration: 0.5 },
              }
        }
        whileHover={
          timeRange === "medium_term"
            ? {}
            : {
                backgroundColor: "#80e27e",
                color: "#FEFFFE",
                cursor: "pointer",
              }
        }
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
                backgroundColor: "#282828",
                color: "#FEFFFE",
                transition: { duration: 0.5 },
              }
            : {
                opacity: 1,
                backgroundColor: "#282828",
                color: "#898989",
                transition: { duration: 0.5 },
              }
        }
        whileHover={
          timeRange === "long_term"
            ? {}
            : {
                backgroundColor: "#80e27e",
                color: "#FEFFFE",
                cursor: "pointer",
              }
        }
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
