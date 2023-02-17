import Image from "next/image";
import styles from "./header.module.scss";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Header() {
  const { data: session } = useSession();
  return <div className={styles.header}>
    <Image 
      src="next.svg"
      width={180}
      height={50}
      alt="DVNT logo"
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
