import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ properties, selectedProperty, onPropertySelect, onToggleView, isVisible }) => {
  const [mapCenter, setMapCenter] = useState({ lat: 40.7128, lng: -74.0060 }); // NYC default
  const [mapZoom, setMapZoom] = useState(12);

  // Mock map markers data
  const mapMarkers = properties?.map(property => ({
    id: property?.id,
    lat: property?.coordinates?.lat,
    lng: property?.coordinates?.lng,
    price: property?.price,
    isSelected: selectedProperty?.id === property?.id
  }));

  const handleMarkerClick = (propertyId) => {
    const property = properties?.find(p => p?.id === propertyId);
    if (property) {
      onPropertySelect(property);
      setMapCenter(property?.coordinates);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  if (!isVisible) return null;

  return (
    <div className="relative h-full bg-muted">
      {/* Map Container */}
      <div className="w-full h-full relative">
        {/* Google Maps Iframe */}
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Property Search Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=${mapZoom}&output=embed`}
          className="w-full h-full"
        />

        {/* Map Controls */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={onToggleView}
            className="bg-surface shadow-elevation"
          >
            <Icon name="List" size={20} />
          </Button>
          
          <div className="bg-surface rounded-lg shadow-elevation p-2">
            <div className="flex flex-col gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMapZoom(prev => Math.min(prev + 1, 18))}
                className="h-8 w-8"
              >
                <Icon name="Plus" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMapZoom(prev => Math.max(prev - 1, 8))}
                className="h-8 w-8"
              >
                <Icon name="Minus" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-surface rounded-lg shadow-elevation p-3">
          <h4 className="text-sm font-brand-medium text-text-primary mb-2">Legend</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-text-secondary">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-text-secondary">Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-text-secondary">Instant Book</span>
            </div>
          </div>
        </div>

        {/* Property Markers Overlay */}
        <div className="absolute inset-0 pointer-events-none">
          {mapMarkers?.map((marker) => (
            <div
              key={marker?.id}
              className="absolute pointer-events-auto cursor-pointer"
              style={{
                left: `${((marker?.lng + 74.0060) / 0.1) * 10}%`,
                top: `${((40.7128 - marker?.lat) / 0.1) * 10}%`,
                transform: 'translate(-50%, -50%)'
              }}
              onClick={() => handleMarkerClick(marker?.id)}
            >
              <div className={`px-2 py-1 rounded-lg text-xs font-brand-medium shadow-elevation smooth-transition hover:scale-110 ${
                marker?.isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-surface text-text-primary border border-border'
              }`}>
                {formatPrice(marker?.price)}
              </div>
            </div>
          ))}
        </div>

        {/* Neighborhood Overlay Toggle */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-surface rounded-lg shadow-elevation p-3">
            <h4 className="text-sm font-brand-medium text-text-primary mb-2">Overlays</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-text-secondary">Commute Times</span>
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-text-secondary">Safety Scores</span>
              </label>
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" className="rounded" />
                <span className="text-text-secondary">Local Amenities</span>
              </label>
            </div>
          </div>
        </div>

        {/* Selected Property Card */}
        {selectedProperty && (
          <div className="absolute bottom-4 right-4 w-80 bg-surface rounded-lg shadow-overlay border border-border p-4">
            <div className="flex items-start gap-3">
              <img
                src={selectedProperty?.images?.[0]}
                alt={selectedProperty?.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-brand-semibold text-text-primary text-sm line-clamp-1">
                  {selectedProperty?.title}
                </h4>
                <p className="text-text-secondary text-xs mb-1">{selectedProperty?.location}</p>
                <div className="flex items-center justify-between">
                  <span className="font-brand-bold text-primary">
                    {formatPrice(selectedProperty?.price)}/mo
                  </span>
                  <div className="flex items-center gap-1">
                    <Icon name="Star" size={12} className="text-warning" fill="currentColor" />
                    <span className="text-xs text-text-secondary">{selectedProperty?.rating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 text-xs text-text-secondary">
                  <span>{selectedProperty?.bedrooms} bed</span>
                  <span>•</span>
                  <span>{selectedProperty?.bathrooms} bath</span>
                  <span>•</span>
                  <span>{selectedProperty?.area} sqft</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button variant="outline" size="sm" className="flex-1">
                Message
              </Button>
              <Button variant="default" size="sm" className="flex-1 brand-gradient text-white">
                View Details
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Map Info */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 lg:hidden">
          <div className="bg-surface rounded-full px-4 py-2 shadow-elevation">
            <span className="text-sm text-text-secondary">
              {properties?.length} properties found
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;