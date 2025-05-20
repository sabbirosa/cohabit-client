import Lottie from 'lottie-react';
import { useLoaderData } from 'react-router';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import searchLottie from '../assets/animations/search.json';
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import Button from "../components/shared/Button";

function Home() {
  const featuredListing = useLoaderData();
  console.log(featuredListing);

  return (
    <div className="min-h-screen">
      {/* Banner Carousel */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Swiper
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          navigation
          modules={[Autoplay, Pagination, Navigation]}
          className="rounded-2xl overflow-hidden shadow-lg"
        >
          {[Banner1, Banner2, Banner3].map((banner, index) => (
            <SwiperSlide key={index}>
              <div className="relative">
                <img
                  src={banner}
                  className="w-full h-[300px] md:h-[450px] object-cover"
                  alt={`Banner ${index + 1}`}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white px-4">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                      {index === 0 && "Find Your Perfect Living Space"}
                      {index === 1 && "Connect with Compatible Roommates"}
                      {index === 2 && "Make Your House a Home"}
                    </h2>
                    <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
                      {index === 0 && "Browse through our curated listings to find your ideal home"}
                      {index === 1 && "Match with roommates who share your lifestyle and preferences"}
                      {index === 2 && "Create lasting connections in a space you'll love"}
                    </p>
                    <Button to="/browse" variant="primary">Start Browsing</Button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Featured Listings Section */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredListing.map((listing) => (
            <div key={listing._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <h2 className="card-title text-xl font-bold">{listing.title}</h2>
                  <div className="badge badge-primary">{listing.availability}</div>
                </div>
                <div className="space-y-3">
                  <p className="text-lg font-semibold text-primary">৳{listing.rent}/month</p>
                  <p className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {listing.location}
                  </p>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="font-medium">{listing.roomType}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {listing.preferences.map((pref, index) => (
                      <span key={index} className="badge badge-outline">{pref}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                    </svg>
                    {listing.userName}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {listing.likeCount} likes
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Button to={`/listings/${listing._id}`} variant="primary" size="sm">View Details</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-base-200 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h3 className="text-xl font-bold">Create Your Listing</h3>
                    <p>List your space or requirements in detail</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h3 className="text-xl font-bold">Connect with Matches</h3>
                    <p>Find and connect with compatible roommates</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h3 className="text-xl font-bold">Make It Official</h3>
                    <p>Finalize arrangements with your new roommate</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <Lottie 
                animationData={searchLottie} 
                className="max-w-[500px] mx-auto"
                loop={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Join Now Section */}
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="mb-8 text-lg">Join our community of roommates and find your ideal living situation today.</p>
          <div className="flex gap-4 justify-center">
            <Button to="/register" variant="primary">Sign Up Now</Button>
            <Button to="/browse" variant="outline">Browse Listings</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;