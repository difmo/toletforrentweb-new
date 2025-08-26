import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import SearchFilters from './components/SearchFilters';
import PropertyList from './components/PropertyList';
import MapView from './components/MapView';
import AIRecommendations from './components/AIRecommendations';
import ComparisonTool from './components/ComparisonTool';
import SavedSearches from './components/SavedSearches';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const AdvancedSearchDiscovery = () => {
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'map'
  const [showFilters, setShowFilters] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');

  const [filters, setFilters] = useState({
    location: 'Manhattan, NY',
    propertyType: 'any',
    minPrice: '',
    maxPrice: '',
    bedrooms: 'any',
    bathrooms: 'any',
    responseTime: 'any',
    verifiedOnly: false,
    instantBooking: false,
    petFriendly: false,
    furnished: false,
    parking: false,
    gym: false,
    pool: false,
    laundry: false
  });

  // Mock data
  const mockProperties = [
    {
      id: 1,
      title: "Modern 2BR Apartment in Financial District",
      location: "Financial District, Manhattan",
      price: 4200,
      originalPrice: 4500,
      bedrooms: 2,
      bathrooms: 2,
      area: 1100,
      rating: 4.8,
      reviewCount: 24,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop"
      ],
      coordinates: { lat: 40.7074, lng: -74.0113 },
      isVerified: true,
      instantBooking: true,
      isNew: true,
      isFavorited: false,
      amenities: ["Gym", "Doorman", "Rooftop", "Laundry", "Pet Friendly"],
      owner: {
        name: "Sarah Chen",
        avatar: "https://randomuser.me/api/portraits/women/32.jpg",
        responseTime: "instant"
      },
      communityRating: 4.6,
      recentActivity: "3 people viewed today"
    },
    {
      id: 2,
      title: "Cozy Studio with City Views",
      location: "Upper East Side, Manhattan",
      price: 2800,
      bedrooms: 0,
      bathrooms: 1,
      area: 650,
      rating: 4.5,
      reviewCount: 18,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop"
      ],
      coordinates: { lat: 40.7736, lng: -73.9566 },
      isVerified: true,
      instantBooking: false,
      isNew: false,
      isFavorited: true,
      amenities: ["Elevator", "Laundry", "Balcony"],
      owner: {
        name: "Michael Rodriguez",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        responseTime: "1hour"
      },
      communityRating: 4.3,
      recentActivity: "Booked 2 days ago"
    },
    {
      id: 3,
      title: "Luxury 3BR Penthouse with Terrace",
      location: "SoHo, Manhattan",
      price: 8500,
      bedrooms: 3,
      bathrooms: 3,
      area: 2200,
      rating: 4.9,
      reviewCount: 31,
      images: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop"
      ],
      coordinates: { lat: 40.7230, lng: -74.0030 },
      isVerified: true,
      instantBooking: true,
      isNew: false,
      isFavorited: false,
      amenities: ["Terrace", "Fireplace", "Wine Cellar", "Concierge", "Parking"],
      owner: {
        name: "David Kim",
        avatar: "https://randomuser.me/api/portraits/men/28.jpg",
        responseTime: "instant"
      },
      communityRating: 4.8,
      recentActivity: "Featured property"
    },
    {
      id: 4,
      title: "Charming 1BR in Historic Building",
      location: "Greenwich Village, Manhattan",
      price: 3200,
      bedrooms: 1,
      bathrooms: 1,
      area: 750,
      rating: 4.4,
      reviewCount: 12,
      images: [
        "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=800&h=600&fit=crop"
      ],
      coordinates: { lat: 40.7335, lng: -74.0027 },
      isVerified: false,
      instantBooking: false,
      isNew: true,
      isFavorited: false,
      amenities: ["Hardwood Floors", "High Ceilings", "Exposed Brick"],
      owner: {
        name: "Emma Thompson",
        avatar: "https://randomuser.me/api/portraits/women/55.jpg",
        responseTime: "24hours"
      },
      communityRating: 4.1,
      recentActivity: "Price reduced yesterday"
    },
    {
      id: 5,
      title: "Modern 2BR with Amenities",
      location: "Midtown West, Manhattan",
      price: 5200,
      bedrooms: 2,
      bathrooms: 2,
      area: 1300,
      rating: 4.7,
      reviewCount: 28,
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571624436279-b272aff752b5?w=800&h=600&fit=crop"
      ],
      coordinates: { lat: 40.7589, lng: -73.9851 },
      isVerified: true,
      instantBooking: true,
      isNew: false,
      isFavorited: false,
      amenities: ["Pool", "Gym", "Concierge", "Parking", "Pet Friendly"],
      owner: {
        name: "James Wilson",
        avatar: "https://randomuser.me/api/portraits/men/38.jpg",
        responseTime: "1hour"
      },
      communityRating: 4.5,
      recentActivity: "5 people viewed today"
    },
    {
      id: 6,
      title: "Spacious 4BR Family Home",
      location: "Brooklyn Heights, Brooklyn",
      price: 6800,
      bedrooms: 4,
      bathrooms: 3,
      area: 2800,
      rating: 4.6,
      reviewCount: 19,
      images: [
        "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop"
      ],
      coordinates: { lat: 40.6962, lng: -73.9942 },
      isVerified: true,
      instantBooking: false,
      isNew: false,
      isFavorited: true,
      amenities: ["Garden", "Parking", "Fireplace", "Storage"],
      owner: {
        name: "Lisa Anderson",
        avatar: "https://randomuser.me/api/portraits/women/42.jpg",
        responseTime: "instant"
      },
      communityRating: 4.4,
      recentActivity: "Available next month"
    }
  ];

  const mockRecommendations = [
    {
      id: 101,
      title: "AI Recommended: 2BR Near Central Park",
      location: "Upper West Side, Manhattan",
      price: 4800,
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      rating: 4.7,
      images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop"],
      aiReason: `Based on your search for 2-bedroom apartments in Manhattan with a budget around $4000-5000, this property offers excellent value with premium amenities and great location near Central Park.`,
      matchingCriteria: ["2 bedrooms", "Manhattan", "Price range", "High rating"],
      matchScore: 92,
      feedback: null
    },
    {
      id: 102,
      title: "Perfect Match: Modern Studio Downtown",
      location: "Financial District, Manhattan",
      price: 3200,
      bedrooms: 0,
      bathrooms: 1,
      area: 700,
      rating: 4.5,
      images: ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop"],
      aiReason: `Your preference for modern amenities and downtown location makes this studio an ideal match. The building offers the gym and doorman services you've shown interest in.`,
      matchingCriteria: ["Modern amenities", "Downtown", "Gym", "Doorman"],
      matchScore: 88,
      feedback: null
    }
  ];

  const mockSavedSearches = [
    {
      id: 1,
      name: "2BR Manhattan Under $5000",
      criteria: "2 bedrooms, Manhattan, $3000-5000, Gym, Pet Friendly",
      frequency: "daily",
      createdAt: "2025-01-15",
      lastAlert: "2025-01-21",
      newResults: 3
    },
    {
      id: 2,
      name: "Brooklyn Family Homes",
      criteria: "3+ bedrooms, Brooklyn, $4000-8000, Parking, Garden",
      frequency: "weekly",
      createdAt: "2025-01-10",
      lastAlert: "2025-01-20",
      newResults: 0
    }
  ];

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => setIsLoading(false), 1000);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      propertyType: 'any',
      minPrice: '',
      maxPrice: '',
      bedrooms: 'any',
      bathrooms: 'any',
      responseTime: 'any',
      verifiedOnly: false,
      instantBooking: false,
      petFriendly: false,
      furnished: false,
      parking: false,
      gym: false,
      pool: false,
      laundry: false
    };
    setFilters(clearedFilters);
  };

  const handleFavorite = (propertyId) => {
    // Mock favorite toggle
    console.log('Toggle favorite for property:', propertyId);
  };

  const handleMessage = (propertyId) => {
    // Mock message owner
    console.log('Message owner for property:', propertyId);
  };

  const handleCompare = (propertyId) => {
    setCompareList(prev => {
      if (prev?.includes(propertyId)) {
        return prev?.filter(id => id !== propertyId);
      } else if (prev?.length < 3) {
        return [...prev, propertyId];
      }
      return prev;
    });
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleCreateAlert = (alertData) => {
    console.log('Create search alert:', alertData);
  };

  const handleDeleteSearch = (searchId) => {
    console.log('Delete saved search:', searchId);
  };

  const handleEditSearch = (searchId) => {
    console.log('Edit saved search:', searchId);
  };

  const handleRecommendationFeedback = (propertyId, isHelpful) => {
    console.log('Recommendation feedback:', propertyId, isHelpful);
  };

  const handleDismissRecommendation = (propertyId) => {
    console.log('Dismiss recommendation:', propertyId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Search Header */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <Input
                    type="text"
                    placeholder="Search by location, property type, or keywords..."
                    value={filters?.location}
                    onChange={(e) => handleFiltersChange({ ...filters, location: e?.target?.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowFilters(!showFilters)}
                  iconName="Filter"
                  iconPosition="left"
                  className="lg:hidden"
                >
                  Filters
                </Button>
                
                <div className="flex items-center border border-border rounded-lg p-1">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    iconName="List"
                  >
                    List
                  </Button>
                  <Button
                    variant={viewMode === 'map' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('map')}
                    iconName="Map"
                  >
                    Map
                  </Button>
                </div>

                {compareList?.length > 0 && (
                  <Button
                    variant="outline"
                    onClick={() => setShowComparison(true)}
                    iconName="GitCompare"
                    iconPosition="left"
                  >
                    Compare ({compareList?.length})
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-6">
            {/* Sidebar - Filters & Recommendations */}
            <div className="hidden lg:block w-80 space-y-6">
              <SearchFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                isVisible={true}
                onToggle={() => {}}
              />
              
              <AIRecommendations
                recommendations={mockRecommendations}
                onDismiss={handleDismissRecommendation}
                onFeedback={handleRecommendationFeedback}
              />
              
              <SavedSearches
                savedSearches={mockSavedSearches}
                onCreateAlert={handleCreateAlert}
                onDeleteSearch={handleDeleteSearch}
                onEditSearch={handleEditSearch}
              />
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {viewMode === 'list' ? (
                <PropertyList
                  properties={mockProperties}
                  onFavorite={handleFavorite}
                  onMessage={handleMessage}
                  onCompare={handleCompare}
                  compareList={compareList}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  isLoading={isLoading}
                />
              ) : (
                <div className="h-[calc(100vh-200px)] rounded-lg overflow-hidden">
                  <MapView
                    properties={mockProperties}
                    selectedProperty={selectedProperty}
                    onPropertySelect={handlePropertySelect}
                    onToggleView={() => setViewMode('list')}
                    isVisible={true}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Filters */}
      <SearchFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
        isVisible={showFilters}
        onToggle={() => setShowFilters(!showFilters)}
      />
      {/* Comparison Tool */}
      <ComparisonTool
        compareList={compareList}
        properties={mockProperties}
        onRemove={(id) => setCompareList(prev => prev?.filter(item => item !== id))}
        onClear={() => setCompareList([])}
        isVisible={showComparison}
        onToggle={() => setShowComparison(!showComparison)}
      />
      {/* Mobile Compare Button */}
      {compareList?.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 lg:hidden">
          <Button
            variant="default"
            onClick={() => setShowComparison(true)}
            iconName="GitCompare"
            iconPosition="left"
            className="brand-gradient text-white shadow-overlay"
          >
            Compare ({compareList?.length})
          </Button>
        </div>
      )}
    </div>
  );
};

export default AdvancedSearchDiscovery;