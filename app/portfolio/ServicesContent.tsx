"use client";

import React, { useState, useEffect, Suspense } from "react";
import styles from "@/styles/pages/Services.module.scss";
import Service from "../components/Service";
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

function ServicesContent() {
    const searchParams = useSearchParams();
    const serviceSearchParam = searchParams.get("q");
  
    if (!serviceSearchParam) return null;
  
    const service = services[serviceSearchParam];
    if (!service) return null;
  
    return (
      <main
        className={styles.services}
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("/images/services/${service.basePath}/${service.background}")`,
        }}
      >
        <h1>{service.name.toLocaleUpperCase()}</h1>
        <section className={styles.servicesList}>
          {service.examples.map((example, index) => (
            <Service key={index} basePath={service.basePath} service={example} number={index + 1} />
          ))}
        </section>
        <div className={styles.fadeEffect} />
      </main>
    );
  }

export default ServicesContent;