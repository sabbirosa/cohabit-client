import { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { useLoaderData } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/shared/Button";
import useAuth from "../contexts/AuthContext";

function MyListings() {
  const { user } = useAuth();
  const allListings = useLoaderData();
  const myListings = allListings.filter((listing) => listing.userEmail === user.email);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);

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

      toast.success("Your listing has been updated successfully!");
      handleCloseModal();
      window.location.reload();
    } catch (error) {
      console.error('Error updating listing:', error);
      toast.error("Failed to update listing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await toast.promise(
      new Promise((resolve, reject) => {
        toast.info(
          <div>
            <p>Are you sure you want to delete this listing?</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button
                onClick={() => reject()}
                variant="ghost"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() => resolve()}
                variant="error"
                size="sm"
              >
                Delete
              </Button>
            </div>
          </div>,
          { closeButton: false }
        );
      }),
      {
        pending: 'Please confirm deletion',
        success: 'Listing deleted successfully',
        error: 'Deletion cancelled'
      }
    );

    if (result) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URI}/listings/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete listing');
        }

        window.location.reload();
      } catch (error) {
        console.error('Error deleting listing:', error);
        toast.error("Failed to delete listing. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-base-content mb-8">My Listings</h1>
        
        {myListings.length === 0 ? (
          <div className="text-center text-base-content/70 py-8">
            <p className="text-xl">You haven't created any listings yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-base-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-base-300">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Rent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-base-content">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-base-300">
                {myListings.map((listing) => (
                  <tr 
                    key={listing._id}
                    className="hover:bg-base-300 transition duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="text-base-content font-medium">{listing.title}</span>
                    </td>
                    <td className="px-6 py-4 text-base-content/70">
                      {listing.location}
                    </td>
                    <td className="px-6 py-4 text-base-content/70">
                      ${listing.rent}/month
                    </td>
                    <td className="px-6 py-4">
                      <span className={`badge ${
                        listing.availability === "Available" 
                          ? "badge-success"
                          : "badge-error"
                      }`}>
                        {listing.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-3">
                        <Button
                          onClick={() => handleOpenModal(listing)}
                          variant="primary"
                          size="sm"
                          className="gap-2"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(listing._id)}
                          variant="error"
                          size="sm"
                          className="gap-2"
                        >
                          <FaTrash className="w-4 h-4" />
                          Delete
                        </Button>
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
          <div className="bg-base-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-base-content">Update Listing</h2>
                <button
                  onClick={handleCloseModal}
                  className="text-base-content/70 hover:text-base-content transition-colors"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="space-y-6">
                <div>
                  <label htmlFor="title" className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    defaultValue={selectedListing.title}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    defaultValue={selectedListing.location}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label htmlFor="rent" className="label">
                    <span className="label-text">Rent Amount</span>
                  </label>
                  <input
                    type="number"
                    id="rent"
                    name="rent"
                    required
                    min="0"
                    defaultValue={selectedListing.rent}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label htmlFor="roomType" className="label">
                    <span className="label-text">Room Type</span>
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    required
                    defaultValue={selectedListing.roomType}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Lifestyle Preferences</span>
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
                          className="checkbox checkbox-primary"
                        />
                        <label htmlFor={option} className="ml-2 text-base-content/70">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    defaultValue={selectedListing.description}
                    className="textarea textarea-bordered w-full"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="contact" className="label">
                    <span className="label-text">Contact Information</span>
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    defaultValue={selectedListing.contact}
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="label">
                    <span className="label-text">Availability</span>
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    defaultValue={selectedListing.availability}
                    className="select select-bordered w-full"
                  >
                    <option value="">Select availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-base-content">User Email:</span>
                    <span className="ml-2 text-base-content/70">{user.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-base-content">User Name:</span>
                    <span className="ml-2 text-base-content/70">{user.displayName}</span>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    onClick={handleCloseModal}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                  >
                    {isLoading ? "Updating..." : "Update Listing"}
                  </Button>
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