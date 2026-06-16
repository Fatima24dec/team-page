import styles from "./TeamCard.module.css";

type TeamCardProps = {
  name: string;
  title: string;
  bio: string;
  tall?: boolean;
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

export default function TeamCard({ name, title, bio, tall, photo }: TeamCardProps) {
  return (
    <div className={`${styles.card} ${tall ? styles.tall : ""}`}>
      

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