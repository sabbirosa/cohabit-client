import { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../contexts/AuthContext";

function MyListings() {
  const { user } = useAuth();
  const allListings = useLoaderData();
  const myListings = allListings.filter((listing) => listing.userEmail === user.email);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(false);

  const lifestyleOptions = [
    "Non-smoker",
    "Smoker",
    "Pet-friendly",
    "No pets",
    "Night owl",
    "Early bird",
    "Quiet",
    "Social",
    "Vegetarian",
    "Vegan"
  ];

  const roomTypes = ["Single", "Shared", "Master", "Studio"];

  const handleOpenModal = (listing) => {
    setSelectedListing(listing);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedListing(null);
    setIsModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const preferences = lifestyleOptions.filter(option => formData.getAll('preferences').includes(option));
    
    const data = {
      title: formData.get('title'),
      location: formData.get('location'),
      rent: Number(formData.get('rent')),
      roomType: formData.get('roomType'),
      preferences,
      description: formData.get('description'),
      contact: formData.get('contact'),
      availability: formData.get('availability'),
      userEmail: user.email,
      userName: user.displayName
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/listings/${selectedListing._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update listing');
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your listing has been updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error updating listing:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update listing. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/listings/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete listing');
        }

        Swal.fire(
          'Deleted!',
          'Your listing has been deleted.',
          'success'
        );

        window.location.reload();
      } catch (error) {
        console.error('Error deleting listing:', error);
        Swal.fire(
          'Error!',
          'Failed to delete listing. Please try again.',
          'error'
        );
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-white mb-8">My Listings</h1>
        
        {myListings.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <p className="text-xl">You haven't created any listings yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-[#1e2530] rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Rent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {myListings.map((listing) => (
                  <tr 
                    key={listing._id}
                    className="hover:bg-gray-700/50 transition duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="text-white font-medium">{listing.title}</span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {listing.location}
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      ${listing.rent}/month
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
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleOpenModal(listing)}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
                          title="Update"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(listing._id)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition duration-200"
                          title="Delete"
                        >
                          <FaTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Update Modal */}
      {isModalOpen && selectedListing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e2530] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Update Listing</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    defaultValue={selectedListing.title}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-white mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    defaultValue={selectedListing.location}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="rent" className="block text-sm font-medium text-white mb-1">
                    Rent Amount
                  </label>
                  <input
                    type="number"
                    id="rent"
                    name="rent"
                    required
                    min="0"
                    defaultValue={selectedListing.rent}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="roomType" className="block text-sm font-medium text-white mb-1">
                    Room Type
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    required
                    defaultValue={selectedListing.roomType}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Lifestyle Preferences
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    {lifestyleOptions.map(option => (
                      <div key={option} className="flex items-center">
                        <input
                          type="checkbox"
                          id={option}
                          name="preferences"
                          value={option}
                          defaultChecked={selectedListing.preferences?.includes(option)}
                          className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                        />
                        <label htmlFor={option} className="ml-2 text-sm text-gray-300">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    defaultValue={selectedListing.description}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="contact" className="block text-sm font-medium text-white mb-1">
                    Contact Information
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    defaultValue={selectedListing.contact}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="block text-sm font-medium text-white mb-1">
                    Availability
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    defaultValue={selectedListing.availability}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-white">User Email:</span>
                    <span className="ml-2 text-sm text-gray-400">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-white">User Name:</span>
                    <span className="ml-2 text-sm text-gray-400">{user.displayName}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? "Updating..." : "Update Listing"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MyListings;