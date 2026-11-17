import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import SiteChrome from "./components/SiteChrome";

const outfit = Outfit({
  subsets: ["latin"], weight: ['500','600','700','800']
});

const ovo = Ovo({
  subsets: ["latin"], weight: ['400']
});

export const metadata = {
  title: "AK Tanha | Full Stack Developer",
  description: "Portfolio of AK Tanha — A Full Stack Developer from Bangladesh building responsive, full-stack web apps with clean UI and scalable backend.",
  keywords: "MERN Stack, React, Next.js, Developer, Bangladesh, Portfolio, Web Development",
  openGraph: {
    title: "AK Tanha | Full Stack Developer",
    description: "Full Stack Developer building responsive, full-stack web apps with clean UI and scalable backend.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.className} ${ovo.className} antialiased leading-8 overflow-x-hidden`}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `(function() {
              try {
                const stored = localStorage.getItem('theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                const theme = stored || (prefersDark ? 'dark' : 'light');
                if (theme === 'dark') document.documentElement.classList.add('dark');
              } catch(e) {}
            })();`,
          }}
        />
        <ThemeProvider>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
      </body>
    </html>
  );
}
