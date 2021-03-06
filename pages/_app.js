import ContextWrapper from "../comps/ContextWrapper";
import Header from "../comps/Header/Header";
import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps }) {
  return (
    <section>
      <ContextWrapper>
        <Header />
        <div className="page">
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />{" "}
            {/*///////  maybe need a key   //////*/}
          </AnimatePresence>
        </div>
      </ContextWrapper>
    </section>
  );
}

export default MyApp;
