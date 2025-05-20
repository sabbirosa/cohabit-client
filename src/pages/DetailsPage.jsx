import { useState } from "react";
import { FaBed, FaDollarSign, FaHeart, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useLoaderData } from "react-router";
import Swal from "sweetalert2";
import Button from "../components/shared/Button";
import useAuth from "../contexts/AuthContext";

function DetailsPage() {
  const { user } = useAuth();
  const listingDetails = useLoaderData();
  const [hasLiked, setHasLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(listingDetails.likeCount || 0);

  const handleLike = async () => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Please Login",
        text: "You need to be logged in to like listings",
      });
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URI}/listings/${listingDetails._id}/like`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userEmail: user.email }),
      });

      if (!response.ok) {
        throw new Error('Failed to like listing');
      }

      setHasLiked(true);
      setLikeCount(prev => prev + 1);
    } catch (error) {
      console.error('Error liking listing:', error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to like listing. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-primary/5 rounded-[var(--radius-box)] shadow-xl border border-primary/20 overflow-hidden">
        <div className="p-8 bg-primary/5">
          <div className="text-center mb-8">
            <p className="text-xl text-base-content/70 mb-4">
              {likeCount} people interested in
            </p>
            <h1 className="text-3xl font-bold text-base-content">
              {listingDetails.title}
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center text-base-content/70">
                <FaMapMarkerAlt className="w-5 h-5 mr-3 text-primary" />
                <span>{listingDetails.location}</span>
              </div>
              
              <div className="flex items-center text-base-content/70">
                <FaBed className="w-5 h-5 mr-3 text-primary" />
                <span>{listingDetails.roomType}</span>
              </div>
              
              <div className="flex items-center text-base-content/70">
                <FaDollarSign className="w-5 h-5 mr-3 text-primary" />
                <span>${listingDetails.rent}/month</span>
              </div>

              <div className="text-base-content/70">
                <span className="font-semibold">Availability:</span>{" "}
                <span className={`${
                  listingDetails.availability === "Available" 
                    ? "text-success" 
                    : "text-error"
                }`}>
                  {listingDetails.availability}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-base-content/70">
                <span className="font-semibold">Posted by:</span>{" "}
                <span>{listingDetails.userName}</span>
              </div>
              
              <div className="text-base-content/70">
                <span className="font-semibold">Email:</span>{" "}
                <span>{listingDetails.userEmail}</span>
              </div>

              {hasLiked && (
                <div className="text-base-content/70">
                  <span className="font-semibold">Contact:</span>{" "}
                  <div className="flex items-center mt-1">
                    <FaPhone className="w-4 h-4 mr-2 text-primary" />
                    <span>{listingDetails.contact}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-base-content mb-4">Lifestyle Preferences</h3>
            <div className="flex flex-wrap gap-3">
              {listingDetails.lifestylePreferences?.map((pref, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full"
                >
                  {pref}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xl font-semibold text-base-content mb-4">Description</h3>
            <p className="text-base-content/70 whitespace-pre-line">
              {listingDetails.description}
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={handleLike}
              disabled={hasLiked}
              variant={hasLiked ? "success" : "primary"}
              className="gap-2"
            >
              <FaHeart className="w-5 h-5" />
              <span>{hasLiked ? "Liked" : "Like"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;