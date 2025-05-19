import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { HiOutlineMenuAlt1, HiOutlineX } from "react-icons/hi";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../contexts/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Browse Listing", path: "/browse" },
  { name: "Add to Find Roommate", path: "/add-roommate", isPrivate: true },
  { name: "My Listings", path: "/my-listings", isPrivate: true },
];

function Navbar() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

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
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/" className="text-2xl font-bold text-[#107d83] dark:text-[#107d83]">
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
                          ? "border-[#107d83] text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                          : "border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                      }
                    >
                      {item.name}
                    </NavLink>
                  )
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
            >
              {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
            </button>
            {user ? (
              <div className="flex items-center space-x-4 ml-4">
                <div className="relative group">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />
                  <div className="absolute right-0 w-48 mt-2 py-2 bg-white dark:bg-gray-800 rounded-md shadow-xl hidden group-hover:block">
                    <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                      {user.displayName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="bg-[#107d83] hover:bg-[#0e6b70] text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4 ml-4">
                <Link
                  to="/auth/login"
                  className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-[#107d83] hover:bg-[#0e6b70] text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#107d83]"
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
                        ? "bg-[#107d83] bg-opacity-10 border-[#107d83] text-[#107d83] block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                        : "border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-800 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
                    }
                  >
                    {item.name}
                  </NavLink>
                )
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              >
                {isDarkMode ? <FaSun className="h-5 w-5" /> : <FaMoon className="h-5 w-5" />}
              </button>
            </div>
            {user ? (
              <div className="flex items-center px-4 mt-3">
                <div className="flex-shrink-0">
                  <img
                    src={user.photoURL || "https://via.placeholder.com/40"}
                    alt={user.displayName}
                    className="h-10 w-10 rounded-full"
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800 dark:text-white">
                    {user.displayName}
                  </div>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    {user.email}
                  </div>
                </div>
                <button
                  onClick={handleLogOut}
                  className="ml-auto bg-[#107d83] hover:bg-[#0e6b70] text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <div className="mt-3 space-y-1">
                <Link
                  to="/auth/login"
                  className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="block px-4 py-2 text-base font-medium text-gray-500 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
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
