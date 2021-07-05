import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";
import nookies from "nookies";
import { useState, useEffect } from "react";
import styles from "../../styles/auth/Register.module.css";

function register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const updateState = (type, event) => type(event.target.value);

  useEffect(() => {
    console.log(
      "EMAIL:",
      email,
      " USERNAME:",
      username,
      " PASSWORD:",
      password
    );
  }, [email, username, password]);

  const register = (event) => {
    event.preventDefault();
    const newUser = {
      email,
      username,
      password,
    };

    axios
      .post("http://localhost:1337/auth/local/register", newUser)
      .then((response) => {
        // Handle success.

        nookies.set(null, "jwt", response.data.jwt, {
          maxAge: 1 * 24 * 60 * 60, // 1 x 12 x 60 x 60 -> 12óra
          path: "/",
        });
        nookies.set(null, "user", JSON.stringify(response.data.user), {
          maxAge: 1 * 24 * 60 * 60,
          path: "/",
        });

        Router.push("/auth/create_settings");
        // Check response in console
        console.log("RESPONSE:", response);
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  return (
    <section className={styles.register}>
      <form onSubmit={() => register(event)} className={styles.register_form}>
        email
        <input
          type="text"
          value={email}
          onChange={(event) => updateState(setEmail, event)}
        />
        username
        <input
          type="text"
          value={username}
          onChange={(event) => updateState(setUsername, event)}
        />
        password
        <input
          type="password"
          value={password}
          onChange={(event) => updateState(setPassword, event)}
        />
        <input type="password" />
        <button>REGISTER</button>
      </form>
    </section>
  );
}

export default register;
