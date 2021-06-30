import { motion } from "framer-motion";
import Link from "next/link";
import SettingLink from "../../comps/SettingCard/SettingLink";
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
      <SettingLink title="MONTHLY INCOME" href="settings/income" />
      <SettingLink title="MONTHLY EXPENSE" href="settings/expense" />
      <SettingLink title="HOME" href="/" />
    </motion.section>
  );
}

export default Settings;
