import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LocalServiceCard = ({ service }) => {
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'moving': return 'Truck';
      case 'utilities': return 'Zap';
      case 'cleaning': return 'Sparkles';
      case 'maintenance': return 'Wrench';
      case 'security': return 'Shield';
      default: return 'Settings';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'moving': return 'text-blue-600 bg-blue-50';
      case 'utilities': return 'text-yellow-600 bg-yellow-50';
      case 'cleaning': return 'text-green-600 bg-green-50';
      case 'maintenance': return 'text-orange-600 bg-orange-50';
      case 'security': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation smooth-transition">
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0">
          <Image
            src={service?.logo}
            alt={service?.name}
            className="w-16 h-16 rounded-lg object-cover"
          />
          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center ${getCategoryColor(service?.category)}`}>
            <Icon name={getCategoryIcon(service?.category)} size={16} />
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-text-primary">{service?.name}</h3>
              <p className="text-sm text-text-secondary capitalize">{service?.category} Service</p>
            </div>
            <div className="flex items-center space-x-1 text-warning">
              <Icon name="Star" size={16} fill="currentColor" />
              <span className="text-sm font-medium">{service?.rating}</span>
              <span className="text-xs text-text-muted">({service?.reviewCount})</span>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">{service?.description}</p>
          
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="MapPin" size={14} />
                <span>{service?.location}</span>
              </div>
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="Clock" size={14} />
                <span>{service?.responseTime}</span>
              </div>
              <div className="flex items-center space-x-1 text-success">
                <Icon name="CheckCircle" size={14} />
                <span>Verified</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-semibold text-text-primary">{service?.priceRange}</span>
              <span className="text-sm text-text-secondary">starting from</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Phone">
                Call
              </Button>
              <Button variant="default" size="sm" iconName="MessageSquare">
                Contact
              </Button>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            {service?.specialties?.slice(0, 3)?.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
              >
                {specialty}
              </span>
            ))}
            {service?.specialties?.length > 3 && (
              <span className="text-xs text-text-muted">+{service?.specialties?.length - 3} more</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalServiceCard;