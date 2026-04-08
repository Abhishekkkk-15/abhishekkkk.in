import { Github, Linkedin, Mail, ChevronDown, ArrowRight } from 'lucide-react';

const Hero = () => {
  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-6 pt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-black/2 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-black/2 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 fade-in-up stagger-1">
          <img src="https://avatars.githubusercontent.com/u/164181412?s=400&u=9a50ae006ddac2f963b40b78317de5fec35b4366&v=4" className="w-24 h-24 mx-auto  rounded-2xl flex items-center justify-center text-stone-50 text-2xl font-light shadow-lg hover:scale-105 transition-transform duration-300"/>
            
        </div>

        <h1 className="text-6xl md:text-8xl font-extralight tracking-tighter mb-6 fade-in-up stagger-2 leading-tight">
          Building<br />
          <span className="gradient-text">Softwares</span>
        </h1>

        <p className="text-lg md:text-xl font-light text-black/60 mb-12 max-w-2xl mx-auto leading-relaxed fade-in-up stagger-3">
          Hi, I'm Abhishek Jangid. Currently working on Forge and DevCon, and exploring the world of Golang. All of my projects are available at abhishekkkk.in.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-in-up stagger-4">
          <button
            onClick={scrollToProjects}
            className="px-8 py-3 bg-black text-stone-50 font-light rounded-lg hover:bg-black/90 transition-all hover-lift inline-flex items-center gap-2"
          >
            View My Work
            <ArrowRight size={18} />
          </button>
          <button
            onClick={scrollToAbout}
            className="px-8 py-3 border border-black/30 font-light rounded-lg hover:border-black hover:bg-black/2 transition-all"
          >
            Learn About Me
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 mb-16 fade-in-up stagger-4">
          <a
            href="https://github.com/abhishekkkk-15"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-black/20 rounded-full hover:bg-black hover:text-stone-50 hover:border-black transition-all hover-lift group"
          >
            <Github size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 border border-black/20 rounded-full hover:bg-black hover:text-stone-50 hover:border-black transition-all hover-lift group"
          >
            <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
          </a>
          <a
            href="mailto:abhishekjangid3489@gmail.com"
            className="p-3 border border-black/20 rounded-full hover:bg-black hover:text-stone-50 hover:border-black transition-all hover-lift group"
          >
            <Mail size={20} className="group-hover:scale-110 transition-transform" />
          </a>
        </div>

        <button
          onClick={scrollToAbout}
          className="animate-bounce text-black/40 hover:text-black transition-colors mx-auto block"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;
