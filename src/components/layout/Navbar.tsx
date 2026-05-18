import { authPaths, protectedRoutes, publicRoutes } from "@/data/routesPaths";
import { Show, UserButton } from "@clerk/react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="bg-transparent h-(--nav-height) py-2.5">
      <nav className="container flex  justify-between">
        {/* logo */}
        <div>
          <h2>Dev Portofolio</h2>
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
