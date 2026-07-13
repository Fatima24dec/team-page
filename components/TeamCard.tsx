"use client";
import styles from "./TeamCard.module.css";

type TeamCardProps = {
  name: string;
  title: string;
  bio: string;
  photo: string | null;
};

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function TeamCard({ name, title, bio, photo }: TeamCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.avatarWrap}>


      {photo ? (
  <img 
    src={photo.startsWith('http') ? photo : `${process.env.NEXT_PUBLIC_BACKEND_URL}/storage/${photo}`} 
    alt={name} 
    className={styles.photo} 
  />
) : (
  <span className={styles.initials}>{getInitials(name)}</span>
)}
      </div>

      <div className={styles.info}>
        <p className={styles.name}>{name}</p>

        <p className={styles.role}>{title}</p>
        <div className={styles.divider}></div>
        <p className={styles.bio}>{bio}</p>
      </div>
    </div>
  );
}
