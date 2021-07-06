import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import AddItem from "../comps/AddItem/AddItem";
import ItemList from "../comps/ItemList/ItemList";
import Total from "../comps/Total/Total";
import Circular from "../comps/Total/progress/Circular";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Filters from "../comps/Filters/Filters";
import Button from "../comps/Controls/Button";

export async function getServerSideProps(ctx) {
  const API_URL = process.env.API_URL || "http://localhost:1337";
  const cookies = nookies.get(ctx);
  const transactionResponse = await fetch(`${API_URL}/transactions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const transactions = await transactionResponse.json();

  const settingResponse = await fetch(`${API_URL}/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const settings = await settingResponse.json();
  return {
    props: {
      cookies: cookies,
      transactions: transactions,
      settings: settings,
      API_URL,
    },
  };
}

export default function Home({ cookies, transactions, settings, API_URL }) {
  const router = useRouter();

  const [user, setUser] = useState(null);
  console.log("transactions:", transactions);
  console.log("settings:", settings);

  useEffect(() => {
    try {
      setUser(JSON.parse(cookies.user));
    } catch (error) {
      console.log(error);
      setUser(null);
    }
  }, []);

  const [tab, setTab] = useState(0);
  const [tabPos, setTabPos] = useState(0);
  const updateTab = (tabNum, tabPosNum) => {
    setTab(tabNum);
    setTabPos(tabPosNum);
  };

  const transaction_income =
    user && transactions.filter((transaction) => transaction.income);
  const transaction_expense =
    user && transactions.filter((transaction) => !transaction.income);

  return !user ? (
    <section className={styles.error_page}>
      <Button text={"LOGIN"} handleClick={() => router.push("/auth/login")} />
    </section>
  ) : (
    <motion.section
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween" }}
      className={styles.container}
    >
      <Head>
        <title>Create Next App</title>
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>

      {
        /*!user ? (
        <section className={styles.error_page}>
          <Button
            text={"LOGIN"}
            handleClick={() => router.push("/auth/login")}
          />
        </section>
      ) : (*/
        <main className={styles.main}>
          <Circular settings={settings[0]} />
          <Filters tab={tab} tabPos={tabPos} updateTab={updateTab} />
          <ItemList
            cookies={cookies}
            settings={settings[0]}
            tab={tab}
            transactions={transactions}
            transaction_income={transaction_income}
            transaction_expense={transaction_expense}
          />
        </main>
      }
    </motion.section>
  );
}
