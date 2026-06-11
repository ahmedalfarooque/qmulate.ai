"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { StrataMark } from "./StrataMark";
import { ThemeSwitcher } from "./ThemeSwitcher";

const EN_LINKS = [
  {h:"/",l:"Home"},{h:"/about",l:"About"},{h:"/services",l:"Services"},
  {h:"/solutions",l:"Solutions"},{h:"/projects",l:"Projects"},{h:"/contact",l:"Contact"},
];
const AR_LINKS = [
  {h:"/ar",l:"الرئيسية"},{h:"/ar/about",l:"من نحن"},{h:"/ar/services",l:"خدماتنا"},
  {h:"/ar/solutions",l:"الحلول"},{h:"/ar/projects",l:"المشاريع"},{h:"/ar/contact",l:"تواصل"},
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const path = usePathname();
  const isAr = path.startsWith("/ar");
  const links = isAr ? AR_LINKS : EN_LINKS;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 16);
    setCompact(v > 72);
  });
  useEffect(() => setOpen(false), [path]);

  const isActive = (h: string) =>
    h === "/" || h === "/ar" ? path === h : path.startsWith(h);

  return (
    <>
      <motion.header
        animate={{
          height: compact ? 54 : 64,
        }}
        transition={{ duration: .3 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999,
          background: scrolled
            ? "var(--glass-hero)"
            : "transparent",
          backdropFilter: scrolled ? "blur(44px) saturate(220%)" : undefined,
          WebkitBackdropFilter: scrolled ? "blur(44px) saturate(220%)" : undefined,
          borderBottom: `1px solid ${scrolled ? "var(--glass-border)" : "transparent"}`,
          transition: "background .3s,border-color .3s,backdrop-filter .3s",
        }}
      >
        {/* Top shimmer line (only when scrolled) */}
        <motion.div animate={{ opacity: scrolled ? 1 : 0 }} transition={{ duration: .3 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: "linear-gradient(90deg,transparent,var(--hr-glow),transparent)",
          }}
        />

        <div className="cw" style={{
          height: "100%", display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: 12,
        }}>
          {/* Logo */}
          <Link href={isAr ? "/ar" : "/"} style={{
            display: "flex", alignItems: "center", gap: 10,
            flexShrink: 0, textDecoration: "none",
          }}>
            <StrataMark size={28} animate style={{ color: "var(--text-1)" }}/>
            <div>
              <div style={{
                fontFamily: "'Inter',sans-serif", fontWeight: 800,
                fontSize: 12, letterSpacing: "0.17em", color: "var(--text-1)", lineHeight: 1,
              }}>QMULATE</div>
              {isAr
                ? <div style={{ fontFamily: "'IBM Plex Sans Arabic',sans-serif", fontSize: 9, color: "var(--text-4)", marginTop: 2 }}>كيوميليت</div>
                : <div style={{ fontFamily: "var(--font-geist-mono,'Courier New'),monospace", fontSize: 8, color: "var(--text-5)", letterSpacing: "0.10em", marginTop: 2 }}>FAMILY OFFICE</div>
              }
            </div>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="d-nav">
            {links.map(l => (
              <Link key={l.h} href={l.h} style={{
                padding: "7px 14px", borderRadius: 100,
                fontSize: 13, fontWeight: 500,
                fontFamily: isAr ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif",
                color: isActive(l.h) ? "var(--text-1)" : "var(--text-3)",
                background: isActive(l.h) ? "var(--g2)" : "transparent",
                border: `1px solid ${isActive(l.h) ? "var(--glass-border)" : "transparent"}`,
                transition: "all .2s",
              }}>{l.l}</Link>
            ))}
          </nav>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
            {/* Theme switcher — pill style on desktop */}
            <div className="d-theme"><ThemeSwitcher/></div>
            {/* Theme switcher — compact icon on mobile */}
            <div className="m-theme"><ThemeSwitcher compact/></div>

            {/* Lang switcher */}
            <Link href={isAr ? (path.replace(/^\/ar/, "") || "/") : ("/ar" + path)}
              style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "var(--g2)", border: "1px solid var(--glass-border)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: isAr ? 10 : 12, color: "var(--text-3)", transition: "all .2s", flexShrink: 0,
              }}
            >{isAr ? "EN" : "ع"}</Link>

            {/* CTA button */}
            <Link href={isAr ? "/ar/contact" : "/contact"}
              className="btn btn-primary d-cta"
              style={{ padding: "8px 18px", fontSize: 12, borderRadius: 100 }}>
              {isAr ? "تواصل" : "Get in touch"}
            </Link>

            {/* Mobile menu */}
            <button onClick={() => setOpen(o => !o)} className="m-btn" style={{
              width: 36, height: 36, borderRadius: "50%",
              background: "var(--g2)", border: "1px solid var(--glass-border)",
              display: "none", alignItems: "center", justifyContent: "center",
              color: "var(--text-1)",
            }}>
              {open ? <X size={15}/> : <Menu size={15}/>}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: .35, ease: [.4, 0, .2, 1] }}
            style={{
              position: "fixed", inset: 0, zIndex: 9998,
              background: "var(--glass-hero)",
              backdropFilter: "blur(48px) saturate(240%)",
              WebkitBackdropFilter: "blur(48px) saturate(240%)",
              paddingTop: 64, direction: isAr ? "rtl" : "ltr",
              display: "flex", flexDirection: "column",
            }}
          >
            <nav style={{
              flex: 1, display: "flex", flexDirection: "column",
              padding: "24px 28px", overflowY: "auto",
            }}>
              {links.map((l, i) => (
                <Link key={l.h} href={l.h} style={{
                  padding: "20px 0",
                  borderBottom: "1px solid var(--hr-color)",
                  fontSize: "clamp(22px,6vw,34px)", fontWeight: 800,
                  letterSpacing: isAr ? 0 : "-0.03em",
                  fontFamily: isAr ? "'IBM Plex Sans Arabic',sans-serif" : "'Inter',sans-serif",
                  color: isActive(l.h) ? "var(--cyan)" : "var(--text-1)",
                  animation: `fade-up .45s ${i * 55}ms both`,
                }}>{l.l}</Link>
              ))}
              <div style={{ paddingTop: 28, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <Link href={isAr ? "/ar/contact" : "/contact"}
                  className="btn btn-primary"
                  style={{ flex: 1, justifyContent: "center", fontSize: 15, padding: 16 }}>
                  {isAr ? "طلب تواصل" : "Request an introduction"}
                </Link>
                <ThemeSwitcher/>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes fade-up{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @media(max-width:900px){.d-nav{display:none!important}.d-cta{display:none!important}.d-theme{display:none!important}.m-btn{display:flex!important}}
        @media(min-width:901px){.m-btn{display:none!important}.m-theme{display:none!important}}
      `}</style>
    </>
  );
}
