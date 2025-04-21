// /app/about/page.tsx

import React from 'react';
import styles from "@/styles/pages/About.module.scss";
import Link from 'next/link';
import Image from 'next/image';

function About() {
  return (
    <main className={styles.about}>
      <section className={styles.aboutInfo}>
        <section className={styles.left}>
          <h4>About</h4> {/* Heading stays at the top of the section */}

          {/* New Flex Container for Image + Intro Text */}
          <div className={styles.introFlexContainer}>
            <div className={styles.profileImageWrapper}>
              <Image
                src="/images/me.webp"
                alt="Photo of Marija Kolovrat"
                width={300}  // Adjust width - maybe slightly smaller
                height={375} // Adjust height based on new width & aspect ratio
                className={styles.profileImage}
                priority
              />
            </div>
            <div className={styles.introText}>
              <p> {/* The main introductory paragraph */}
                Hello! My name is Marija Kolovrat, or as most know me in the photography world, BY
                MARRO - a freelance photographer and creative director based in Zagreb, Croatia.
                Photography has been my way of telling stories - honest, emotional, and deeply
                personal. My passion for capturing moments began long before I picked up a camera in
                2018, and ever since, {"I’ve"} been drawn to the beauty of human connection and emotions
                that shape our experiences.
              </p>
            </div>
          </div>

          {/* Subsequent Paragraphs and Sections */}
          <p> {/* Continue with the rest of the 'About' text */}
            I specialize in artistic and creative portraits, carefully planning and directing each shoot
            to bring unique visions to life. Beyond portraits, I find joy in documenting {"life’s"} raw,
            fleeting moments—whether {"it’s"} the quiet intimacy between loved ones or the unfiltered
            energy of a live concert. Family photography holds a special place in my work, as I love
            capturing the milestones and connections that define our lives, from pregnancies and
            christenings to engagements and couple shoots. These moments are filled with
            emotion, and I strive to preserve them in an authentic and timeless way. <br />
            As much as I love capturing families and couples, my other passion lies in
            photographing music and performance, where movement and emotion merge in a way
            that feels almost electric. Music has always been a source of inspiration for me, shaping
            both my creative vision and the way I approach storytelling through the lens.<br />
            In 2023, I created my photo book Melankolija as part of my final graduation project,
            exploring emotion and introspection through portraiture. My work has also been
            exhibited at the Faculty of Graphic Arts.<br />
            I love meeting new people and capturing the emotions, connections, and small
            interactions that make every story unique. If {"you’re"} looking for someone to document
            your moments with an artistic touch, feel free to reach out!
          </p>

          <h4>Education</h4>
          <p>2020 {"–"} 2025 Faculty of Graphic Arts,<br />University of Zagreb, Croatia</p>
        </section>

        {/* Right Section remains the same */}
        <section className={styles.right}>
          <h4>Achievements</h4>
          <ul>
            <li>2024 - Selected photos displayed in “Foto esej” student exhibition, Faculty of Graphic Arts</li>
            <li>2025 - Selected photos displayed in Final photography student exhibition, Faculty of Graphic Arts</li>
          </ul>
        </section>
      </section>
    </main>
  )
}

export default About;