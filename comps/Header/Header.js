import Link from "next/link";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import styles from "../../styles/Header/Header.module.scss";
import { useEffect, useState } from "react";

const Header = ({ updateAddItemOpen }) => {
  const [headerVisible, setHeaderVisible] = useState(false);
  const cookies = parseCookies();

  console.log("cookies in header:", cookies);
  useEffect(() => {
    if (cookies?.jwt) {
      setHeaderVisible(true);
      return;
    }
    setHeaderVisible(false);
  }, [cookies]);

  const headerStyle = {
    display: headerVisible ? "block" : "none",
  };

  const router = useRouter();
  const [activeTab, setActiveTab] = useState(1);
  const updateActiveTab = (number) => setActiveTab(number);
  const [linkUrl, setLinkUrl] = useState(
    (router.route = "/" ? "/transactions/new" : "/")
  );

  const homeTabStyle = {
    textShadow: activeTab === 1 ? "0 0 2px #20FFAF" : "none",
    boxShadow:
      activeTab === 1
        ? "0 0 0 #000, 0 0 0 #575757, inset 5px 5px 14px #000, inset -2px -3px 6px #575757"
        : "0px 0px 0px #000, -0px -0px 0px #575757, inset 0 0 0 #000, inset 0 0 0 #575757",
  };

  const newItemTabStyle = {
    textShadow: activeTab === 2 ? "0 0 2px #20FFAF" : "none",
    boxShadow:
      activeTab === 2
        ? "0 0 0 #000, 0 0 0 #575757, inset 5px 5px 14px #000, inset -2px -3px 6px #575757"
        : "0px 0px 0px #000, -0px -0px 0px #575757, inset 0 0 0 #000, inset 0 0 0 #575757",
  };

  const settingsTabStyle = {
    textShadow: activeTab === 3 ? "0 0 2px #20FFAF" : "none",
    boxShadow:
      activeTab === 3
        ? "0 0 0 #000, 0 0 0 #575757, inset 5px 5px 14px #000, inset -2px -3px 6px #575757"
        : "0px 0px 0px #000, -0px -0px 0px #575757, inset 0 0 0 #000, inset 0 0 0 #575757",
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <Link href={"/"}>
            <a
              onClick={() => updateActiveTab(1)}
              id={styles.navBtn_first}
              className={styles.navBtn}
              style={homeTabStyle}
            >
              HOME
            </a>
          </Link>

          <Link href={"/transactions/new"}>
            <a
              onClick={() => updateActiveTab(2)}
              id={styles.navBtn_first}
              className={styles.navBtn}
              style={newItemTabStyle}
            >
              NEW
            </a>
          </Link>

          <Link href="/settings">
            <a
              onClick={() => updateActiveTab(3)}
              id={styles.navBtn_last}
              className={styles.navBtn}
              style={settingsTabStyle}
            >
              SETTINGS
            </a>
          </Link>
        </div>
        {/* <div className={styles.addBtnContainer}>
          <div className={styles.buttonDecor} />
          <Link href={linkUrl}>
            <a className={styles.addBtn}>
              +
            </a>
          </Link>
        </div>
        */}
      </nav>
    </header>
  );
};

export default Header;
