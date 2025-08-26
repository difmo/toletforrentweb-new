import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SearchFilters = ({ filters, onFiltersChange, onClearFilters, isVisible, onToggle }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'studio', label: 'Studio' },
    { value: 'townhouse', label: 'Townhouse' }
  ];

  const bedroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4+', label: '4+ Bedrooms' }
  ];

  const bathroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1 Bathroom' },
    { value: '2', label: '2 Bathrooms' },
    { value: '3+', label: '3+ Bathrooms' }
  ];

  const responseTimeOptions = [
    { value: 'any', label: 'Any Response Time' },
    { value: 'instant', label: 'Instant Response' },
    { value: '1hour', label: 'Within 1 Hour' },
    { value: '24hours', label: 'Within 24 Hours' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onToggle();
  };

  const handleClearAll = () => {
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
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <div className={`fixed inset-0 z-50 lg:relative lg:inset-auto lg:z-auto ${isVisible ? 'block' : 'hidden lg:block'}`}>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onToggle}></div>
      {/* Filter Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-2xl max-h-[80vh] overflow-y-auto lg:relative lg:bottom-auto lg:rounded-lg lg:max-h-none lg:bg-card lg:border lg:border-border">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h3 className="text-lg font-brand-bold text-text-primary">Filters</h3>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <Icon name="X" size={20} />
            </Button>
          </div>

          <div className="hidden lg:flex items-center justify-between mb-6">
            <h3 className="text-lg font-brand-bold text-text-primary">Search Filters</h3>
            <Button variant="ghost" size="sm" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>

          {/* Location Search */}
          <div className="mb-6">
            <Input
              label="Location"
              type="text"
              placeholder="City, neighborhood, or address"
              value={localFilters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
              className="mb-4"
            />
          </div>

          {/* Property Type */}
          <div className="mb-6">
            <Select
              label="Property Type"
              options={propertyTypes}
              value={localFilters?.propertyType}
              onChange={(value) => handleFilterChange('propertyType', value)}
              className="mb-4"
            />
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block text-sm font-brand-medium text-text-primary mb-3">Price Range</label>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min price"
                value={localFilters?.minPrice}
                onChange={(e) => handleFilterChange('minPrice', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max price"
                value={localFilters?.maxPrice}
                onChange={(e) => handleFilterChange('maxPrice', e?.target?.value)}
              />
            </div>
          </div>

          {/* Bedrooms & Bathrooms */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Select
              label="Bedrooms"
              options={bedroomOptions}
              value={localFilters?.bedrooms}
              onChange={(value) => handleFilterChange('bedrooms', value)}
            />
            <Select
              label="Bathrooms"
              options={bathroomOptions}
              value={localFilters?.bathrooms}
              onChange={(value) => handleFilterChange('bathrooms', value)}
            />
          </div>

          {/* ToletTorrent Specific Filters */}
          <div className="mb-6">
            <Select
              label="Owner Response Time"
              options={responseTimeOptions}
              value={localFilters?.responseTime}
              onChange={(value) => handleFilterChange('responseTime', value)}
              className="mb-4"
            />
          </div>

          {/* Trust & Verification */}
          <div className="mb-6">
            <label className="block text-sm font-brand-medium text-text-primary mb-3">Trust & Safety</label>
            <div className="space-y-3">
              <Checkbox
                label="Verified Properties Only"
                checked={localFilters?.verifiedOnly}
                onChange={(e) => handleFilterChange('verifiedOnly', e?.target?.checked)}
              />
              <Checkbox
                label="Instant Booking Available"
                checked={localFilters?.instantBooking}
                onChange={(e) => handleFilterChange('instantBooking', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Amenities */}
          <div className="mb-6">
            <label className="block text-sm font-brand-medium text-text-primary mb-3">Amenities</label>
            <div className="grid grid-cols-2 gap-3">
              <Checkbox
                label="Pet Friendly"
                checked={localFilters?.petFriendly}
                onChange={(e) => handleFilterChange('petFriendly', e?.target?.checked)}
              />
              <Checkbox
                label="Furnished"
                checked={localFilters?.furnished}
                onChange={(e) => handleFilterChange('furnished', e?.target?.checked)}
              />
              <Checkbox
                label="Parking"
                checked={localFilters?.parking}
                onChange={(e) => handleFilterChange('parking', e?.target?.checked)}
              />
              <Checkbox
                label="Gym"
                checked={localFilters?.gym}
                onChange={(e) => handleFilterChange('gym', e?.target?.checked)}
              />
              <Checkbox
                label="Pool"
                checked={localFilters?.pool}
                onChange={(e) => handleFilterChange('pool', e?.target?.checked)}
              />
              <Checkbox
                label="Laundry"
                checked={localFilters?.laundry}
                onChange={(e) => handleFilterChange('laundry', e?.target?.checked)}
              />
            </div>
          </div>

          {/* Mobile Action Buttons */}
          <div className="flex gap-3 lg:hidden">
            <Button variant="outline" fullWidth onClick={handleClearAll}>
              Clear All
            </Button>
            <Button variant="default" fullWidth onClick={handleApplyFilters} className="brand-gradient text-white">
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilters;