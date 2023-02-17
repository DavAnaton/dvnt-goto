import styles from './layout.module.scss';

import Footer from "./footer";
import Header from "./header";
// import Sidebar from "./sidebar";

export default function Layout({ children }:{ children:any }) {
  return <div className={styles.layoutContainer}>
    <Header/>
    <div className={styles.sidePanel}>
      {/*<Sidebar/>*/}
    	<main className={styles.content}>
        {children}
      </main>
    </div>
    <Footer/>
  </div>;
}
