import React from 'react'
import styles from "@/styles/pages/About.module.scss"
import Link from 'next/link'

function About() {
  return (
    <main className={styles.about}>
      <section className={styles.aboutInfo}>
        <section className={styles.left}>
          <h4>About</h4>
          <p>I am a British photographer based in Worcestershire, England, specialising in documentary and landscape photography. In 2013, during a trip to Istanbul, Turkey, I discovered my passion for capturing my surroundings through my camera. My work blends traditional documentary techniques with contemporary visual approaches.<br /><br/>My work has been recognised in several notable publications and competitions, including Source, British Journal of Photography, Eye Festival, Aberystwyth Art Centre Gallery, Guernsey Photography Festival, Open Doors Gallery and the British Culture Archive.<br /><br />With over 100,000 followers on social media, I have reached millions of people over the past year. My journey in photography continues to evolve, fuelled by a dedication to both artistic and documentary pursuits.</p>
          <h4>Education</h4>
          <p>2015-2018 BA in Documentary Photography,<br />University of South Wales, Cardiff/Newport, UK.</p>
        </section>
        <section className={styles.right}>
          <h4>Selected Publications & Nominations</h4>
          <ul>
            <li>2018 - <Link href="/">Source Graduate Award.</Link></li>
            <li>2018 - British Journal of {"Photography’s"} Portrait of Britain - <Link href="/">Click Here to find out more.</Link></li>
            <li>2018 - Selected Photos displayed in Eye Festival, Aberystwyth Art Centre Gallery and Guernsey Photography Festival. </li>
            <li>2020 - Finalist in <Link href="/">Open Doors Gallery {"‘Home’"} Competition.</Link></li>
            <li>2020 - Selected Image featured in <Link href="/">Architectural Digest France</Link> - Online.</li>
            <li>2023 - Nominated for Best Stills Photographer - BBC  Its My Shout Awards.</li>
            <li>2023 - Selected Image featured in <Link href="/">British Culture Archive</Link> - Online.</li>
          </ul>
        </section>
      </section>
    </main>
  )
}

export default About