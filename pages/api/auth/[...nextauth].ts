import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { signIn } from "next-auth/client";

const options = {
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      scope: "user-top-read",
      authorizationUrl: `https://accounts.spotify.com/authorize?response_type=code&show_dialog=true`,
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: null,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async (token, user, account) => {
      // if (!account) {
      //   token.accessToken = fetch("https://accounts.spotify.com/api/token", {
      //     method: "POST",
      //     body: JSON.stringify({
      //       grant_type: "refresh_token",
      //       refresh_token: token.refreshToken,
      //     }),
      //     headers: {
      //       Authorization: `Basic ${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      //     },
      //   });
      //   console.log("new token:" + token.accessToken);
      // }
      if (account) {
        token.accessToken = account.accessToken;
      }

      return Promise.resolve(token);
    },

    session: async (session, token) => {
      session.accessToken = token.accessToken;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
