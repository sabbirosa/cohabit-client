import { FaBed, FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { Link, useLoaderData } from "react-router";

function BrowseListings() {
  const listings = useLoaderData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Browse Listings</h1>
      
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-[#1e2530] rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-800">
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Room Type</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rent</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Availability</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">Interested</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-white">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {listings.map((listing) => (
              <tr 
                key={listing._id}
                className="hover:bg-gray-700/50 transition duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{listing.title}</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {listing.preferences?.slice(0, 2).map((pref, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-500 bg-opacity-20 text-blue-400 rounded-full"
                        >
                          {pref}
                        </span>
                      ))}
                      {listing.preferences?.length > 2 && (
                        <span className="px-2 py-1 text-xs bg-blue-500 bg-opacity-20 text-blue-400 rounded-full">
                          +{listing.preferences.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-300">
                    <FaMapMarkerAlt className="w-4 h-4 mr-2" />
                    <span>{listing.location}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-300">
                    <FaBed className="w-4 h-4 mr-2" />
                    <span>{listing.roomType}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center text-gray-300">
                    <FaDollarSign className="w-4 h-4 mr-2" />
                    <span>{listing.rent}/month</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    listing.availability === "Available" 
                      ? "bg-green-500 bg-opacity-20 text-green-400"
                      : "bg-red-500 bg-opacity-20 text-red-400"
                  }`}>
                    {listing.availability}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-300">
                  {listing.likeCount} people
                </td>
                <td className="px-6 py-4">
                  <Link
                    to={`/listing-details/${listing._id}`}
                    className="block text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                  >
                    See More
                  </Link>
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