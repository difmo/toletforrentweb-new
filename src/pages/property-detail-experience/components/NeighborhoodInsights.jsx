import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NeighborhoodInsights = ({ neighborhood }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'MapPin' },
    { id: 'transport', label: 'Transport', icon: 'Car' },
    { id: 'amenities', label: 'Local Amenities', icon: 'Coffee' },
    { id: 'safety', label: 'Safety', icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-4">
            <p className="text-text-secondary leading-relaxed">{neighborhood?.description}</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <div className="text-xl font-bold text-primary">{neighborhood?.walkScore}</div>
                <div className="text-sm text-text-secondary">Walk Score</div>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <div className="text-xl font-bold text-primary">{neighborhood?.bikeScore}</div>
                <div className="text-sm text-text-secondary">Bike Score</div>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <div className="text-xl font-bold text-primary">{neighborhood?.transitScore}</div>
                <div className="text-sm text-text-secondary">Transit Score</div>
              </div>
              <div className="text-center p-3 bg-surface-secondary rounded-lg">
                <div className="text-xl font-bold text-primary">{neighborhood?.noiseLevel}</div>
                <div className="text-sm text-text-secondary">Noise Level</div>
              </div>
            </div>
          </div>
        );
      
      case 'transport':
        return (
          <div className="space-y-4">
            <div className="grid gap-4">
              {neighborhood?.transport?.map((option, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name={option?.icon} size={20} className="text-primary" />
                    <div>
                      <div className="font-medium text-text-primary">{option?.name}</div>
                      <div className="text-sm text-text-secondary">{option?.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-text-primary">{option?.distance}</div>
                    <div className="text-sm text-text-secondary">{option?.walkTime}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'amenities':
        return (
          <div className="space-y-4">
            {Object.entries(neighborhood?.amenities)?.map(([category, places]) => (
              <div key={category}>
                <h5 className="font-medium text-text-primary mb-3 capitalize">{category}</h5>
                <div className="grid gap-2">
                  {places?.map((place, index) => (
                    <div key={index} className="flex items-center justify-between p-2 hover:bg-surface-secondary rounded-lg smooth-transition">
                      <div className="flex items-center space-x-3">
                        <Icon name="MapPin" size={16} className="text-text-secondary" />
                        <span className="text-text-primary">{place?.name}</span>
                      </div>
                      <div className="text-sm text-text-secondary">{place?.distance}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'safety':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {neighborhood?.safety?.map((item, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-surface-secondary rounded-lg">
                  <Icon name={item?.icon} size={20} className="text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-text-primary">{item?.title}</div>
                    <div className="text-sm text-text-secondary">{item?.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Neighborhood Insights</h3>
        <Button variant="outline" size="sm" iconName="ExternalLink" iconPosition="right">
          View on Map
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface-secondary rounded-lg p-1">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => setActiveTab(tab?.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium smooth-transition flex-1 justify-center ${
              activeTab === tab?.id
                ? 'bg-surface text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="min-h-[200px]">
        {renderTabContent()}
      </div>
      {/* Map Preview */}
      <div className="mt-6 h-48 bg-muted rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={neighborhood?.name}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${neighborhood?.coordinates?.lat},${neighborhood?.coordinates?.lng}&z=14&output=embed`}
          className="border-0"
        />
      </div>
    </div>
  );
};

export default NeighborhoodInsights;