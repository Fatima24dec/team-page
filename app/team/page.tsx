import teamMembers from "@/data/team.json";
import TeamCard from "@/components/TeamCard";
import styles from "./team.module.css";

export const metadata = {
  title: "Our Team",
  description: "Meet the people behind our company.",
};

export default function TeamPage() {
  return (
    <main className={styles.main}>
      <div className={styles.left}>
        <p className={styles.eyebrow}>Get to know our team</p>
        <h1 className={styles.heading}>
          Meet the <span>6Degrees Team</span>
        </h1>
        <p className={styles.desc}>
          A passionate group of designers, developers, and strategists building
          digital experiences that make a real difference.
        </p>
        <ul className={styles.bullets}>
          <li>Riyadh-based, globally minded</li>
          <li>10+ years of combined experience</li>
          <li>Trusted by 50+ companies</li>
        </ul>
      </div>

      <div className={styles.right}>
        <div className={styles.scrollTrack}>
          {[...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers].map((member, i) => (
            <TeamCard
              key={i}
              name={member.name}
              title={member.title}
              bio={member.bio}
              tall={member.tall}
              photo={member.photo}
            />
          ))}
        </div>
      </div>
    </main>
  );
}