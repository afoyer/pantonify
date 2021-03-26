import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Card from "../components/Card";
import Track from "./../components/Track";
import TimedOut from "../components/TimedOut";
import Navigation from "../components/Navigation";
import domtoimage from "dom-to-image";
export default function Home() {
  //hex2rgba helper function
  const hex2rgba = (hex, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
  };
  //State Management
  const [timeRange, setTimeRange] = useState("short_term");
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [session, loading] = useSession();
  const [topSongs, setTopSongs] = useState([]);
  const [reLog, checkSession] = useState(true);
  const [pantone, setPantone] = useState([
    "#dddddd",
    "#dddddd",
    "#dddddd",
    "#dddddd",
  ]);
  //Image Downloading
  function takeImage() {
    var node = document.getElementById("SIGNEDIN");
    var w = node.getBoundingClientRect();
    domtoimage
      .toJpeg(node, {
        bgcolor: "#ffffff",
        width: w.width * 2,
        height: w.height * 2,
        style: {
          transform: "scale(2)",
          "transform-origin": "top left",
        },
      })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${timeRange}`;
        link.href = dataUrl;
        link.click();
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  }
  function signInSpotify() {
    signIn("spotify");
  }
  //On time range state update, update card information
  useEffect(() => {
    setIsLoaded(false);
    //Get Top Songs from specific time Range
    Card(setTopSongs, timeRange, checkSession, setPantone);
    setIsLoaded(true);
    //Scroll to view if not the first card
  }, [timeRange]);
  return (
    <>
      <Head>
        <title>PANTONIFY&copy;</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="See your true colors with your favorite music!"
        />
      </Head>
      {/* NOT LOGGED IN */}
      {!session && (
        <>
          <div className={styles.container}>
            <div className={styles.signincard}>
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
                    duration: 0.4,
                  },
                }}
              >
                <div className={styles.signInSqr}></div>
                <h1 className={styles.signInTitle}>PANTONIFY&copy;</h1>
                <h2 className={styles.signInLog}>1ED760</h2>
                <h2 className={styles.signInLog2}>Log in to Spotify</h2>
              </motion.div>
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
              <motion.svg
                style={{
                  position: "absolute",
                  width: 50,
                  bottom: "5%",
                  left: 0,
                  right: 0,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                animate={{ y: 10 }}
                transition={{
                  repeatType: "mirror",
                  repeat: Infinity,
                  duration: 1,
                }}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </motion.svg>
            </div>
          </div>
          <div className={styles.info}>
            <h1>WHAT IS THIS?</h1>
            <p>
              See your favorite spotify songs in a card style inspired by color
              guides. Your music will be specifically matched to the best color
              availabe that you can then check{" "}
              <a href="https://www.pantone.com/color-finder" rel="noreferrer n">
                here
              </a>
              .
            </p>
            <img src="/example.png" alt="pantonetemplate" />
          </div>
        </>
      )}
      {/* LOGGED IN */}

      {session && (
        <>
          <Navigation
            username={session.user.name}
            signOut={signOut}
            setTimeRange={setTimeRange}
            timeRange={timeRange}
            color={hex2rgba(pantone[0], 0.65)}
            takeImage={takeImage}
            reLog={reLog}
          />
          {/* CARD, ITS A LOT */}

          {isLoaded && reLog && (
            <motion.div
              id="SIGNEDIN"
              className="signed-in"
              initial={{
                background: `linear-gradient(180deg, ${hex2rgba(
                  pantone[0],
                  0.8
                )}, ${hex2rgba(
                  pantone[1],
                  0.1
                )} 70.71%),linear-gradient(120deg, ${hex2rgba(
                  pantone[1],
                  0.8
                )}, ${hex2rgba(
                  pantone[2],
                  0.1
                )} 70.71%),linear-gradient(336deg, ${hex2rgba(
                  pantone[2],
                  0.8
                )}, ${hex2rgba(pantone[3], 0)} 70.71%)`,
              }}
              animate={{
                background: `linear-gradient(180deg, ${hex2rgba(
                  pantone[0],
                  0.8
                )}, ${hex2rgba(
                  pantone[1],
                  0
                )} 60.71%),linear-gradient(120deg, ${hex2rgba(
                  pantone[1],
                  0.8
                )}, ${hex2rgba(
                  pantone[2],
                  0
                )} 80.71%),linear-gradient(180deg, ${hex2rgba(
                  pantone[2],
                  0.8
                )}, ${hex2rgba(pantone[3], 0.8)} 95.71%)`,
                // background: `radial-gradient(circle at 25% 25%, ${hex2rgba(
                //   pantone[0],
                //   1
                // )}, transparent 63%),radial-gradient(circle at 87.55% 12.49%, ${hex2rgba(
                //   pantone[1],
                //   1
                // )}, transparent 75%),radial-gradient(circle at 55.63% 43.86%, ${hex2rgba(
                //   pantone[2],
                //   1
                // )}, transparent 75%),radial-gradient(circle at 75% 75%, ${hex2rgba(
                //   pantone[3],
                //   1
                // )}, transparent 75%),radial-gradient(circle at 50% 50%, #c0a8a3, #c0a8a3 100%)`,
                transition: { duration: 0.5 },
              }}
            >
              <div className="card-display">
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
                    <div className="title-card">PANTONIFY&copy;</div>
                    <Track array={topSongs} />
                    <footer className="bottom">
                      {session.user.name && (
                        <h1>
                          Made for{" "}
                          {session.user.name.substr(
                            0,
                            session.user.name.indexOf(" ")
                          )}
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
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {!reLog && <TimedOut signOut={signOut} />}
        </>
      )}
    </>
  );
}
