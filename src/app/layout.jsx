import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import VisitorTracker from "@/components/VisitorTracker";
import VisitorCounter from "@/components/VisitorCounter";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import WhatsAppButton from "@/components/WhatsAppButton";
import ErrorBoundary from "@/components/ui/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.com",
  ),
  title: {
    default: "Muhammad Noman | Full Stack Developer",
    template: "%s | Muhammad Noman",
  },
  description:
    "Full Stack Developer specializing in React, Next.js, Node.js, and modern UI/UX.",
  keywords: [
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "UI UX",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Noman" }],
  creator: "Muhammad Noman",
  openGraph: {
    title: "Muhammad Noman | Portfolio",
    description: "Full Stack Developer Portfolio",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://your-portfolio.com",
    siteName: "Muhammad Noman Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Portfolio Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Noman | Portfolio",
    description: "Full Stack Developer Portfolio",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111827",
};

export default function RootLayout({ children }) {
  return (
    // ✅ FIX 1: suppressHydrationWarning on <html> — browser extensions like "Liner"
    // inject attributes (data-be-installed, style, data-liner-extension-version)
    // into <html> and <body> after SSR. This tells React to ignore those
    // mismatches instead of throwing a hydration error. Safe to use here
    // because the mismatch is caused externally, not by your code.
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>

      {/* ✅ FIX 2: suppressHydrationWarning on <body> for the same reason —
          Liner extension injects data-liner-extension-version="7.18.4" here */}
      <body
        className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white antialiased"
        suppressHydrationWarning>
        {/* Accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Skip to content
        </a>

        {/* Error Boundary */}
        <ErrorBoundary>
          {/* Main Content */}
          <main id="main-content">{children}</main>

          {/* WhatsApp Floating Button */}
          <WhatsAppButton />

          {/* Tracking & Analytics */}
          <VisitorTracker />
          <VisitorCounter />
          <Analytics />
          <SpeedInsights />
        </ErrorBoundary>
      </body>
    </html>
  );
}
