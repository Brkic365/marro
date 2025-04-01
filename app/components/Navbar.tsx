"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import styles from "@/styles/components/Navbar.module.scss";

function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  const [portfolioOpen, setPortfolioOpen] = useState(false);
  const [commissionsOpen, setCommissionsOpen] = useState(false);

  const isPortfolio = pathname.startsWith("/portfolio");
  const isCommissions = pathname.startsWith("/commissions");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= lastScrollY) {
        setShowNavbar(false); // Hide navbar when scrolling down
      } else {
        setShowNavbar(true); // Show navbar when scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <Suspense>
      <nav className={`${styles.nav} ${showNavbar ? styles.show : styles.hide}`} style={{ backgroundColor: lastScrollY > 150 ? "black" : "transparent" }}>
        <MobileMenu open={openMenu} setOpen={(open: boolean) => setOpenMenu(open)} />

        <section className={styles.logoHolder} onClick={() => router.push("/")}> 
          <h3>by marro</h3>
        </section>

        {/* Links with dropdowns */}
        <ul className={styles.links}>
          <li><span onClick={() => router.push("/about")} className={`${styles.linkLabel} ${pathname === "/about" ? styles.active : ""}`}>ABOUT</span></li>

          <li
            className={styles.dropdown}
            onMouseEnter={() => setPortfolioOpen(true)}
            onMouseLeave={() => setPortfolioOpen(false)}
          >
            <div className={styles.dropdownToggle}>
                <span className={`${styles.linkLabel} ${isPortfolio ? styles.active : ""}`}>PORTFOLIO</span>
                <motion.span
                    animate={{ rotate: portfolioOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaChevronDown size={12} />
                </motion.span>
            </div>
            <AnimatePresence>
              {portfolioOpen && (
                <motion.ul
                  className={styles.dropdownContent}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <li onClick={() => router.push("/portfolio?q=portraits")}>PORTRAITS</li>
                  <li onClick={() => router.push("/portfolio?q=concerts")}>CONCERTS</li>
                  <li onClick={() => router.push("/portfolio?q=familyPhotos")}>FAMILY</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li
            className={styles.dropdown}
            onMouseEnter={() => setCommissionsOpen(true)}
            onMouseLeave={() => setCommissionsOpen(false)}
          >
            <div className={styles.dropdownToggle}>
                <span className={`${styles.linkLabel} ${isCommissions ? styles.active : ""}`}>COMMISSIONS</span>
                <motion.span
                    animate={{ rotate: commissionsOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <FaChevronDown size={12} />
                </motion.span>
            </div>
            <AnimatePresence>
              {commissionsOpen && (
                <motion.ul
                  className={styles.dropdownContent}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <li onClick={() => router.push("/")}>COMMISSION 1</li>
                  <li onClick={() => router.push("/")}>COMISSION 2</li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          <li><span onClick={() => router.push("/contact")}  className={`${styles.linkLabel} ${pathname === "/contact" ? styles.active : ""}`}>CONTACT</span></li>
        </ul>

        <div
          className={openMenu ? styles.closeHamburger : styles.hamburger}
          onClick={() => setOpenMenu(!openMenu)}
          id="hamburger"
        >
          <motion.div
            className={styles.line}
            animate={openMenu ? "open" : "closed"}
            transition={{ duration: 0.3, type: "tween" }}
            variants={{
              open: { transform: "translateY(350%) rotateZ(45deg)" },
              closed: { transform: "translateY(0%) rotateZ(0deg)" },
            }}
            id="line1"
          />
          <div
            className={styles.line}
            style={{ opacity: openMenu ? 0 : 1 }}
            id="line2"
          />
          <motion.div
            className={styles.line}
            animate={openMenu ? "open" : "closed"}
            transition={{ duration: 0.3, type: "tween" }}
            variants={{
              open: { transform: "translateY(-350%) rotateZ(-45deg)" },
              closed: { transform: "translateY(0%) rotateZ(0deg)" },
            }}
            id="line3"
          />
        </div>
      </nav>
    </Suspense>
  );
}

export default Navbar;
