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
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#F4F3EF] text-[#111111] font-sans min-h-screen selection:bg-[#111111] selection:text-[#F4F3EF]">
        {children}
      </body>
    </html>
  );
}
