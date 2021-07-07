import Link from "next/link";
import styles from "../../styles/Settings/SettingLink.module.scss";

function SettingLink({ href, title = "SETTING", handleClick = null }) {
  return (
    <Link href={href}>
      <a onClick={handleClick} className={styles.link}>
        {title}
      </a>
    </Link>
  );
}

export default SettingLink;
