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
    <nav className="bg-base-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="text-2xl font-bold text-primary">
                Cohabit
              </NavLink>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
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
          <div className="flex items-center">
            <label className="swap swap-rotate">
              <input 
                type="checkbox" 
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <FaSun className="swap-on h-5 w-5" />
              <FaMoon className="swap-off h-5 w-5" />
            </label>
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
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
              <div className="flex items-center space-x-4 ml-4">
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
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-base-content hover:bg-base-200 focus:outline-none"
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
                        : "border-transparent text-base-content hover:bg-base-200 hover:border-base-300 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    }
                  >
                    {item.name}
                  </NavLink>
                )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-base-200">
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
