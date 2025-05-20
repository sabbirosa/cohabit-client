import { useState } from "react";
import { FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import Button from "../components/shared/Button";
import useAuth from "../contexts/AuthContext";

function MyListings() {
  const { user } = useAuth();
  const initialListings = useLoaderData();
  const [myListings, setMyListings] = useState(
    initialListings.filter((listing) => listing.userEmail === user.email)
  );
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
    "Vegan",
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
    const lifestylePreferences = lifestyleOptions.filter((option) =>
      formData.getAll("lifestylePreferences").includes(option)
    );

    const updatedData = {
      title: formData.get("title"),
      location: formData.get("location"),
      rent: Number(formData.get("rent")),
      roomType: formData.get("roomType"),
      lifestylePreferences,
      description: formData.get("description"),
      contact: formData.get("contact"),
      availability: formData.get("availability"),
      userEmail: user.email,
      userName: user.displayName,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URI}/listings/${selectedListing._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update listing");
      }

      // Update the state locally
      setMyListings((prevListings) =>
        prevListings.map((listing) =>
          listing._id === selectedListing._id
            ? { ...listing, ...updatedData }
            : listing
        )
      );

      await Swal.fire({
        title: "Success!",
        text: "Your listing has been updated successfully!",
        icon: "success",
      });

      handleCloseModal();
    } catch (error) {
      console.error("Error updating listing:", error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to update listing. Please try again.",
        icon: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URI}/listings/${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete listing");
        }

        // Update the state locally by filtering out the deleted listing
        setMyListings((prevListings) =>
          prevListings.filter((listing) => listing._id !== id)
        );

        await Swal.fire({
          title: "Deleted!",
          text: "Your listing has been deleted.",
          icon: "success",
        });
      } catch (error) {
        console.error("Error deleting listing:", error);
        await Swal.fire({
          title: "Error!",
          text: "Failed to delete listing. Please try again.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-base-content mb-8">
          My Listings
        </h1>

        {myListings.length === 0 ? (
          <div className="text-center text-base-content/70 py-8">
            <p className="text-xl">You haven't created any listings yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-primary/5 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-primary/10">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                    Title
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                    Location
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                    Rent
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-base-content">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-base-content">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {myListings.map((listing) => (
                  <tr
                    key={listing._id}
                    className="hover:bg-primary/10 transition duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="text-base-content font-medium">
                        {listing.title}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-base-content/70">
                      {listing.location}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-base-content/70">
                        <FaBangladeshiTakaSign className="w-4 h-4 mr-2" />
                        <span>{listing.rent}/month</span>
                      </div>
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`inline-flex items-center justify-center px-3 py-1 text-xs font-medium rounded-full text-center ${
                          listing.availability === "Available"
                            ? "bg-success/20 text-success"
                            : "bg-error/20 text-error"
                        }`}
                      >
                        {listing.availability}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleOpenModal(listing)}
                          variant="primary"
                          size="sm"
                          className="min-w-24 flex items-center justify-center gap-2"
                        >
                          <FaEdit className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDelete(listing._id)}
                          variant="error"
                          size="sm"
                          className="min-w-24 flex items-center justify-center gap-2"
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
          <div className="bg-base-100 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-primary/20">
            <div className="p-6 bg-primary/5">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-base-content">
                  Update Listing
                </h2>
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
                    <span className="label-text text-base-content">Title</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    required
                    defaultValue={selectedListing.title}
                    className="input input-bordered w-full bg-primary/5 border-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="label">
                    <span className="label-text text-base-content">
                      Location
                    </span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    required
                    defaultValue={selectedListing.location}
                    className="input input-bordered w-full bg-primary/5 border-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="rent" className="label">
                    <span className="label-text text-base-content">
                      Rent Amount
                    </span>
                  </label>
                  <input
                    type="number"
                    id="rent"
                    name="rent"
                    required
                    min="0"
                    defaultValue={selectedListing.rent}
                    className="input input-bordered w-full bg-primary/5 border-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="roomType" className="label">
                    <span className="label-text text-base-content">
                      Room Type
                    </span>
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    required
                    defaultValue={selectedListing.roomType}
                    className="select select-bordered w-full bg-primary/5 border-primary/20"
                  >
                    <option value="">Select room type</option>
                    {roomTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text text-base-content">
                      Lifestyle Preferences
                    </span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {lifestyleOptions.map((option) => (
                      <div key={option} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={option}
                          name="lifestylePreferences"
                          value={option}
                          defaultChecked={selectedListing.lifestylePreferences?.includes(
                            option
                          )}
                          className="checkbox checkbox-primary border-primary/20"
                        />
                        <label
                          htmlFor={option}
                          className="text-base-content/70 text-sm cursor-pointer select-none"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="label">
                    <span className="label-text text-base-content">
                      Description
                    </span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows="4"
                    defaultValue={selectedListing.description}
                    className="textarea textarea-bordered w-full bg-primary/5 border-primary/20"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="contact" className="label">
                    <span className="label-text text-base-content">
                      Contact Information
                    </span>
                  </label>
                  <input
                    type="text"
                    id="contact"
                    name="contact"
                    required
                    defaultValue={selectedListing.contact}
                    className="input input-bordered w-full bg-primary/5 border-primary/20"
                  />
                </div>

                <div>
                  <label htmlFor="availability" className="label">
                    <span className="label-text text-base-content">
                      Availability
                    </span>
                  </label>
                  <select
                    id="availability"
                    name="availability"
                    required
                    defaultValue={selectedListing.availability}
                    className="select select-bordered w-full bg-primary/5 border-primary/20"
                  >
                    <option value="">Select availability</option>
                    <option value="Available">Available</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="userName" className="label">
                    <span className="label-text text-base-content">
                      User Name
                    </span>
                  </label>
                  <input
                    type="text"
                    value={user.displayName}
                    readOnly
                    className="input input-bordered w-full bg-primary/5 border-primary/20 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label htmlFor="userEmail" className="label">
                    <span className="label-text text-base-content">
                      User Email
                    </span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="input input-bordered w-full bg-primary/5 border-primary/20 cursor-not-allowed"
                  />
                </div>

                {/* <div className="space-y-2">
                  <div className="flex items-center">
                    <span className="text-base-content">User Email:</span>
                    <span className="ml-2 text-base-content/70">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-base-content">User Name:</span>
                    <span className="ml-2 text-base-content/70">
                      {user.displayName}
                    </span>
                  </div>
                </div> */}

                <div className="flex justify-end space-x-3 pt-4">
                  <Button
                    onClick={handleCloseModal}
                    variant="ghost"
                    className="min-w-24"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                    className="min-w-24"
                  >
                    {isLoading ? "Updating..." : "Update"}
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
