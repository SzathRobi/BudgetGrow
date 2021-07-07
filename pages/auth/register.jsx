import axios from "axios";
import { motion } from "framer-motion";
import Link from "next/link";
import Router from "next/router";
import { setCookie } from "nookies";
import nookies from "nookies";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import Input from "../../comps/Controls/Input";
import styles from "../../styles/auth/Register.module.scss";
import Button from "../../comps/Controls/Button";

function Register() {
  const API_URL = "https://budgetgrow.herokuapp.com";
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    const newUser = {
      email: data.email,
      username: data.username,
      password: data.password,
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

        setLoading(false);
        Router.push("/auth/create_settings");
        // Check response in console
        console.log("RESPONSE:", response);
      })
      .catch((error) => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.register}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.register_form}>
        <label className={styles.label}>
          <p>Email</p>
          <input {...register("email", { required: true })} />
        </label>
        <label className={styles.label}>
          <p>Username</p>
          <input {...register("username", { required: true, minLength: 4 })} />
        </label>
        <label className={styles.label}>
          <p>Password</p>
          <input
            type="password"
            {...register("password", { required: true, minLength: 5 })}
          />
        </label>
        <Button text={loading ? "LOADING" : "REGISTER"} />
        <Link href="/auth/login">
          <a>If you alredy have an account please click here to login</a>
        </Link>
      </form>
    </motion.section>
  );
}

export default Register;
