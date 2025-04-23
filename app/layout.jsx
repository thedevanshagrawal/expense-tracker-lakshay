import "./globals.css";
import { Inter } from "next/font/google";
import SessionWrapper from "@/components/SessionWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SpendWise - Track and manage your expenses efficiently with SpendWise",
  description: "Track and manage your expenses efficiently with SpendWise.",
  keywords:
    "Expense Tracker, SpendWise, Budget App, Money Management, Finance App",
  author: "Devansh Agrawal",
  creator: "Devansh Agrawal",
  themeColor: "#ffffff",
  og: {
    title: "SpendWise - Smart Expense Tracker",
    description:
      "Manage your money smarter with SpendWise, your go-to budgeting app.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="creator" content={metadata.creator} />
        <meta name="theme-color" content={metadata.themeColor} />

        <title>{metadata.title}</title>
      </head>
      <body
        className={`${inter.className} bg-white text-gray-900 antialiased dark:bg-gray-900 dark:text-white`}
      >
        <SessionWrapper>
          <main className="min-h-screen">{children}</main>
        </SessionWrapper>
      </body>
    </html>
  );
}
