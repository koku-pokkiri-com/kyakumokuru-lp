"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Mail,
  Check,
  Instagram,
  Crown,
  Lightbulb,
  ChevronDown,
  ArrowRight,
  Users2,
  BarChart3,
  Clock,
  Building2,
  MapPin,
  Phone,
  MessageCircle,
  Search,
  Clapperboard,
  LineChart,
  Menu,
} from "lucide-react";

/* ============================================================
 * Helpers
 * ============================================================ */

const EASE = [0.22, 1, 0.36, 1] as const;

function FadeIn({
  children,
  className = "",
  delay = 0,
  y = 20,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
 * Primary CTA Button
 * ============================================================ */

function PrimaryCTA({
  className = "",
  children,
  href = "#contact",
  full = false,
  size = "lg",
}: {
  className?: string;
  children?: ReactNode;
  href?: string;
  full?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm"
      ? "px-5 py-2.5 text-[13px] sm:text-sm gap-1.5 shadow-[0_4px_0_0_#c9941f] hover:translate-y-[2px] hover:shadow-[0_2px_0_0_#c9941f] active:translate-y-[3px] active:shadow-[0_1px_0_0_#c9941f]"
      : size === "md"
        ? "px-10 py-4 text-base gap-2.5 shadow-[0_6px_0_0_#c9941f] hover:translate-y-[3px] hover:shadow-[0_3px_0_0_#c9941f] active:translate-y-[5px] active:shadow-[0_1px_0_0_#c9941f]"
        : "px-12 py-5 text-lg sm:px-16 sm:py-6 sm:text-xl gap-3 shadow-[0_8px_0_0_#c9941f] hover:translate-y-[3px] hover:shadow-[0_5px_0_0_#c9941f] active:translate-y-[6px] active:shadow-[0_2px_0_0_#c9941f]";
  const iconSize = size === "sm" ? "h-4 w-4" : size === "md" ? "h-5 w-5" : "h-6 w-6";
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full bg-brand-yellow font-bold text-[#111] transition-[transform,box-shadow] duration-150 ease-out ${
        full ? "w-full" : ""
      } ${sizeClass} ${className}`}
    >
      {children ?? (
        <>
          <Mail className={iconSize} strokeWidth={2.4} />
          まずは無料相談
        </>
      )}
    </a>
  );
}

function CTAGroup({
  align = "center",
  noteColor = "text-[#555]",
  size = "lg",
}: {
  align?: "left" | "center";
  noteColor?: string;
  size?: "md" | "lg";
}) {
  return (
    <div
      className={`flex flex-col gap-4 ${
        align === "center" ? "items-center" : "items-center lg:items-start"
      }`}
    >
      <div
        className={`text-[14px] font-bold tracking-[0.05em] sm:text-[15px] ${noteColor}`}
      >
        <span className="mr-1.5 text-brand-gold">＼</span>
        たった10秒で完了
        <span className="ml-1.5 text-brand-gold">／</span>
      </div>
      <PrimaryCTA size={size} />
    </div>
  );
}

/* ============================================================
 * HEADER
 * ============================================================ */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#e5eef7]"
      style={{
        background: "rgba(255,255,255,0.95)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-5 md:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold text-white text-lg font-bold">
            #
          </span>
          <span className="text-[17px] font-bold tracking-tight text-brand-dark sm:text-lg">
            キャクモクルー
          </span>
        </a>

        <PrimaryCTA size="sm" />
      </div>
    </header>
  );
}

/* ============================================================
 * HERO
 * ============================================================ */

function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden bg-brand-cream">
      <div className="mx-auto max-w-[1200px] px-6 pb-10 pt-14 md:px-8 md:pb-14 md:pt-20">
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_1fr] md:gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* LEFT: text */}
          <div className="text-center md:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-2 text-sm font-medium text-[#666] sm:text-base"
            >
              SNSで
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              className="text-[40px] font-bold leading-[1.1] tracking-tight text-brand-dark sm:text-[54px] md:text-[64px]"
            >
              飲食店の
              <br />
              集客と認知を
              <br />
              <span className="gradient-text-warm text-[52px] sm:text-[68px] md:text-[78px]">
                MAXに！
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mt-8 max-w-xl text-[15px] leading-[1.8] text-[#333] md:mx-0 md:text-base"
            >
              現役グルメインフルエンサーの力で、飲食店の集客と認知を最大化。
              キャスティング・ブランディング・コンサルティングの3プランで、
              お店の目的に合わせてサポートします。
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 flex justify-center md:justify-start"
            >
              <CTAGroup align="left" />
            </motion.div>
          </div>

          {/* RIGHT: device image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="relative mx-auto w-full max-w-[520px] md:max-w-none"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-devices.png"
              alt="SNSマーケティング デバイスイメージ"
              className="h-auto w-full select-none"
              draggable={false}
            />
          </motion.div>
        </div>
      </div>

      {/* 3 Laurel achievement badges — image-based */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 pb-14 md:px-8 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-5 md:gap-7"
        >
          <ImageBadge src="/badge-laurel-no1.png" alt="バッジ 1" />
          <ImageBadge src="/badge-laurel-no1.png" alt="バッジ 2" />
          <ImageBadge src="/badge-laurel-no1.png" alt="バッジ 3" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Hero Device Mockup (phone + laptop) ---------- */
function HeroDeviceMockup() {
  return (
    <div className="relative h-full w-full">
      {/* soft shadow plate */}
      <div
        className="absolute inset-x-8 bottom-2 h-8 rounded-full opacity-40 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, rgba(251,176,59,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Laptop (back, right, rotated slightly) */}
      <div className="absolute right-0 top-6 w-[78%] sm:top-8 md:top-10">
        <div className="rounded-t-xl bg-[#1f2937] p-1.5 shadow-xl">
          <div className="overflow-hidden rounded bg-white">
            {/* Menu bar */}
            <div className="flex items-center gap-1 border-b border-gray-200 bg-[#f6f8fb] px-2 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff5f56]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-1.5 w-1.5 rounded-full bg-[#27c93f]" />
              <span className="ml-2 text-[7px] font-medium text-[#999]">
                analytics · kyakumokuru
              </span>
            </div>
            {/* Dashboard content */}
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div className="text-[8px] font-bold text-[#333]">
                  フォロワー推移(月次)
                </div>
                <span className="rounded bg-brand-gold/20 px-1.5 py-0.5 text-[7px] font-bold text-brand-gold">
                  +1,278
                </span>
              </div>
              {/* Mini chart */}
              <svg viewBox="0 0 200 80" className="mt-2 h-20 w-full">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#fbb03b" stopOpacity="0.5" />
                    <stop offset="1" stopColor="#fbb03b" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0 60 L 20 55 L 40 50 L 60 48 L 80 40 L 100 35 L 120 28 L 140 22 L 160 15 L 180 10 L 200 8 L 200 80 L 0 80 Z"
                  fill="url(#chartGrad)"
                />
                <path
                  d="M 0 60 L 20 55 L 40 50 L 60 48 L 80 40 L 100 35 L 120 28 L 140 22 L 160 15 L 180 10 L 200 8"
                  stroke="#fbb03b"
                  strokeWidth="2"
                  fill="none"
                />
                {[20, 60, 100, 140, 180].map((x, i) => (
                  <circle key={i} cx={x} cy={55 - i * 10} r="1.5" fill="#fbb03b" />
                ))}
              </svg>
              {/* bars below */}
              <div className="mt-2 flex items-end gap-1">
                {[20, 35, 30, 48, 40, 58, 52, 72, 65, 85, 80, 95].map(
                  (h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm"
                      style={{
                        height: `${h * 0.3}px`,
                        background:
                          i > 7
                            ? "linear-gradient(180deg,#fbb03b,#d88c1a)"
                            : "#e5e7eb",
                      }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Laptop base */}
        <div
          className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-[14px]"
          style={{
            background: "linear-gradient(180deg,#cbd5e1 0%,#94a3b8 100%)",
          }}
        />
        <div className="mx-auto h-1 w-[60%] rounded-b bg-[#94a3b8]" />
      </div>

      {/* Phone (front left, tilted -8deg) */}
      <div
        className="absolute left-0 bottom-0 w-[42%] sm:w-[44%]"
        style={{ transform: "rotate(-8deg)" }}
      >
        <div
          className="overflow-hidden rounded-[28px] border-[5px] border-[#0d0d0d] bg-white"
          style={{
            boxShadow:
              "0 30px 60px -15px rgba(0,0,0,0.35), 0 15px 30px -8px rgba(46,57,79,0.25)",
          }}
        >
          {/* notch */}
          <div className="relative flex h-4 items-center justify-center bg-[#0d0d0d]">
            <div className="h-1.5 w-16 rounded-full bg-[#333]" />
          </div>
          {/* content: Instagram-like profile */}
          <div className="bg-white px-2.5 pt-3 pb-2">
            <div className="flex items-center gap-1.5">
              <svg className="h-3 w-3 text-[#333]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="text-[10px] font-bold text-[#111]">
                moto_pt_98
              </span>
              <svg className="h-2.5 w-2.5 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L14 4L17 4L18 7L21 8L20 11L21 14L18 15L17 18L14 18L12 20L10 18L7 18L6 15L3 14L4 11L3 8L6 7L7 4L10 4Z" />
              </svg>
            </div>
            <div className="mt-2.5 flex items-center gap-2.5">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0c0c0c]"
              >
                <span className="font-serif text-[6px] font-bold leading-tight text-[#c9a557]">
                  東京大人
                  <br />
                  <span className="tracking-[0.1em] text-[5px]">GOURMET</span>
                </span>
              </div>
              <div className="flex flex-1 justify-around text-center">
                <div>
                  <div className="text-[9px] font-bold text-[#111]">842</div>
                  <div className="text-[6px] text-[#666]">投稿</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#111]">32万</div>
                  <div className="text-[6px] text-[#666]">フォロワー</div>
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#111]">2,149</div>
                  <div className="text-[6px] text-[#666]">フォロー</div>
                </div>
              </div>
            </div>
            <div className="mt-2 text-[7px] leading-relaxed text-[#222]">
              <div className="font-bold">東京大人グルメ｜もと</div>
              <div>東京No.1のディナー紹介アカウント</div>
              <div className="text-[#999]">...続きを読む</div>
            </div>
            {/* Posts grid */}
            <div className="mt-2 grid grid-cols-3 gap-[2px]">
              {[
                "linear-gradient(135deg,#c38b4a,#7a4d1c)",
                "linear-gradient(135deg,#e8aa4a,#a0691f)",
                "linear-gradient(135deg,#5a3820,#8a5528)",
                "linear-gradient(135deg,#d4a85c,#7a5330)",
                "linear-gradient(135deg,#c27f42,#6a3d1a)",
                "linear-gradient(135deg,#8a5528,#3e2810)",
              ].map((bg, i) => (
                <div
                  key={i}
                  className="aspect-square"
                  style={{ background: bg }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Achievement badge (crown + laurel) ---------- */
/* ---------- Image-based Badge (uses transparent PNG) ---------- */
function ImageBadge({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="group flex justify-center transition-transform duration-200 hover:-translate-y-1">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-auto w-full max-w-[320px] select-none"
        draggable={false}
      />
    </div>
  );
}

function AchievementBadge({
  label,
  value,
  sub,
  accent,
  sns,
}: {
  label: string;
  value: string;
  sub?: string;
  accent?: string;
  sns?: boolean;
}) {
  return (
    <div className="group relative flex flex-col items-center transition-transform duration-200 hover:-translate-y-1">
      <LaurelCrown />
      <div className="-mt-4 flex items-center justify-center sm:-mt-5 md:-mt-6">
        <LaurelLeaves />
        <div className="relative z-10 -mx-4 flex min-w-[110px] flex-col items-center px-1 text-center sm:-mx-6 sm:min-w-[150px] md:-mx-8 md:min-w-[190px]">
          <div className="text-[12px] font-bold text-brand-dark sm:text-sm md:text-[17px]">
            {label}
          </div>
          <div
            className="mx-auto my-1.5 h-[1.5px] w-full max-w-[140px] sm:my-2 md:max-w-[170px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, #2e394f 20%, #2e394f 80%, transparent)",
            }}
          />
          {sns ? (
            <div className="mt-1.5 flex items-center justify-center gap-1.5 sm:mt-2 sm:gap-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg text-white shadow-sm sm:h-9 sm:w-9 md:h-11 md:w-11"
                style={{
                  background:
                    "linear-gradient(135deg, #f09433 0%, #dc2743 50%, #bc1888 100%)",
                }}
              >
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
              </div>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white shadow-sm sm:h-9 sm:w-9 md:h-11 md:w-11">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.321 5.562a5.122 5.122 0 01-3.414-1.267 5.124 5.124 0 01-1.537-2.723V1H11.09v14.05a2.916 2.916 0 11-4.9-2.094 2.91 2.91 0 012.106-.85V8.835a6.66 6.66 0 00-.58-.026 6.692 6.692 0 103.68 12.24l.001-.001a6.693 6.693 0 002.997-5.57V8.335a8.75 8.75 0 005.096 1.632V6.3a5.086 5.086 0 01-.168-.005v-.733z" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="text-[30px] font-black leading-none text-brand-dark sm:text-[40px] md:text-[52px]">
                {value}
              </div>
              {accent && (
                <span className="absolute -right-6 -top-1 -rotate-12 text-[11px] font-black text-[#e04a4a] sm:-right-9 sm:text-[13px] md:-right-12 md:text-[15px]">
                  {accent}
                </span>
              )}
              {sub && (
                <div className="mt-1 text-[10px] font-bold tracking-[0.2em] text-[#555] sm:text-[11px] md:mt-1.5 md:text-[13px]">
                  {sub}
                </div>
              )}
            </div>
          )}
        </div>
        <LaurelLeaves mirrored />
      </div>
    </div>
  );
}

function LaurelCrown() {
  return (
    <svg
      viewBox="0 0 90 62"
      className="relative z-20 h-9 w-14 sm:h-11 sm:w-[72px] md:h-14 md:w-[90px]"
      aria-hidden
    >
      <defs>
        <linearGradient id="ach-crown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4a8" />
          <stop offset="0.3" stopColor="#ffd24a" />
          <stop offset="0.6" stopColor="#fbb03b" />
          <stop offset="0.9" stopColor="#a37000" />
          <stop offset="1" stopColor="#6a4500" />
        </linearGradient>
        <linearGradient id="ach-crown-band" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffd24a" />
          <stop offset="1" stopColor="#7a5300" />
        </linearGradient>
        <radialGradient id="ach-sparkle" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#e0ffa8" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#b8ff66" stopOpacity="0.5" />
          <stop offset="1" stopColor="#b8ff66" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M 8 46 L 82 46 L 74 26 L 66 32 L 56 6 L 45 28 L 34 6 L 24 32 L 16 26 Z"
        fill="url(#ach-crown)"
        stroke="#5a3800"
        strokeWidth="0.7"
        strokeLinejoin="round"
      />
      <rect
        x="6"
        y="46"
        width="78"
        height="7"
        rx="1.2"
        fill="url(#ach-crown-band)"
        stroke="#5a3800"
        strokeWidth="0.5"
      />
      <rect x="8" y="47" width="74" height="1.2" fill="#fff5b3" opacity="0.8" />
      <circle cx="45" cy="8" r="2.8" fill="#fff7c9" />
      <circle cx="45" cy="8" r="1.4" fill="#ffd60a" />
      <circle cx="24" cy="13" r="2.2" fill="#fff7c9" />
      <circle cx="24" cy="13" r="1.1" fill="#ffd60a" />
      <circle cx="66" cy="13" r="2.2" fill="#fff7c9" />
      <circle cx="66" cy="13" r="1.1" fill="#ffd60a" />
      <circle cx="18" cy="22" r="10" fill="url(#ach-sparkle)" />
      <path
        d="M 18 14 L 19.2 20.8 L 26 22 L 19.2 23.2 L 18 30 L 16.8 23.2 L 10 22 L 16.8 20.8 Z"
        fill="#ffffff"
        opacity="0.85"
      />
    </svg>
  );
}

function LaurelLeaves({ mirrored = false }: { mirrored?: boolean }) {
  const leaves = [
    { cx: 92, cy: 20, rx: 11, ry: 4, r: -22 },
    { cx: 80, cy: 30, rx: 12, ry: 4.3, r: -38 },
    { cx: 65, cy: 44, rx: 13, ry: 4.5, r: -55 },
    { cx: 52, cy: 62, rx: 14, ry: 4.8, r: -72 },
    { cx: 43, cy: 82, rx: 14, ry: 4.8, r: -86 },
    { cx: 38, cy: 104, rx: 14, ry: 4.8, r: -98 },
    { cx: 38, cy: 126, rx: 14, ry: 4.6, r: -112 },
    { cx: 44, cy: 148, rx: 13, ry: 4.4, r: -126 },
    { cx: 56, cy: 168, rx: 12, ry: 4, r: -142 },
    { cx: 72, cy: 184, rx: 11, ry: 3.6, r: -158 },
  ];
  return (
    <svg
      viewBox="0 0 110 200"
      className="h-[140px] w-[78px] shrink-0 sm:h-[170px] sm:w-[95px] md:h-[200px] md:w-[112px]"
      style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id={`leaf-${mirrored ? "r" : "l"}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3a0" />
          <stop offset="0.45" stopColor="#fbb03b" />
          <stop offset="1" stopColor="#7a5300" />
        </linearGradient>
        <linearGradient id={`leaf-shade-${mirrored ? "r" : "l"}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b6000" stopOpacity="0.35" />
          <stop offset="1" stopColor="#5a3800" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M 98 8 Q 55 16 32 55 Q 18 110 36 160 Q 54 192 86 198"
        stroke={`url(#leaf-${mirrored ? "r" : "l"})`}
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        opacity="0.85"
      />
      {leaves.map((l, i) => (
        <g key={i} transform={`rotate(${l.r} ${l.cx} ${l.cy})`}>
          <ellipse
            cx={l.cx}
            cy={l.cy}
            rx={l.rx}
            ry={l.ry}
            fill={`url(#leaf-${mirrored ? "r" : "l"})`}
          />
          <ellipse
            cx={l.cx}
            cy={l.cy + l.ry * 0.35}
            rx={l.rx * 0.85}
            ry={l.ry * 0.5}
            fill={`url(#leaf-shade-${mirrored ? "r" : "l"})`}
          />
          <line
            x1={l.cx - l.rx + 0.8}
            y1={l.cy}
            x2={l.cx + l.rx - 0.8}
            y2={l.cy}
            stroke="#5a3800"
            strokeWidth="0.4"
            opacity="0.7"
          />
          <ellipse
            cx={l.cx - l.rx * 0.3}
            cy={l.cy - l.ry * 0.3}
            rx={l.rx * 0.4}
            ry={l.ry * 0.22}
            fill="#fff9d0"
            opacity="0.6"
          />
        </g>
      ))}
      <circle cx="88" cy="195" r="2.4" fill="#fbb03b" />
      <circle cx="82" cy="190" r="2" fill="#fbb03b" />
      <circle cx="94" cy="188" r="1.8" fill="#fbb03b" />
    </svg>
  );
}

/* ============================================================
 * MID CTA (reusable inline CTA section)
 * ============================================================ */

function MidCTASection({ title }: { title: string }) {
  return (
    <section className="bg-brand-cream py-14 md:py-20">
      <div className="mx-auto max-w-[900px] px-6 text-center md:px-8">
        <FadeIn>
          <h3 className="mb-8 text-xl font-bold leading-[1.6] text-brand-dark sm:text-2xl md:text-[28px]">
            {title}
          </h3>
          <div className="flex justify-center">
            <CTAGroup align="center" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================================
 * GROWTH SECRET
 * ============================================================ */

/* ---------- Avatars (brand compositions) ---------- */
function AvatarJoshitsu() {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full"
      style={{
        background:
          "linear-gradient(135deg, #f7f1e0 0%, #ecdfc0 45%, #d9c49a 100%)",
      }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8) 0%, transparent 40%), radial-gradient(circle at 70% 70%, rgba(200,170,100,0.3) 0%, transparent 50%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center leading-none">
        <span className="text-[6px] tracking-wider text-[#9a7a3a] sm:text-[7px]">
          @tokyo.joshitsu.restaurant
        </span>
        <span
          className="mt-1 font-serif text-[12px] font-bold tracking-wide sm:text-[15px] md:text-[17px]"
          style={{ color: "#7a5a1a" }}
        >
          東京上質
        </span>
        <span
          className="mt-0.5 font-serif text-[9px] font-bold tracking-wide sm:text-[11px] md:text-[12px]"
          style={{ color: "#7a5a1a" }}
        >
          レストラン
        </span>
      </div>
    </div>
  );
}

function AvatarOtona() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-[#0c0c0c]">
      <div className="flex flex-col items-center leading-none">
        <span
          className="font-serif text-[11px] font-bold sm:text-[14px] md:text-[16px]"
          style={{ color: "#c9a557" }}
        >
          東京大人
        </span>
        <span className="my-0.5 h-px w-6 bg-[#c9a557] sm:w-7" />
        <span
          className="font-serif text-[6px] font-bold tracking-[0.2em] sm:text-[8px] md:text-[9px]"
          style={{ color: "#c9a557" }}
        >
          GOURMET
        </span>
      </div>
    </div>
  );
}

/* ---------- Instagram profile mockup ---------- */

type AccountMock = {
  username: string;
  displayName: string;
  verified: boolean;
  posts: string;
  followers: string;
  following: string;
  bio: string[];
  link?: string;
  threads: string;
  highlights: string[];
  avatar: "joshitsu" | "otona";
  avatarRing: boolean;
};

const JOSHITSU_DATA: AccountMock = {
  username: "tokyo.joshitsu.restaurant",
  displayName: "東京上質レストラン",
  verified: false,
  posts: "411",
  followers: "3.9万",
  following: "621",
  bio: [
    '"外さない店"だけ知りたい人へ',
    "▫️ 東京の高級レストランを厳選",
    "▫️ デート・会食・記念日に",
    "▫️ 年間300軒以上｜¥8,000〜¥30,000",
  ],
  threads: "tokyo.joshitsu.restaurant",
  highlights: ["hotel", "French", "Washoku", "sushi", "About"],
  avatar: "joshitsu",
  avatarRing: true,
};

const OTONA_DATA: AccountMock = {
  username: "moto_pt_98",
  displayName: "東京大人グルメ｜もと",
  verified: true,
  posts: "842",
  followers: "32万",
  following: "2,149",
  bio: [
    "東京No.1のディナー紹介アカウント",
    "▪️ 単価1-2万円前後のデート/会食/ご褒美のお店探しに",
    "▪️ 総フォロワー50万 over",
    '▪️ "人や店"のバックグラウンドに注目',
  ],
  link: "www.tiktok.com/@moto_gurume",
  threads: "moto_pt_98",
  highlights: ["渋谷エリア", "六本木エリア", "恵比寿", "新橋・銀座", "中目黒"],
  avatar: "otona",
  avatarRing: false,
};

function InstagramMockup({ data }: { data: AccountMock }) {
  return (
    <div
      className="overflow-hidden rounded-[26px] border-[6px] border-[#0d0d0d] bg-white"
      style={{
        boxShadow:
          "0 40px 80px -20px rgba(0,0,0,0.35), 0 20px 40px -10px rgba(46,57,79,0.2)",
      }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[13px] font-bold text-[#111] sm:text-sm">
            {data.username}
          </span>
          {data.verified && (
            <svg className="h-3.5 w-3.5 text-[#1d9bf0]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L14.5 4.5L18 4L19 7.5L22 9L20.5 12L22 15L19 16.5L18 20L14.5 19.5L12 22L9.5 19.5L6 20L5 16.5L2 15L3.5 12L2 9L5 7.5L6 4L9.5 4.5L12 2Z" />
              <path d="M10.5 14.5L8 12L9 11L10.5 12.5L14 9L15 10L10.5 14.5Z" fill="white" />
            </svg>
          )}
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="flex items-center gap-0.5 rounded-md bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-[#333] sm:text-[11px]">
            フォロー中
            <ChevronDown className="h-2.5 w-2.5" strokeWidth={2.5} />
          </span>
          <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[9px] font-medium text-[#333] sm:text-[11px]">
            メッセージ
          </span>
          <svg className="h-3.5 w-3.5 text-[#555]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="8" r="3" />
            <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2M17 11h4M19 9v4" strokeLinecap="round" />
          </svg>
          <div className="flex gap-0.5 text-[#555]">
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
            <span className="h-1 w-1 rounded-full bg-current" />
          </div>
        </div>
      </div>

      {/* Profile row */}
      <div className="px-4 pt-3 pb-2 md:px-5 md:pt-4">
        <div className="flex items-start gap-4 md:gap-6">
          <div
            className="h-20 w-20 shrink-0 rounded-full p-[3px] sm:h-24 sm:w-24 md:h-[104px] md:w-[104px]"
            style={
              data.avatarRing
                ? {
                    background:
                      "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
                  }
                : { background: "transparent" }
            }
          >
            {data.avatar === "joshitsu" ? <AvatarJoshitsu /> : <AvatarOtona />}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="text-[13px] font-bold text-[#111] sm:text-sm md:text-base">
              {data.displayName}
            </div>
            <div className="mt-2 flex gap-4 sm:gap-5 md:gap-7">
              <div>
                <div className="text-[13px] font-bold text-[#111] sm:text-base">
                  {data.posts}
                </div>
                <div className="text-[9px] text-[#666] sm:text-[10px]">投稿</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#111] sm:text-base">
                  {data.followers}
                </div>
                <div className="text-[9px] text-[#666] sm:text-[10px]">フォロワー</div>
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#111] sm:text-base">
                  {data.following}
                </div>
                <div className="text-[9px] text-[#666] sm:text-[10px]">フォロー中</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3 text-[10px] leading-[1.7] text-[#333] sm:text-[11px] md:text-xs">
          {data.bio.map((line, i) => (
            <div key={i} className={i === 0 ? "font-bold" : ""}>
              {line}
            </div>
          ))}
          <span className="text-[#999]">... 続きを読む</span>
        </div>
        {data.link && (
          <div className="mt-1 flex items-center gap-1 text-[10px] text-[#0070e0] sm:text-[11px]">
            <svg className="h-3 w-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path
                d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                strokeLinecap="round"
              />
            </svg>
            <span className="truncate">{data.link}</span>
          </div>
        )}
        <div className="mt-1 flex items-center gap-1 text-[10px] text-[#111] sm:text-[11px]">
          <span className="inline-flex h-3 w-3 items-center justify-center rounded-full border border-current text-[8px]">
            @
          </span>
          <span>{data.threads}</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-1.5 px-4 py-2 md:px-5">
        <button className="flex-1 rounded-md bg-[#0070e0] py-1.5 text-[11px] font-bold text-white sm:text-xs">
          フォロー
        </button>
        <button className="flex-1 rounded-md bg-gray-100 py-1.5 text-[11px] font-bold text-[#333] sm:text-xs">
          メッセージ
        </button>
        <button className="flex h-7 w-9 items-center justify-center rounded-md bg-gray-100 text-[#333]">
          <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Highlights */}
      <div className="flex gap-2 overflow-hidden border-t border-gray-100 px-3 py-3 md:gap-3 md:px-4">
        {data.highlights.map((h, i) => (
          <div key={i} className="flex shrink-0 flex-col items-center gap-1">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 sm:h-12 sm:w-12 md:h-14 md:w-14"
              style={{
                background:
                  i % 2
                    ? "linear-gradient(135deg,#e8e0d0,#c9a557)"
                    : "linear-gradient(135deg,#1a1a1a,#3a3a3a)",
              }}
            >
              <span className="text-[7px] font-bold text-white sm:text-[8px] md:text-[9px]">
                {h.slice(0, 2)}
              </span>
            </div>
            <span className="max-w-[56px] truncate text-[8px] text-[#333] sm:text-[9px] md:text-[10px]">
              {h}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GrowthSecretSection() {
  return (
    <section className="bg-brand-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-[28px] font-bold leading-[1.4] text-brand-dark sm:text-[36px] md:text-[44px]">
              伸びるアカウントには、
              <br />
              「<span className="text-brand-gold">見えない共通点</span>
              」があります。
            </h2>
            <p className="mt-6 text-base font-medium leading-[1.9] text-[#444] sm:text-lg md:text-2xl">
              その共通点を意識するだけで、
              <br className="sm:hidden" />
              下記のような成果が出ます。
            </p>
          </div>
        </FadeIn>

        {/* Two tablet mockups overlapping */}
        <div className="relative mx-auto mt-14 flex min-h-[520px] max-w-[1100px] flex-col gap-8 md:mt-16 md:block md:min-h-[560px]">
          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -10 }}
            whileInView={{ opacity: 1, x: 0, rotate: -5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative z-10 md:absolute md:left-0 md:top-0 md:w-[62%]"
          >
            <InstagramMockup data={JOSHITSU_DATA} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 10 }}
            whileInView={{ opacity: 1, x: 0, rotate: 5 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="relative z-20 md:absolute md:right-0 md:top-[18%] md:w-[62%]"
          >
            <InstagramMockup data={OTONA_DATA} />
          </motion.div>
        </div>

        <FadeIn delay={0.2}>
          <div className="mt-6 text-center md:mt-10">
            <p className="text-lg font-medium text-[#555] md:text-xl">
              当社の運用アカウントでは
            </p>
            <p className="mt-5 text-[32px] font-black leading-[1.3] text-brand-dark sm:text-[44px] md:text-[60px] lg:text-[68px]">
              1年半で
              <span className="mx-2 text-brand-gold">32万</span>
              フォロワー
              <br />
              月間リーチ
              <span className="mx-2 text-brand-gold">100万+</span>
              超
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================================
 * PROBLEMS → SOLUTIONS
 * ============================================================ */

function ProblemsSection() {
  const problems = [
    "本来の業務が忙しく、\n手間や時間をかけられない",
    "フォロワー数や閲覧数が\n全然伸びない",
    "運用の効果測定をしたいが\n方法がわからない",
  ];

  const points = [
    {
      num: "Point 1",
      title: "短期間で多くの集客や認知を獲得できる",
      desc: "現役グルメインフルエンサーをまとめてキャスティング。戦略設計から投稿まで全てフルサポートで、短期間に爆発的な集客と認知を実現します。",
    },
    {
      num: "Point 2",
      title: "中長期で安定した集客・認知を獲得できる",
      desc: "台本・撮影・投稿・データ集計までを一貫してサポート。継続的にお店のブランドを育て、安定した集客と認知を生み出します。",
    },
    {
      num: "Point 3",
      title: "3ヶ月で自社にプロのSNS人材を育成できる",
      desc: "企画・撮影・投稿設計ができる人材を社内で3ヶ月で育成。経営者とのコンサル面談、教育、運用ノウハウ共有までフルサポートします。",
    },
  ];

  return (
    <>
      <section className="bg-brand-cream py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <FadeIn>
            <h2 className="text-center text-[28px] font-bold leading-[1.4] text-brand-dark sm:text-[36px] md:text-[44px]">
              SNSの運用で
              <br className="sm:hidden" />
              こんなお悩みありませんか？
            </h2>
          </FadeIn>

          <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-2 md:gap-8">
            {problems.map((p, i) => (
              <FadeIn
                key={i}
                delay={i * 0.1}
                className={
                  i === 2 ? "md:col-span-2 md:mx-auto md:w-[calc(50%-16px)]" : ""
                }
              >
                <div
                  className="flex min-h-[140px] items-center justify-center rounded-[40px] bg-brand-gold px-10 py-8 text-center md:min-h-[160px] md:px-12 md:py-10"
                  style={{
                    boxShadow:
                      "0 14px 34px -8px rgba(251,176,59,0.5), inset 0 1px 0 rgba(255,255,255,0.35)",
                  }}
                >
                  <p className="whitespace-pre-line text-[18px] font-bold leading-[1.7] text-white md:text-[22px] lg:text-[24px]">
                    {p}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="mx-auto mt-14 flex justify-center md:mt-16">
            <div
              className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-white md:h-16 md:w-16"
              style={{ boxShadow: "0 8px 24px rgba(61,169,252,0.35)" }}
            >
              <ChevronDown className="h-6 w-6 md:h-7 md:w-7" strokeWidth={3} />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brand-gold py-20 md:py-24">
        <div className="mx-auto max-w-[1200px] px-6 md:px-8">
          <FadeIn>
            <h2 className="text-center text-[26px] font-bold leading-[1.5] text-brand-dark sm:text-[34px] md:text-[40px]">
              その悩み、<span className="text-white">#キャクモクルー</span>
              <br className="sm:hidden" />
              にお任せください。
            </h2>
          </FadeIn>

          <div className="mt-14 flex flex-col gap-6 md:mt-16 md:gap-8">
            {points.map((pt, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div
                  className="flex flex-col items-center gap-8 rounded-3xl p-6 backdrop-blur md:flex-row md:gap-12 md:p-10 lg:gap-16 lg:p-12"
                  style={{
                    background: "rgba(255,255,255,0.97)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
                  }}
                >
                  <div className="w-full shrink-0 md:w-[340px] lg:w-[380px]">
                    <PointIllustration index={i} />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-sm font-bold tracking-[0.2em] text-brand-gold md:text-base">
                      {pt.num}
                    </div>
                    <h3 className="mt-2 text-2xl font-black leading-[1.3] text-brand-dark sm:text-[30px] md:text-[34px] lg:text-[38px]">
                      {pt.title}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.9] text-[#444] md:mt-6 md:text-base lg:text-lg">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* CTA at end of solutions */}
          <FadeIn delay={0.2}>
            <div className="mt-14 flex flex-col items-center gap-4 md:mt-20">
              <div className="text-sm font-bold tracking-[0.05em] text-brand-dark sm:text-[15px]">
                <span className="mr-1.5 text-white">＼</span>
                たった10秒で完了
                <span className="ml-1.5 text-white">／</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-14 py-5 text-lg font-bold text-brand-dark shadow-[0_8px_0_0_#d99a25] transition-[transform,box-shadow] duration-150 ease-out hover:translate-y-[3px] hover:shadow-[0_5px_0_0_#d99a25] active:translate-y-[6px] active:shadow-[0_2px_0_0_#d99a25] sm:px-16 sm:py-6 sm:text-xl"
              >
                <Mail className="h-6 w-6" strokeWidth={2.4} />
                まずは無料相談
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}

/* ---------- Point Illustrations (unique SVG compositions) ---------- */
function PointIllustration({ index }: { index: number }) {
  if (index === 0) return <PointIllustration1 />;
  if (index === 1) return <PointIllustration2 />;
  return <PointIllustration3 />;
}

function PointIllustration1() {
  // キャスティング丸投げOK: 戦略→撮影→投稿 の流れ + まるっとおまかせ
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center rounded-2xl bg-brand-cream md:h-[240px] lg:h-[260px]">
      <svg viewBox="0 0 320 180" className="h-full w-full p-4">
        <defs>
          <linearGradient id="p1-check" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffe700" />
            <stop offset="1" stopColor="#fbb03b" />
          </linearGradient>
        </defs>
        {/* 3 checkbox cards */}
        {[
          { x: 20, label: "戦略設計" },
          { x: 120, label: "撮影・制作" },
          { x: 220, label: "投稿運用" },
        ].map((c, i) => (
          <g key={i}>
            <rect
              x={c.x}
              y="20"
              width="80"
              height="70"
              rx="12"
              fill="white"
              stroke="url(#p1-check)"
              strokeWidth="2.5"
            />
            <rect
              x={c.x + 24}
              y="30"
              width="32"
              height="32"
              rx="6"
              fill="none"
              stroke="#2e394f"
              strokeWidth="2"
            />
            <path
              d={`M ${c.x + 30} 47 L ${c.x + 38} 55 L ${c.x + 52} 38`}
              stroke="#fbb03b"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text
              x={c.x + 40}
              y="82"
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#2e394f"
            >
              {c.label}
            </text>
          </g>
        ))}
        {/* arrows */}
        <path d="M 102 55 L 118 55 M 114 50 L 118 55 L 114 60" stroke="#fbb03b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M 202 55 L 218 55 M 214 50 L 218 55 L 214 60" stroke="#fbb03b" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* bottom text */}
        <text
          x="160"
          y="135"
          textAnchor="middle"
          fontSize="24"
          fontWeight="900"
          fill="#fbb03b"
        >
          まるっとおまかせ！
        </text>
        {/* decorative sparkle */}
        <g transform="translate(275 115)">
          <path d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z" fill="#ffe700" />
        </g>
      </svg>
    </div>
  );
}

function PointIllustration2() {
  // 飲食業界特化の実績: 成長チャート + 32万
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center rounded-2xl bg-brand-cream md:h-[240px] lg:h-[260px]">
      <svg viewBox="0 0 320 180" className="h-full w-full p-4">
        <defs>
          <linearGradient id="p2-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe700" />
            <stop offset="1" stopColor="#fbb03b" />
          </linearGradient>
          <linearGradient id="p2-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fbb03b" />
            <stop offset="1" stopColor="#e04a4a" />
          </linearGradient>
        </defs>
        {/* baseline */}
        <line x1="30" y1="140" x2="290" y2="140" stroke="#c9c9c9" strokeWidth="1.5" />
        {/* bars growing */}
        {[
          { x: 40, h: 25 },
          { x: 75, h: 40 },
          { x: 110, h: 55 },
          { x: 145, h: 72 },
          { x: 180, h: 88 },
          { x: 215, h: 105 },
        ].map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={140 - b.h}
            width="22"
            height={b.h}
            rx="3"
            fill="url(#p2-bar)"
          />
        ))}
        {/* growth curve */}
        <path
          d="M 51 115 Q 86 100 121 85 T 191 52 T 256 20"
          stroke="url(#p2-line)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        {/* end arrow (triangle tip pointing up-right) */}
        <path
          d="M 268 10 L 247 18 L 257 27 Z"
          fill="#e04a4a"
          stroke="#e04a4a"
          strokeWidth="1"
          strokeLinejoin="round"
        />
        {/* Big number callout */}
        <rect x="200" y="50" width="110" height="55" rx="10" fill="#2e394f" />
        <text x="255" y="82" textAnchor="middle" fontSize="26" fontWeight="900" fill="#ffe700">
          32万
        </text>
        <text x="255" y="98" textAnchor="middle" fontSize="10" fontWeight="700" fill="white" letterSpacing="2">
          FOLLOWERS
        </text>
        {/* Label */}
        <text x="30" y="165" fontSize="11" fontWeight="700" fill="#666">
          1年半で達成
        </text>
      </svg>
    </div>
  );
}

function PointIllustration3() {
  // 3ヶ月で自社にプロのSNS人材を育成できる: 3ヶ月タイムライン + 成長/育成
  return (
    <div className="relative flex h-[200px] w-full items-center justify-center rounded-2xl bg-brand-cream md:h-[240px] lg:h-[260px]">
      <svg viewBox="0 0 320 180" className="h-full w-full p-4">
        <defs>
          <linearGradient id="p3-box" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe700" />
            <stop offset="1" stopColor="#fbb03b" />
          </linearGradient>
          <linearGradient id="p3-cap" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffe700" />
            <stop offset="1" stopColor="#fbb03b" />
          </linearGradient>
        </defs>

        {/* 3 month boxes */}
        {[
          { x: 10, num: "1", label: "基礎学習" },
          { x: 115, num: "2", label: "実践練習" },
          { x: 220, num: "3", label: "自走化" },
        ].map((m, i) => (
          <g key={i}>
            <rect
              x={m.x}
              y="20"
              width="90"
              height="78"
              rx="12"
              fill="white"
              stroke="url(#p3-box)"
              strokeWidth="2.5"
            />
            <text
              x={m.x + 45}
              y="56"
              textAnchor="middle"
              fontSize="30"
              fontWeight="900"
              fill="#fbb03b"
            >
              {m.num}
            </text>
            <text
              x={m.x + 45}
              y="72"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#2e394f"
            >
              ヶ月目
            </text>
            <text
              x={m.x + 45}
              y="89"
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#666"
            >
              {m.label}
            </text>
          </g>
        ))}

        {/* Arrows between boxes */}
        <path
          d="M 102 58 L 113 58 M 109 54 L 113 58 L 109 62"
          stroke="#fbb03b"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M 207 58 L 218 58 M 214 54 L 218 58 L 214 62"
          stroke="#fbb03b"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Graduation cap on 3rd box (success symbol) */}
        <g transform="translate(265 12)">
          <path
            d="M -12 4 L 0 -3 L 12 4 L 0 11 Z"
            fill="url(#p3-cap)"
            stroke="#7a5300"
            strokeWidth="0.8"
            strokeLinejoin="round"
          />
          <rect x="-8" y="4" width="16" height="5" fill="#2e394f" rx="1" />
          <line x1="12" y1="4" x2="14" y2="12" stroke="#2e394f" strokeWidth="1.5" />
          <circle cx="14" cy="12" r="1.5" fill="#e04a4a" />
        </g>

        {/* Bottom: completion text */}
        <text
          x="160"
          y="140"
          textAnchor="middle"
          fontSize="22"
          fontWeight="900"
          fill="#fbb03b"
        >
          3ヶ月でSNS人材を育成！
        </text>

        {/* Sparkle decorations */}
        <g transform="translate(290 135)">
          <path
            d="M 0 -8 L 2 -2 L 8 0 L 2 2 L 0 8 L -2 2 L -8 0 L -2 -2 Z"
            fill="#ffe700"
          />
        </g>
        <g transform="translate(15 30)">
          <path
            d="M 0 -5 L 1 -1 L 5 0 L 1 1 L 0 5 L -1 1 L -5 0 L -1 -1 Z"
            fill="#fbb03b"
          />
        </g>
      </svg>
    </div>
  );
}

/* ============================================================
 * WHY US
 * ============================================================ */

function WhyUsSection() {
  const reasons = [
    {
      num: "1",
      title: "現役インフルエンサーのネットワーク",
      icon: Users2,
      image: "/reason-network.avif",
      desc: "現役のグルメインフルエンサーが集まるコミュニティを基盤に、お店の魅力を発信できる人材を直接マッチングします。自社アカウントで32万フォロワーを獲得し、月間で100万リーチを実現してきました。",
    },
    {
      num: "2",
      title: "データに基づいた継続マネジメント",
      icon: LineChart,
      image: "/reason-management.jpg",
      desc: "運用者の育成から店舗運営のサポートまで、データに基づいた継続的なマネジメントで持続的な成長を支えます。高度な分析と投稿効果の可視化で、他社との差別化を図ります。",
    },
    {
      num: "3",
      title: "飲食店特化のトータルサポート",
      icon: BarChart3,
      desc: "キャスティング・ブランディング・コンサルティングの全サービスで、24時間以内に必ずご返信。運用代行から内製化まで段階的な移行を実現します。",
    },
  ];

  return (
    <section className="bg-brand-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <FadeIn>
          <h2 className="text-center text-[28px] font-bold leading-[1.4] text-brand-dark sm:text-[36px] md:text-[44px]">
            弊社が選ばれる理由は
            <br className="sm:hidden" />
            ここにあります。
          </h2>
        </FadeIn>

        <div className="mt-14 flex flex-col gap-6 md:mt-16 md:gap-8">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            const reverse = i % 2 === 1;
            return (
              <FadeIn key={r.num} delay={0}>
                <div
                  className={`flex flex-col items-center gap-6 rounded-2xl bg-white p-6 md:flex-row md:gap-8 md:p-10 ${
                    reverse ? "md:flex-row-reverse" : ""
                  }`}
                  style={{ boxShadow: "0 4px 20px rgba(46,57,79,0.08)" }}
                >
                  <div className="h-[180px] w-[220px] shrink-0 overflow-hidden rounded-2xl bg-brand-cream md:h-[220px] md:w-[280px]">
                    {r.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={r.image}
                        alt={r.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon
                          className="h-20 w-20 text-brand-gold md:h-24 md:w-24"
                          strokeWidth={1.4}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <div className="text-sm font-bold tracking-widest text-brand-gold">
                      REASON {r.num}
                    </div>
                    <h3 className="mt-2 text-xl font-bold leading-snug text-brand-dark md:text-2xl">
                      <span className="mr-2">{r.num}.</span>
                      {r.title}
                    </h3>
                    <p className="mt-4 text-sm leading-[1.9] text-[#444] md:text-base">
                      {r.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * INLINE CTA — on blue bg
 * ============================================================ */

function InlineCTABlue() {
  return (
    <section className="bg-brand-gold py-14 md:py-16">
      <div className="mx-auto max-w-[700px] px-6 text-center">
        <FadeIn>
          <div className="flex flex-col items-center gap-3">
            <div className="text-[13px] font-bold text-brand-dark/90">
              <span className="mr-1">＼</span>
              たった10秒で完了
              <span className="ml-1">／</span>
            </div>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-brand-dark px-14 py-5 text-lg font-bold text-white shadow-[0_8px_0_0_#0f1420] transition-[transform,box-shadow] duration-150 ease-out hover:translate-y-[3px] hover:shadow-[0_5px_0_0_#0f1420] active:translate-y-[6px] active:shadow-[0_2px_0_0_#0f1420] sm:px-16 sm:py-6 sm:text-xl"
            >
              <Mail className="h-6 w-6" strokeWidth={2.4} />
              まずは無料相談
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ============================================================
 * PRICING
 * ============================================================ */

const PRICING = [
  {
    id: "casting",
    num: "01",
    title: "キャスティング",
    price: "月5万円＋税",
    priceSub: "× 12ヶ月（1年契約） / 単発対応可",
    features: [
      "メニュー開発（バズるメニューの提案）",
      "グルメインフルエンサーの選定・キャスティング",
      "データ集計・レポート",
    ],
    point: "短期間で多くの集客や認知を獲得できる",
    featured: false,
  },
  {
    id: "branding",
    num: "02",
    title: "ブランディング",
    price: "月額制",
    priceSub: "6ヶ月契約（分割設定なし）",
    features: [
      "月8回の投稿運用",
      "台本・撮影・投稿を一貫",
      "コンセプト設計・戦略の考案",
      "データ集計・レポート",
    ],
    point: "中長期で安定した集客・認知を獲得できる",
    featured: true,
  },
  {
    id: "consulting",
    num: "03",
    title: "コンサルティング",
    price: "月4.5万円＋税",
    priceSub: "× 12ヶ月（1年契約） / 単発対応可",
    features: [
      "経営者とのコンサル面談",
      "人材の育成・強化",
      "企画・撮影・投稿の教育",
      "運用ノウハウの共有",
    ],
    point: "3ヶ月で社内にプロのSNS人材を育成できる",
    featured: false,
  },
];

function PricingSection() {
  return (
    <section id="pricing" className="bg-brand-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <FadeIn>
          <h2 className="text-center text-[28px] font-bold text-brand-dark sm:text-[36px] md:text-[44px]">
            料金プラン
          </h2>
          <p className="mt-3 text-center text-sm text-[#666] md:text-base">
            目的に合わせて選べる3プラン。単発のご相談もお気軽に。
          </p>
        </FadeIn>

        <div className="mt-14 grid grid-cols-1 gap-6 md:mt-16 md:grid-cols-3">
          {PRICING.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative flex h-full flex-col rounded-2xl p-7 md:p-8 ${
                  p.featured
                    ? "bg-brand-gold text-brand-dark"
                    : "bg-white text-brand-dark"
                }`}
                style={{
                  boxShadow: p.featured
                    ? "0 20px 50px -10px rgba(61,169,252,0.5)"
                    : "0 4px 20px rgba(46,57,79,0.08)",
                }}
              >
                {p.featured && (
                  <span
                    className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-brand-dark px-4 py-1 text-[11px] font-bold tracking-widest text-white"
                  >
                    ★ MOST POPULAR
                  </span>
                )}
                <div
                  className={`text-sm font-bold ${
                    p.featured ? "text-brand-dark/70" : "text-brand-gold"
                  }`}
                >
                  PLAN {p.num}
                </div>
                <h3
                  className={`mt-2 text-2xl font-bold ${
                    p.featured ? "text-brand-dark" : "text-brand-dark"
                  }`}
                >
                  {p.title}
                </h3>
                <div
                  className={`mt-6 border-t pt-5 ${
                    p.featured ? "border-brand-dark/20" : "border-[#e5eef7]"
                  }`}
                >
                  <div className="text-xs font-bold uppercase tracking-widest opacity-75">
                    Price
                  </div>
                  <div className="mt-1 text-2xl font-bold md:text-3xl">
                    {p.price}
                  </div>
                  <div className="mt-1 text-xs opacity-80 md:text-sm">
                    {p.priceSub}
                  </div>
                </div>

                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          p.featured ? "text-brand-dark" : "text-brand-gold"
                        }`}
                        strokeWidth={3}
                      />
                      <span className="leading-[1.7]">{f}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`mt-6 rounded-xl p-4 ${
                    p.featured
                      ? "bg-brand-dark/10"
                      : "bg-brand-cream"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4" strokeWidth={2.5} />
                    <span className="text-xs font-bold tracking-widest">
                      POINT
                    </span>
                  </div>
                  <p className="mt-1.5 text-sm font-bold leading-snug">
                    {p.point}
                  </p>
                </div>

                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition ${
                    p.featured
                      ? "bg-brand-dark text-white hover:bg-black"
                      : "bg-brand-yellow text-[#111] hover:bg-brand-gold"
                  }`}
                >
                  このプランで相談
                  <ArrowRight className="h-4 w-4" strokeWidth={2.6} />
                </motion.a>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * FLOW
 * ============================================================ */

function FlowSection() {
  const steps = [
    { icon: MessageCircle, title: "お問い合わせ", desc: "フォームよりご連絡ください。目的・課題を簡単にお聞かせください。" },
    { icon: Search, title: "ヒアリング・ご提案", desc: "戦略設計の無料ヒアリングを実施。最適なプランをご提案します。" },
    { icon: Clapperboard, title: "ご契約・運用開始", desc: "キャスティング・撮影・投稿・育成をスタート。24時間以内返信で伴走。" },
    { icon: LineChart, title: "レポート・改善", desc: "定期レポートでKPIを可視化。戦略を柔軟に調整し続けます。" },
  ];
  return (
    <section className="bg-brand-gold py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <FadeIn>
          <h2 className="text-center text-[28px] font-bold text-brand-dark sm:text-[36px] md:text-[44px]">
            ご利用開始までの流れ
          </h2>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.title} delay={i * 0.1}>
                <div
                  className="relative flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center md:p-7"
                  style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
                >
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center justify-center rounded-full bg-brand-dark px-3 py-1 text-[10px] font-bold tracking-widest text-white">
                    STEP {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-3 flex h-20 w-20 items-center justify-center rounded-full bg-brand-cream text-brand-gold">
                    <Icon className="h-10 w-10" strokeWidth={1.6} />
                  </div>
                  <h3 className="mt-4 text-base font-bold text-brand-dark md:text-lg">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-[1.8] text-[#555]">
                    {s.desc}
                  </p>
                </div>
              </FadeIn>
            );
          })}
        </div>

        <div className="mt-14 flex justify-center">
          <div
            className="rounded-2xl bg-white p-6 text-center md:p-8"
            style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
          >
            <div className="mb-3 text-[13px] font-medium text-[#666]">
              <span className="mr-1 text-brand-gold">＼</span>
              たった10秒で完了
              <span className="ml-1 text-brand-gold">／</span>
            </div>
            <PrimaryCTA className="px-14 py-4 text-[17px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * FAQ
 * ============================================================ */

const FAQS_LEFT = [
  {
    q: "サービスはどのように選べばよいですか？",
    a: "キャスティングは短期集客、ブランディングは中長期育成、コンサルティングは内製化を目的とした方にそれぞれ最適です。組み合わせも可能ですのでご相談ください。",
  },
  {
    q: "最低契約期間はありますか？",
    a: "キャスティングとコンサルティングは1年契約（月払い可）、ブランディングは6ヶ月契約です。単発のご相談も承っております。",
  },
  {
    q: "成果が出なかった場合はどうなりますか？",
    a: "目標未達の場合は追加施策やプラン見直しのご相談が可能です。定期レポートでKPIを可視化し、継続的に改善します。",
  },
];

const FAQS_RIGHT = [
  {
    q: "分割払いはできますか？",
    a: "クレジットカード・口座引き落としに対応しています。分割設定もご相談ください。",
  },
  {
    q: "サービスの併用はできますか？",
    a: "はい。キャスティング×ブランディングの組み合わせが特に人気です。目的や予算に合わせてご提案します。",
  },
  {
    q: "支払い方法は？",
    a: "クレジットカード・口座引き落とし対応。併用も可能です。",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-xl bg-white p-5 transition md:p-6"
      style={{ boxShadow: "0 4px 20px rgba(46,57,79,0.06)" }}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-3 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-gold text-xs font-bold text-white">
            Q
          </span>
          <span className="pt-0.5 text-sm font-bold text-brand-dark md:text-base">
            {q}
          </span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="mt-1 shrink-0 text-brand-gold"
        >
          <ChevronDown className="h-5 w-5" strokeWidth={2.5} />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className="mt-4 flex items-start gap-3 border-t border-[#e5eef7] pt-4 text-sm leading-[1.9] text-[#444]">
              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-gold text-xs font-bold text-brand-gold">
                A
              </span>
              <p className="pt-0.5">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="bg-brand-cream py-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <FadeIn>
          <div className="text-center">
            <div className="text-sm font-bold tracking-[0.3em] text-[#888]">
              FAQ
            </div>
            <h2 className="mt-2 text-[28px] font-bold text-brand-dark sm:text-[36px] md:text-[44px]">
              よくあるご質問
            </h2>
          </div>
        </FadeIn>

        <div className="mt-12 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6">
          <div className="flex flex-col gap-4">
            {FAQS_LEFT.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {FAQS_RIGHT.map((f) => (
              <FAQItem key={f.q} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
 * CONTACT
 * ============================================================ */

function ContactSection() {
  return (
    <section id="contact" className="bg-brand-dark py-20 md:py-24">
      <div className="mx-auto max-w-[820px] px-6 md:px-8">
        <FadeIn>
          <div className="text-center">
            <h2 className="text-[26px] font-bold leading-[1.4] text-white sm:text-[34px] md:text-[40px]">
              本気で集客を変えたい方は、
              <br className="sm:hidden" />
              今すぐご相談を。
            </h2>
            <div className="mt-6 flex flex-col items-center gap-3">
              <div className="text-[13px] font-medium text-white/70">
                <span className="mr-1 text-brand-gold">＼</span>
                たった10秒で完了
                <span className="ml-1 text-brand-gold">／</span>
              </div>
              <PrimaryCTA className="px-14 py-4 text-[17px]" href="#form" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <form
            id="form"
            data-relay-form
            className="mt-12 rounded-2xl bg-white p-6 md:p-10"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.25)" }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="お名前" required>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="山田 太郎"
                  className="w-full rounded-lg border border-[#d5dde8] bg-white px-4 py-3 text-sm text-[#333] placeholder:text-[#aaa] focus:border-brand-gold focus:outline-none"
                data-relay-role="name" />
              </Field>
              <Field label="店舗名 / 会社名" required>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="〇〇レストラン"
                  className="w-full rounded-lg border border-[#d5dde8] bg-white px-4 py-3 text-sm text-[#333] placeholder:text-[#aaa] focus:border-brand-gold focus:outline-none"
                />
              </Field>
              <Field label="メールアドレス" required>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@example.com"
                  className="w-full rounded-lg border border-[#d5dde8] bg-white px-4 py-3 text-sm text-[#333] placeholder:text-[#aaa] focus:border-brand-gold focus:outline-none"
                data-relay-role="email" />
              </Field>
              <Field label="電話番号" required>
                <input
                  type="tel"
                  name="tel"
                  required
                  placeholder="090-0000-0000"
                  className="w-full rounded-lg border border-[#d5dde8] bg-white px-4 py-3 text-sm text-[#333] placeholder:text-[#aaa] focus:border-brand-gold focus:outline-none"
                />
              </Field>
              <Field label="ご希望プラン" required>
                <select
                  name="plan"
                  required
                  defaultValue=""
                  className="w-full rounded-lg border border-[#d5dde8] bg-white px-4 py-3 text-sm text-[#333] focus:border-brand-gold focus:outline-none sm:col-span-2"
                >
                  <option value="" disabled>
                    選択してください
                  </option>
                  <option>キャスティング</option>
                  <option>ブランディング</option>
                  <option>コンサルティング</option>
                  <option>まだ決めていない / 相談したい</option>
                </select>
              </Field>
            </div>
            <Field label="ご要望・ご質問">
              <textarea
                name="message"
                rows={5}
                placeholder="現在のお店の課題や、ご希望の内容をお書きください"
                className="w-full rounded-lg border border-[#d5dde8] bg-white px-4 py-3 text-sm text-[#333] placeholder:text-[#aaa] focus:border-brand-gold focus:outline-none"
              data-relay-role="message" />
            </Field>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full rounded-full bg-brand-yellow py-5 text-base font-bold text-[#111] shadow-[0_8px_0_0_#c9941f] transition-[transform,box-shadow] duration-150 ease-out hover:translate-y-[3px] hover:shadow-[0_5px_0_0_#c9941f] active:translate-y-[6px] active:shadow-[0_2px_0_0_#c9941f] md:text-[17px]"
              >
                送信する
              </button>
            </div>
          </form>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="mt-10 grid gap-3 rounded-2xl bg-white/5 p-6 text-white/90 sm:grid-cols-3 md:p-8">
            <InfoItem
              icon={<Building2 className="h-4 w-4" />}
              label="COMPANY"
              value="株式会社バズエンス"
            />
            <InfoItem
              icon={<Phone className="h-4 w-4" />}
              label="TEL"
              value="080-1392-8182"
            />
            <InfoItem
              icon={<Mail className="h-4 w-4" />}
              label="EMAIL"
              value="motokiksm0098@gmail.com"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="mt-5 block first:mt-0 sm:mt-5 sm:[&:nth-child(-n+2)]:mt-0">
      <span className="mb-2 inline-flex items-center gap-2 text-xs font-bold text-[#444]">
        {label}
        {required && (
          <span className="rounded bg-brand-gold px-1.5 py-0.5 text-[9px] text-white">
            必須
          </span>
        )}
      </span>
      {children}
    </label>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-gold text-white">
        {icon}
      </span>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-wider text-white/60">
          {label}
        </div>
        <div className="mt-0.5 text-sm font-bold text-white">{value}</div>
      </div>
    </div>
  );
}

/* ============================================================
 * FOOTER
 * ============================================================ */

function Footer() {
  return (
    <footer className="bg-brand-dark py-14 text-white">
      <div className="mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <a href="#top" className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gold text-lg font-bold">
                #
              </span>
              <span className="text-lg font-bold tracking-tight">
                キャクモクルー
              </span>
            </a>
            <p className="mt-4 text-sm leading-[1.8] text-white/60">
              飲食店特化のSNSマーケティング。
              キャスティング・ブランディング・コンサルティングで、
              お店の集客と認知を最大化します。
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60">
              MENU
            </h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li><a href="#pricing" className="hover:text-brand-gold">サービス</a></li>
              <li><a href="#pricing" className="hover:text-brand-gold">料金</a></li>
              <li><a href="#faq" className="hover:text-brand-gold">FAQ</a></li>
              <li><a href="#contact" className="hover:text-brand-gold">お問い合わせ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/60">
              COMPANY
            </h4>
            <div className="mt-4 space-y-1.5 text-sm leading-[1.8] text-white/80">
              <div>株式会社バズエンス</div>
              <div>TEL: 080-1392-8182</div>
              <div>〒150-0043 東京都渋谷区道玄坂1-10-8</div>
              <div>渋谷道玄坂東急ビル2F-C</div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-center text-xs text-white/50">
          © 2026 株式会社バズエンス All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
 * ROOT PAGE
 * ============================================================ */

export default function HomePage() {
  return (
    <main className="min-h-screen bg-body text-[#333]">
      <Header />
      <HeroSection />
      <GrowthSecretSection />
      <ProblemsSection />
      <WhyUsSection />
      <InlineCTABlue />
      <PricingSection />
      <FlowSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
