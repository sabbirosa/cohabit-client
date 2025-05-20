import { FaComments, FaQuoteLeft, FaSearch, FaShieldAlt, FaStar, FaUserFriends } from "react-icons/fa";
import { useLoaderData } from 'react-router';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Banner1 from "../assets/banner1.jpg";
import Banner2 from "../assets/banner2.jpg";
import Banner3 from "../assets/banner3.jpg";
import Button from "../components/shared/Button";

function Home() {
  const featuredListing = useLoaderData();
  console.log(featuredListing);

  const reviews = [
    {
      name: "Sarah Johnson",
      image: "https://i.pravatar.cc/150?img=1",
      role: "Student",
      rating: 5,
      review: "Found my perfect roommate within a week! The matching system really works, and I love how easy it was to communicate through the platform."
    },
    {
      name: "Michael Chen",
      image: "https://i.pravatar.cc/150?img=2",
      role: "Professional",
      rating: 4,
      review: "As a working professional, I needed a reliable platform to find like-minded roommates. Cohabit made the process smooth and stress-free."
    },
    {
      name: "Emily Rodriguez",
      image: "https://i.pravatar.cc/150?img=3",
      role: "Graduate Student",
      rating: 3,
      review: "The detailed profiles and lifestyle preferences matching helped me find roommates who share my values and daily routines."
    },
    {
      name: "David Kim",
      image: "https://i.pravatar.cc/150?img=4",
      role: "Young Professional",
      rating: 5,
      review: "Verified profiles gave me peace of mind. Found great roommates and made the whole process of moving to a new city much easier."
    }
  ];

  return (
    <div className="min-h-screen min-w-screen">
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
                      {index === 1 && "Match with roommates who share your lifestyle and lifestylePreferences"}
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
                  <span className={`inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full ${
                    listing.availability === "Available" 
                      ? "bg-success/20 text-success"
                      : "bg-error/20 text-error"
                  }`}>
                    {listing.availability}
                  </span>
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
                    {listing.lifestylePreferences.map((pref, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                      >
                        {pref}
                      </span>
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
                    {listing.likeCount || 0} likes
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <Button 
                    to={`/listings/${listing._id}`} 
                    variant="primary" 
                    size="sm"
                    className="min-w-24 flex items-center justify-center"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Cohabit Section */}
      <div className="bg-primary/10 mx-auto">
        <div className="py-16 max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Cohabit?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FaShieldAlt className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Verified Profiles</h3>
                    <p className="text-base-content/70">Every user goes through our verification process to ensure a safe and trustworthy community.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FaUserFriends className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                    <p className="text-base-content/70">Our advanced algorithm matches you with roommates based on lifestyle, preferences, and compatibility.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FaSearch className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Detailed Listings</h3>
                    <p className="text-base-content/70">Comprehensive listing details with photos, amenities, and all the information you need to make a decision.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="card-body">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <FaComments className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Easy Communication</h3>
                    <p className="text-base-content/70">Built-in messaging system makes it simple to connect and coordinate with potential roommates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
              Hear from people who found their perfect living situation through Cohabit
            </p>
          </div>

          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            loop={true}
            speed={2000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              reverseDirection: false
            }}
            modules={[Autoplay]}
            className="pb-12"
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-base-100 p-6 rounded-[var(--radius-box)] shadow-lg border border-primary/20">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={review.image} 
                      alt={review.name} 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-base-content/70">{review.role}</p>
                    </div>
                  </div>
                  <div className="flex text-warning mb-3">
                    {[...Array(5)].map((_, i) => (
                      <FaStar 
                        key={i} 
                        className={i < review.rating ? 'text-warning' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <div className="relative">
                    <FaQuoteLeft className="absolute -top-3 -left-2 text-3xl text-primary/10" />
                    <p className="text-base-content/70 pl-6">{review.review}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Join Now Section */}
      <div className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Find Your Perfect Match?</h2>
          <p className="mb-8 text-lg">Join our community of roommates and find your ideal living situation today.</p>
          <div className="flex gap-4 justify-center">
            <Button 
              to="/register" 
              variant="primary"
              className="min-w-32 flex items-center justify-center"
            >
              Sign Up Now
            </Button>
            <Button 
              to="/browse" 
              variant="outline"
              className="min-w-32 flex items-center justify-center"
            >
              Browse Listings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;