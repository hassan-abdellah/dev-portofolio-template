import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to="/" className="flex items-center gap-0.5 sm:text-xl text-lg">
        <ChevronLeft />
        <span>Develeportfolio</span>
        <ChevronRight />
      </Link>
    </div>
  );
};

export default Logo;
