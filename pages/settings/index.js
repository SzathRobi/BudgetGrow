import { motion } from "framer-motion";
import { useRouter } from "next/router";
import nookies, { destroyCookie } from "nookies";
import SettingLink from "../../comps/SettingCard/SettingLink";
import styles from "../../styles/Settings/Settings.module.scss";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);

  return {
    props: {
      cookies,
    },
  };
}

function Settings({ cookies }) {
  const router = useRouter();
  const logut = () => {
    destroyCookie(null, "user");
    destroyCookie(null, "jwt");
    router.reload();
    console.log("logged out");
  };

  return (
    <motion.section
      className={styles.settings}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: "tween" }}
    >
      <SettingLink title="MONTHLY INCOME" href="/settings/income" />
      <SettingLink title="MONTHLY EXPENSE" href="/settings/expense" />
      <SettingLink title="CURRENT MONEY" href="/settings/current" />
      <SettingLink title="HOME" href="/" />
      <SettingLink title="LOGOUT" href="/" handleClick={logut} />
    </motion.section>
  );
}

export default Settings;
