"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import teamMembers from "@/data/team.json";
import TeamCard from "@/components/TeamCard";
import styles from "./team.module.css";
import {useEffect, useState} from 'react';
import { teamService } from "@/services/team";

type Member = {
  id: number;
  name: string;
  title: string;
  bio: string;
  photo: string | null;
};

export default function TeamPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [switching, setSwitching] = useState(false);

  const members = teamMembers as Member[];
  const loopMembers = [...members, ...members];

  async function switchLocale() {
    setSwitching(true);
    const newLocale = locale === "en" ? "ar" : "en";
    await fetch("/api/set-locale", {
      method: "POST",
      body: JSON.stringify({ locale: newLocale }),
      headers: { "Content-Type": "application/json" },
    });
    startTransition(() => {
      router.refresh();
      setSwitching(false);
    });
  }
useEffect(() => {
    const fetchTeams = async () => {
        try {
            const response = await teamService.getTeams();
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchTeams();
}, []);
  return (
    <main className={styles.main} dir={locale === "ar" ? "rtl" : "ltr"}>

      {/* Loading Overlay */}
      {switching && (
        <div className={styles.loadingOverlay}>
          <div className={styles.spinner}></div>
        </div>
      )}

{/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img
            src="https://6degrees.com.sa/assets/imgs/logo-light.png"
            alt="6Degrees Logo"
            className={styles.logo}
          />

          <div className={styles.right}>
            <button
              className={styles.lang}
              onClick={switchLocale}
              disabled={isPending || switching}
            >
              {t("nav.lang")}
            </button>
            <button
              className={styles.loginBtn}
              onClick={() => router.push("http://localhost:8000/login")}
            >
              {t("nav.login")}
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className={styles.layout}>
        <div className={styles.left}>

          <h1 className={styles.heading}>{t("hero.heading")}</h1>
          <p className={styles.description}>{t("hero.description")}</p>
        </div>

        <div className={styles.marquee}>
          <div className={locale === "ar" ? styles.trackRtl : styles.track}>
            {loopMembers.map((m, i) => (
              <TeamCard
                key={`${m.id}-${i}`}
                name={m.name}
                title={m.title}
                bio={m.bio}
                photo={m.photo}
              />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p className={styles.footerText}>{t("footer.text")}</p>
      </footer>

    </main>
  );
}