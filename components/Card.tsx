import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
import FastAverageColor from "fast-average-color";

export default async function Card(topSongSetter: Function, timeRange: String) {
  const session = await getSession();
  if (session) {
    const fac = new FastAverageColor();
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=4`,
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const jsonResponse = await response.json();
    const trackArray: Array<Object> = await Promise.all(
      jsonResponse.items.map((track) => {
        return fac
          .getColorAsync(track.album.images[1].url, {
            algorithm: "sqrt",
          })
          .then((color) => {
            const pant = require("nearest-pantone");
            const pantone = pant.getClosestColor(color.hex);
            return {
              trackname: track.name,
              album: track.album.name,
              image: track.album.images[0].url,
              artist: track.artists[0].name,
              imagecolor: pantone.hex,
              pantone: pantone.pantone,
            };
          });
      })
    );
    topSongSetter(trackArray);
  }
}