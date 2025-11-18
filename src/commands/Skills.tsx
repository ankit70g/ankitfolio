import { useState, useEffect } from "react";
import { FaReact, FaFlask, FaNodeJs, FaDatabase, FaGithub, FaPython, FaHtml5, FaCss3, FaAws } from "react-icons/fa";
import {
  SiTypescript, SiTailwindcss, SiPostgresql, SiMongodb, SiGit, SiDocker, SiExpress,
  SiPostman, SiNextdotjs, SiDjango, SiLangchain, SiFastapi,
  SiJavascript, SiVercel,
  SiOpenai,
  SiVectorworks,
  SiDatabricks,
  SiTensorflow,
} from "react-icons/si";

const skills = [
  { name: "HTML", icon: <FaHtml5 />, rating: 3, category: "Frontend", color: "#e34c26" },
  { name: "CSS", icon: <FaCss3 />, rating: 5, category: "Frontend", color: "#264de4" },
  { name: "JavaScript", icon: <SiJavascript />, rating: 4, category: "Frontend", color: "#f0db4f" },
  { name: "TypeScript", icon: <SiTypescript />, rating: 4, category: "Frontend", color: "#3178c6" },
  { name: "React.js", icon: <FaReact />, rating: 3, category: "Frontend", color: "#61dafb" },
  { name: "Next.js", icon: <SiNextdotjs />, rating: 4, category: "Frontend", color: "#ffffff" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, rating: 3, category: "Frontend", color: "#06b6d4" },
  // { name: "React Redux", icon: <FaReact />, rating: 3, category: "Frontend", color: "#764abc" },

  { name: "Node.js", icon: <FaNodeJs />, rating: 4, category: "Backend", color: "#68a063" },
  { name: "Express.js", icon: <SiExpress />, rating: 5, category: "Backend", color: "#ffffff" },
  // { name: "EJS", icon: <FaNodeJs />, rating: 4, category: "Backend", color: "#90c53f" },
  { name: "Python", icon: <FaPython />, rating: 4, category: "Backend", color: "#3776ab" },
  { name: "Django", icon: <SiDjango />, rating: 4, category: "Backend", color: "#4caf50" },
  { name: "Flask", icon: <FaFlask />, rating: 3, category: "Backend", color: "#66bb6a" },
  { name: "FastAPI", icon: <SiFastapi />, rating: 3, category: "Backend", color: "#009688" },

  { name: "MongoDB", icon: <SiMongodb />, rating: 3, category: "Database", color: "#47a248" },
  { name: "SQL", icon: <FaDatabase />, rating: 4, category: "Database", color: "#00758f" },
  { name: "PostgreSQL", icon: <SiPostgresql />, rating: 3, category: "Database", color: "#336791" },

  { name: "AWS", icon: <FaAws />, rating: 4, category: "DevOps", color: "#ff9900" },
  { name: "Git", icon: <SiGit />, rating: 4, category: "DevOps", color: "#f05032" },
  { name: "GitHub", icon: <FaGithub />, rating: 5, category: "DevOps", color: "#ffffff" },
  { name: "Docker", icon: <SiDocker />, rating: 4, category: "DevOps", color: "#2496ed" },
  { name: "Postman", icon: <SiPostman />, rating: 5, category: "DevOps", color: "#ff6c37" },
  { name: "Vercel", icon: <SiVercel />, rating: 4, category: "DevOps", color: "#ffffff" },

  { name: "Python", icon: <FaPython />, rating: 4, category: "Languages", color: "#3776ab" },
  { name: "JavaScript", icon: <SiJavascript />, rating: 4, category: "Languages", color: "#f0db4f" }, // optional duplicate if needed
  { name: "TypeScript", icon: <SiTypescript />, rating: 4, category: "Languages", color: "#3178c6" },


  { name: "AI Dev", icon: <SiOpenai />, rating: 4, category: "AI/ML", color: "#5c67f2" },
  { name: "ML", icon: <SiTensorflow />, rating: 3, category: "AI/ML", color: "#ff6f00" },
  { name: "RAG", icon: <SiVectorworks />, rating: 3, category: "AI/ML", color: "#00b894" },
  { name: "LangChain", icon: <SiLangchain />, rating: 3, category: "AI/ML", color: "#1c3c3c" },
  { name: "Vector DBs", icon: <SiDatabricks />, rating: 3, category: "AI/ML", color: "#e84393" },

];

