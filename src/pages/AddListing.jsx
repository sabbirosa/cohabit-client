import { useState } from "react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
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
    "Vegan",
  ];

  const roomTypes = ["Single", "Shared", "Master", "Studio"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const lifestylePreferences = lifestyleOptions.filter((option) =>
      formData.getAll("lifestylePreferences").includes(option)
    );

    const data = {
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
      likeCount: 0,
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/listings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to add listing");
      }

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Your listing has been added successfully!',
        timer: 1500,
        showConfirmButton: false
      });
      navigate("/my-listings");
    } catch (error) {
      console.error("Error adding listing:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add listing. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-base-content mb-12">
        Add Listing
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-primary/5 p-8 rounded-lg"
      >
        <div>
          <label htmlFor="title" className="label">
            <span className="label-text text-base-content">Title</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="e.g., Looking for a roommate in NYC"
            className="input input-bordered w-full bg-primary/5 border-primary/20"
          />
        </div>

        <div>
          <label htmlFor="location" className="label">
            <span className="label-text text-base-content">Location</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            placeholder="e.g., Manhattan, NYC"
            className="input input-bordered w-full bg-primary/5 border-primary/20"
          />
        </div>

        <div>
          <label htmlFor="rent" className="label">
            <span className="label-text text-base-content">Rent Amount</span>
          </label>
          <input
            type="number"
            id="rent"
            name="rent"
            required
            min="0"
            placeholder="Monthly rent amount"
            className="input input-bordered w-full bg-primary/5 border-primary/20"
          />
        </div>

        <div>
          <label htmlFor="roomType" className="label">
            <span className="label-text text-base-content">Room Type</span>
          </label>
          <select
            id="roomType"
            name="roomType"
            required
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
          <div className="grid grid-cols-2 gap-6">
            {lifestyleOptions.map((option) => (
              <div key={option} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={option}
                  name="lifestylePreferences"
                  value={option}
                  className="checkbox checkbox-primary rounded-box border-primary/20"
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
            <span className="label-text text-base-content">Description</span>
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows="4"
            placeholder="Describe the room and your lifestyle preferences"
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
            placeholder="Phone number or preferred contact method"
            className="input input-bordered w-full bg-primary/5 border-primary/20"
          />
        </div>

        <div>
          <label htmlFor="availability" className="label">
            <span className="label-text text-base-content">Availability</span>
          </label>
          <select
            id="availability"
            name="availability"
            required
            className="select select-bordered w-full bg-primary/5 border-primary/20"
          >
            <option value="">Select availability</option>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>

        <div>
          <label htmlFor="userName" className="label">
            <span className="label-text text-base-content">User Name</span>
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
            <span className="label-text text-base-content">User Email</span>
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="input input-bordered w-full bg-primary/5 border-primary/20 cursor-not-allowed"
          />

          {/* <div className="flex items-center space-x-3">
            <span className="text-base-content">User Email:</span>
            <span className="text-base-content/70">{user.email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-base-content">User Name:</span>
            <span className="text-base-content/70">{user.displayName}</span>
          </div> */}
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
