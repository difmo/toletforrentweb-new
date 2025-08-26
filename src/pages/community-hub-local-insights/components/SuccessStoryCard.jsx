import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SuccessStoryCard = ({ story }) => {
  const getStoryTypeIcon = (type) => {
    switch (type) {
      case 'rental': return 'Home';
      case 'investment': return 'TrendingUp';
      case 'relocation': return 'MapPin';
      default: return 'Star';
    }
  };

  const getStoryTypeColor = (type) => {
    switch (type) {
      case 'rental': return 'text-primary bg-primary/10';
      case 'investment': return 'text-success bg-success/10';
      case 'relocation': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation smooth-transition">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={story?.image}
          alt={story?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getStoryTypeColor(story?.type)}`}>
            <Icon name={getStoryTypeIcon(story?.type)} size={14} />
            <span className="text-sm font-medium capitalize">{story?.type}</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Image
            src={story?.author?.avatar}
            alt={story?.author?.name}
            className="w-12 h-12 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-1">{story?.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-text-secondary">
              <span>{story?.author?.name}</span>
              <span>•</span>
              <span>{story?.location}</span>
              <span>•</span>
              <span>{story?.timeframe}</span>
            </div>
          </div>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-3">{story?.excerpt}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            {story?.metrics?.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-lg font-semibold text-text-primary">{metric?.value}</div>
                <div className="text-xs text-text-secondary">{metric?.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Heart" size={14} />
              <span>{story?.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={14} />
              <span>{story?.comments}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Share2" size={14} />
              <span>{story?.shares}</span>
            </div>
          </div>
          
          <button className="text-primary hover:text-primary/80 text-sm font-medium smooth-transition">
            Read Full Story →
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessStoryCard;