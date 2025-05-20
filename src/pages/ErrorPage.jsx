import { Link, useRouteError } from "react-router";
import errorImage from "../assets/error-image.png";
import "../index.css";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8fafa] dark:bg-[#1a1a1a]">
      <div className="text-center">
        <img
          src={errorImage}
          alt="404 Error"
          className="max-w-[300px] mx-auto mb-8"
        />
        
        <h2 className="text-4xl font-bold text-[#117D82] dark:text-[#2CCCC4] mb-4">
          {error?.status === 404 ? "404 - Page Not Found" : "Oops! Something went wrong"}
        </h2>
        
        <p className="text-[#4B5563] dark:text-[#D1D5DB] mb-6 max-w-md mx-auto">
          {error?.status === 404
            ? "The page you are looking for might have been removed or is temporarily unavailable."
            : error?.message || "An unexpected error occurred. Please try again later."}
        </p>

        <Link
          to="/"
          className="px-6 py-3 rounded bg-[#117D82] hover:bg-[#0e6a6e] dark:bg-[#2CCCC4] dark:hover:bg-[#20B2AA] text-white transition-all"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;