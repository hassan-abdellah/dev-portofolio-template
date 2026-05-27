import { Link } from "react-router";
import LogoIcon from "@/assets/images/logo.svg";
const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1">
      <img src={LogoIcon} alt="logo" className="w-6 h-6" />
      <span className=" sm:text-xl text-lg">Develeportfolio</span>
    </Link>
  );
};

export default Logo;
