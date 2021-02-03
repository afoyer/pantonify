import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { signIn } from "next-auth/client";

const options = {
  // debug: true,
  providers: [
    Providers.Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    // signIn: async (user, account) => {
    //   user.accessToken = account.accessToken;
    //   user.refreshToken = account.refreshToken;
    //   return Promise.resolve(user);
    // },
    jwt: async (token, user, account) => {
      if (account) {
        token.accessToken = account.accessToken;
        token.refreshToken = account.refreshToken;
      }

      return Promise.resolve(token);
    },

    session: async (session, token) => {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      return Promise.resolve(session);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
