import type { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Abhishek Jangid — Applied AI & Systems Engineer",
  description:
    "Applied AI Engineer & Systems Developer building autonomous AI systems, developer tooling, and scalable backend infrastructure.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&display=swap"
          rel="stylesheet"
        />
        {/* Anti-flicker theme script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark")}}catch(e){}`,
          }}
        />
      </head>
      <body className="bg-[#f9f9f9] dark:bg-[#0d0d0e] text-[#1a1c1c] dark:text-[#f0f0f2] font-sans min-h-screen selection:bg-[#1a1c1c] selection:text-[#f9f9f9] dark:selection:bg-[#f0f0f2] dark:selection:text-[#0d0d0e]">
        {children}
      </body>
    </html>
  );
}
