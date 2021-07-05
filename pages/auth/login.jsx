import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";
import nookies from "nookies";
import { useState } from "react";
import styles from "../../styles/auth/Login.module.css";

function login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const updateState = (type, event) => type(event.target.value);

  async function handleLogin(event) {
    event.preventDefault();
    try {
      const loginInfo = {
        identifier: identifier,
        password: password,
      };

      const login = await fetch(
        process.env.PUBLIC_api_url || "http://localhost:1337/auth/local",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );

      const loginResponse = await login.json();
      //console.log(loginResponse);

      nookies.set(null, "jwt", loginResponse.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      nookies.set(null, "user", JSON.stringify(loginResponse.user), {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });

      Router.push("/");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  }

  return (
    <section className={styles.login}>
      <form
        onSubmit={(event) => handleLogin(event)}
        className={styles.login_form}
      >
        <input
          onChange={(event) => updateState(setIdentifier, event)}
          type="text"
        />
        <input
          onChange={(event) => updateState(setPassword, event)}
          type="password"
        />
        <button>LOGIN</button>
      </form>
    </section>
  );
}

export default login;
