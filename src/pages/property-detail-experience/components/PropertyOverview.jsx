import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyOverview = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  return (
    <div className="bg-surface rounded-lg p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-2xl lg:text-3xl font-bold text-text-primary mb-2">
            {property?.title}
          </h1>
          <div className="flex items-center text-text-secondary mb-3">
            <Icon name="MapPin" size={16} className="mr-2" />
            <span>{property?.address}</span>
          </div>
          
          {/* Property Type & Features */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center">
              <Icon name="Home" size={16} className="mr-1 text-primary" />
              <span className="font-medium">{property?.type}</span>
            </div>
            <div className="flex items-center">
              <Icon name="Bed" size={16} className="mr-1 text-primary" />
              <span>{property?.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center">
              <Icon name="Bath" size={16} className="mr-1 text-primary" />
              <span>{property?.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center">
              <Icon name="Square" size={16} className="mr-1 text-primary" />
              <span>{property?.area} sq ft</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="lg:text-right">
          <div className="text-3xl font-bold text-primary mb-1">
            {formatPrice(property?.rent)}<span className="text-lg text-text-secondary">/month</span>
          </div>
          <div className="text-sm text-text-secondary">
            Security Deposit: {formatPrice(property?.deposit)}
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-4 border-t border-b border-border">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{property?.rating}</div>
          <div className="text-sm text-text-secondary">Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{property?.reviews}</div>
          <div className="text-sm text-text-secondary">Reviews</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{property?.availability}</div>
          <div className="text-sm text-text-secondary">Available</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{property?.responseTime}</div>
          <div className="text-sm text-text-secondary">Response</div>
        </div>
      </div>
      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">About This Property</h3>
        <p className="text-text-secondary leading-relaxed">
          {property?.description}
        </p>
      </div>
      {/* Key Features */}
      <div>
        <h3 className="text-lg font-semibold text-text-primary mb-3">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {property?.features?.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Icon name="Check" size={16} className="text-success mr-2 flex-shrink-0" />
              <span className="text-text-secondary">{feature}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button variant="default" size="lg" iconName="MessageCircle" iconPosition="left" className="flex-1">
          Message Owner
        </Button>
        <Button variant="outline" size="lg" iconName="Calendar" iconPosition="left" className="flex-1">
          Schedule Tour
        </Button>
        <Button variant="outline" size="lg" iconName="Heart" iconPosition="left">
          Save
        </Button>
      </div>
    </div>
  );
};

export default PropertyOverview;