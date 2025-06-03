import { Outfit, Ovo } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"], weight: ['500','600','700','800']
});

const ovo = Ovo({
  subsets: ["latin"], weight: ['400']
});

export const metadata = {
  title: "AK Tanha",
  description: "Portfolio website of AK Tanha",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
