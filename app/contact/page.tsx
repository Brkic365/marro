import React from 'react'
import styles from "@/styles/pages/Contact.module.scss"

import { HiOutlinePhone } from "react-icons/hi";
import { HiOutlineEnvelope, HiArrowUpRight } from "react-icons/hi2";
import { IoLogoInstagram } from "react-icons/io";

function Contact() {
  return (
    <main className={styles.contact}>
        <section className={styles.title}>
          <h1 className={styles.mainTitle}>
            contact me
          </h1>
          <h1 className={styles.bgTopTitle}>{"let's"}</h1>
          <h1 className={styles.bgBottomTitle}>{"work"}</h1>
        </section>
        <section className={styles.contactForm}>
          <section className={styles.contactInfo}>
            <div>
              <HiOutlineEnvelope />
              <p>booking@marro.com</p>
            </div>
            <div>
              <HiOutlinePhone />
              <p>+385 97 675 7675</p>
            </div>
            <div>
              <IoLogoInstagram />
              <p>@by.marro</p>
            </div>
          </section>
          <form>
            <section className={styles.twoInput}>
              <input placeholder="Name" />
              <input placeholder="Email" />
            </section>
            <textarea placeholder="Message" rows={7} />
            <button>
              <p>Submit</p>
              <HiArrowUpRight />
            </button>
          </form>
        </section>
      </main>
  )
}

export default Contact