import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlusCircle, faCog } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { parseCookies } from "nookies";
import styles from "../../styles/Header/Header.module.scss";
import { useEffect, useState } from "react";
import { useContext } from "react";
import BudgetContext from "../../context/budgetContext";

const Header = () => {
  const { navTabs, setNavTabs } = useContext(BudgetContext);
  useEffect(() => {
    console.log(navTabs);
  }, [navTabs]);
  //console.log("navTabs in header:", navTabs);

  const [headerVisible, setHeaderVisible] = useState(false);
  const cookies = parseCookies();

  //console.log("cookies in header:", cookies);
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

  const boxShadowActive =
    "0 0 0 #000, 0 0 0 #575757, inset 5px 5px 14px #000, inset -2px -3px 6px #575757";
  const boxShadowPassive =
    "0px 0px 0px #000, -0px -0px 0px #575757, inset 0 0 0 #000, inset 0 0 0 #575757";

  const homeTabStyle = {
    textShadow: navTabs === 1 ? "0 0 2px #20FFAF" : "none",
    boxShadow: navTabs === 1 ? boxShadowActive : boxShadowPassive,
  };

  const newItemTabStyle = {
    textShadow: navTabs === 2 ? "0 0 2px #20FFAF" : "none",
    boxShadow: navTabs === 2 ? boxShadowActive : boxShadowPassive,
  };

  const settingsTabStyle = {
    textShadow: navTabs === 3 ? "0 0 2px #20FFAF" : "none",
    boxShadow: navTabs === 3 ? boxShadowActive : boxShadowPassive,
  };

  return (
    <header className={styles.header} style={headerStyle}>
      <nav className={styles.nav}>
        <div className={styles.container}>
          <div className={styles.linkContainer} style={homeTabStyle}>
            <FontAwesomeIcon icon={faHome} className={styles.icon} />
            <Link href={"/"}>
              <a
                onClick={() => setNavTabs(1)}
                id={styles.navBtn_first}
                className={styles.navBtn}
              >
                HOME
              </a>
            </Link>
          </div>

          <div className={styles.linkContainer} style={newItemTabStyle}>
            <FontAwesomeIcon icon={faPlusCircle} className={styles.icon} />
            <Link href={"/transactions/new"}>
              <a
                onClick={() => setNavTabs(2)}
                id={styles.navBtn_first}
                className={styles.navBtn}
              >
                NEW
              </a>
            </Link>
          </div>

          <div className={styles.linkContainer} style={settingsTabStyle}>
            <FontAwesomeIcon icon={faCog} className={styles.icon} />
            <Link href="/settings">
              <a
                onClick={() => setNavTabs(3)}
                id={styles.navBtn_last}
                className={styles.navBtn}
              >
                SETTINGS
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
