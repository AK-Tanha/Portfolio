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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              const stored = typeof window !== 'undefined' ? window.localStorage.getItem('theme') : null;
              const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
              const theme = stored || (prefersDark ? 'dark' : 'light');
              if (theme === 'dark') document.documentElement.classList.add('dark');
            })();`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
