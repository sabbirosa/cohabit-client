import { FaBed, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { useLoaderData } from "react-router";
import Button from "../components/shared/Button";

function BrowseListings() {
  const listings = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-base-content mb-8">Browse Listings</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-primary/5 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-primary/10">
              <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Room Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Rent</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Availability</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Interested</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-base-content">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-primary/10">
            {listings.map((listing) => (
              <tr 
                key={listing._id}
                className="hover:bg-primary/10 transition duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-base-content font-medium">{listing.title}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {listing.lifestylePreferences?.slice(0, 2).map((pref, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                        >
                          {pref}
                        </span>
                      ))}
                      {listing.lifestylePreferences?.length > 2 && (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                          +{listing.lifestylePreferences.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-base-content/70">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                    <span>{listing.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-base-content/70">
                    <FaBed className="w-4 h-4 mr-2" />
                    <span>{listing.roomType}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-base-content/70">
                    <FaDollarSign className="w-4 h-4 mr-2" />
                    <span>{listing.rent}/month</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full text-center ${
                    listing.availability === "Available" 
                      ? "bg-success/20 text-success"
                      : "bg-error/20 text-error"
                  }`}>
                    {listing.availability}
                  </span>
                </td>
                <td className="px-6 py-4 text-base-content/70">
                  {listing.likeCount || 0} people
                </td>
                <td className="px-6 py-4">
                  <Button
                    to={`/listings/${listing._id}`}
                    variant="primary"
                    size="sm"
                    className="min-w-24 flex items-center justify-center"
                  >
                    See More
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BrowseListings;