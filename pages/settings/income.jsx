import axios from "axios";
import nookies from "nookies";
import { useState } from "react";
import { useRouter } from "next/router";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const settingsResponse = await fetch("http://localhost:1337/settings", {
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
    },
  };
}

function Income({ cookies, settings }) {
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
          `http://localhost:1337/settings/${settingId}`,
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
    <section>
      <button onClick={goBack}>BACK</button>
      <form onSubmit={(event) => handleUpdate(event)}>
        <div className="">
          <h2>Monthly income:</h2>
          <input onChange={(event) => updateIncome(event)} type="text" />
        </div>
        <button type="submit">UPDATE</button>
      </form>
      <p>tutorial texts</p>
    </section>
  );
}

export default Income;
