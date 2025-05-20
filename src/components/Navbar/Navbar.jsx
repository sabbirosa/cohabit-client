import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../contexts/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Browse Listing", path: "/listings" },
  { name: "Add to Find Roommate", path: "/add-listing", isPrivate: true },
  { name: "My Listings", path: "/my-listings", isPrivate: true },
];

function Navbar() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const navigate = useNavigate();

  // Initialize theme
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    signOut()
      .then(() => {
        // Logout successful
        Swal.fire({
          title: "Logged Out",
          text: "You have been logged out successfully",
          icon: "success",
        });
        navigate("/auth/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="bg-primary/5 shadow-lg border-b border-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink to="/" className="flex items-center gap-2">
              <img className="h-12 w-12" src="/site-logo.png" alt="Cohabit Logo" />
              <h1 className="text-2xl font-bold text-primary mt-2">Cohabit</h1>
            </NavLink>
          </div>

          {/* Navigation Links - Centered */}
          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex space-x-8">
              {navItems.map(
                (item) =>
                  (!item.isPrivate || user) && (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      className={({ isActive }) =>
                        isActive
                          ? "border-primary text-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          : "border-transparent text-base-content hover:border-base-300 hover:text-base-content inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
              )}
            </div>
          </div>

          {/* Right side - Theme toggle and Auth */}
          <div className="flex items-center gap-4">
            <label className="swap swap-rotate">
              <input 
                type="checkbox" 
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <div className="swap-on bg-primary/10 rounded-full p-2.25">
                <FaSun className="h-5 w-5 text-primary" />
              </div>
              <div className="swap-off bg-primary/10 rounded-full p-2.25">
                <FaMoon className="h-5 w-5 text-primary" />
              </div>
              
            </label>
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-base-100 rounded-md shadow-xl hidden group-hover:block">
                    <p className="block px-4 py-2 text-sm text-base-content">
                      {user.displayName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary btn-sm"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/login"
                  className="text-base-content hover:text-primary px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-primary btn-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <div className="sm:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-base-content hover:bg-primary/10 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <HiOutlineMenuAlt1 className="h-6 w-6" />
                ) : (
                  <HiOutlineX className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map(
              (item) =>
                (!item.isPrivate || user) && (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      isActive
                        ? "bg-primary bg-opacity-10 border-primary text-primary block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        : "border-transparent text-base-content hover:bg-primary/10 hover:border-primary/20 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    }
                  >
                    {item.name}
                  </NavLink>
                )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-primary/10">
            <div className="flex items-center px-4">
              <label className="swap swap-rotate">
                <input 
                  type="checkbox" 
                  onChange={toggleTheme}
                  checked={theme === "dark"}
                />
                <FaSun className="swap-on h-5 w-5" />
                <FaMoon className="swap-off h-5 w-5" />
              </label>
            </div>
            {user ? (
              <div className="mt-3 space-y-1">
                <div className="flex items-center px-4">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="ml-3">
                    <div className="text-base font-medium text-base-content">{user.displayName}</div>
                    <div className="text-sm font-medium text-base-content/70">{user.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="w-full text-left px-4 py-2 text-base font-medium hover:bg-base-200 text-base-content"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/auth/login"
                  className="block px-4 py-2 text-base font-medium hover:bg-base-200 text-base-content"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="block px-4 py-2 text-base font-medium hover:bg-base-200 text-base-content"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
