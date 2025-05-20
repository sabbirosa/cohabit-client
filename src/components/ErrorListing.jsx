import { TbHome, TbHomeOff } from "react-icons/tb";
import { Link, useParams } from "react-router";

function ErrorListing() {
  const { id } = useParams();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <TbHomeOff className="w-24 h-24 text-primary" />
        </div>

        <h2 className="text-3xl font-bold text-primary mb-4">
          Oops! Listing Not Found
        </h2>
        
        <p className="text-base-content/70 mb-2">
          The listing ID: <span className="font-mono bg-base-200 px-2 py-1 rounded">{id}</span>
        </p>
        <p className="text-base-content/70 mb-6">
          is invalid or doesn't exist. Please check the URL and try again.
        </p>

        <Link 
          to="/" 
          className="btn btn-primary gap-2"
        >
          <TbHome className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default ErrorListing