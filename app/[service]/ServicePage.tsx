"use client";

import React, { useEffect, useState } from "react";
import styles from "@/styles/pages/Service.module.scss";
import { useSearchParams } from "next/navigation";

interface Example {
    name?: string;
    model: string;
    imagesDir: string;
    thumbnail: string;
    numImages: number;
    mainColor?: string;
    secondaryColor?: string;
    bgColor?: string;
    date?: Date;
    location?: string;
    year?: string;
    text?: string;
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
      background: "background.webp",
      examples: [
        {
          name: "nespojivo",
          model: "Nobru",
          imagesDir: "nespojivo",
          thumbnail: "8.webp",
          numImages: 15,
          year: "2024",
          text: "\"Nespojivo\" explores the contrast between urban formality and nature. By blending the unexpected, it reflects the tension between social norms and our connection to nature. The series symbolizes the attempt to impose order to a world meant to be free, questioning where we truly belong."
        },
        {
          model: "Dorotea pešun",
          imagesDir: "dorotea",
          thumbnail: "1.webp",
          numImages: 7,
          mainColor: "#A27547",
          year: "2024"
        },
        {
          model: "Ivana Meštrović",
          imagesDir: "ivana",
          thumbnail: "8.webp",
          numImages: 8,
          year: "2023"
        },
        {
          model: "Ana Kolinger",
          imagesDir: "studio",
          thumbnail: "3.webp",
          numImages: 17,
          year: "2024"
        },
        {
          name: "no way out",
          model: "Ana Kolinger",
          imagesDir: "no way out",
          thumbnail: "13.webp",
          numImages: 14,
          year: "2024",
          text: "“no way out” is a photo essay inspired by The Hunger Games soundtrack “Can’t Catch Me Now”. It weaves together lyrics, melody, and photographs to show a powerful message—every connection, whether love or friendship, leaves a lasting mark. No matter the distance, memories and emotions will always find their way back. "
        },
        {
          model: "Nobru",
          imagesDir: "nobru",
          thumbnail: "2.webp",
          numImages: 12,
          mainColor: "#254B3E",
          year: "2024"
        },
        {
          name: "introspekcija",
          model: "Ana Kolinger",
          imagesDir: "introspekcija",
          thumbnail: "3.webp",
          numImages: 10,
          mainColor: "#B57974",
          secondaryColor: "#585765",
          year: "2025",
          text: "“introspekcija” is a portrait series capturing serene, dreamlike moments of self-reflection and escape from reality. Blurring the line between dream and reality, the images evoke the sense of quietude and inner connection."
        }
      ],
    },
    concerts: {
      name: "concerts",
      basePath: "concerts",
      background: "background.webp",
      examples: [
        {
          name: "lil drito",
          model: "tvornica",
          imagesDir: "lildrito",
          thumbnail: "11.webp",
          numImages: 15,
          date: new Date(2025, 3, 1),
          location: "Tvornica Kulture, Zagreb"
        },
        {
          name: "lps",
          model: "cvetlicarna",
          imagesDir: "lps",
          thumbnail: "1.webp",
          numImages: 20,
          date: new Date(2025, 3, 1),
          location: "Cvetlicarna, Ljubljana"
        },
        {
          name: "nobru i matt shaft",
          model: "mocvara",
          imagesDir: "nobru",
          thumbnail: "9.webp",
          numImages: 17,
          mainColor: "#BE5539",
          secondaryColor: "#110C0B",
          bgColor: "black",
          date: new Date(2025, 3, 1),
          location: "Mocvara, Zagreb"
        },
        {
          name: "silente",
          model: "zadar",
          imagesDir: "silente",
          thumbnail: "5.webp",
          numImages: 13,
          mainColor: "#0D7497",
          secondaryColor: "#030305",
          bgColor: "black",
          date: new Date(2025, 3, 1),
          location: "Trg Petra Zoranica, Zadar"
        },
      ]
    },  
    familyPhotos: {
      name: "family photos",
      basePath: "familyPhotos",
      background: "background.webp",
      examples: [
        {
          name: "christening",
          model: "eva",
          imagesDir: "krstenje-eva",
          thumbnail: "20.webp",
          numImages: 26,
        },
        {
          name: "christening",
          model: "ljupka",
          imagesDir: "krstenje-ljupka",
          thumbnail: "1.webp",
          numImages: 6,
        },
        {
          name: "engagement",
          model: "couple",
          imagesDir: "engagement",
          thumbnail: "2.webp",
          numImages: 4,
        },
      ]
    }
  };

const IMAGE_EXTENSION = "webp";

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
    `/images/services/${service.basePath}/${serviceProject.imagesDir}/${i + 1}.webp`
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
