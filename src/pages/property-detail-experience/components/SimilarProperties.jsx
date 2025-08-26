import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SimilarProperties = ({ properties }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={12}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Similar Properties</h3>
        <Link to="/advanced-search-discovery">
          <Button variant="outline" size="sm" iconName="ArrowRight" iconPosition="right">
            View All
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties?.map((property) => (
          <div key={property?.id} className="group cursor-pointer">
            <Link to={`/property-detail-experience?id=${property?.id}`} className="block">
              <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-elevation smooth-transition">
                {/* Property Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={property?.image}
                    alt={property?.title}
                    className="w-full h-full object-cover group-hover:scale-105 smooth-transition"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-1">
                    {property?.featured && (
                      <span className="px-2 py-1 bg-warning text-white text-xs font-medium rounded">
                        Featured
                      </span>
                    )}
                    {property?.newListing && (
                      <span className="px-2 py-1 bg-success text-white text-xs font-medium rounded">
                        New
                      </span>
                    )}
                  </div>

                  {/* Save Button */}
                  <button className="absolute top-3 right-3 w-8 h-8 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-secondary hover:text-error smooth-transition">
                    <Icon name="Heart" size={16} />
                  </button>

                  {/* Quick View */}
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 smooth-transition">
                    <Button variant="default" size="sm" iconName="Eye">
                      Quick View
                    </Button>
                  </div>
                </div>

                {/* Property Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-text-primary group-hover:text-primary smooth-transition line-clamp-1">
                      {property?.title}
                    </h4>
                    <div className="text-lg font-bold text-primary">
                      {formatPrice(property?.rent)}
                      <span className="text-sm text-text-secondary font-normal">/mo</span>
                    </div>
                  </div>

                  <div className="flex items-center text-text-secondary text-sm mb-3">
                    <Icon name="MapPin" size={14} className="mr-1" />
                    <span className="line-clamp-1">{property?.location}</span>
                  </div>

                  {/* Property Features */}
                  <div className="flex items-center space-x-4 text-sm text-text-secondary mb-3">
                    <div className="flex items-center">
                      <Icon name="Bed" size={14} className="mr-1" />
                      <span>{property?.bedrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Bath" size={14} className="mr-1" />
                      <span>{property?.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Square" size={14} className="mr-1" />
                      <span>{property?.area} sq ft</span>
                    </div>
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-0.5">
                        {renderStars(property?.rating)}
                      </div>
                      <span className="text-sm text-text-secondary">
                        {property?.rating} ({property?.reviews})
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {property?.verified && (
                        <div className="flex items-center text-success text-xs">
                          <Icon name="Shield" size={12} className="mr-1" />
                          <span>Verified</span>
                        </div>
                      )}
                      <span className="text-xs text-text-secondary">
                        Available {property?.availability}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Neighborhood Alternatives */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-medium text-text-primary mb-4">Explore Nearby Neighborhoods</h4>
        <div className="flex flex-wrap gap-2">
          {['Downtown', 'Midtown', 'Brooklyn Heights', 'Williamsburg', 'Long Island City']?.map((neighborhood) => (
            <Link
              key={neighborhood}
              to={`/advanced-search-discovery?neighborhood=${neighborhood}`}
              className="px-3 py-2 bg-muted text-text-secondary rounded-lg hover:bg-primary hover:text-primary-foreground smooth-transition text-sm"
            >
              {neighborhood}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimilarProperties;