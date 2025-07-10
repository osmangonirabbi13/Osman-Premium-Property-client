import { Link, NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const navItems = (
    <>
      <li>
        <NavLink className="font-bold text-white" to="/">
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink className="font-bold text-white" to="/about">
          ABOUT
        </NavLink>
      </li>
      <li>
        <NavLink className="font-bold text-white" to="/appartment">
          APARTMENT
        </NavLink>
      </li>
      <li>
        <NavLink className="font-bold text-white" to="/contact">
          CONTACT
        </NavLink>
      </li>
      <li>
        <NavLink
          className="font-bold text-white uppercase"
          to="/TermsAndConditions"
        >
          Terms And Conditions
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="w-full bg-[rgba(0,0,0,0.4)] fixed top-0 z-50">
      <div className="navbar  px-2 md:px-12 lg:px-16 xl:px-50 lg:py-4 ">
        {/* Mobile Start: Hamburger + Logo */}
        <div className="flex flex-1 items-center lg:hidden gap-2">
          {/* Hamburger */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-[rgba(0,0,0,0.8)] rounded-box w-52"
            >
              {navItems}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className=" normal-case text-xl">
            <img src={logo} alt="Logo" className="h-10 md:h-14" />
          </Link>
        </div>

        {/* Desktop: Logo */}
        <div className="flex-none hidden lg:flex">
          <Link to="/" className=" normal-case text-xl">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Center nav items (desktop only) */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Always on right: Login */}
        <div className="flex-none">
          <Link
            to="/login"
            className="flex items-center gap-2 font-bold text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
          >
            <FaRegUser className="text-lg" />
            <span>Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
