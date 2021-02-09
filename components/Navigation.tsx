import { motion } from "framer-motion";

export default function Navigation({ username, signOut, setTimeRange }) {
  return (
    <nav className="navigation">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 1, delay: 0.2 },
        }}
      >
        Hello {username}
      </motion.div>
      <button
        className="btn btn-primary"
        onClick={() => {
          signOut();
        }}
      >
        Log Out
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          setTimeRange("short_term");
        }}
      >
        4 Weeks
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          setTimeRange("medium_term");
        }}
      >
        6 Months
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          setTimeRange("long_term");
        }}
      >
        All Time
      </button>
    </nav>
  );
}
