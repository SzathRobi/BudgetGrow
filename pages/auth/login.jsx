import axios from "axios";
import Router from "next/router";
import Link from "next/link";
import { setCookie } from "nookies";
import nookies from "nookies";
import { useState } from "react";
import Input from "../../comps/Controls/Input";
import Button from "../../comps/Controls/Button";
import styles from "../../styles/auth/Login.module.scss";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const updateState = (type, event) => {
    type(event.target.value);
    console.log(event.target.value);
  };

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
        <Input
          labelText="Username"
          value={identifier}
          handleChage={(event) => updateState(setIdentifier, event)}
        />
        <Input
          labelText="Password"
          type="password"
          value={password}
          handleChage={(event) => updateState(setPassword, event)}
        />
        <Button text="LOGIN" />
        <Link href="/auth/register">
          <a>If you do not have an account please click here to register</a>
        </Link>
      </form>
    </section>
  );
}

export default Login;
