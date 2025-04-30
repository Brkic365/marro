"use client";

import React, { useState, useEffect, Suspense } from "react";
import styles from "@/styles/pages/Services.module.scss";
import Service from "../components/Service";
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
    background: "background.webp",
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
    background: "background.webp",
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
    background: "background.webp",
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

function ServicesContent() {
    const searchParams = useSearchParams();
    const serviceSearchParam = searchParams.get("q");
  
    if (!serviceSearchParam) return null;
  
    const service = services[serviceSearchParam];
    if (!service) return null;

    console.log(service)
  
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