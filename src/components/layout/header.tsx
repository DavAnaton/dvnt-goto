import Image from "next/image";
import styles from "./header.module.scss";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession();
  return <div className={styles.header}>
    <Image 
      src="/dvnt.svg"
      width={180}
      height={40}
      alt="DVNT logo"
      style={{filter: "invert(1)", padding: '5px'}}
    />
    {session ?
      <button onClick={() => signOut()}>
        {session.user?.email}
      </button>:
      <button onClick={() => signIn()}>
        Sign in
      </button>
    }
  </div>;
}
