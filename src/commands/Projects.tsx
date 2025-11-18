import { useEffect, useRef, useState } from 'react';

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  fork: boolean;
}

const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const projectsRef = useRef<HTMLDivElement>(null); // Add ref for scrolling

  // Define your categories here
  const categories = {
    'Web Applications': ['webapp', 'web-app', 'fullstack', 'frontend', 'backend'],
    'Mobile Apps': ['mobile', 'android', 'ios', 'react-native', 'flutter'],
    'Tools & Utilities': ['tool', 'utility', 'cli', 'automation'],
    'AI & ML': ['ml', 'machine-learning', 'ai', 'data-science'],
    'Games': ['game', 'gaming', 'gamedev'],
    'Libraries': ['library', 'package', 'framework'],
  };

  useEffect(() => {
    const fetchAllRepos = async () => {
      try {
        const username = 'ankit70g'; // Replace with your GitHub username
        let allRepos: GitHubRepo[] = [];
        let page = 1;
        let hasMore = true;

        // Fetch all pages of repositories
        while (hasMore) {
          const response = await fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=100&page=${page}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch repositories');
          }

          const data = await response.json();

          if (data.length === 0) {
            hasMore = false;
          } else {
            allRepos = [...allRepos, ...data];
            page++;
          }
        }

        // Filter out forked repos (optional)
        const filteredRepos = allRepos.filter(repo => !repo.fork);

        setRepos(filteredRepos);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    fetchAllRepos();
  }, []);

  // Scroll into view after loading completes
  useEffect(() => {
    if (!loading && !error && projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [loading, error]);

  // Categorize repos based on topics
  const categorizeRepo = (repo: GitHubRepo): string => {
    for (const [category, keywords] of Object.entries(categories)) {
      if (repo.topics.some(topic => keywords.includes(topic.toLowerCase()))) {
        return category;
      }
    }
    return 'Other Projects';
  };

  // Group repos by category
  const groupedRepos = repos.reduce((acc, repo) => {
    const category = categorizeRepo(repo);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(repo);
    return acc;
  }, {} as Record<string, GitHubRepo[]>);

  if (loading) {
    return (
      <div className="mt-2">
        <p className="text-green-400">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-2">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div ref={projectsRef} className="mt-2">  {/* Add ref to the top div */}
      {/* <p className="text-green-400 mb-4">{'>'} My GitHub Projects ({repos.length} total):</p> */}

      {Object.entries(groupedRepos).map(([category, categoryRepos]) => (
        <div key={category} className="mb-6">
          <h3 className="text-yellow-400 text-lg font-bold mb-3 flex items-center gap-2">
            <span className="text-green-400">▸</span> {category} ({categoryRepos.length})
          </h3>

          <div className="space-y-4 ml-4">
            {categoryRepos.map((repo) => (
              <div key={repo.id} className="border-l-2 border-green-400 pl-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline font-semibold"
                  >
                    {repo.name}
                  </a>
                  {/* {repo.language && (
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-0.5 rounded">
                      {repo.language}
                    </span>
                  )} */}
                </div>
                {repo.description && (
                  <p className="text-gray-300 text-sm mt-1">{repo.description}</p>
                )}
                {repo.homepage && (
                  <div className="mt-1">
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline text-sm flex items-center gap-1 w-fit"
                    >
                      Live Demo
                    </a>
                  </div>
                )}
                {repo.topics.length > 0 && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {repo.topics.map((topic) => (
                      <span
                        key={topic}
                        className="text-xs text-green-400 bg-green-900/30 px-2 py-0.5 rounded"
                      >
                        #{topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;
