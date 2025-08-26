import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveMapPreview = () => {
  const [selectedCity, setSelectedCity] = useState('new-york');
  const [hoveredProperty, setHoveredProperty] = useState(null);

  const cities = [
    { id: 'new-york', name: 'New York', properties: 2847, avgPrice: 2850 },
    { id: 'san-francisco', name: 'San Francisco', properties: 1234, avgPrice: 3200 },
    { id: 'chicago', name: 'Chicago', properties: 1876, avgPrice: 1950 },
    { id: 'boston', name: 'Boston', properties: 987, avgPrice: 2450 },
    { id: 'los-angeles', name: 'Los Angeles', properties: 2156, avgPrice: 2650 }
  ];

  const properties = {
    'new-york': [
      { id: 1, lat: 40.7589, lng: -73.9851, price: 2800, type: '2BR', neighborhood: 'Times Square', available: true },
      { id: 2, lat: 40.7505, lng: -73.9934, price: 3200, type: '1BR', neighborhood: 'Chelsea', available: true },
      { id: 3, lat: 40.7282, lng: -74.0776, price: 2400, type: 'Studio', neighborhood: 'SoHo', available: false },
      { id: 4, lat: 40.7614, lng: -73.9776, price: 2900, type: '2BR', neighborhood: 'Upper East Side', available: true },
      { id: 5, lat: 40.7831, lng: -73.9712, price: 2600, type: '1BR', neighborhood: 'Upper West Side', available: true }
    ],
    'san-francisco': [
      { id: 6, lat: 37.7749, lng: -122.4194, price: 3800, type: '1BR', neighborhood: 'Mission District', available: true },
      { id: 7, lat: 37.7849, lng: -122.4094, price: 4200, type: '2BR', neighborhood: 'SOMA', available: true },
      { id: 8, lat: 37.7949, lng: -122.3994, price: 3600, type: 'Studio', neighborhood: 'Castro', available: false }
    ],
    'chicago': [
      { id: 9, lat: 41.8781, lng: -87.6298, price: 2200, type: '2BR', neighborhood: 'The Loop', available: true },
      { id: 10, lat: 41.8881, lng: -87.6198, price: 1800, type: '1BR', neighborhood: 'River North', available: true }
    ],
    'boston': [
      { id: 11, lat: 42.3601, lng: -71.0589, price: 2800, type: '1BR', neighborhood: 'Back Bay', available: true },
      { id: 12, lat: 42.3501, lng: -71.0689, price: 2400, type: 'Studio', neighborhood: 'Beacon Hill', available: true }
    ],
    'los-angeles': [
      { id: 13, lat: 34.0522, lng: -118.2437, price: 2900, type: '2BR', neighborhood: 'Downtown LA', available: true },
      { id: 14, lat: 34.0622, lng: -118.2337, price: 2600, type: '1BR', neighborhood: 'Hollywood', available: false }
    ]
  };

  const selectedCityData = cities?.find(city => city?.id === selectedCity);
  const cityProperties = properties?.[selectedCity] || [];

  const getPriceColor = (price) => {
    if (price < 2000) return 'bg-green-500';
    if (price < 2500) return 'bg-yellow-500';
    if (price < 3000) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Explore Properties by Location
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover available rentals across major cities with our interactive map. See real-time pricing, availability, and neighborhood insights.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* City Selection */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Select City</h3>
            <div className="space-y-2">
              {cities?.map((city) => (
                <button
                  key={city?.id}
                  onClick={() => setSelectedCity(city?.id)}
                  className={`w-full text-left p-4 rounded-xl border smooth-transition ${
                    selectedCity === city?.id
                      ? 'border-blue-500 bg-blue-50 text-blue-900' :'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{city?.name}</div>
                      <div className="text-sm text-gray-500">
                        {city?.properties} properties
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">${city?.avgPrice}</div>
                      <div className="text-sm text-gray-500">avg/month</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Price Legend */}
            <div className="mt-8 p-4 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                {[
                  { range: 'Under $2,000', color: 'bg-green-500' },
                  { range: '$2,000 - $2,500', color: 'bg-yellow-500' },
                  { range: '$2,500 - $3,000', color: 'bg-orange-500' },
                  { range: 'Over $3,000', color: 'bg-red-500' }
                ]?.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${item?.color}`} />
                    <span className="text-sm text-gray-600">{item?.range}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map Preview */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-96 lg:h-[500px]">
              {/* Mock Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-gray-100 to-green-100">
                <div className="absolute inset-0 opacity-20">
                  <svg width="100%" height="100%" viewBox="0 0 400 300">
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                </div>
              </div>

              {/* Property Markers */}
              {cityProperties?.map((property, index) => (
                <div
                  key={property?.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  style={{
                    left: `${20 + (index * 15) % 60}%`,
                    top: `${30 + (index * 12) % 40}%`
                  }}
                  onMouseEnter={() => setHoveredProperty(property)}
                  onMouseLeave={() => setHoveredProperty(null)}
                >
                  <div className={`w-8 h-8 rounded-full ${getPriceColor(property?.price)} ${
                    property?.available ? 'opacity-100' : 'opacity-50'
                  } shadow-lg hover:scale-125 smooth-transition flex items-center justify-center`}>
                    <Icon name="Home" size={16} className="text-white" />
                  </div>
                  
                  {/* Property Tooltip */}
                  {hoveredProperty?.id === property?.id && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-3 min-w-48 z-10">
                      <div className="text-sm font-semibold text-gray-900">
                        {property?.neighborhood}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {property?.type} • ${property?.price}/month
                      </div>
                      <div className={`text-xs font-medium ${
                        property?.available ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {property?.available ? 'Available Now' : 'Not Available'}
                      </div>
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white" />
                    </div>
                  )}
                </div>
              ))}

              {/* Map Controls */}
              <div className="absolute top-4 right-4 flex flex-col space-y-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 smooth-transition">
                  <Icon name="Plus" size={16} className="text-gray-600" />
                </button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 smooth-transition">
                  <Icon name="Minus" size={16} className="text-gray-600" />
                </button>
              </div>

              {/* City Info Overlay */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <h4 className="font-semibold text-gray-900">{selectedCityData?.name}</h4>
                <div className="text-sm text-gray-600 mt-1">
                  {selectedCityData?.properties} properties available
                </div>
                <div className="text-sm font-medium text-blue-600 mt-1">
                  Avg: ${selectedCityData?.avgPrice}/month
                </div>
              </div>
            </div>

            {/* Map Actions */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <Link to="/advanced-search-discovery" className="flex-1">
                <Button 
                  variant="default" 
                  size="lg" 
                  fullWidth
                  className="brand-gradient text-white"
                  iconName="Search"
                  iconPosition="left"
                >
                  View All Properties
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg" 
                className="flex-1"
                iconName="MapPin"
                iconPosition="left"
              >
                Enable Location
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMapPreview;