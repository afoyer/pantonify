import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import styles from "../styles/Home.module.scss";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Card from "../components/Card";
import Track from "./../components/Track";
import TimedOut from "../components/TimedOut";
import Navigation from "../components/Navigation";
import domtoimage from "dom-to-image";
import CardContainer from "../components/CardContainer";
import SplashContainer from "../components/SplashContainer";
import Footer from "../components/Footer";

/** Home is the major inner workings of this app.
 *  It handles the non-logged in state and logged in state. I know not very convenient.
 */
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
  const [validToken, checkSession] = useState(true);
  const [pantone, setPantone] = useState([
    "#dddddd",
    "#dddddd",
    "#dddddd",
    "#dddddd",
  ]);

  /**
   * takeImage takes a screenshot of the entire page without navigation at a higher resolution for
   * better sharing. Not ideal but works pretty well.
   */
  function takeImage() {
    var node = document.getElementById("SIGNEDIN");
    var w = node.getBoundingClientRect();
    domtoimage
      .toPng(node, {
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
  /**
   * signs into spotify using next-auth.
   */
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
          content="Pantonify: See your true colors with your favorite music!"
        />
        <meta name="keywords" content="Pantonify, Spotify, Top Artists"></meta>
        <meta property="og:title" content="PANTONIFY" />
        <meta
          property="og:description"
          content="deSee your true colors with your favorite music!"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta charSet="utf-8" />
        <meta
          property="og:image"
          content="https://repository-images.githubusercontent.com/335487690/cd241b80-6d7c-11eb-8b6f-8f06bd4af5dc"
        />
        <meta property="og:url" content="https://pantonify.herokuapp.com/" />
      </Head>
      {/* NOT LOGGED IN */}
      {!session && <SplashContainer signIn={signInSpotify} styles={styles} />}
      {/* LOGGED IN */}

      {session && (
        <>
          <Navigation
            signOut={signOut}
            setTimeRange={setTimeRange}
            timeRange={timeRange}
            takeImage={takeImage}
            reLog={validToken}
          />
          {isLoaded && validToken && (
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
                transition: { duration: 0.5 },
              }}
            >
              <div className="card-display">
                <CardContainer ref={ref} timeRange={timeRange}>
                  <div className="title-card">PANTONIFY&copy;</div>
                  <Track array={topSongs} />
                  <Footer session={session} />
                </CardContainer>
              </div>
            </motion.div>
          )}

          {!validToken && <TimedOut signOut={signOut} />}
        </>
      )}
    </>
  );
}
