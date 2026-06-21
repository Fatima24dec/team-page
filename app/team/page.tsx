import teamMembers from "@/data/team.json";
import TeamCard from "@/components/TeamCard";
import styles from "./team.module.css";

type Member = {
  id: number;
  name: string;
  title: string;
  bio: string;
  tall: boolean;
  photo: string | null;
};

export default function TeamPage() {
  const members = teamMembers as Member[];

  const pairs: Member[][] = [];
  for (let i = 0; i < members.length; i += 2) {
    pairs.push([members[i], members[i + 1]].filter(Boolean));
  }

  const loop = [...Array(8)].flatMap(() => pairs);

  return (
    <main className={styles.main}>

      {/* HEADER */}
      <header className={styles.header}>
        <img
          src="https://6degrees.com.sa/assets/imgs/logo-light.png"
          alt="6Degrees Logo"
          className={styles.logo}
        />
        <div className={styles.right}>
          <button className={styles.lang}>العربية</button>
          <button className={styles.menu} aria-label="menu">
            <span className={styles.icon}>
              <i></i>
              <i></i>
            </span>
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <div className={styles.layout}>

        <div className={styles.left}>
          <h1 className={styles.heading}>The Minds Behind</h1>
          <p className={styles.description}>Turning ideas into digital experiences.</p>
        </div>

        <div className={styles.marquee}>
          <div className={styles.track}>
            {loop.map((pair, colIdx) => {
              const topIsTall = colIdx % 2 === 0;
              return (
                <div key={colIdx} className={styles.col}>
                  {pair.map((m, i) => (
                    <TeamCard
                      key={`${colIdx}-${i}-${m.id}`}
                      name={m.name}
                      title={m.title}
                      bio={m.bio}
                      photo={m.photo}
                      tall={i === 0 ? topIsTall : !topIsTall}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>
          All rights reserved © 6 Degrees Technologies Co. 2024.
        </p>
      </footer>

    </main>
  );
}