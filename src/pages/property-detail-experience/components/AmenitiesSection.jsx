import React from 'react';
import Icon from '../../../components/AppIcon';

const AmenitiesSection = ({ amenities }) => {
  const getAmenityIcon = (amenity) => {
    const iconMap = {
      'WiFi': 'Wifi',
      'Air Conditioning': 'Wind',
      'Heating': 'Flame',
      'Kitchen': 'ChefHat',
      'Washer': 'Shirt',
      'Dryer': 'Wind',
      'Parking': 'Car',
      'Pool': 'Waves',
      'Gym': 'Dumbbell',
      'Pet Friendly': 'Heart',
      'Balcony': 'Home',
      'Garden': 'Trees',
      'Security': 'Shield',
      'Elevator': 'ArrowUp',
      'Furnished': 'Sofa',
      'Dishwasher': 'Utensils',
      'Microwave': 'Zap',
      'TV': 'Tv',
      'Fireplace': 'Flame',
      'Workspace': 'Laptop'
    };
    return iconMap?.[amenity] || 'Check';
  };

  const categorizedAmenities = {
    'Essential': amenities?.filter(a => ['WiFi', 'Air Conditioning', 'Heating', 'Kitchen']?.includes(a?.name)),
    'Appliances': amenities?.filter(a => ['Washer', 'Dryer', 'Dishwasher', 'Microwave', 'TV']?.includes(a?.name)),
    'Building Features': amenities?.filter(a => ['Parking', 'Pool', 'Gym', 'Security', 'Elevator']?.includes(a?.name)),
    'Outdoor & Extras': amenities?.filter(a => ['Balcony', 'Garden', 'Pet Friendly', 'Furnished', 'Fireplace', 'Workspace']?.includes(a?.name))
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Amenities & Features</h3>
      <div className="space-y-6">
        {Object.entries(categorizedAmenities)?.map(([category, categoryAmenities]) => {
          if (categoryAmenities?.length === 0) return null;
          
          return (
            <div key={category}>
              <h4 className="font-medium text-text-primary mb-3">{category}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {categoryAmenities?.map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-surface-secondary rounded-lg">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={getAmenityIcon(amenity?.name)} size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-text-primary">{amenity?.name}</div>
                      {amenity?.description && (
                        <div className="text-sm text-text-secondary">{amenity?.description}</div>
                      )}
                    </div>
                    {amenity?.available ? (
                      <Icon name="Check" size={16} className="text-success" />
                    ) : (
                      <Icon name="X" size={16} className="text-error" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Additional Notes */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-text-secondary">
            <p className="font-medium text-text-primary mb-1">Additional Information</p>
            <p>Some amenities may have additional fees or restrictions. Please contact the owner for specific details about usage policies and availability.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmenitiesSection;