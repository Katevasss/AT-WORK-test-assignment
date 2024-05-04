import React, { memo } from "react";
import styles from "./Layout.module.scss";
import { Link, Outlet } from "react-router-dom";

import heart from "../../assets/images/heart.svg";
import bell from "../../assets/images/bell.svg";
import logo from "../../assets/images/logo.svg";

const Layout = (): JSX.Element => {
  return (
    <div className={styles.page}>
      <header className={styles.navLayout}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="LOGO" />
        </Link>
        <div className={styles.rightColumn}>
          <img style={{ cursor: "pointer" }} src={heart} alt="bell" />
          <img style={{ cursor: "pointer" }} src={bell} alt="bell" />
          <img
            style={{
              width: "1.5rem",
              height: "1.5rem",
              borderRadius: "0.8rem",
            }}
            src={require("../../assets/images/avatar_1.jpeg")}
            alt="bell"
          />

          <div>Ivan1234</div>
        </div>
      </header>

      <div className={styles.content}>
        <main className={styles.main}>
          <Outlet />
        </main>
      </div>
      <div id="portalModalWindow" />
    </div>
  );
};

export default memo(Layout);