type Skill = {
  name: string;
  icon: JSX.Element;
  rating: number;
  category: string;
  color: string;
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [displayedSkills, setDisplayedSkills] = useState<Skill[]>([]);
  const [terminalText, setTerminalText] = useState("");
  const [currentCommand, setCurrentCommand] = useState(0);

  const commands = [
    "$ whoami",
    "> Full Stack Developer",
    "$ ls -la skills/",
    "> Loading technical expertise...",
  ];

  useEffect(() => {
    if (currentCommand < commands.length) {
      const timer = setTimeout(() => {
        setTerminalText(prev => prev + (prev ? "\n" : "") + commands[currentCommand]);
        setCurrentCommand(prev => prev + 1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentCommand]);

  useEffect(() => {
    const filtered = skills.filter(skill => skill.category === activeCategory);
    setDisplayedSkills([]);

    filtered.forEach((skill, index) => {
      setTimeout(() => {
        setDisplayedSkills(prev => [...prev, skill]);
      }, index * 100);
    });
  }, [activeCategory]);

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      {/* Terminal Header */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900 rounded-t-lg border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <div className="bg-gray-800 px-4 py-2 rounded-t-lg flex items-center gap-2 border-b border-green-500">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="ml-4 text-green-400 text-sm">developer@portfolio:~/skills</span>
          </div>

          {/* Terminal Content */}
          <div className="p-6">
            <pre className="text-green-400 mb-4 whitespace-pre-wrap">
              {terminalText}
              <span className="animate-pulse">▋</span>
            </pre>
          </div>
        </div>

        {/* Command Tabs */}
        <div className="flex flex-col gap-2 my-6 bg-gray-900 p-4 rounded-lg border-2 border-green-500/50">
          <span className="text-green-400">$ cat</span>

          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded transition-all duration-300 ${activeCategory === category
                  ? "bg-green-500 text-black font-bold shadow-[0_0_20px_rgba(34,197,94,0.5)]"
                  : "bg-gray-800 text-green-400 hover:bg-gray-700 border border-green-500/30"
                  }`}
              >
                {category}.sh
              </button>
            ))}
          </div>
        </div>


        {/* Skills Terminal Output */}
        <div className="bg-gray-900 rounded-lg border-2 border-green-500 p-6 shadow-[0_0_30px_rgba(34,197,94,0.2)] mb-6">
          <div className="mb-4">
            <span className="text-green-400">$ ./execute {activeCategory}.sh</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayedSkills.map((skill, index) => (
              <div
                key={index}
                className="group bg-black border-2 border-green-500/50 rounded-lg p-4 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 animate-[fadeIn_0.5s_ease-in]"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl transition-transform duration-300 group-hover:scale-110" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <div>
                      <div className="text-green-400 font-bold">{skill.name}</div>
                      <div className="text-xs text-green-600">
                        {`process_${index + 1}.exe`}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-green-600 mb-1">
                    <span>Proficiency</span>
                    <span>{(skill.rating / 5 * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden border border-green-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(34,197,94,0.6)]"
                      style={{ width: `${(skill.rating / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Status */}
                <div className="mt-2 text-xs">
                  <span className="text-green-600">[</span>
                  <span className="text-green-400 animate-pulse">●</span>
                  <span className="text-green-600">] Running</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: "Total Packages", value: skills.length, cmd: "dpkg -l" },
            { label: "Expert Level", value: skills.filter(s => s.rating >= 4).length, cmd: "grep -c expert" },
            { label: "Categories", value: categories.length, cmd: "ls | wc -l" },
            { label: "Uptime", value: "3+ years", cmd: "uptime" }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900 border-2 border-green-500/50 rounded-lg p-4 hover:border-green-400 transition-all">
              <div className="text-xs text-green-600 mb-1">$ {stat.cmd}</div>
              <div className="text-2xl font-bold text-green-400">{stat.value}</div>
              <div className="text-xs text-green-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Soft Skills Section */}
        <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-6 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
          <div className="mb-4">
            <span className="text-green-400">$ ./soft_skills --list</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 ">
            {[
              { name: "Communication", level: "Advanced", icon: "📡" },
              { name: "Teamwork", level: "Expert", icon: "🤝" },
              { name: "Problem-solving", level: "Advanced", icon: "🔧" }
            ].map((skill, index) => (
              <div key={index} className="bg-black border border-green-500/50 rounded p-4 hover:border-green-400 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <div className="text-green-400 font-bold">{skill.name}</div>
                    <div className="text-xs text-green-600 text-center">[{skill.level}]</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-green-600 text-sm">
            <span className="animate-pulse">▋</span> All systems operational
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Skills;