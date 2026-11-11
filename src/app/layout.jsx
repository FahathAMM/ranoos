import { Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });

const mono = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata = {
  title: "Muhammad Ranoos — Accountant | Financial Reporting | IFRS",
  description:
    "Accounting and finance professional with 3.5+ years of external audit and financial reporting experience, including Big Four at EY Sri Lanka. CA Finalist. Available immediately.",
  openGraph: {
    title: "Muhammad Ranoos — Accountant & Financial Reporting",
    description:
      "3.5+ years in audit and IFRS financial reporting, including EY Sri Lanka. CA Finalist.",
    type: "profile",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Tells the browser the site has its own light AND dark themes */}
        <meta name="color-scheme" content="light dark" />
        {/* Set the theme before paint to avoid a flash of the wrong colours */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className="grain min-h-screen font-sans">{children}</body>
    </html>
  );
}
