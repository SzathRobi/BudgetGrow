import { motion } from "framer-motion";
import Link from "next/link";
import styles from "../../styles/Settings/Settings.module.scss";

function Settings() {
  return (
    <motion.section
      className={styles.settings}
      initial={{ x: "100%" }}
      animate={{ x: "0" }}
      exit={{ x: "100%" }}
      transition={{ type: "tween" }}
    >
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <h1>Settings</h1>
      <Link href="/">
        <a>HOME</a>
      </Link>
    </motion.section>
  );
}

export default Settings;
