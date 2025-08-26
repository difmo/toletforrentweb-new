import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OwnerProfile = ({ owner }) => {
  return (
    <div className="bg-surface rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Meet Your Host</h3>
      {/* Owner Info */}
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <Image
            src={owner?.avatar}
            alt={owner?.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {owner?.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-text-primary">{owner?.name}</h4>
            {owner?.verified && (
              <div className="flex items-center space-x-1 text-success text-sm">
                <Icon name="Shield" size={14} />
                <span>Verified</span>
              </div>
            )}
          </div>
          <p className="text-sm text-text-secondary mb-2">{owner?.title}</p>
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center">
              <Icon name="Star" size={14} className="text-warning mr-1" />
              <span>{owner?.rating} ({owner?.reviewCount} reviews)</span>
            </div>
            <div className="flex items-center">
              <Icon name="Clock" size={14} className="mr-1" />
              <span>Responds in {owner?.responseTime}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-t border-b border-border">
        <div className="text-center">
          <div className="text-xl font-bold text-primary">{owner?.yearsHosting}</div>
          <div className="text-xs text-text-secondary">Years Hosting</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-primary">{owner?.properties}</div>
          <div className="text-xs text-text-secondary">Properties</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-primary">{owner?.responseRate}%</div>
          <div className="text-xs text-text-secondary">Response Rate</div>
        </div>
      </div>
      {/* Verification Badges */}
      <div className="mb-6">
        <h5 className="font-medium text-text-primary mb-3">Verifications</h5>
        <div className="grid grid-cols-2 gap-2">
          {owner?.verifications?.map((verification, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name="Check" size={14} className="text-success" />
              <span className="text-text-secondary">{verification}</span>
            </div>
          ))}
        </div>
      </div>
      {/* About */}
      <div className="mb-6">
        <h5 className="font-medium text-text-primary mb-3">About {owner?.name}</h5>
        <p className="text-sm text-text-secondary leading-relaxed">
          {owner?.bio}
        </p>
      </div>
      {/* Languages */}
      <div className="mb-6">
        <h5 className="font-medium text-text-primary mb-3">Languages</h5>
        <div className="flex flex-wrap gap-2">
          {owner?.languages?.map((language, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-muted text-text-secondary text-sm rounded-full"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
      {/* Contact Button */}
      <Button variant="outline" fullWidth iconName="MessageCircle" iconPosition="left">
        Contact {owner?.name}
      </Button>
    </div>
  );
};

export default OwnerProfile;