import { Provider } from "next-auth/client";

import "../styles/signedIn.scss";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (<Provider session={pageProps.session}><Component {...pageProps} /></Provider>)
}

export default MyApp;
