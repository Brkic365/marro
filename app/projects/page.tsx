// /app/projects/page.tsx
"use client"; // Needed for useSearchParams

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getProjectById, Project } from '@/lib/projectsData'; // Import data and type
import styles from '@/styles/pages/Project.module.scss'; // We'll create/update this file

// A simple loading component
function LoadingSpinner() {
  return <div className={styles.loading}>Loading project...</div>;
}

function ProjectContent() {
  const searchParams = useSearchParams();
  const [project, setproject] = useState<Project | null | undefined>(undefined); // undefined: loading, null: not found
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const projectId = searchParams.get('q');
    setIsLoading(true);
    const foundproject = getProjectById(projectId);
    setproject(foundproject);
    setIsLoading(false);
  }, [searchParams]); // Re-run when query params change

  if (isLoading || project === undefined) {
    return <LoadingSpinner />;
  }

  if (project === null) {
    return <div className={styles.notFound}>Project not found.</div>;
  }

  // Generate image filenames dynamically
  const images = Array.from({ length: project.numImages }, (_, i) =>
    `/images/projects/${project.id}/${i + 1}.jpg`
  ).slice(1);

  // Distribute images into three columns
  const totalImages = images.length;
  const col2Count = Math.ceil(totalImages / 3);
  const col1Count = Math.floor((totalImages - col2Count) / 2);
  const col3Count = totalImages - col1Count - col2Count;

  const col1 = images.slice(0, col1Count);
  const col2 = images.slice(col1Count, col1Count + col2Count);
  const col3 = images.slice(col1Count + col2Count);

  // project found, render its details
  return (
    <main className={styles.projectPage}>
      <div className={styles.contentWrapper}>
          <div className={styles.textWrapper}>
              <h1 className={styles.title}>{project.title}</h1>
              <p className={styles.text}>
              {project.text}
              {/* Conditionally render the link */}
              {project.youtubeLink && (
                  <>
                  <br />
                  <Link href={project.youtubeLink} target="_blank" rel="noopener noreferrer" className={styles.externalLink}>
                      Watch on YouTube
                  </Link>
                  </>
              )}
              </p>
          </div>
           <div className={styles.imageWrapper}>
                <Image
                    src={`/images/projects/${project.id}/1.jpg`}
                    alt={project.title}
                    width={1000} // Adjust intrinsic width hint
                    height={650} // Adjust intrinsic height hint
                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }} // Responsive, contain keeps aspect ratio
                    className={styles.projectImage}
                    priority // Prioritize loading the main image
                />
            </div>
      </div>
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
export default function ProjectPage() {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <ProjectContent />
        </Suspense>
    );
}