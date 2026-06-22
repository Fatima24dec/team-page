"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./TeamCard.module.css";

type TeamCardProps = {
  name: string;
  title: string;
  bio: string;
  photo: string | null;
  tall?: boolean;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamCard({
  name,
  title,
  bio,
  photo,
  tall,
}: TeamCardProps) {
  const [tapped, setTapped] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tapped) return;

    const handleOutside = (e: TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setTapped(false);
      }
    };

    document.addEventListener("touchstart", handleOutside);
    return () => document.removeEventListener("touchstart", handleOutside);
  }, [tapped]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current);
    const dy = Math.abs(e.changedTouches[0].clientY - touchStartY.current);
    if (dx > 10 || dy > 10) return;
    setTapped((prev) => !prev);
  };

  return (
    <div
      ref={cardRef}
      className={`${styles.card} ${tall ? styles.tall : ""} ${tapped ? styles.tapped : ""}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className={styles.avatarWrap}>
        {photo ? (
          <img src={photo} alt={name} className={styles.photo} />
        ) : (
          <span className={styles.initials}>{getInitials(name)}</span>
        )}
      </div>

      <div className={styles.info}>
        <p className={styles.role}>{title}</p>
        <p className={styles.name}>{name}</p>
      </div>

      <div className={styles.overlay}>
        <p className={styles.oRole}>{title}</p>
        <p className={styles.oName}>{name}</p>
        <p className={styles.oBio}>{bio}</p>
      </div>
    </div>
  );
}