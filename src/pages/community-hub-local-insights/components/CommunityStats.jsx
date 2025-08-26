import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = ({ stats }) => {
  const getStatIcon = (type) => {
    switch (type) {
      case 'members': return 'Users';
      case 'discussions': return 'MessageSquare';
      case 'guides': return 'BookOpen';
      case 'reviews': return 'Star';
      case 'services': return 'Settings';
      default: return 'BarChart3';
    }
  };

  const getStatColor = (type) => {
    switch (type) {
      case 'members': return 'text-blue-600 bg-blue-50';
      case 'discussions': return 'text-green-600 bg-green-50';
      case 'guides': return 'text-purple-600 bg-purple-50';
      case 'reviews': return 'text-yellow-600 bg-yellow-50';
      case 'services': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Community Overview</h2>
        <div className="flex items-center space-x-1 text-success">
          <Icon name="TrendingUp" size={16} />
          <span className="text-sm font-medium">Growing</span>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats?.map((stat, index) => (
          <div key={index} className="text-center">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${getStatColor(stat?.type)}`}>
              <Icon name={getStatIcon(stat?.type)} size={20} />
            </div>
            <div className="text-2xl font-bold text-text-primary mb-1">{stat?.value}</div>
            <div className="text-sm text-text-secondary capitalize">{stat?.label}</div>
            {stat?.growth && (
              <div className="flex items-center justify-center space-x-1 mt-1 text-success">
                <Icon name="ArrowUp" size={12} />
                <span className="text-xs">+{stat?.growth}%</span>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last updated</span>
          <span className="text-text-primary font-medium">2 hours ago</span>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;