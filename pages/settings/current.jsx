import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
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

function Current({ cookies, settings, API_URL }) {
  const { setNavTabs } = useContext(BudgetContext);
  useEffect(() => {
    setNavTabs(10);
  }, []);
  const router = useRouter();
  const goBack = () => router.back();
  const settingId = settings[0].id;
  console.log("settings:", settings);

  const [updatedCurrent, setUpdatedCurrent] = useState();
  const updateCurrent = (event) => setUpdatedCurrent(event.target.value);

  const handleUpdate = (event) => {
    event.preventDefault();
    try {
      const newCurrent = {
        current: updatedCurrent,
      };

      axios
        .put(
          /*`${process.env.PUBLIC_API_URL}/transactions` ||*/
          `${API_URL}/settings/${settingId}`,
          newCurrent,
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
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.setting_detail}
    >
      <label>
        <button onClick={goBack}>BACK</button>
        <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} />
      </label>
      <form
        onSubmit={(event) => handleUpdate(event)}
        className={styles.setting_form}
      >
        <div>
          <h2 className={styles.form_title}>Current money:</h2>
          <input onChange={(event) => updateCurrent(event)} type="text" />
        </div>
        <Button text="UPDATE" />
      </form>
      <p>tutorial texts</p>
    </motion.section>
  );
}

export default Current;
