"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import styles from "@/styles/components/MobileMenu.module.scss";

interface MenuProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function MobileMenu({ open, setOpen }: MenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [animationFinished, setAnimationFinished] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [commissionsOpen, setCommissionsOpen] = useState(false);

  const menuVariants = {
    open: { opacity: 1, height: "100%", display: "flex" },
    closed: { opacity: 0.5, height: "0%", display: "flex" },
  };

  const containerVariants = {
    open: { opacity: 1, display: "flex" },
    closing: { opacity: 0, display: "flex" },
    finished: { opacity: 0, display: "none" },
  };

  useEffect(() => {
    if (!open) {
      document.body.style.overflowY = "unset";
      const timeout = setTimeout(() => {
        setAnimationFinished(true);
      }, 300);
      return () => clearTimeout(timeout);
    } else {
      document.body.style.overflowY = "hidden";
      setAnimationFinished(false);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [pathname]);

  const handleNavigate = (path: string) => {
    router.push(path);
    setOpen(false);
  };

  return (
    <Suspense>
      <motion.main
        animate={open ? "open" : animationFinished ? "finished" : "closing"}
        transition={{ duration: 0.3, type: "tween" }}
        variants={containerVariants}
        className={styles.container}
      >
        <motion.section
          animate={open ? "open" : "closed"}
          transition={{ duration: 0.2, type: "tween" }}
          variants={menuVariants}
          className={styles.menu}
        >
          <ul>
            <li onClick={() => handleNavigate("/about")}>ABOUT</li>

            <li onClick={() => setPortfolioOpen(!portfolioOpen)}>
              <div className={styles.dropdownToggle}>
                <span>PORTFOLIO</span>
                <motion.span
                  animate={{ rotate: portfolioOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown size={14} />
                </motion.span>
              </div>
              {portfolioOpen && (
                <ul className={styles.dropdownMobile}>
                  <li onClick={() => handleNavigate("/portfolio?q=portraits")}>PORTRAITS</li>
                  <li onClick={() => handleNavigate("/portfolio?q=concerts")}>CONCERTS</li>
                  <li onClick={() => handleNavigate("/portfolio?q=familyPhotos")}>FAMILY</li>
                </ul>
              )}
            </li>

            <li onClick={() => setCommissionsOpen(!commissionsOpen)}>
              <div className={styles.dropdownToggle}>
                <span>COMMISSIONS</span>
                <motion.span
                  animate={{ rotate: commissionsOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaChevronDown size={14} />
                </motion.span>
              </div>
              {commissionsOpen && (
                <ul className={styles.dropdownMobile}>
                  <li onClick={() => router.push("/commission?q=melankolija")}>Melankolija</li>
                  <li onClick={() => router.push("/commission?q=nowayout")}>No way out - foto esej</li>
                  <li onClick={() => router.push("/commission?q=nobru")}>Artist Promo Shoot: nobru</li>
                </ul>
              )}
            </li>

            <li onClick={() => handleNavigate("/contact")}>CONTACT</li>
          </ul>
        </motion.section>
      </motion.main>
    </Suspense>
  );
}

export default MobileMenu;
