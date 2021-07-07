import BudgetProvider from "../context/budgetContext";
import Header from "../comps/Header/Header";
import "../styles/globals.scss";
import { AnimatePresence } from "framer-motion";

function MyApp({ Component, pageProps, router }) {
  return (
    <section>
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </section>
  );
}

export default MyApp;
