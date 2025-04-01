"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";
import { useRouter } from "next/navigation";
import clsx from "clsx";

export default function Home() {
  const router = useRouter();

  const imageUrls = [
    // First 4 (one per row)
    "/images/services/portraits/ivana/5.webp",
    "/images/services/portraits/background.webp",
    "/images/services/portraits/ivana/2.webp", // Change
    "/images/services/portraits/ivana/3.webp", // Change
    "/images/services/portraits/introspekcija/8.webp", // Change
    "/images/services/portraits/nobru/2.webp", // Change
    "/images/services/portraits/nobru/1.webp",
    "/images/services/portraits/studio/1.webp",
    "/images/services/portraits/ivana/4.webp", // Change
    "/images/services/portraits/ivana/4.webp", // Change
    "/images/services/portraits/dorotea/7.webp",
    "/images/services/portraits/ivana/4.webp", // Change
    "/images/services/portraits/nespojivo/1.webp",
    "/images/services/familyPhotos/engagement/1.webp", // Change
    "/images/services/familyPhotos/engagement/4.webp",
    "/images/services/familyPhotos/engagement/2.webp", // Change
    "/images/services/familyPhotos/engagement/3.webp", // Change
    "/images/services/familyPhotos/krstenje-eva/1.webp", // Change
    "/images/services/familyPhotos/krstenje-eva/5.webp", // Change
    "/images/services/familyPhotos/krstenje-eva/8.webp",
    "/images/services/familyPhotos/krstenje-ljupka/35.webp",
    "/images/services/familyPhotos/krstenje-ljupka/25.webp",
    "/images/services/concerts/lildrito/13.webp",
    "/images/services/concerts/nobru/14.webp",
    "/images/services/concerts/lps/14.webp",
    "/images/services/concerts/lps/19.webp",
    "/images/services/concerts/lps/16.webp",
    "/images/services/concerts/silente/11.webp",
    "/images/services/concerts/lps/3.webp",
    "/images/services/concerts/lps/18.webp",
    "/images/services/concerts/lildrito/12.webp",
  ];

  const [modalImg, setModalImg] = useState<string | null>(null);

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

      <section className={styles.gallery}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            className={clsx(
              styles.galleryItem,
              index < 4 ? styles.fullRow : styles.gridItem
            )}
            onClick={() => setModalImg(url)}
          >
            <Image
              src={url}
              alt={`Gallery image ${index + 1}`}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        ))}
      </section>

      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <Image
            src={modalImg}
            alt="Full-size preview"
            width={1200}
            height={800}
            className={styles.modalImage}
          />
        </div>
      )}
    </main>
  );
}
