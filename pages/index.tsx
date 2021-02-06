import Head from "next/head";
import { getSession, signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Home.module.scss";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import { setTextRange } from "typescript";
import Track from "./../components/Track";
export default function Home() {
  const [session, loading] = useSession();
  const [topSongs, setTopSongs] = useState([]);
  const [timeRange, setTimeRange] = useState("short_term");
  function signInSpotify() {
    signIn("spotify");
  }
  useEffect(() => {
    Card(setTopSongs, timeRange);
  }, [timeRange]);
  function getSongs(time_range) {
    console.log("clicked");
  }
  return (
    <>
      <Head>
        <title>PANTONIFY&copy;: A Spotify Tracker.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!session && (
        <div className={styles.container}>
          <>
            <motion.div
              whileTap={{ scale: 0.98 }}
              onClick={signInSpotify}
              className={styles.center}
              initial={{ opacity: 0, y: 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.5,
                },
              }}
            >
              <div className={styles.signInSqr}></div>
              <h1 className={styles.signInTitle}>PANTONIFY&copy;</h1>
              <h2 className={styles.signInLog}>1ED760</h2>
              <h2 className={styles.signInLog2}>
                Log in to Spotify
                <span>
                  <img />
                </span>
              </h2>
            </motion.div>
          </>
          <a
            href="https://aymericfoyer.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            <motion.svg
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
              className={styles.aflogo}
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
        </div>
      )}
      {/* LOGGED IN */}

      {session && (
        <div className="signed-in" style={{ backgroundColor: "lightgray" }}>
          <div>Hello {session.user.name}</div>
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
            short Range
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setTimeRange("medium_term");
            }}
          >
            Med Range
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setTimeRange("long_term");
            }}
          >
            Long Range
          </button>

          {topSongs.length > 0 && (
            <div className="pantone-card">
              <div className="title-card">PANTONIFY&copy;</div>
              <Track array={topSongs} />
            </div>
          )}
        </div>
      )}
    </>
  );
}