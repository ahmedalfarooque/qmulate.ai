"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function ThemeSwitcher({ compact = false }: { compact?: boolean }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ width: compact ? 36 : 72, height: 36 }} />;

  const isDark = resolvedTheme === "dark";
  const toggle = () => setTheme(isDark ? "light" : "dark");

  if (compact) {
    return (
      <motion.button
        onClick={toggle}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        style={{
          width: 36, height: 36, borderRadius: "50%",
          background: isDark ? "rgba(255,255,255,0.07)" : "rgba(13,17,23,0.07)",
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(13,17,23,0.12)"}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative", overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            style={{ fontSize: 15, lineHeight: 1 }}
          >
            {isDark ? "☀️" : "🌙"}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "7px 14px 7px 10px", borderRadius: 100, cursor: "pointer",
        background: isDark ? "rgba(255,255,255,0.06)" : "rgba(13,17,23,0.06)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.11)" : "rgba(13,17,23,0.11)"}`,
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        transition: "all .25s",
      }}
    >
      {/* Track */}
      <div style={{
        width: 28, height: 16, borderRadius: 8, position: "relative",
        background: isDark
          ? "rgba(255,255,255,0.12)"
          : "linear-gradient(135deg,#0284C7,#6D28D9)",
        transition: "background .35s",
        flexShrink: 0,
      }}>
        <motion.div
          animate={{ x: isDark ? 2 : 14 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            position: "absolute", top: 2,
            width: 12, height: 12, borderRadius: "50%",
            background: isDark ? "rgba(255,255,255,0.7)" : "#fff",
            boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.2)",
          }}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={isDark ? "d" : "l"}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: 12, fontWeight: 600, letterSpacing: ".04em",
            color: isDark ? "rgba(255,255,255,0.5)" : "rgba(13,17,23,0.5)",
            fontFamily: "var(--font-geist-mono,'Courier New'),monospace",
            textTransform: "uppercase",
          }}
        >
          {isDark ? "Dark" : "Light"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
