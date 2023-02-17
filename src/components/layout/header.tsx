import Image from "next/image";
import styles from "./header.module.scss";

export default function Header() {
  return <div className={styles.header}>
    <Image 
      src="next.svg"
      width={180}
      height={50}
      alt="DVNT logo"
    />
  </div>;
}
