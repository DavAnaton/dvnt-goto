import Link from "next/link";
import styles from "./footer.module.scss";

export default function Footer() {
  return <div className={styles.footer}>
  	<Link href="https://dvnt.app">A DVNT app</Link>
  </div>;
}
