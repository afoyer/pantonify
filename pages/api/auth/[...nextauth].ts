import NextAuth from "next-auth";
import Providers from "next-auth/providers";

//Next-Auth settings for signing in. Make sure you provide your own client ID and client secret in you .env file.

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
