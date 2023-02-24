import Image from "next/image";
import styles from "./header.module.scss";
import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  return <div className={styles.header}>
    <div className={styles.logoContainer}>
      <Link href='/'>
        <Image 
          src="/dvnt.svg"
          width={100}
          height={30}
          alt="DVNT logo"
          className={styles.logo}
        />
      </Link>
    </div>
    {session ?
      <Image 
        src={session.user?.image ?? ''}
        width={30}
        height={30}
        alt="DVNT logo"
        className={styles.userImage}
      />:
      <button onClick={() => signIn()}>
        Sign in
      </button>
    }
  </div>;
}

// <button onClick={() => signOut()}>
//   Sign out
// </button>