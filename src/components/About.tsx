import { Code2, Coffee, Lightbulb } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-b from-stone-50 via-stone-50 to-black/1">
      <div className="max-w-5xl mx-auto w-full">
        <div className="mb-16">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            About Me
          </h2>
          <div className="h-1 w-12 bg-black/20" />
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start mb-16">
          <div className="space-y-8">
            <p className="text-lg font-light text-black/70 leading-relaxed">
              I'm Abhishek Jangid, a passionate software developer building impactful solutions. My approach combines technical
              expertise with creative problem-solving to deliver exceptional results.
            </p>
            <p className="text-lg font-light text-black/70 leading-relaxed">
              I'm currently working on open-source projects like Forge and DevCon.
              I have experience with TypeScript, JavaScript, and I'm currently expanding my skill set by learning Golang.
            </p>
            <p className="text-lg font-light text-black/70 leading-relaxed">
              All of my previous projects are available at abhishekkkk.in. When I'm not coding, you'll find me exploring emerging technologies and
              contributing to open source projects.
            </p>
          </div>

          <div className="space-y-4">
            <div className="group border border-black/10 p-8 rounded-xl hover:border-black/25 hover:bg-black/2 transition-all hover-lift overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-black/1 rounded-full blur-2xl group-hover:bg-black/2 transition-all" />
              <Code2 className="mb-4 relative z-10 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-3 relative z-10">Clean Code</h3>
              <p className="text-black/60 font-light text-sm relative z-10">
                Writing maintainable, efficient code that stands the test of time
              </p>
            </div>

            <div className="group border border-black/10 p-8 rounded-xl hover:border-black/25 hover:bg-black/2 transition-all hover-lift overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-black/1 rounded-full blur-2xl group-hover:bg-black/2 transition-all" />
              <Lightbulb className="mb-4 relative z-10 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-3 relative z-10">Problem Solver</h3>
              <p className="text-black/60 font-light text-sm relative z-10">
                Turning complex challenges into elegant, user-friendly solutions
              </p>
            </div>

            <div className="group border border-black/10 p-8 rounded-xl hover:border-black/25 hover:bg-black/2 transition-all hover-lift overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-black/1 rounded-full blur-2xl group-hover:bg-black/2 transition-all" />
              <Coffee className="mb-4 relative z-10 group-hover:scale-110 transition-transform" size={28} />
              <h3 className="text-lg font-light mb-3 relative z-10">Continuous Learner</h3>
              <p className="text-black/60 font-light text-sm relative z-10">
                Always exploring new technologies and best practices
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
