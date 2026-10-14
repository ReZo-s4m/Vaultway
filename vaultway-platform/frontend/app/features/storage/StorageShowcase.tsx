"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./storage.module.css";

const showcaseItems = [
  {
    title: "Protect and recover your data",
    description:
      "Keep deleted files in a recoverable area so accidental removal does not immediately become permanent.",
    image: "/storage-assets/Accordian-1.png",
    alt: "File recovery history interface",
  },
  {
    title: "Share files while staying in control",
    description:
      "Create a controlled link for a file, choose access settings, add an expiry time, and revoke access whenever required.",
    image: "/storage-assets/Accordian-2.png",
    alt: "File sharing permissions interface",
  },
  {
    title: "Keep favourites close",
    description:
      "Star files and folders so they stay one click away in Favourites, without changing where they live in Cloud Drive.",
    image: "/storage-assets/Accordian-3.png",
    alt: "Favourites in the Vaultway workspace",
  },
  {
    title: "Keep project material organised",
    description:
      "Use folders, Recents, search, and Favourites to keep assignments and deliverables easy to find.",
    image: "/storage-assets/Accordian-4.png",
    alt: "Collaborative project folder interface",
  },
];

export default function StorageShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = showcaseItems[activeIndex];

  return (
    <section className={styles.showcaseSection}>
      <div className={styles.shell}>
        <div className={styles.showcaseHeading}>
          <p className={styles.eyebrow}>More control</p>
          <h2>Do more with Vaultway</h2>
        </div>

        <div className={styles.showcaseLayout}>
          <div className={styles.showcaseMedia}>
            <Image
              key={activeItem.image}
              src={activeItem.image}
              alt={activeItem.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              className={styles.showcaseImage}
            />
          </div>

          <div className={styles.showcaseList}>
            {showcaseItems.map((item, index) => {
              const active = activeIndex === index;

              return (
                <button
                  key={item.title}
                  type="button"
                  className={`${styles.showcaseItem} ${
                    active ? styles.showcaseItemActive : ""
                  }`}
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={active}
                >
                  <span className={styles.showcaseItemHeader}>
                    <span>{item.title}</span>
                    <span className={styles.plus}>{active ? "−" : "+"}</span>
                  </span>

                  {active && (
                    <span className={styles.showcaseDescription}>
                      {item.description}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
