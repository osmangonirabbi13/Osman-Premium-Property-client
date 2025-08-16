import { Link, NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";
import { useTheme } from "../../Provider/AuthProvider";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <NavLink className="font-bold text-white" to="/">
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink className="font-bold text-white" to="/appartment">
          ALL APARTMENT
        </NavLink>
      </li>
      <li>
        <NavLink className="font-bold text-white" to="/about">
          ABOUT
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
      <div className="navbar px-2 md:px-12 lg:px-16 xl:px-50 lg:py-4">
        {/* Mobile: Hamburger + Logo */}
        <div className="flex flex-1 items-center lg:hidden gap-2">
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

          <Link to="/" className="normal-case text-xl">
            <img src={logo} alt="Logo" className="h-10 md:h-14" />
          </Link>
        </div>

        {/* Desktop Logo */}
        <div className="flex-none hidden lg:flex">
          <Link to="/" className="normal-case text-xl">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
        </div>

        {/* Center nav items for desktop */}
        <div className="hidden lg:flex flex-1 justify-center">
          <ul className="menu menu-horizontal px-1">{navItems}</ul>
        </div>

        {/* Right side: login or profile */}
        <div className="flex-none">
          <div className="navbar-end">
            <label onClick={toggleDarkMode} className="swap swap-rotate mr-2">
              {darkMode ? (
                <svg
                  className="h-8 w-8  text-yellow-400"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
              ) : (
                <svg
                  className="h-8 w-8  text-white"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
              )}
            </label>

            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="user"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-4 shadow rounded-box w-72 bg-[rgba(0,0,0,0.4)]"
                >
                  <li className="pb-2 border-b">
                    <p className="text-sm text-white">{user.displayName}</p>
                    <p className="text-xs text-white">{user.email}</p>
                  </li>
                  <li>
                    <NavLink
                      className="font-bold btn w-full btn-neutral uppercase mt-2"
                      to="/dashboard"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="btn text-white btn-outline border-white hover:text-black transition hover:bg-white"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 font-bold text-white border border-white px-3 py-1 rounded hover:bg-white hover:text-black transition"
              >
                <FaRegUser className="text-lg" />
                <span>Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
