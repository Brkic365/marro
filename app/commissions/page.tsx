// /app/commissions/page.tsx
"use client"; // Needed for useSearchParams

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCommissionById, Commission } from '@/lib/commissionsData'; // Import data and type
import styles from '@/styles/pages/Commission.module.scss'; // We'll create/update this file

// A simple loading component
function LoadingSpinner() {
  return <div className={styles.loading}>Loading commission...</div>;
}

function CommissionContent() {
  const searchParams = useSearchParams();
  const [commission, setcommission] = useState<Commission | null | undefined>(undefined); // undefined: loading, null: not found
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const commissionId = searchParams.get('q');
    setIsLoading(true);
    const foundcommission = getCommissionById(commissionId);
    setcommission(foundcommission);
    setIsLoading(false);
  }, [searchParams]); // Re-run when query params change

  if (isLoading || commission === undefined) {
    return <LoadingSpinner />;
  }

  if (commission === null) {
    return <div className={styles.notFound}>Commission not found.</div>;
  }

  // Generate image filenames dynamically
  const images = Array.from({ length: commission.numImages }, (_, i) =>
    `/images/commissions/${commission.id}/${i + 1}.jpg`
  );
  
  // Distribute images into three columns
  const totalImages = images.length;
  const col2Count = Math.ceil(totalImages / 3);
  const col1Count = Math.floor((totalImages - col2Count) / 2);
  const col3Count = totalImages - col1Count - col2Count;

  const col1 = images.slice(0, col1Count);
  const col2 = images.slice(col1Count, col1Count + col2Count);
  const col3 = images.slice(col1Count + col2Count);

  // commission found, render its details
  return (
    <main className={styles.commissionPage}>
      {
        commission.title &&       
        <h1
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          fontSize: `calc(100vw/${commission.id === "beautymakeup" ? commission.title.length / 2 : commission.title.length})`,
          whiteSpace: 'pre-line'
        }}
      >
        {commission.title.toLocaleUpperCase()}
      </h1>
      }
      <section className={styles.imageGallery}>
        <div className={styles.column}>
          {col1.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} loading="lazy" />
          ))}
        </div>
        <div className={styles.column}>
          {col2.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} loading="lazy" />
          ))}
        </div>
        <div className={styles.column}>
          {col3.map((img, index) => (
            <img key={index} src={img} alt={`Image ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>
    </main>
  );
}


// Wrap the client component in Suspense for useSearchParams
export default function CommissionPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <CommissionContent />
        </Suspense>
    );
}