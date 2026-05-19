import type { projectData } from "@/types";
import ProjectPlacholder from "@/assets/images/project-placeholder.svg";
import { Button } from "../ui/button";
const ProjectsGrid = ({
  projects,
}: {
  projects: projectData[] | undefined;
}) => {
  return (
    <div className="mt-4 container grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
      {projects?.map((project) => (
        <div key={project.id}>
          {/* image */}
          <div className="border-2 border-lavender-purple rounded-xl w-full h-64 overflow-hidden">
            <img
              src={project.image_url ? project.image_url : ProjectPlacholder}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Project Details */}
          <div className="mt-4 flex flex-col gap-2 px-2">
            <h2 className="text-dark-amethyst">{project.title}</h2>
            <p className="text-gray-400">{project.description}</p>

            {project.preview_url ? (
              <a
                target="_blank"
                href={project.preview_url}
                className="bg-indigo-velvet cursor-pointer rounded-lg text-white text-center py-2 hover:bg-wisteria transition-colors duration-300"
              >
                Preview
              </a>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsGrid;
