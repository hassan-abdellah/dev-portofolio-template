import { Skeleton } from "../ui/skeleton";

const ProjectsLoader = () => {
  return (
    <div className="mt-4 container">
      <div className="flex justify-end mb-4">
        {/* Add the button here */}
        <Skeleton className="w-40 h-10 rounded-lg bg-gray-200" />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
        {Array.from({ length: 6 })?.map((_, i) => (
          <div key={i}>
            {/* image */}
            <div className="border-2 border-lavender-purple rounded-xl w-full h-64 overflow-hidden">
              <Skeleton className="w-full h-full bg-gray-200" />
            </div>
            {/* Project Details */}
            <div className="mt-4 flex flex-col gap-2 px-2">
              <Skeleton className="w-full h-4 rounded-lg bg-gray-200" />
              <Skeleton className="w-2/3 h-4 rounded-lg bg-gray-200" />
              <Skeleton className="w-2/3 h-4 rounded-lg bg-gray-200" />

              <div className="mt-4 flex items-center  gap-1.5 flex-wrap max-w-2xl">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-10 w-10 rounded-full bg-gray-200"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsLoader;
