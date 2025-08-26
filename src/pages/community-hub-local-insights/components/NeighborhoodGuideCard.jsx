import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NeighborhoodGuideCard = ({ guide }) => {
  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-elevation smooth-transition">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={guide?.image}
          alt={guide?.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            {guide?.category}
          </span>
        </div>
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
          <Icon name="MapPin" size={16} className="text-white" />
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-text-primary">{guide?.name}</h3>
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="Star" size={16} fill="currentColor" />
            <span className="text-sm font-medium">{guide?.rating}</span>
          </div>
        </div>
        
        <p className="text-text-secondary text-sm mb-4 line-clamp-2">{guide?.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{guide?.contributors} contributors</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="MessageSquare" size={14} />
              <span>{guide?.reviews} reviews</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {guide?.recentContributors?.slice(0, 3)?.map((contributor, index) => (
                <Image
                  key={index}
                  src={contributor?.avatar}
                  alt={contributor?.name}
                  className="w-6 h-6 rounded-full border-2 border-white"
                />
              ))}
            </div>
            <span className="text-xs text-text-secondary">Recent activity</span>
          </div>
          
          <Link
            to={`/community-hub-local-insights/guide/${guide?.id}`}
            className="text-primary hover:text-primary/80 text-sm font-medium smooth-transition"
          >
            View Guide →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NeighborhoodGuideCard;