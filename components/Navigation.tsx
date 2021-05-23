import { motion } from "framer-motion";

/**
 * Navigation component. Handles logging in/out, changing time periods and taking a screenshot of the card.
 * @param signOut sign out function
 * @param timeRange setting for which button to highlight based on setTimeRange
 * @param reLog check state if session is timed out or not
 * @param takeImage screenshot function
 * @param setTimeRange setter for time range
 * @returns the Navigation component
 */
export default function Navigation({
  signOut,
  setTimeRange,
  timeRange,
  takeImage,
  reLog,
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
          backgroundColor: "#282828",
          color: "#FEFFFE",
          transition: { duration: 0.5 },
        }}
        whileHover={{ backgroundColor: "#b71c1c", color: "#FFFFFF" }}
        className="btn btn-primary"
        onClick={() => {
          signOut({ redirect: false });
        }}
      >
        Exit
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
      {reLog && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundColor: "#1565c0",
            color: "#FEFFFE",
            transition: { duration: 0.5 },
          }}
          whileHover={{ backgroundColor: "#5e92f3", color: "#FFFFFF" }}
          className="btn btn-primary download"
          onClick={takeImage}
        >
          Download
        </motion.button>
      )}
    </motion.nav>
  );
}
