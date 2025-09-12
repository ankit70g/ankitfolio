

interface Project {
  name: string;
  description: string;
  type: "Web" | "Python & AI";
  website?: string;
  github: string;
}
const projects: Project[] = [
  {
    name: "Aura: The Next-Gen AI Web Studio",
    type: "Web",
    description: "Aura is an AI-powered web studio that instantly turns ideas into production-ready websites with Gemini 2.5 Pro, a sleek UI, and a modern developer stack.",
    website: "https://aura-tau-mauve.vercel.app/",
    github: "https://github.com/ankit70g/aura",
  },
  {
    name: "E-Health Card System",
    type: "Web",
    description: "The E-Health Card System is a web-based hospital management solution aimed at improving efficiency, accessibility, and accountability in healthcare services. It integrates patient data, doctor prescriptions, medical records, hospital details, and pharmacy information into a secure, centralized system.",
    website: "https://ankit70g.pythonanywhere.com/",
    github: "https://github.com/ankit70g/HealthCard",
  },
  // {
  //   name: "Ankit",
  //   type: "Web",
  //   description: "The E-Health Card System is a web-based hospital management solution aimed at improving efficiency, accessibility, and accountability in healthcare services. It integrates patient data, doctor prescriptions, medical records, hospital details, and pharmacy information into a secure, centralized system.",
  //   website: "https://ankit70g.pythonanywhere.com/",
  //   github: "https://github.com/ankit70g/HealthCard",
  // },
  {
    name: "AI Coding Agent with Gemini",
    type: "Python & AI",
    description: "Build and run your own AI Agent powered by Python and Google Gemini Flash API.This project demonstrates how modern agentic AI systems work—reasoning, calling tools, and executing tasks autonomously.",
    github: "https://github.com/ankit70g/aiagent",
  },
  {
    name: "Semantic Book Recommender LLM",
    type: "Python & AI",
    description: "An interactive book recommendation system that leverages semantic embeddings and emotional tone analysis to suggest books based on user input. Built using Python, Gradio, and LangChain, it provides personalized book recommendations with thumbnail previews and brief descriptions.",
    website: "https://huggingface.co/spaces/ankit70/book-recommender",
    github: "https://github.com/ankit70g/book-recommender",
  },
  {
    name: "Email-Spam-Detection",
    type: "Python & AI",
    description: "Email-Spam-Detection uses supervised ML to detect spam emails and presents predictions, performance metrics, and feature insights through a Streamlit dashboard. Easy to test — paste an email or upload a dataset and see results instantly",
    //website: "",
    github: "https://github.com/ankit70g/Email-Spam-Detection",
  },
];

// ... (rest of your code)

const Projects = (props: any) => {
  const { currentTheme } = props;

  return (
    <div className="mb-2">
      <p>Featured Projects:</p>
      {["Web", "Python & AI",].map((type) => (
        <div key={type}>
          <h3 className={`${currentTheme.text} mt-4 mb-2`}>{type} Projects:</h3>
          <ul className="ml-4">
            {projects
              .filter((project) => project.type === type)
              .map((project, index) => (
                <li key={index}>
                  <span className={`${currentTheme.text} font-[900]`}>{'> '} {project.name}</span> -{" "}
                  <p>{project.description}</p>
                  {project.website && (
                    <>
                      {" "}
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-600"
                      >
                        Website
                      </a>
                    </>
                  )}{" "}
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500"
                  >
                    GitHub
                  </a>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
};



export default Projects;