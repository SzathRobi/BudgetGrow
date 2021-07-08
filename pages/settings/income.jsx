import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import nookies from "nookies";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import BudgetContext from "../../context/budgetContext";
import styles from "../../styles/Settings/SettingDetail.module.scss";
import Button from "../../comps/Controls/Button";

export async function getServerSideProps(ctx) {
  const API_URL = "https://budgetgrow.herokuapp.com";
  const cookies = nookies.get(ctx);
  const settingsResponse = await fetch(`${API_URL}/settings`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const settings = await settingsResponse.json();

  return {
    props: {
      cookies,
      settings,
      API_URL,
    },
  };
}

function Income({ cookies, settings, API_URL }) {
  const { setNavTabs } = useContext(BudgetContext);
  useEffect(() => {
    setNavTabs(10);
  }, []);
  const router = useRouter();
  const goBack = () => router.back();
  const settingId = settings[0].id;
  console.log("settings:", settings);

  const [updatedIncome, setUpdatedIncome] = useState();
  const updateIncome = (event) => setUpdatedIncome(event.target.value);

  const handleUpdate = (event) => {
    event.preventDefault();
    try {
      const newIncome = {
        income: updatedIncome,
      };

      axios
        .put(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `${API_URL}/settings/${settingId}`,
          newIncome,
          {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${cookies.jwt}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
          router.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={styles.setting_detail}>
      <label>
        <button onClick={goBack}>BACK</button>
        <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} />
      </label>
      <form
        onSubmit={(event) => handleUpdate(event)}
        className={styles.setting_form}
      >
        <div className="">
          <h2 className={styles.form_title}>Monthly income:</h2>
          <input onChange={(event) => updateIncome(event)} type="text" />
        </div>
        <Button text="UPDATE" />
      </form>
      <p>tutorial texts</p>
    </section>
  );
}

export default Income;
