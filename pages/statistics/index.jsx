import nookies from "nookies";
import { useState } from "react";
import { Doughnut, Bar } from "react-chartjs-2";
import styles from "../../styles/statistics/statistics.module.scss";

export async function getServerSideProps(ctx) {
  /**
   * GET all transactions data from backend
   */
  const API_URL = "https://budgetgrow.herokuapp.com";
  const cookies = nookies.get(ctx);
  const transaction_response = await fetch(`${API_URL}/transactions`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const transactions = await transaction_response.json();

  return {
    props: { transactions },
  };
}

function Statistics({ transactions }) {
  const [doughnut_filter, setDoughnut_filter] = useState(false);
  const update_doughnut_filter = () => setDoughnut_filter(!doughnut_filter);

  const expenses = transactions.filter(
    (transaction) => transaction.income === false
  );
  const top_expenses = expenses.sort((a, b) => b.amount - a.amount).slice(0, 3);

  const bar_data = {
    labels: top_expenses.map((expense) => expense.title),
    datasets: [
      {
        label: "Top 3 Expenses",
        data: top_expenses.map((expense) => expense.amount),
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const expense_with_categ = expenses.filter((expense) => expense.category);
  const all_categ = expense_with_categ.map((expense) => expense.category.name);

  const categ_sum = [];
  const sum_categs = () => {
    const sum_obj = {};
    const summed_categs_raw = expense_with_categ.forEach((expense) => {
      if (sum_obj[expense.category.name]) {
        sum_obj[expense.category.name] += expense.amount;
        return;
      }
      sum_obj[expense.category.name] = expense.amount;
    });
    console.log("sum_obj:", sum_obj);

    for (const prop in sum_obj) {
      categ_sum.push(sum_obj[prop]);
    }
    console.log("sum_result:", categ_sum);
  };

  sum_categs();

  const find_duplicate = () => {
    const result = [];
    const count = {};
    all_categ.forEach((item) => {
      if (count[item]) {
        count[item] += 1;
        return;
      }
      count[item] = 1;
    });

    for (let prop in count) {
      if (count[prop] >= 2) {
        result.push(prop);
      }
    }

    //  console.log("count:", count);
    //  console.log("result:", result);
    return count;
  };

  const counted_items_raw = find_duplicate();
  // console.log("counted_items_raw is: ", counted_items_raw);

  const counted_items = [];
  const count_items = () => {
    for (const prop in counted_items_raw) {
      //   console.log(`${prop}(prop): ${counted_items_raw[prop]}`);
      counted_items.push(counted_items_raw[prop]);
    }
    //  console.log("counted_items:", counted_items);
  };

  count_items();

  const doughnut_data = {
    labels: top_expenses.map((expense) => expense.category.name),
    datasets: [
      {
        label: `Categories ${
          doughnut_filter ? "(sum of transactions)" : "(number of transactions)"
        }`,
        //
        data: doughnut_filter ? categ_sum : counted_items,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <section className={styles.statistics}>
      <h1>STATISTICS</h1>
      <article>
        <Doughnut data={doughnut_data} />
        <label htmlFor="filters">Filtered by:</label>
        <select
          onChange={() => update_doughnut_filter()}
          name="filters"
          id="filters"
        >
          <option value="sum">Sum of categories</option>
          <option value="num">Number of category transactions</option>
        </select>
      </article>
      <Bar data={bar_data} />
    </section>
  );
}

export default Statistics;
