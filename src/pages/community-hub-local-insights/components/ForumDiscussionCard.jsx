import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ForumDiscussionCard = ({ discussion }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'solved': return 'text-success bg-success/10';
      case 'active': return 'text-primary bg-primary/10';
      case 'hot': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-elevation smooth-transition">
      <div className="flex items-start space-x-4">
        <Image
          src={discussion?.author?.avatar}
          alt={discussion?.author?.name}
          className="w-10 h-10 rounded-full flex-shrink-0"
        />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <Link
                to={`/community-hub-local-insights/discussion/${discussion?.id}`}
                className="text-lg font-semibold text-text-primary hover:text-primary smooth-transition line-clamp-2"
              >
                {discussion?.title}
              </Link>
              <div className="flex items-center space-x-3 mt-1">
                <span className="text-sm text-text-secondary">{discussion?.author?.name}</span>
                <span className="text-xs text-text-muted">•</span>
                <span className="text-sm text-text-secondary">{formatTimeAgo(discussion?.createdAt)}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(discussion?.status)}`}>
                  {discussion?.status}
                </span>
              </div>
            </div>
          </div>
          
          <p className="text-text-secondary text-sm mb-4 line-clamp-2">{discussion?.preview}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="MessageSquare" size={16} />
                <span className="text-sm">{discussion?.replies}</span>
              </div>
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="Eye" size={16} />
                <span className="text-sm">{discussion?.views}</span>
              </div>
              <div className="flex items-center space-x-1 text-text-secondary">
                <Icon name="ThumbsUp" size={16} />
                <span className="text-sm">{discussion?.likes}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {discussion?.tags?.slice(0, 2)?.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-text-secondary text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
              {discussion?.tags?.length > 2 && (
                <span className="text-xs text-text-muted">+{discussion?.tags?.length - 2}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumDiscussionCard;