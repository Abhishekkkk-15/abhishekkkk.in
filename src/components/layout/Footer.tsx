import { profile } from "../../data/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-white py-10">
      <div className="section-container flex flex-col items-center justify-between gap-3 text-center text-sm text-black/40 md:flex-row md:text-left">
        <p>
          © {year} {profile.name}. Crafted with precision and care.
        </p>
        <p className="font-hand text-lg text-black/50">
          Built with React · TypeScript · Tailwind · Framer Motion
        </p>
      </div>
    </footer>
  );
}
