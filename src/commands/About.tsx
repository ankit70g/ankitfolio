import React, { useState, useEffect, useRef } from "react";

const About = () => {
  const [bootSequence, setBootSequence] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [systemReady, setSystemReady] = useState(false);
  const [glitchText, setGlitchText] = useState("ANKIT GUPTA");
  const [activeTab, setActiveTab] = useState<'profile' | 'stats'>('profile');
  const [githubStats, setGithubStats] = useState({
    contributions: 0,
    projects: 0,
    loading: true
  });
  const aboutRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const bootLines = [
    "[INIT] Starting neural interface...",
    "[LOAD] Mounting consciousness.core...",
    "[SYNC] Synchronizing timeline vectors...",
    "[AUTH] Verifying identity matrix...",
    "[CONN] Establishing quantum link...",
    "[READY] System online. Welcome, Ankit.",
  ];

  // const skills = [
  //   { name: "React/Next.js", level: 92, category: "frontend", icon: "⚛️" },
  //   { name: "Node.js/Express", level: 88, category: "backend", icon: "🟢" },
  //   { name: "TypeScript", level: 90, category: "language", icon: "💙" },
  //   { name: "PostgreSQL/MongoDB", level: 85, category: "database", icon: "🗄️" },
  //   { name: "Docker/K8s", level: 80, category: "devops", icon: "🐋" },
  //   { name: "System Design", level: 87, category: "architecture", icon: "🏗️" },
  // ];

  const achievements = [
    { title: "Code Architect", desc: "Built scalable systems", unlocked: true },
    { title: "Problem Solver", desc: "Solved 500+ challenges", unlocked: true },
    { title: "Full-Stack Master", desc: "End-to-end development", unlocked: true },
    { title: "Innovation Driver", desc: "Created impactful solutions", unlocked: true },
  ];

  const metrics = {
    contributions: githubStats.contributions,
    projects: githubStats.projects,
    linesOfCode: "50K+",
    coffeeConsumed: "∞"
  };

  // Fetch GitHub achievements (scrape HTML)
  const parseAchievements = (html: string): string[] => {
    const achievementList = [
      "Pull Shark",
      "YOLO",
      "Quickdraw",
      "Galaxy Brain",
      "Starstruck",
      "Pair Extraordinaire",
      "Arctic Code Vault Contributor"
    ];

    const found: string[] = [];

    achievementList.forEach((ach) => {
      if (html.includes(`alt="${ach}"`)) {
        found.push(ach);
      }
    });

    return found;
  };


  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = 'ankit70g'; // Your GitHub username

        // Fetch repositories
        let allRepos = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
          const reposResponse = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`
          );
          const repos = await reposResponse.json();

          if (repos.length === 0) {
            hasMore = false;
          } else {
            allRepos.push(...repos);
            page++;
          }
        }

        // Filter out forked repos for project count
        const ownRepos = allRepos.filter((repo: any) => !repo.fork);

        // Fetch contribution data from GitHub's contribution graph
        // We'll scrape the contributions from the user's profile page
        const response = await fetch(`https://github.com/${username}`);
        const html = await response.text();

        // Extract contribution count from the profile page
        // GitHub shows "X contributions in the last year"
        const contributionMatch = html.match(/([0-9,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
        const contributions = contributionMatch
          ? parseInt(contributionMatch[1].replace(/,/g, ''))
          : 500; // Fallback

        setGithubStats({
          contributions: contributions,
          projects: ownRepos.length,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        setGithubStats({
          contributions: 250,
          projects: 14,
          loading: false
        });
      }
    };

    if (systemReady) {
      fetchGitHubStats();
    }
  }, [systemReady]);

  // Glitch effect
  useEffect(() => {
    const glitchChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    const originalText = "ANKIT GUPTA";
    let iterations = 0;

    const glitchInterval = setInterval(() => {
      setGlitchText(originalText.split("").map((char, index) => {
        if (index < iterations) return originalText[index];
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }).join(""));

      if (iterations >= originalText.length) {
        clearInterval(glitchInterval);
      }
      iterations += 1 / 3;
    }, 50);

    return () => clearInterval(glitchInterval);
  }, [systemReady]);

  // Matrix rain effect on canvas
  useEffect(() => {
    if (!canvasRef.current || !systemReady) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 200;
    canvas.height = 150;

    const chars = "01アイウエオカキクケコサシスセソ";
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops: number[] = Array(Math.floor(columns)).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);
    return () => clearInterval(interval);
  }, [systemReady]);

  // Boot sequence
  useEffect(() => {
    let currentLine = 0;
    const bootInterval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setBootSequence(prev => [...prev, bootLines[currentLine]]);
        setProgress(((currentLine + 1) / bootLines.length) * 100);
        currentLine++;
      } else {
        clearInterval(bootInterval);
        setTimeout(() => {
          setSystemReady(true);
          setTimeout(() => {
            aboutRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }, 500);
      }
    }, 250);

    return () => clearInterval(bootInterval);
  }, []);

  return (
    <div ref={aboutRef} className="font-mono text-sm">
      {/* Boot Loader */}
      {!systemReady && (
        <div className="border-2 border-cyan-500 bg-black p-4 mb-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-cyan-400 font-bold">SYSTEM INITIALIZATION</span>
          </div>

          <div className="space-y-1 mb-3">
            {bootSequence.map((line, index) => (
              <div key={index} className="text-green-400 text-xs" style={{ animation: 'fadeIn 0.3s' }}>
                {line}
              </div>
            ))}
          </div>

          <div className="relative h-3 bg-gray-900 border border-cyan-500/50 overflow-hidden">
            <div
              className="absolute h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          <div className="text-cyan-400 text-xs mt-2 text-right">{Math.floor(progress)}%</div>
        </div>
      )}

      {/* Main Interface */}
      {systemReady && (
        <div style={{ animation: 'fadeIn 0.8s' }}>
          {/* Header with Glitch Effect */}
          <div className="border-2 border-purple-500 bg-gradient-to-br from-purple-950/50 via-blue-950/50 to-cyan-950/50 p-4 mb-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-purple-500 animate-pulse"></div>

            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 glitch" data-text={glitchText}>
                  {glitchText}
                </div>
                <div className="text-cyan-400 text-sm mt-1 flex items-center gap-2">
                  <span className="animate-pulse">{'>'}</span>
                  <span className="typing">Full-Stack Developer</span>
                </div>
              </div>

              <canvas ref={canvasRef} className="border border-green-500/30" />
            </div>

            {/* Live Metrics Bar */}
            <div className="grid grid-cols-4 gap-2 border-t border-purple-500/30 pt-3">
              {Object.entries(metrics).map(([key, value], index) => (
                <div key={key} className="text-center" style={{ animation: `slideUp 0.4s ${index * 0.1}s both` }}>
                  <div className="text-2xl font-bold text-cyan-400">
                    {githubStats.loading && (key === 'contributions' || key === 'projects') ? (
                      <span className="text-sm">...</span>
                    ) : (
                      value
                    )}
                  </div>
                  <div className="text-xs text-gray-400 uppercase">{key.replace(/([A-Z])/g, ' $1')}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabbed Interface */}
          <div className="border border-cyan-500/50 bg-gray-900/30 mb-4">
            <div className="flex border-b border-cyan-500/30 bg-black/50">
              {(['profile', 'stats'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-xs uppercase font-bold transition-all ${activeTab === tab
                    ? 'bg-cyan-500 text-black'
                    : 'text-cyan-400 hover:bg-cyan-500/20'
                    }`}
                >
                  [{tab}]
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === 'profile' && (
                <div style={{ animation: 'fadeIn 0.5s' }}>
                  <div className="text-gray-300 mb-4 leading-relaxed">
                    <span className="text-purple-400">// Transforming caffeine into code</span>
                    <br />
                    <span className="text-yellow-400">const</span>{' '}
                    <span className="text-blue-400">developer</span> = {'{'}
                    <br />
                    <span className="ml-4">passion: <span className="text-green-400">"Building elegant solutions"</span>,</span>
                    <br />
                    <span className="ml-4">mission: <span className="text-green-400">"Turning ideas into reality"</span>,</span>
                    <br />
                    <span className="ml-4">approach: <span className="text-green-400">"Clean code, creative thinking"</span></span>
                    <br />
                    {'}'};
                  </div>

                  {/* Achievements */}
                  <div className="grid grid-cols-2 gap-2">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="border border-yellow-500/50 bg-yellow-950/20 p-3"
                        style={{ animation: `slideUp 0.4s ${index * 0.1}s both` }}
                      >
                        <div className="text-yellow-400 font-bold text-sm mb-1">
                          🏆 {achievement.title}
                        </div>
                        <div className="text-gray-400 text-xs">{achievement.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'stats' && (
                <div style={{ animation: 'fadeIn 0.5s' }}>
                  {githubStats.loading ? (
                    <div className="text-center text-cyan-400 py-8">
                      Loading GitHub stats...
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="border border-cyan-500/50 bg-cyan-950/20 p-3">
                          <div className="text-cyan-400 text-xs mb-1">CONTRIBUTIONS</div>
                          <div className="text-2xl font-bold text-cyan-400 flex items-center gap-2">
                            {githubStats.contributions.toLocaleString()}
                          </div>
                          <div className="text-xs text-gray-400 mt-1">This year</div>
                        </div>
                        <div className="border border-blue-500/50 bg-blue-950/20 p-3">
                          <div className="text-blue-400 text-xs mb-1">PROJECTS</div>
                          <div className="text-2xl font-bold text-blue-400">{githubStats.projects}</div>
                          <div className="text-xs text-gray-400 mt-1">Repositories</div>
                        </div>
                      </div>

                      <div className="border-t border-cyan-500/30 pt-3">
                        <div className="grid grid-cols-2 gap-3">
                          <div className="border border-green-500/50 bg-green-950/20 p-3">
                            <div className="text-green-400 text-xs mb-1">STATUS</div>
                            <div className="text-xl font-bold text-green-400 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              AVAILABLE
                            </div>
                          </div>
                          <div className="border border-purple-500/50 bg-purple-950/20 p-3">
                            <div className="text-purple-400 text-xs mb-1">MODE</div>
                            <div className="text-xl font-bold text-purple-400">FULL-STACK</div>
                          </div>
                        </div>
                      </div>

                      <div className="text-center text-gray-400 text-xs mt-4">
                        Last updated: {new Date().toLocaleString()}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CV Access - Premium Style */}
          <a
            href="https://drive.google.com/file/d/1TeXcJQR4jbrGedwmeTY52hkGLvWGUpBY/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="block border-2 border-yellow-400 bg-gradient-to-r from-yellow-950/30 to-orange-950/30 p-4 hover:from-yellow-950/50 hover:to-orange-950/50 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-yellow-400 font-bold text-lg mb-1">
                  📄 VIEW RESUME
                </div>
                <div className="text-gray-400 text-sm">
                  Complete experience log & technical documentation
                </div>
              </div>
              <div className="text-3xl group-hover:translate-x-2 transition-transform">
                →
              </div>
            </div>
          </a>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .glitch {
          position: relative;
          animation: glitch 1s infinite;
        }

        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
        }

        .typing {
          animation: typing 2s steps(20) infinite;
        }

        @keyframes typing {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default About;