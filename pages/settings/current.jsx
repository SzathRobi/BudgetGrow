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

function Current({ cookies, settings }) {
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
          `http://localhost:1337/settings/${settingId}`,
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
    <section>
      <button onClick={goBack}>BACK</button>
      <form onSubmit={(event) => handleUpdate(event)}>
        <div className="">
          <h2>Current money:</h2>
          <input onChange={(event) => updateCurrent(event)} type="text" />
        </div>
        <button type="submit">UPDATE</button>
      </form>
      <p>tutorial texts</p>
    </section>
  );
}

export default Current;
