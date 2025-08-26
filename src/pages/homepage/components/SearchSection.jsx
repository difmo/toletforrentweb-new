import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const popularNeighborhoods = [
    { name: 'Manhattan, NY', properties: 342, avgPrice: '$3,200' },
    { name: 'Brooklyn, NY', properties: 567, avgPrice: '$2,800' },
    { name: 'Mission District, SF', properties: 189, avgPrice: '$3,800' },
    { name: 'West Loop, Chicago', properties: 234, avgPrice: '$2,400' },
    { name: 'Back Bay, Boston', properties: 156, avgPrice: '$2,900' }
  ];

  const recentSearches = [
    '2 bedroom apartment Manhattan',
    'Studio downtown Chicago',
    'Pet-friendly Brooklyn'
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/advanced-search-discovery?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
    navigate(`/advanced-search-discovery?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Start Your Search
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find your perfect rental with our intelligent search. We'll help you discover properties that match your lifestyle and budget.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="Search" size={20} className="text-gray-400" />
              </div>
              <Input
                type="text"
                placeholder="Search by location, neighborhood, or property type..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e?.target?.value);
                  setShowSuggestions(e?.target?.value?.length > 0);
                }}
                onFocus={() => setShowSuggestions(searchQuery?.length > 0)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-12 pr-32 h-14 text-lg rounded-2xl border-2 border-gray-200 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <Button
                  type="submit"
                  variant="default"
                  size="default"
                  className="brand-gradient text-white rounded-xl"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Search Suggestions */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                {recentSearches?.length > 0 && (
                  <div className="p-4 border-b border-gray-100">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                      Recent Searches
                    </h4>
                    <div className="space-y-2">
                      {recentSearches?.map((search, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(search)}
                          className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-gray-50 smooth-transition"
                        >
                          <Icon name="Clock" size={16} className="text-gray-400" />
                          <span className="text-gray-700">{search}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-4">
                  <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
                    Popular Neighborhoods
                  </h4>
                  <div className="space-y-2">
                    {popularNeighborhoods?.slice(0, 4)?.map((neighborhood, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(neighborhood?.name)}
                        className="flex items-center justify-between w-full text-left p-2 rounded-lg hover:bg-gray-50 smooth-transition"
                      >
                        <div className="flex items-center space-x-3">
                          <Icon name="MapPin" size={16} className="text-blue-500" />
                          <div>
                            <div className="text-gray-900 font-medium">{neighborhood?.name}</div>
                            <div className="text-sm text-gray-500">{neighborhood?.properties} properties</div>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                          {neighborhood?.avgPrice}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'Studio', icon: 'Home' },
            { label: '1 Bedroom', icon: 'Bed' },
            { label: '2+ Bedrooms', icon: 'Building' },
            { label: 'Pet Friendly', icon: 'Heart' },
            { label: 'Furnished', icon: 'Sofa' },
            { label: 'Parking', icon: 'Car' }
          ]?.map((filter, index) => (
            <button
              key={index}
              onClick={() => navigate(`/advanced-search-discovery?filter=${filter?.label?.toLowerCase()?.replace(' ', '-')}`)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm font-medium text-gray-700 smooth-transition"
            >
              <Icon name={filter?.icon} size={16} />
              <span>{filter?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchSection;