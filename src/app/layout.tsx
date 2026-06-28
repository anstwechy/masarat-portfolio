import type { Metadata } from "next";
import { Inter, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers";
import { profile } from "@/data/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dmsans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.title}, ${profile.org}`,
  description: profile.intro,
  keywords: [
    "Anas Almesbahi",
    "Masarat",
    "fintech",
    "Libya",
    "software architect",
    ".NET",
    "head of development",
    "digital wallet",
    "AML",
    "payments",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    title: `${profile.name} — ${profile.title}, ${profile.org}`,
    description: profile.tagline,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // suppressHydrationWarning: browser extensions (e.g. writing/AI tools)
      // inject attributes onto <html>/<body> before React hydrates, which trips
      // a hydration-mismatch warning. This silences only that attribute diff;
      // it does NOT hide real content mismatches. Standard Next.js pattern.
      suppressHydrationWarning
      className={`${inter.variable} ${dmSans.variable} ${jetbrains.variable} dark`}
    >
      <body className="font-sans antialiased" suppressHydrationWarning>
        <div className="bg-ambient" aria-hidden />
        <div className="bg-grid" aria-hidden />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
