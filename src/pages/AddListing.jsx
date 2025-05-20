import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Button from "../components/shared/Button";
import useAuth from "../contexts/AuthContext";

function AddListing() {
  const { user } = useAuth();
  const navigate = useNavigate();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const lifestylePreferences = lifestyleOptions.filter(option => formData.getAll('lifestylePreferences').includes(option));
    
    const data = {
      title: formData.get('title'),
      location: formData.get('location'),
      rent: Number(formData.get('rent')),
      roomType: formData.get('roomType'),
      lifestylePreferences,
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

      toast.success("Your listing has been added successfully!");
      navigate('/my-listings');
    } catch (error) {
      console.error('Error adding listing:', error);
      toast.error("Failed to add listing. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-base-content mb-12">Add Listing</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="title" className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., Looking for a roommate in NYC"
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
            placeholder="e.g., Manhattan, NYC"
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
            placeholder="Monthly rent amount"
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
          <div className="grid grid-cols-2 gap-6">
            {lifestyleOptions.map(option => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={option}
                  name="lifestylePreferences"
                  value={option}
                  className="checkbox checkbox-primary"
                />
                <label htmlFor={option} className="text-base-content/70">
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
            placeholder="Describe the room and your lifestyle preferences"
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
            placeholder="Phone number or preferred contact method"
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
            className="select select-bordered w-full"
          >
            <option value="">Select availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-base-content">User Email:</span>
            <span className="text-base-content/70">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-base-content">User Name:</span>
            <span className="text-base-content/70">{user.displayName}</span>
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isLoading}
          >
            {isLoading ? "Adding..." : "Add Listing"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddListing;