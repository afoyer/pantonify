import { getSession } from "next-auth/client";
import FastAverageColor from "fast-average-color";

/**
 * Fetches user's top songs (depending on time range) from Spotify and get's their album art, average pantone color, and details.
 * @param topSongSetter state setter for setting all the songs
 * @param timeRange the time range we will use for the spotify fetch
 * @param checkSession state setter for setting session
 * @param setPantone state setter for setting pantone color for all tracks, returns array
 */
export default async function Card(
  topSongSetter: Function,
  timeRange: String,
  checkSession: Function,
  setPantone: Function
) {
  const session = await getSession();
  if (session) {
    const fac = new FastAverageColor();
    const response = await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=4`,
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    );
    const jsonResponse = await Promise.resolve(response.json());
    if (!jsonResponse) {
      checkSession(false);
    } else if (jsonResponse.error) {
      checkSession(false);
    } else {
      const trackArray: Array<any> = await Promise.all(
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
      if (trackArray.length < 4) {
        for (let i = trackArray.length; i < 4; i++) {
          trackArray.push({
            trackname: "",
            album: "",
            image: "/blank.png",
            artist: "",
            imagecolor: "#d5d5d5",
            pantone: "",
          });
        }
      }
      setPantone(
        trackArray.map((track) => {
          return track.imagecolor;
        })
      );
      topSongSetter(trackArray);
    }
  }
}
