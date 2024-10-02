import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { InformationDialog } from "./components/utils/InformationDialog";
import StarsCanvas from "./components/utils/Star";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Typing Master 🚀",
  description: "Website untuk belajar mengetik cepat!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar /> */}
          {children}
          <div className="fixed bottom-3 right-3 ">
            {/* <ModeToggle /> */}
            <InformationDialog />
          </div>
          <div id="starsCanvasContainer">
            <StarsCanvas />
          </div>
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}
