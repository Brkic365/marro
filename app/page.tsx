"use client"

import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    <main className={styles.home}>
      <section className={styles.services}>
        <div className={styles.service} onClick={() => router.push("/portfolio?q=portraits")}>
          <h1>portraits</h1>
        </div>
        <div className={styles.service} onClick={() => router.push("/portfolio?q=familyPhotos")}>
          <h1>family</h1>
        </div>
        <div className={styles.service} onClick={() => router.push("/portfolio?q=concerts")}>
          <h1>concerts</h1>
        </div>
      </section>
    </main>
  );
}
