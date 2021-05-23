import React from "react";
import { motion } from "framer-motion";

/**
 * Footer for the pantone card. Displays user name and date.
 * @param session used to get the user's name.
 */
export default function Footer({ session }) {
  /** Current Date */
  const today = new Date();
  return (
    <footer className="bottom">
      {session.user.name.length && (
        <h1>
          Made for{" "}
          {session.user.name.substr(
            0,
            session.user.name.indexOf(" ")
              ? session.user.name.indexOf(" ")
              : session.user.name.length
          )}
          , {today.getDate()}/{today.getMonth() + 1}/{today.getFullYear()}
        </h1>
      )}
      <a
        className="punchhole"
        href="https://aymericfoyer.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        {/* <img src="./icon.png" />{" "} */}
        <motion.svg
          className="logo"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: 0.7, delay: 0.2 },
          }}
          whileHover={{
            fill: ["#000000", "#C70039", "#01579B", "#000000"],
            transition: {
              loop: Infinity,
              flip: 0,
              ease: "linear",
              duration: 3,
            },
          }}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 259.57 158.05"
        >
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <polyline points="104.42 1.11 259.57 0 225.92 29.63 136.84 29.63 136.84 69.13 179.84 69.13 157.06 98.77 137.1 98.77 137.1 157.19 104.42 157.19" />
              <path d="M0,158.05H26.58l12.08-14.68,65.77-23.13V1.11ZM93.08,98.94c-6.59,2.35-36.51,14.37-44.34,17-1.21.41-1.17-.47-.73-1.15L93.92,43c-.15.22.51.46.44,1V97.11A1.94,1.94,0,0,1,93.08,98.94Z" />
              <polygon points="187.61 69.13 164.82 98.77 194.34 98.77 216.6 69.13 187.61 69.13" />
            </g>
          </g>
        </motion.svg>
      </a>
    </footer>
  );
}
