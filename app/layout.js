import { Outfit, Ovo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const outfit = Outfit({
  subsets: ["latin"], weight: ['500','600','700','800']
});

const ovo = Ovo({
  subsets: ["latin"], weight: ['400']
});

export const metadata = {
  title: "AK Tanha | MERN Stack Developer",
  description: "Portfolio of AK Tanha — MERN Stack Developer from Bangladesh building responsive, full-stack web apps with clean UI and scalable backend.",
  keywords: "MERN Stack, React, Next.js, Developer, Bangladesh, Portfolio, Web Development",
  openGraph: {
    title: "AK Tanha | MERN Stack Developer",
    description: "MERN Stack Developer building responsive, full-stack web apps with clean UI and scalable backend.",
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
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
