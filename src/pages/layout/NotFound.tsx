import { useDocTitle } from "@/hooks/useDocTitle";

const NotFound = () => {
  useDocTitle("Not Found");

  return (
    <section className="h-screen flex items-center justify-center gap-2 text-lg">
      <span className="text-lavender-purple">404</span>
      <span>|</span>
      <h2>Page Not Found</h2>
    </section>
  );
};

export default NotFound;
