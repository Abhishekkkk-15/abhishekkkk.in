import React from "react";
export default function Footer() {
  return (
    <footer className="py-16 px-6 bg-neutral-950 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-lg font-light text-emerald-400 mb-3">
              ABHISHEK<span className="text-neutral-100">.</span>
            </h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Full-stack developer building scalable, real-time systems and
              clean UIs. Based in Jodhpur, Rajasthan.
            </p>
            <p className="text-neutral-400 text-xs mt-3">abhishek.in</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400 mb-4">
              Quick Links
            </p>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>
                <a
                  href="#about"
                  className="hover:text-emerald-400 transition-colors">
                  About
                </a>
              </li>
              <li>
                <a
                  href="#work"
                  className="hover:text-emerald-400 transition-colors">
                  Work
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-emerald-400 transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-emerald-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.15em] text-neutral-400 mb-4">
              Social
            </p>
            <ul className="space-y-2 text-sm text-neutral-500">
              <li>
                <a
                  href="https://github.com/Abhishekkkk-15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/abhishek-jangid-3532b1323/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="mailto:abhishekjangid3489@gmail.com"
                  className="hover:text-emerald-400 transition-colors">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-500/10 pt-8 text-center">
          <p className="text-neutral-500 text-sm font-light">
            Designed & built with care
          </p>
          <p className="text-neutral-600 text-xs mt-3">
            © {new Date().getFullYear()} abhishekkkk.in — All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
