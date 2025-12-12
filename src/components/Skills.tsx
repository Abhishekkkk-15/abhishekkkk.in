import React from "react";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase, type Skill } from "../lib/supabase";

export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkills();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSkills = async () => {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      setSkills(data);
      setLoading(false);
      return;
    }

    // fallback skills derived from resume
    const fallback: Skill[] = [
      // frontend
      {
        id: "s-react",
        name: "React.js",
        proficiency: 5,
        category: "Frontend",
      } as any,
      {
        id: "s-next",
        name: "Next.js",
        proficiency: 4,
        category: "Frontend",
      } as any,
      {
        id: "s-tailwind",
        name: "TailwindCSS",
        proficiency: 4,
        category: "Frontend",
      } as any,
      // backend
      {
        id: "s-node",
        name: "Node.js",
        proficiency: 5,
        category: "Backend",
      } as any,
      {
        id: "s-express",
        name: "Express.js",
        proficiency: 5,
        category: "Backend",
      } as any,
      {
        id: "s-nest",
        name: "Nest.js",
        proficiency: 4,
        category: "Backend",
      } as any,
      {
        id: "s-graphql",
        name: "GraphQL",
        proficiency: 4,
        category: "Backend",
      } as any,
      // databases
      {
        id: "s-postgres",
        name: "PostgreSQL",
        proficiency: 4,
        category: "Database",
      } as any,
      {
        id: "s-mongo",
        name: "MongoDB",
        proficiency: 4,
        category: "Database",
      } as any,
      {
        id: "s-redis",
        name: "Redis",
        proficiency: 4,
        category: "Database",
      } as any,
      // devops/tools
      {
        id: "s-docker",
        name: "Docker",
        proficiency: 3,
        category: "DevOps",
      } as any,
      {
        id: "s-k8s",
        name: "Kubernetes",
        proficiency: 2,
        category: "DevOps",
      } as any,
      {
        id: "s-github-actions",
        name: "GitHub Actions",
        proficiency: 3,
        category: "DevOps",
      } as any,
      // languages
      {
        id: "s-js",
        name: "JavaScript / TypeScript",
        proficiency: 5,
        category: "Languages",
      } as any,
      {
        id: "s-python",
        name: "Python",
        proficiency: 3,
        category: "Languages",
      } as any,
    ];

    setSkills(fallback);
    setLoading(false);
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  if (loading) {
    return (
      <section id="skills" className="py-32 px-6 bg-neutral-950">
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin text-emerald-400" size={32} />
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      className="py-32 px-6 bg-gradient-to-b from-neutral-950 to-neutral-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-extralight text-neutral-100 mb-20 tracking-tight">
          Technical
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Expertise
          </span>
          <span className="text-emerald-400">.</span>
        </h2>

        <div className="space-y-20">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => (
            <div key={category}>
              <h3 className="text-xs uppercase tracking-[0.2em] text-emerald-400/80 mb-8 font-medium">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {categorySkills.map((skill, idx) => (
                  <div
                    key={skill.id}
                    className="group relative p-6 bg-neutral-800/30 backdrop-blur-sm border border-emerald-500/10 rounded-xl hover:border-emerald-500/30 hover:bg-neutral-800/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/10">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative text-center">
                      <p className="text-neutral-100 font-light mb-4 text-sm">
                        {skill.name}
                      </p>
                      <div className="flex gap-1.5 justify-center">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              i < skill.proficiency
                                ? "bg-emerald-400 shadow-lg shadow-emerald-400/50"
                                : "bg-neutral-600/40"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
