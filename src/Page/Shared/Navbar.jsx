import { Link, NavLink } from "react-router";
import { FaRegUser } from "react-icons/fa";
import logo from "../../assets/logo.png";
import useAuth from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logOut, loading } = useAuth();

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
