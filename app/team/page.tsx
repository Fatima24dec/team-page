"use client";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
import TeamCard from "@/components/TeamCard";
import styles from "./team.module.css";
import { teamService } from "@/services/team";

type Member = {
  id: number;
  name: string;
  position: string;
  bio: string;
  photo: string | null;
};

export default function TeamPage() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [switching, setSwitching] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [members, setMembers] = useState<Member[]>([]);

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
        setMembers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTeams();
  }, []);

  function handleLogin() {
    setLoginLoading(true);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000';
    console.log("Going to:", `${backendUrl}/login`);
    setTimeout(() => {
      window.location.href = `${backendUrl}/login`;
    }, 800);
  }

  return (
    <main className={styles.main} dir={locale === "ar" ? "rtl" : "ltr"}>

      {/* Loading Overlay */}
      {(switching || loginLoading) && (
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
              disabled={isPending || switching || loginLoading}
            >
              {t("nav.lang")}
            </button>
            <button
              className={styles.loginBtn}
              onClick={handleLogin}
              disabled={loginLoading}
            >
              {loginLoading ? (
                <span className={styles.btnSpinner}></span>
              ) : (
                t("nav.login")
              )}
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

        <div dir="ltr" className={styles.marquee}>
          <div className={styles.track}>
            {loopMembers.map((m, i) => (
              <TeamCard
                key={`${m.id}-${i}`}
                name={m.name}
                title={m.position}
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