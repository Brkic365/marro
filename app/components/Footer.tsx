"use client"

import React from 'react';
import styles from "@/styles/components/Footer.module.scss";
import { IoLogoInstagram, IoLogoFacebook, IoLogoPinterest } from 'react-icons/io';
import { FaXTwitter } from "react-icons/fa6";
import { usePathname } from "next/navigation";

function Footer() {
  const pathname = usePathname();

  // Define pages where the footer is visible and its color scheme
  const visiblePages = ["/", "/about", "/contact"];
  const isVisible = visiblePages.includes(pathname);

  if (!isVisible) return null;

  return (
    <section className={styles.footer}>
      <section className={styles.left}>
        <IoLogoInstagram />
        <FaXTwitter />
        <IoLogoFacebook />
        <IoLogoPinterest />
      </section>
      <p>© BY MARRO 2025. All Rights Reserved.</p>
    </section>
  );
}

export default Footer;