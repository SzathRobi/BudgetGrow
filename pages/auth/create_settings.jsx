import axios from "axios";
import { motion } from "framer-motion";
import nookies from "nookies";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  return {
    props: {
      cookies: cookies,
    },
  };
}

function Create_settings({ cookies }) {
  const router = useRouter();

  const API_URL = "https://budgetgrow.herokuapp.com";

  const [income, setIncome] = useState("");
  const [expense, setExpense] = useState("");
  const [current, setCurrent] = useState("");
  const updateState = (type, event) => type(event.target.value);

  const createSettings = (event) => {
    event.preventDefault();

    const newSetting = {
      income,
      expense,
      current,
      user: JSON.parse(cookies.user),
    };

    axios
      .post(`${API_URL}/settings`, newSetting, {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${cookies.jwt}`,
        },
      })
      .then((response) => {
        // Handle success.

        router.push("/");
        // Check response in console
        console.log("RESPONSE:", response);
        console.log("Well done!");
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <form onSubmit={(event) => createSettings(event)}>
        <h1>Settings</h1>
        <div>
          <h2>Total Income</h2>
          <input
            value={income}
            onChange={(event) => updateState(setIncome, event)}
            type="text"
          />
        </div>
        <div>
          <h2>Total Expense</h2>
          <input
            value={expense}
            onChange={(event) => updateState(setExpense, event)}
            type="text"
          />
        </div>
        <div>
          <h2>Current</h2>
          <input
            value={current}
            onChange={(event) => updateState(setCurrent, event)}
            type="text"
          />
        </div>
        <button>OK</button>
      </form>
    </motion.section>
  );
}

export default Create_settings;
