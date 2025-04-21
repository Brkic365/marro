// /app/commission/page.tsx
"use client"; // Needed for useSearchParams

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getCommissionById, Commission } from '@/lib/commissionData'; // Import data and type
import styles from '@/styles/pages/Commission.module.scss'; // We'll create/update this file

// A simple loading component
function LoadingSpinner() {
  return <div className={styles.loading}>Loading Commission...</div>;
}

function CommissionContent() {
  const searchParams = useSearchParams();
  const [commission, setCommission] = useState<Commission | null | undefined>(undefined); // undefined: loading, null: not found
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const commissionId = searchParams.get('q');
    setIsLoading(true);
    const foundCommission = getCommissionById(commissionId);
    setCommission(foundCommission);
    setIsLoading(false);
  }, [searchParams]); // Re-run when query params change

  if (isLoading || commission === undefined) {
    return <LoadingSpinner />;
  }

  if (commission === null) {
    return <div className={styles.notFound}>Commission not found.</div>;
  }

  // Commission found, render its details
  return (
    <main className={styles.commissionPage}>
      <div className={styles.contentWrapper}>
          <div className={styles.textWrapper}>
              <h1 className={styles.title}>{commission.title}</h1>
              <p className={styles.text}>
              {commission.text}
              {/* Conditionally render the link */}
              {commission.youtubeLink && (
                  <>
                  <br />
                  <Link href={commission.youtubeLink} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      Watch on YouTube
                  </Link>
                  </>
              )}
              </p>
          </div>
           <div className={styles.imageWrapper}>
                <Image
                    src={commission.imageUrl}
                    alt={commission.title}
                    width={1000} // Adjust intrinsic width hint
                    height={650} // Adjust intrinsic height hint
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }} // Responsive, contain keeps aspect ratio
                    className={styles.commissionImage}
                    priority // Prioritize loading the main image
                />
            </div>
      </div>
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