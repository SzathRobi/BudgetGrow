import ContextWrapper from "../comps/ContextWrapper";
import Header from "../comps/Header/Header";
import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <section>
      <ContextWrapper>
        <Header />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </ContextWrapper>
    </section>
  );
}

export default MyApp;
