import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonTool = ({ compareList, properties, onRemove, onClear, isVisible, onToggle }) => {
  const compareProperties = properties?.filter(p => compareList?.includes(p?.id));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const getComparisonValue = (property, field) => {
    switch (field) {
      case 'price':
        return property?.price;
      case 'bedrooms':
        return property?.bedrooms;
      case 'bathrooms':
        return property?.bathrooms;
      case 'area':
        return property?.area;
      case 'rating':
        return property?.rating;
      case 'responseTime':
        return property?.owner?.responseTime;
      default:
        return null;
    }
  };

  const getBestValue = (field) => {
    if (compareProperties?.length === 0) return null;
    
    const values = compareProperties?.map(p => getComparisonValue(p, field));
    
    switch (field) {
      case 'price':
        return Math.min(...values);
      case 'bedrooms': case'bathrooms': case'area': case'rating':
        return Math.max(...values);
      case 'responseTime':
        const timeOrder = { 'instant': 1, '1hour': 2, '24hours': 3 };
        return values?.reduce((best, current) => 
          timeOrder?.[current] < timeOrder?.[best] ? current : best
        );
      default:
        return null;
    }
  };

  const isHighlighted = (property, field) => {
    const bestValue = getBestValue(field);
    const propertyValue = getComparisonValue(property, field);
    return bestValue === propertyValue;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end lg:items-center justify-center p-4">
      <div className="bg-surface rounded-t-2xl lg:rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <Icon name="GitCompare" size={24} className="text-primary" />
            <div>
              <h3 className="text-lg font-brand-bold text-text-primary">Compare Properties</h3>
              <p className="text-sm text-text-secondary">
                {compareProperties?.length} of 3 properties selected
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={onClear}>
              Clear All
            </Button>
            <Button variant="ghost" size="icon" onClick={onToggle}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          {compareProperties?.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="GitCompare" size={24} className="text-text-muted" />
              </div>
              <h4 className="text-lg font-brand-semibold text-text-primary mb-2">
                No properties to compare
              </h4>
              <p className="text-text-secondary">
                Click the compare button on property cards to add them here.
              </p>
            </div>
          ) : (
            <div className="p-6">
              {/* Property Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {compareProperties?.map((property) => (
                  <div key={property?.id} className="bg-card border border-border rounded-lg overflow-hidden">
                    <div className="relative">
                      <Image
                        src={property?.images?.[0]}
                        alt={property?.title}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => onRemove(property?.id)}
                        className="absolute top-2 right-2 w-8 h-8 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 smooth-transition"
                      >
                        <Icon name="X" size={16} />
                      </button>
                      {property?.isVerified && (
                        <div className="absolute top-2 left-2">
                          <span className="bg-success text-success-foreground px-2 py-1 rounded-md text-xs font-brand-medium flex items-center gap-1">
                            <Icon name="Shield" size={12} />
                            Verified
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-brand-semibold text-text-primary mb-2 line-clamp-2">
                        {property?.title}
                      </h4>
                      <div className="flex items-center gap-1 text-text-secondary mb-3">
                        <Icon name="MapPin" size={14} />
                        <span className="text-sm">{property?.location}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-brand-bold text-primary">
                          {formatPrice(property?.price)}
                        </span>
                        <div className="flex items-center gap-1">
                          <Icon name="Star" size={14} className="text-warning" fill="currentColor" />
                          <span className="text-sm font-brand-medium">{property?.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comparison Table */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted">
                      <tr>
                        <th className="text-left p-4 font-brand-medium text-text-primary">Feature</th>
                        {compareProperties?.map((property) => (
                          <th key={property?.id} className="text-center p-4 font-brand-medium text-text-primary min-w-[200px]">
                            {property?.title?.length > 20 ? 
                              `${property?.title?.substring(0, 20)}...` : 
                              property?.title
                            }
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Monthly Rent</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className={`text-center p-4 ${
                            isHighlighted(property, 'price') ? 'bg-success/10 text-success font-brand-bold' : 'text-text-primary'
                          }`}>
                            {formatPrice(property?.price)}
                          </td>
                        ))}
                      </tr>

                      {/* Bedrooms */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Bedrooms</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className={`text-center p-4 ${
                            isHighlighted(property, 'bedrooms') ? 'bg-success/10 text-success font-brand-bold' : 'text-text-primary'
                          }`}>
                            {property?.bedrooms}
                          </td>
                        ))}
                      </tr>

                      {/* Bathrooms */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Bathrooms</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className={`text-center p-4 ${
                            isHighlighted(property, 'bathrooms') ? 'bg-success/10 text-success font-brand-bold' : 'text-text-primary'
                          }`}>
                            {property?.bathrooms}
                          </td>
                        ))}
                      </tr>

                      {/* Area */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Area (sqft)</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className={`text-center p-4 ${
                            isHighlighted(property, 'area') ? 'bg-success/10 text-success font-brand-bold' : 'text-text-primary'
                          }`}>
                            {property?.area?.toLocaleString()}
                          </td>
                        ))}
                      </tr>

                      {/* Rating */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Rating</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className={`text-center p-4 ${
                            isHighlighted(property, 'rating') ? 'bg-success/10 text-success font-brand-bold' : 'text-text-primary'
                          }`}>
                            <div className="flex items-center justify-center gap-1">
                              <Icon name="Star" size={14} className="text-warning" fill="currentColor" />
                              <span>{property?.rating}</span>
                            </div>
                          </td>
                        ))}
                      </tr>

                      {/* Response Time */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Owner Response</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className={`text-center p-4 ${
                            isHighlighted(property, 'responseTime') ? 'bg-success/10 text-success font-brand-bold' : 'text-text-primary'
                          }`}>
                            {property?.owner?.responseTime === 'instant' ? 'Instant' :
                             property?.owner?.responseTime === '1hour' ? 'Within 1 hour' : 'Within 24 hours'}
                          </td>
                        ))}
                      </tr>

                      {/* Amenities */}
                      <tr className="border-t border-border">
                        <td className="p-4 font-brand-medium text-text-primary">Key Amenities</td>
                        {compareProperties?.map((property) => (
                          <td key={property?.id} className="text-center p-4">
                            <div className="flex flex-wrap gap-1 justify-center">
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
                                  +{property?.amenities?.length - 3}
                                </span>
                              )}
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                {compareProperties?.map((property) => (
                  <Button
                    key={property?.id}
                    variant="default"
                    className="flex-1 brand-gradient text-white"
                  >
                    View {property?.title?.split(' ')?.[0]} Details
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;