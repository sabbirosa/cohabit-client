import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../contexts/AuthContext";

function AddListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
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
      userName: user.displayName,
      likeCount: 0
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/listings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to add listing');
      }

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Your listing has been added successfully!",
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/my-listings');
    } catch (error) {
      console.error('Error adding listing:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add listing. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-white mb-12">Add Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="block text-lg text-white mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., Looking for a roommate in NYC"
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-lg text-white mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            placeholder="e.g., Manhattan, NYC"
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="rent" className="block text-lg text-white mb-2">
            Rent Amount
          </label>
          <input
            type="number"
            id="rent"
            name="rent"
            required
            min="0"
            placeholder="Monthly rent amount"
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="roomType" className="block text-lg text-white mb-2">
            Room Type
          </label>
          <select
            id="roomType"
            name="roomType"
            required
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="">Select room type</option>
            {roomTypes.map(type => (
              <option key={type} value={type} className="bg-[#1e2530]">{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg text-white mb-4">
            Lifestyle Preferences
          </label>
          <div className="grid grid-cols-2 gap-6">
            {lifestyleOptions.map(option => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={option}
                  name="preferences"
                  value={option}
                  className="w-5 h-5 rounded border-gray-700 bg-[#1e2530] text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-900"
                />
                <label htmlFor={option} className="text-gray-300 text-lg">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-lg text-white mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="4"
            placeholder="Describe the room and your preferences"
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          ></textarea>
        </div>

        <div>
          <label htmlFor="contact" className="block text-lg text-white mb-2">
            Contact Information
          </label>
          <input
            type="text"
            id="contact"
            name="contact"
            required
            placeholder="Phone number or preferred contact method"
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="availability" className="block text-lg text-white mb-2">
            Availability
          </label>
          <select
            id="availability"
            name="availability"
            required
            className="w-full px-4 py-3 bg-[#1e2530] border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-blue-500 appearance-none"
          >
            <option value="">Select availability</option>
            <option value="Available" className="bg-[#1e2530]">Available</option>
            <option value="Not Available" className="bg-[#1e2530]">Not Available</option>
          </select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-lg text-white">User Email:</span>
            <span className="text-gray-400">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-lg text-white">User Name:</span>
            <span className="text-gray-400">{user.displayName}</span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Adding..." : "Add Listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddListing;