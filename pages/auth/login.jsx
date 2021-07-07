import axios from "axios";
import { motion } from "framer-motion";
import Router from "next/router";
import Link from "next/link";
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
  const [error, setError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data) => {
    setError(false);
    setLoading(true);
    try {
      const loginInfo = {
        identifier: data.identifier,
        password: data.password,
      };
      console.log(loginInfo);

      const login = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });

      const loginResponse = await login.json();
      console.log("login_res: ", loginResponse);

      if (loginResponse.statusCode === 400) {
        setLoading(false);
        setError(true);
        return;
      }

      nookies.set(null, "jwt", loginResponse.jwt, {
        maxAge: 1 * 12 * 60 * 60,
        path: "/",
      });
      nookies.set(null, "user", JSON.stringify(loginResponse.user), {
        maxAge: 1 * 12 * 60 * 60,
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
          {errors.identifier?.type === "required" && (
            <p className={styles.error_text}>Email or username is required</p>
          )}
          {error && (
            <p className={styles.error_text}>Invalid password or username</p>
          )}
        </label>
        <label className={styles.label}>
          <p className={inputStyles.label_text}>Password</p>
          <input
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className={styles.error_text}>Password is required</p>
          )}
          {error && (
            <p className={styles.error_text}>Invalid password or username</p>
          )}
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
