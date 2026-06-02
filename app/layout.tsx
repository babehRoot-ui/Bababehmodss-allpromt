import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Prompt Library - Babehmodss",
  description:
    "Koleksi prompt AI terbaik untuk berbagai platform. Simpan, kelola, dan gunakan kembali prompt favoritmu.",
  keywords: [
    "prompt",
    "AI",
    "ChatGPT",
    "Claude",
    "Gemini",
    "DeepSeek",
    "Grok",
    "prompt library",
    "Babehmodss",
  ],
  authors: [{ name: "Babehmodss" }],
  openGraph: {
    title: "Prompt Library - Babehmodss",
    description:
      "Koleksi prompt AI terbaik untuk berbagai platform. Simpan, kelola, dan gunakan kembali prompt favoritmu.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans noise-bg`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
