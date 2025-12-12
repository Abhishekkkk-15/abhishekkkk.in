import React from "react";
import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const { error } = await supabase
      .from("contact_submissions")
      .insert([formData]);

    if (error) {
      setStatus("error");
    } else {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 bg-neutral-950">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extralight text-neutral-100 mb-20 tracking-tight">
          Let's
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Connect
          </span>
          <span className="text-emerald-400">.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-20">
          <div className="space-y-10">
            <p className="text-lg text-neutral-300 leading-relaxed font-light">
              Have an exciting project or idea? I'd love to hear about it.
              Whether you need a full-stack solution, consultation, or just want
              to discuss web development, let's connect.
            </p>

            <div className="space-y-5">
              <a
                href="mailto:abhishekjangid3489@gmail.com"
                className="group flex items-center gap-4 p-4 border border-emerald-500/20 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300">
                <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Mail size={20} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Email me at</p>
                  <p className="text-neutral-100 font-light">
                    abhishekjangid3489@gmail.com
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/Abhishekkkk-15"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 border border-emerald-500/20 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300">
                <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Github size={20} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">Check my code</p>
                  <p className="text-neutral-100 font-light">
                    github.com/Abhishekkkk-15
                  </p>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/abhishek-jangid-3532b1323/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 border border-emerald-500/20 rounded-lg hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all duration-300">
                <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                  <Linkedin size={20} className="text-emerald-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-neutral-500">
                    Connect on LinkedIn
                  </p>
                  <p className="text-neutral-100 font-light">
                    linkedin.com/in/abhishek-jangid-3532b1323
                  </p>
                </div>
              </a>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 text-neutral-100 placeholder-neutral-600 rounded-lg focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                Your Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-3 bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 text-neutral-100 placeholder-neutral-600 rounded-lg focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.15em] text-neutral-400">
                Your Message
              </label>
              <textarea
                placeholder="Tell me about your project or idea..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={4}
                className="w-full px-4 py-3 bg-neutral-800/30 backdrop-blur-sm border border-neutral-700/50 text-neutral-100 placeholder-neutral-600 rounded-lg focus:border-emerald-400/50 focus:outline-none focus:ring-1 focus:ring-emerald-400/20 transition-all resize-none"
              />
            </div>

            {status === "success" && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center gap-3">
                <CheckCircle size={18} className="text-emerald-400" />
                <span className="text-emerald-300 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </span>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3">
                <AlertCircle size={18} className="text-red-400" />
                <span className="text-red-300 text-sm">
                  Failed to send message. Please try again.
                </span>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-cyan-500 text-neutral-950 rounded-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              <span>
                {status === "loading" ? "Sending..." : "Send Message"}
              </span>
              {status !== "loading" && <Send size={18} />}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
