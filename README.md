<h2 align="center">
  <strong>PANTONIFY &copy;</strong>
</h2>
<p align="center">
  A Fun Spotify Top Tracks.
</p>

Made with Framer Motion, NextJS, fast-average-color and Next-Auth.

Gets a Spotify user's top 4 tracks and matches their album art with their respective pantone swatch color to turn into a swatch card. Supports authentication of any user.

### SETUP

* Install all packages.

  <code> npm i </code>

* Make sure to login to your [Spotify dashboard](https://developer.spotify.com/dashboard/login) and get your API key/secret.

* in a .env file at the root of your directory, set <code>SPOTIFY_CLIENT_ID</code> and <code>SPOTIFY_CLIENT_SECRET</code> to your respective api information. 
Also set <code>NEXTAUTH_URL</code> to http://localhost:3000/ (don't forget to allow this url in your Spotify App).


