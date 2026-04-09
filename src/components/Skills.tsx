const Skills = () => {
  const skillCategories = [
    {
      category: "Languages",
      skills: ["JavaScript", "TypeScript", "Golang"],
    },
    {
      category: "Frameworks & Libraries",
      skills: [
        "React",
        "NextJS",
        "Node.js",
        "NestJS",
        "React Native",
        "Socket.IO",
        "Tailwind CSS",
        "Gin",
        "NextJS",
      ],
    },
    {
      category: "Tools & Infrastructure",
      skills: [
        "Git",
        "Redis",
        "PostgreSQL",
        "Docker",
        "MongoDB",
        "kubernetes",
        "CI/CD",
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen flex items-center justify-center px-6 py-20 bg-gradient-to-br from-black via-black to-black/95 text-stone-50 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-white/2 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg font-light text-stone-50/60 max-w-2xl mx-auto">
            A comprehensive set of technologies and tools I've mastered to
            deliver exceptional solutions
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group p-8 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/3 transition-all backdrop-blur-sm hover-lift">
              <h3 className="text-2xl font-light mb-8 text-stone-50 group-hover:text-white transition-colors">
                {category.category}
              </h3>
              <div className="space-y-0">
                {category.skills.map((skill, i) => (
                  <div
                    key={i}
                    className="text-stone-50/80 font-light py-3 px-3 border-b border-white/5 hover:border-white/15 hover:bg-white/5 transition-all rounded-sm group/skill cursor-default">
                    <span className="inline-block group-hover/skill:translate-x-1 transition-transform">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-20 border-t border-white/10 text-center">
          <p className="text-stone-50/60 font-light text-lg">
            Constantly evolving — always exploring emerging technologies and
            industry best practices
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;
