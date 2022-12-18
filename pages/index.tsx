import * as React from "react";
import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

// @ts-ignore
const Button = dynamic(() => import("portal/button"), {
  suspense: true,
});

function Home() {
  console.log("Server-side rendered!");

  React.useEffect(() => {
    console.log("Client-side rendered");
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Darth Vader!</h1>
        <div className={styles.circle}></div>

        <p className={styles.description}>CHIP-RESUSTANT IRON</p>
        <p className={styles.description}>70 lbs</p>
        <React.Suspense fallback="loading button...">
          {/* @ts-ignore */}
          <Button message="Front App" />
        </React.Suspense>
      </main>
    </div>
  );
}

Home.getInitialProps = async () => ({});

export default Home;
