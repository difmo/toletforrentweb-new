import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property, onFavorite, onMessage, onCompare, isComparing }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === property?.images?.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? property?.images?.length - 1 : prev - 1
    );
  };

  const handleFavorite = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onFavorite(property?.id);
  };

  const handleMessage = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onMessage(property?.id);
  };

  const handleCompare = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    onCompare(property?.id);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation smooth-transition group">
      <Link to="/property-detail-experience" className="block">
        {/* Image Carousel */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={property?.images?.[currentImageIndex]}
            alt={`${property?.title} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
          />
          
          {/* Image Navigation */}
          {property?.images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition hover:bg-black/70"
              >
                <Icon name="ChevronLeft" size={16} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition hover:bg-black/70"
              >
                <Icon name="ChevronRight" size={16} />
              </button>
            </>
          )}

          {/* Image Indicators */}
          {property?.images?.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
              {property?.images?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {property?.isVerified && (
              <span className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-brand-medium flex items-center gap-1">
                <Icon name="Shield" size={12} />
                Verified
              </span>
            )}
            {property?.instantBooking && (
              <span className="bg-accent text-accent-foreground px-2 py-1 rounded-md text-xs font-brand-medium">
                Instant Book
              </span>
            )}
            {property?.isNew && (
              <span className="bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-brand-medium">
                New
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2">
            <button
              onClick={handleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center smooth-transition ${
                property?.isFavorited
                  ? 'bg-error text-error-foreground'
                  : 'bg-white/90 text-text-primary hover:bg-white'
              }`}
            >
              <Icon name="Heart" size={16} fill={property?.isFavorited ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleCompare}
              className={`w-8 h-8 rounded-full flex items-center justify-center smooth-transition ${
                isComparing
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/90 text-text-primary hover:bg-white'
              }`}
            >
              <Icon name="GitCompare" size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price and Rating */}
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xl font-brand-bold text-text-primary">
                {formatPrice(property?.price)}<span className="text-sm font-normal text-text-secondary">/month</span>
              </div>
              {property?.originalPrice && property?.originalPrice > property?.price && (
                <div className="text-sm text-text-secondary line-through">
                  {formatPrice(property?.originalPrice)}
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={14} className="text-warning" fill="currentColor" />
              <span className="text-sm font-brand-medium text-text-primary">{property?.rating}</span>
              <span className="text-sm text-text-secondary">({property?.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-brand-semibold text-text-primary mb-2 line-clamp-2 group-hover:text-primary smooth-transition">
            {property?.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-text-secondary mb-3">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{property?.location}</span>
          </div>

          {/* Property Details */}
          <div className="flex items-center gap-4 text-sm text-text-secondary mb-3">
            <div className="flex items-center gap-1">
              <Icon name="Bed" size={14} />
              <span>{property?.bedrooms} bed</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Bath" size={14} />
              <span>{property?.bathrooms} bath</span>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Square" size={14} />
              <span>{property?.area} sqft</span>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 rounded-full overflow-hidden">
                  <Image
                    src={property?.owner?.avatar}
                    alt={property?.owner?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm text-text-secondary">{property?.owner?.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <div className={`w-2 h-2 rounded-full ${
                  property?.owner?.responseTime === 'instant' ? 'bg-success' :
                  property?.owner?.responseTime === '1hour' ? 'bg-warning' : 'bg-text-muted'
                }`}></div>
                <span className="text-xs text-text-secondary">
                  {property?.owner?.responseTime === 'instant' ? 'Instant' :
                   property?.owner?.responseTime === '1hour' ? '1hr' : '24hr'} response
                </span>
              </div>
            </div>
            <div className="text-xs text-text-secondary">
              {property?.communityRating && (
                <span>Community: {property?.communityRating}/5</span>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2 mb-4">
            {property?.amenities?.slice(0, 3)?.map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md"
              >
                {amenity}
              </span>
            ))}
            {property?.amenities?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-md">
                +{property?.amenities?.length - 3} more
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleMessage}
              iconName="MessageCircle"
              iconPosition="left"
              className="flex-1"
            >
              Message
            </Button>
            <Button
              variant="default"
              size="sm"
              className="flex-1 brand-gradient text-white"
            >
              View Details
            </Button>
          </div>

          {/* Recent Activity */}
          {property?.recentActivity && (
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex items-center gap-1 text-xs text-text-secondary">
                <Icon name="Activity" size={12} />
                <span>{property?.recentActivity}</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;