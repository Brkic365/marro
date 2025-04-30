"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/Service.module.scss";
import { useSearchParams } from "next/navigation";

interface Example {
    name?: string;
    model?: string;
    imagesDir: string;
    thumbnail: string;
    mainColor?: string;
    secondaryColor?: string;
    bgColor?: string;
    date?: Date;
    location?: string;
    year?: string;
    text?: string;
    numImages: number;
  }
  
  interface ServiceType {
    name: string;
    basePath: string;
    background: string;
    examples: Example[];
  }
  
  const services: Record<string, ServiceType> = {
    portraits: {
      name: "portraiture",
      basePath: "portraits",
      background: "background.jpg",
      examples: [
        {
          name: "nespojivo",
          model: "Nobru",
          imagesDir: "nobru",
          thumbnail: "1.jpg",
          year: "2024",
          text: "\"Nespojivo\" explores the contrast between urban formality and nature. By blending the unexpected, it reflects the tension between social norms and our connection to nature. The series symbolizes the attempt to impose order to a world meant to be free, questioning where we truly belong.",
          numImages: 11
        },
        {
          model: "Dorotea pešun",
          imagesDir: "dorotea",
          thumbnail: "1.jpg",
          mainColor: "#A27547",
          year: "2024",
          numImages: 8
        },
        {
          model: "Ivana Meštrović",
          imagesDir: "ivana",
          thumbnail: "1.jpg",
          year: "2023",
          numImages: 5
        },
        {
          model: "Ana Kolinger",
          imagesDir: "ana",
          thumbnail: "1.jpg",
          year: "2024",
          numImages: 7
        },
        {
          model: "Nobru",
          imagesDir: "nobru2",
          thumbnail: "1.jpg",
          mainColor: "#254B3E",
          year: "2024",
          numImages: 9
        }
      ],
    },
    concerts: {
      name: "concerts",
      basePath: "concerts",
      background: "background.jpg",
      examples: [
        {
          name: "lil drito",
          model: "tvornica",
          imagesDir: "lildrito",
          thumbnail: "1.jpg",
          date: new Date(2025, 3, 1),
          location: "Tvornica Kulture, Zagreb",
          numImages: 15
        },
        {
          name: "lps",
          model: "cvetlicarna",
          imagesDir: "lps",
          thumbnail: "1.jpg",
          date: new Date(2025, 3, 1),
          location: "Cvetlicarna, Ljubljana",
          numImages: 20
        },
        {
          name: "nobru i matt shaft",
          model: "mocvara",
          imagesDir: "nobru",
          thumbnail: "1.jpg",
          mainColor: "#BE5539",
          secondaryColor: "#110C0B",
          bgColor: "black",
          date: new Date(2025, 3, 1),
          location: "Mocvara, Zagreb",
          numImages: 17
        },
        {
          name: "silente",
          model: "zadar",
          imagesDir: "silente",
          thumbnail: "1.jpg",
          mainColor: "#0D7497",
          secondaryColor: "#030305",
          bgColor: "black",
          date: new Date(2025, 3, 1),
          location: "Trg Petra Zoranica, Zadar",
          numImages: 12
        },
      ]
    },  
    familyPhotos: {
      name: "family photos",
      basePath: "familyPhotos",
      background: "background.jpg",
      examples: [
        {
          name: "christenings",
          imagesDir: "christenings",
          thumbnail: "1.jpg",
          numImages: 18
        },
        {
          name: "engagements",
          imagesDir: "engagements",
          thumbnail: "1.jpg",
          numImages: 9
        },
        {
          name: "pregnancy",
          imagesDir: "pregnancy",
          thumbnail: "1.jpg",
          numImages: 30
        },
      ]
    }
  };

export default function ServicePage({ serviceParam }: {serviceParam: string}) {
  const searchParams = useSearchParams();
  const [serviceProjectIndex, setServiceProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    const qParam = searchParams.get("q");
    if (qParam) {
      setServiceProjectIndex(Number(qParam) - 1);
    }
  }, [searchParams]);

  if (serviceProjectIndex === null) return null;

  const service = services[serviceParam];
  if (!service) return <h1>Service not found</h1>;

  if (serviceProjectIndex < 0 || serviceProjectIndex >= service.examples.length) {
    return <h1>Project not found</h1>;
  }

  const serviceProject = service.examples[serviceProjectIndex];

  // Generate image filenames dynamically
  const images = Array.from({ length: serviceProject.numImages }, (_, i) =>
    `/images/services/${service.basePath}/${serviceProject.imagesDir}/${i + 1}.jpg`
  );

  // Distribute images into three columns
  const totalImages = images.length;
  const col2Count = Math.ceil(totalImages / 3);
  const col1Count = Math.floor((totalImages - col2Count) / 2);
  const col3Count = totalImages - col1Count - col2Count;

  const col1 = images.slice(0, col1Count);
  const col2 = images.slice(col1Count, col1Count + col2Count);
  const col3 = images.slice(col1Count + col2Count);

  return (
    <main className={styles.servicePage}>
      {
        serviceProject.name &&       
        <h1
        style={{
          background: `radial-gradient(circle, ${serviceProject.mainColor || "rgba(255, 255, 255, 0.7)"}, ${
            serviceProject.secondaryColor || "rgba(255, 255, 255, 0.2)"
          })`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          fontSize: `calc(100vw/${serviceProject.name.length})`
        }}
      >
        {serviceProject.name.toLocaleUpperCase()}
      </h1>
      }
      {
        serviceParam === "portraits" && serviceProject.text &&
        <p className={styles.description}>{serviceProject.text}</p>
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
      {
        serviceParam === "portraits" && 
        <section className={styles.info}>
          <p>Model: {serviceProject.model}</p>
          <p>{serviceProject.year}</p>
        </section>
      }
      {
        serviceParam === "concerts" && serviceProject.location && serviceProject.date &&
        <section className={styles.info}>
          <p className={styles.location}>{serviceProject.location.toLocaleUpperCase()}</p>
          <p className={styles.date}>{serviceProject.date?.toDateString().toLocaleUpperCase()}</p>
        </section>
      }
    </main>
  );
};
