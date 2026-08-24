import type { Metadata } from "next";
import { Lora, Inter, Fraunces } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Navbar } from "../components/NavBar";
import { Footer } from "../components/Footer";

const displayFont = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const logoFont = Fraunces({
  variable: "--font-logo",
  subsets: ["latin"],
  weight: ["600"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "EduFund | Find Bursaries & NSFAS Funding",
  description:
    "Search and filter corporate bursaries, NSFAS, and government funding by province, field of study, and income bracket.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${logoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-nude-100 text-ink-800">
        <Providers>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}