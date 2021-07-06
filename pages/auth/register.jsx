import axios from "axios";
import Router from "next/router";
import { setCookie } from "nookies";
import nookies from "nookies";
import { useState, useEffect } from "react";
import Input from "../../comps/Controls/Input";
import styles from "../../styles/auth/Register.module.scss";
import Button from "../../comps/Controls/Button";

function Register() {
  const API_URL = process.env.API_URL || "http://localhost:1337";
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordChecked, setPasswordChecked] = useState("");
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
      .post(`${API_URL}/auth/local/register`, newUser)
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
        <Input
          labelText="Email"
          value={email}
          handleChage={(event) => updateState(setEmail, event)}
        />
        <Input
          labelText="Username"
          value={username}
          handleChage={(event) => updateState(setUsername, event)}
        />
        <Input
          labelText="Password"
          type="password"
          value={password}
          handleChage={(event) => updateState(setPassword, event)}
        />
        <Input
          labelText="Confirm Password"
          type="password"
          value={password}
          handleChage={(event) => updateState(setPasswordChecked, event)}
        />
        <Button text="REGISTER" />
      </form>
    </section>
  );
}

export default Register;
