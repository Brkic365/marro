"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "@/styles/pages/Home.module.scss";
import { useRouter } from "next/navigation";
// clsx might not be strictly needed here anymore unless used elsewhere,
// but keeping it doesn't hurt if you plan to add other conditional classes.
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
      {/* Services section remains unchanged */}
      <section className={styles.services}>
        <div className={styles.service} onClick={() => router.push("/portfolio?q=portraits")}>
          <h1>PORTRAITS</h1>
        </div>
        <div className={styles.service} onClick={() => router.push("/portfolio?q=familyPhotos")}>
          <h1>FAMILY</h1>
        </div>
        <div className={styles.service} onClick={() => router.push("/portfolio?q=concerts")}>
          <h1>CONCERTS</h1>
        </div>
      </section>

      <section className={styles.gallery}>
        {imageUrls.map((url, index) => (
          <div
            key={index}
            // We just need the base item class now
            className={styles.galleryItem}
            onClick={() => setModalImg(url)}
          >
            <Image
              src={url}
              alt={`Gallery image ${index + 1}`}
              fill
              className={styles.image}
              // Updated sizes based on layout:
              // - Mobile (<= 767px): First 4 are 100vw, rest are ~50vw
              // - Desktop (>= 768px): First 4 are ~50vw, rest are ~33vw
              // We provide hints covering the largest possible size for each condition.
              sizes={
                index < 4
                  ? "(max-width: 767px) 100vw, 50vw"
                  : "(max-width: 767px) 50vw, 33vw"
              }
              // Optional: Add priority prop for above-the-fold images
              priority={index < 8} // Example: Prioritize loading the first few images
            />
          </div>
        ))}
      </section>

      {/* Modal section remains unchanged */}
      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <Image
            src={modalImg}
            alt="Full-size preview"
            // Consider adjusting modal image size constraints if needed
            width={1600} // Example larger size
            height={1000} // Example larger size
            style={{ // Inline style for maintainability with next/image v13+
                maxWidth: '90vw',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
            }}
            className={styles.modalImage} // Keep class if needed for other styling/transitions
          />
        </div>
      )}
    </main>
  );
}