import axios from "axios";
import { motion } from "framer-motion";
import Router from "next/router";
import Link from "next/link";
import { setCookie } from "nookies";
import nookies from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
//import Input from "../../comps/Controls/Input";
import Button from "../../comps/Controls/Button";
import styles from "../../styles/auth/Login.module.scss";
import inputStyles from "../../styles/controls/Input.module.scss";

function Login() {
  const API_URL = "https://budgetgrow.herokuapp.com";
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const loginInfo = {
        identifier: data.identifier,
        password: data.password,
      };

      const login = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

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

      setLoading(false);
      Router.push("/");
    } catch (error) {
      // Handle errors
      console.log(error);
    }
  };
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.login}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.login_form}>
        <label className={styles.label}>
          <p>Username</p>
          <input {...register("identifier", { required: true })} />
        </label>
        <label className={styles.label}>
          <p className={inputStyles.label_text}>Password</p>
          <input
            type="password"
            {...register("password", { required: true })}
          />
        </label>

        <Button text={loading ? "LOADING" : "LOGIN"} />
        <Link href="/auth/register">
          <a>If you do not have an account please click here to register</a>
        </Link>
      </form>
    </motion.section>
  );
}

export default Login;
