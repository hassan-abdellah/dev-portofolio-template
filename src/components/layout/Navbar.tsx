import { authPaths, protectedRoutes, publicRoutes } from "@/data/routesPaths";
import { Show, UserButton } from "@clerk/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="sticky z-50 top-0 left-0 right-0 w-full bg-transparent h-(--nav-height) backdrop-blur-3xl flex items-center">
      <nav className="container flex items-center justify-between">
        {/* logo */}
        <div>
          <Link to="/" className="flex items-center gap-0.5 text-xl">
            <ChevronLeft />
            <span>Dev Portofolio</span>
            <ChevronRight />
          </Link>
        </div>

        {/* links */}

        <ul className="flex gap-2.5">
          <Show when="signed-out">
            {publicRoutes.map(({ href, title }) => (
              <li key={href}>
                <Link to={href} className="navlink">
                  {title}
                </Link>
              </li>
            ))}
          </Show>
          <Show when="signed-in">
            {protectedRoutes.map(({ href, title }) => (
              <li key={href}>
                <Link to={href} className="navlink">
                  {title}
                </Link>
              </li>
            ))}

            <li className="md:flex hidden">
              <UserButton signInUrl={authPaths.logIn} />
            </li>
          </Show>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
