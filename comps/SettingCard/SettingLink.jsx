import Link from "next/link";
import styles from "../../styles/Settings/SettingLink.module.scss";

function SettingLink({ href, title = "SETTING" }) {
  return (
    <Link href={href}>
      <a className={styles.link}>{title}</a>
    </Link>
  );
}

export default SettingLink;
