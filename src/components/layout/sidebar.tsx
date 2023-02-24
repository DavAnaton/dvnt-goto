import Link from "next/link";
import styles from "./sidebar.module.scss";

export default function Sidebar() {
  return <ul className={styles.sidebar}>
    <li>
      <Link href='/'>Create new link</Link>
    </li>
    <li>
      <Link href='/'>My links</Link>
    </li>
  </ul>;
}
