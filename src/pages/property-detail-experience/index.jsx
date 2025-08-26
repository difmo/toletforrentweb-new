import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PropertyGallery from './components/PropertyGallery';
import PropertyOverview from './components/PropertyOverview';
import OwnerProfile from './components/OwnerProfile';
import AmenitiesSection from './components/AmenitiesSection';
import NeighborhoodInsights from './components/NeighborhoodInsights';
import ReviewsSection from './components/ReviewsSection';
import PricingTransparency from './components/PricingTransparency';
import SimilarProperties from './components/SimilarProperties';
import ContactActions from './components/ContactActions';
import Icon from '../../components/AppIcon';

const PropertyDetailExperience = () => {
  const [searchParams] = useSearchParams();
  const propertyId = searchParams?.get('id') || '1';
  const [loading, setLoading] = useState(true);

  // Mock property data
  const propertyData = {
    id: propertyId,
    title: "Luxury 2BR Apartment in Downtown Manhattan",
    address: "123 Broadway Street, New York, NY 10001",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    rent: 4500,
    deposit: 4500,
    rating: 4.8,
    reviews: 127,
    availability: "Dec 15, 2024",
    responseTime: "2 hours",
    description: `Experience luxury living in this stunning 2-bedroom, 2-bathroom apartment located in the heart of Downtown Manhattan. This modern unit features floor-to-ceiling windows with breathtaking city views, premium finishes throughout, and an open-concept layout perfect for both relaxation and entertaining.\n\nThe gourmet kitchen boasts stainless steel appliances, quartz countertops, and custom cabinetry. The master suite includes a walk-in closet and spa-like ensuite bathroom. Building amenities include 24/7 concierge, fitness center, rooftop terrace, and resident lounge.\n\nLocated just steps from world-class dining, shopping, and transportation, this property offers the ultimate urban lifestyle experience.`,
    features: [
      "Floor-to-ceiling windows",
      "Hardwood floors throughout",
      "In-unit washer/dryer",
      "Central air conditioning",
      "Dishwasher included",
      "Walk-in closets",
      "Private balcony",
      "Pet-friendly building",
      "24/7 doorman",
      "Fitness center access",
      "Rooftop terrace",
      "Storage unit included"
    ],
    images: [
      {
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        caption: "Living Room"
      },
      {
        url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        caption: "Kitchen"
      },
      {
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        caption: "Master Bedroom"
      },
      {
        url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        caption: "Bathroom"
      },
      {
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        caption: "Building Exterior"
      },
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        caption: "Rooftop Terrace"
      }
    ]
  };

  const ownerData = {
    name: "Sarah Johnson",
    title: "Property Manager & Real Estate Professional",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    verified: true,
    rating: 4.9,
    reviewCount: 89,
    responseTime: "2 hours",
    yearsHosting: 5,
    properties: 12,
    responseRate: 98,
    verifications: [
      "Identity verified",
      "Phone verified",
      "Email verified",
      "Government ID"
    ],
    bio: `I'm a dedicated property manager with over 5 years of experience in Manhattan real estate. I pride myself on providing exceptional service to both property owners and tenants. My goal is to make your rental experience as smooth and enjoyable as possible.\n\nI believe in transparent communication and quick responses to ensure all your needs are met promptly.`,
    languages: ["English", "Spanish", "French"]
  };

  const amenitiesData = [
    { name: "WiFi", description: "High-speed internet included", available: true },
    { name: "Air Conditioning", description: "Central AC throughout", available: true },
    { name: "Heating", description: "Central heating system", available: true },
    { name: "Kitchen", description: "Fully equipped modern kitchen", available: true },
    { name: "Washer", description: "In-unit washer", available: true },
    { name: "Dryer", description: "In-unit dryer", available: true },
    { name: "Parking", description: "Garage parking available", available: true },
    { name: "Pool", description: "Rooftop pool access", available: false },
    { name: "Gym", description: "24/7 fitness center", available: true },
    { name: "Pet Friendly", description: "Cats and small dogs allowed", available: true },
    { name: "Balcony", description: "Private balcony with city views", available: true },
    { name: "Security", description: "24/7 doorman and security", available: true },
    { name: "Elevator", description: "High-speed elevators", available: true },
    { name: "Furnished", description: "Optional furniture package", available: true },
    { name: "Dishwasher", description: "Built-in dishwasher", available: true },
    { name: "Microwave", description: "Built-in microwave", available: true },
    { name: "TV", description: "Smart TV in living room", available: true },
    { name: "Workspace", description: "Dedicated work area", available: true }
  ];

  const neighborhoodData = {
    name: "Downtown Manhattan",
    coordinates: { lat: 40.7589, lng: -73.9851 },
    description: `Downtown Manhattan is the bustling heart of New York City, offering an unparalleled urban lifestyle. This vibrant neighborhood combines historic charm with modern sophistication, featuring world-class dining, shopping, and entertainment options just steps from your door.\n\nWith excellent public transportation connections and walkable streets, you'll have easy access to all of NYC's attractions while enjoying the energy and convenience of downtown living.`,
    walkScore: 98,
    bikeScore: 85,
    transitScore: 95,
    noiseLevel: "Moderate",
    transport: [
      {
        name: "4, 5, 6 Subway Lines",
        description: "Brooklyn Bridge-City Hall Station",
        distance: "0.2 miles",
        walkTime: "3 min walk",
        icon: "Train"
      },
      {
        name: "R, W Subway Lines", 
        description: "City Hall Station",
        distance: "0.3 miles",
        walkTime: "5 min walk",
        icon: "Train"
      },
      {
        name: "Citi Bike Station",
        description: "Multiple stations nearby",
        distance: "0.1 miles",
        walkTime: "2 min walk",
        icon: "Bike"
      },
      {
        name: "Bus Routes",
        description: "M15, M22, M103",
        distance: "0.1 miles",
        walkTime: "1 min walk",
        icon: "Bus"
      }
    ],
    amenities: {
      restaurants: [
        { name: "Stone Street Tavern", distance: "0.2 miles" },
        { name: "The Dead Rabbit", distance: "0.3 miles" },
        { name: "Delmonico\'s", distance: "0.4 miles" },
        { name: "Adrienne\'s Pizza Bar", distance: "0.2 miles" }
      ],
      shopping: [
        { name: "Century 21", distance: "0.3 miles" },
        { name: "Brookfield Place", distance: "0.5 miles" },
        { name: "South Street Seaport", distance: "0.4 miles" },
        { name: "Whole Foods Market", distance: "0.6 miles" }
      ],
      entertainment: [
        { name: "Stone Street Historic District", distance: "0.2 miles" },
        { name: "9/11 Memorial & Museum", distance: "0.5 miles" },
        { name: "Brooklyn Bridge", distance: "0.3 miles" },
        { name: "Battery Park", distance: "0.7 miles" }
      ],
      healthcare: [
        { name: "NewYork-Presbyterian Lower Manhattan", distance: "0.8 miles" },
        { name: "CityMD Urgent Care", distance: "0.4 miles" },
        { name: "CVS Pharmacy", distance: "0.2 miles" }
      ]
    },
    safety: [
      {
        title: "Low Crime Rate",
        description: "Well-patrolled area with excellent safety record",
        icon: "Shield"
      },
      {
        title: "24/7 Activity",
        description: "Busy streets with constant foot traffic",
        icon: "Users"
      },
      {
        title: "Emergency Services",
        description: "Police and fire stations within 0.5 miles",
        icon: "Phone"
      },
      {
        title: "Well-Lit Streets",
        description: "Excellent street lighting throughout",
        icon: "Sun"
      }
    ]
  };

  const reviewsData = [
    {
      id: 1,
      reviewer: {
        name: "Michael Chen",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      },
      rating: 5,
      date: "2024-11-15",
      stayDuration: "1 year lease",
      comment: `Absolutely loved living here! The apartment is exactly as described - modern, clean, and spacious. Sarah was incredibly responsive and helpful throughout my entire lease. The location is unbeatable with easy access to transportation and amazing restaurants nearby.\n\nThe building amenities are top-notch, especially the rooftop terrace with stunning city views. Would definitely recommend to anyone looking for luxury living in Manhattan.`,
      helpful: 12,
      images: []
    },
    {
      id: 2,
      reviewer: {
        name: "Emily Rodriguez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      rating: 5,
      date: "2024-10-28",
      stayDuration: "8 months",
      comment: `This place exceeded all my expectations! The apartment is beautifully designed with high-end finishes and the kitchen is a dream to cook in. Sarah is an exceptional property manager - always available and goes above and beyond to ensure tenant satisfaction.\n\nThe neighborhood is vibrant and safe, with everything you need within walking distance. The building's fitness center and doorman service add great value.`,
      helpful: 8,
      images: []
    },
    {
      id: 3,
      reviewer: {
        name: "David Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      },
      rating: 4,
      date: "2024-09-12",
      stayDuration: "6 months",
      comment: `Great apartment in an excellent location. The space is well-maintained and the amenities are fantastic. My only minor complaint is that it can get a bit noisy on weekends due to the downtown location, but that's expected in this area.\n\nSarah was professional and helpful throughout the leasing process. Overall, a solid choice for Manhattan living.`,
      helpful: 5,
      images: []
    }
  ];

  const pricingData = {
    monthlyRent: 4500,
    securityDeposit: 4500,
    fees: [
      { name: "Application Fee", amount: 100, description: "One-time processing fee" },
      { name: "Broker Fee", amount: 4500, description: "One month\'s rent" },
      { name: "Move-in Fee", amount: 200, description: "Building administrative fee" }
    ],
    paymentOptions: [
      {
        name: "Bank Transfer",
        description: "Direct bank transfer (ACH)",
        fee: "Free",
        icon: "CreditCard"
      },
      {
        name: "Credit Card",
        description: "Visa, MasterCard, American Express",
        fee: "2.9% fee",
        icon: "CreditCard"
      },
      {
        name: "Check",
        description: "Personal or cashier\'s check",
        fee: "Free",
        icon: "FileText"
      }
    ]
  };

  const similarPropertiesData = [
    {
      id: 2,
      title: "Modern 1BR in Financial District",
      location: "Wall Street, New York, NY",
      rent: 3800,
      bedrooms: 1,
      bathrooms: 1,
      area: 850,
      rating: 4.6,
      reviews: 43,
      availability: "Jan 1, 2025",
      verified: true,
      featured: false,
      newListing: true,
      image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 3,
      title: "Spacious 3BR Penthouse",
      location: "Tribeca, New York, NY",
      rent: 8500,
      bedrooms: 3,
      bathrooms: 2,
      area: 1800,
      rating: 4.9,
      reviews: 67,
      availability: "Available Now",
      verified: true,
      featured: true,
      newListing: false,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    },
    {
      id: 4,
      title: "Cozy Studio in SoHo",
      location: "SoHo, New York, NY",
      rent: 2900,
      bedrooms: 0,
      bathrooms: 1,
      area: 500,
      rating: 4.4,
      reviews: 28,
      availability: "Dec 20, 2024",
      verified: true,
      featured: false,
      newListing: false,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-text-secondary">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <span>Home</span>
            <Icon name="ChevronRight" size={16} />
            <span>Search Results</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary">Property Details</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Property Gallery */}
              <PropertyGallery 
                images={propertyData?.images} 
                propertyName={propertyData?.title} 
              />

              {/* Property Overview */}
              <PropertyOverview property={propertyData} />

              {/* Amenities */}
              <AmenitiesSection amenities={amenitiesData} />

              {/* Neighborhood Insights */}
              <NeighborhoodInsights neighborhood={neighborhoodData} />

              {/* Reviews */}
              <ReviewsSection 
                reviews={reviewsData}
                overallRating={propertyData?.rating}
                totalReviews={propertyData?.reviews}
              />

              {/* Similar Properties */}
              <SimilarProperties properties={similarPropertiesData} />
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Contact Actions */}
              <ContactActions property={propertyData} owner={ownerData} />

              {/* Owner Profile */}
              <OwnerProfile owner={ownerData} />

              {/* Pricing Transparency */}
              <PricingTransparency pricing={pricingData} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PropertyDetailExperience;