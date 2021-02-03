import { motion } from "framer-motion";
import { getSession } from "next-auth/client";
export default async function Card(topSongSetter: Function, timeRange: String) {
  const session = await getSession();
  if (session) {
    await fetch(
      `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=4`,
      { headers: { Authorization: `Bearer ${session.accessToken}` } }
    )
      .then((response) => {
        return response.json();
      })
      .then((jsonResponse) => {
        if (!jsonResponse.items) {
          return [];
        }
        topSongSetter(
          jsonResponse.items.map((track) => {
            return {
              trackname: track.name,
              image: track.album.images[1].url,
              artist: track.artists[0].name,
            };
          })
        );
      });
  }
}
