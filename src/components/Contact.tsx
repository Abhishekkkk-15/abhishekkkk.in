import { Mail, Github, Linkedin, Twitter, ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center px-6 py-20 bg-stone-50 relative">
      <div className="max-w-4xl mx-auto w-full text-center">
        <div className="mb-12">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Let's Build Something
            <br />
            <span className="gradient-text">Great Together</span>
          </h2>
          <p className="text-lg font-light text-black/60 max-w-2xl mx-auto leading-relaxed">
            I'm always excited to discuss new projects, innovative ideas, and opportunities
            to collaborate on meaningful digital solutions.
          </p>
        </div>

        <div className="my-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />

        <div className="grid md:grid-cols-2 gap-4 mb-16">
          <a
            href="mailto:abhishekjangid3489@gmail.com"
            className="group border border-black/10 p-8 rounded-xl hover:border-black hover:bg-black hover:text-stone-50 transition-all hover-lift relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/0 transition-all" />
            <div className="relative z-10">
              <Mail className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-2">Email</h3>
              <p className="text-sm font-light opacity-70 group-hover:opacity-100 transition-opacity">
                abhishekjangid3489@gmail.com
              </p>
            </div>
          </a>

          <a
            href="https://abhishekkkk.in"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-black/10 p-8 rounded-xl hover:border-black hover:bg-black hover:text-stone-50 transition-all hover-lift relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/0 transition-all" />
            <div className="relative z-10">
              <Linkedin className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-2">Portfolio</h3>
              <p className="text-sm font-light opacity-70 group-hover:opacity-100 transition-opacity">
                abhishekkkk.in
              </p>
            </div>
          </a>

          <a
            href="https://github.com/abhishekkkk-15"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-black/10 p-8 rounded-xl hover:border-black hover:bg-black hover:text-stone-50 transition-all hover-lift relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/0 transition-all" />
            <div className="relative z-10">
              <Github className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-2">GitHub</h3>
              <p className="text-sm font-light opacity-70 group-hover:opacity-100 transition-opacity">
                View my projects
              </p>
            </div>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group border border-black/10 p-8 rounded-xl hover:border-black hover:bg-black hover:text-stone-50 transition-all hover-lift relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/0 to-black/0 group-hover:from-black/5 group-hover:to-black/0 transition-all" />
            <div className="relative z-10">
              <Twitter className="mx-auto mb-4 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-2">Twitter</h3>
              <p className="text-sm font-light opacity-70 group-hover:opacity-100 transition-opacity">
                Follow me
              </p>
            </div>
          </a>
        </div>

        <div className="my-16 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent" />

        <div className="mb-16">
          <p className="text-lg font-light text-black/60 mb-6">
            Ready to start your next project?
          </p>
          <a
            href="mailto:abhishekjangid3489@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-black text-stone-50 font-light rounded-lg hover:bg-black/90 transition-all hover-lift"
          >
            Get In Touch
            <ArrowRight size={18} />
          </a>
        </div>

        <footer className="pt-12 border-t border-black/10">
          <p className="text-sm font-light text-black/40">
            © 2024 Abhishek Jangid. Crafted with precision and care.
          </p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
