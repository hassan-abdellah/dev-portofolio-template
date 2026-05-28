import { Skeleton } from "@/components/ui/skeleton";

const ProfilePageLoader = () => {
  return (
    <section className="relative">
      {/* header */}
      <div className="flex flex-col items-center justify-center bg-lavender-purple h-100 w-screen rounded-b-4xl">
        {/* image */}
        <Skeleton className="w-20 h-20 rounded-full mb-4" />
        {/* Name */}
        <Skeleton className="w-40 h-4 rounded-md mb-3" />
        {/* title */}
        <Skeleton className="w-30 h-4 rounded-md mb-3" />

        {/* Skills */}
        <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap max-w-2xl">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-3xl" />
          ))}
        </div>

        {/* social links */}

        {/* Skills */}
        <div className="mt-4 flex items-center justify-center gap-1.5 flex-wrap max-w-2xl">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-7 w-7 rounded-full" />
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-6 flex items-center gap-1.5 flex-wrap justify-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-30 h-10" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfilePageLoader;
