import React from 'react';
import Icon from '../../../components/AppIcon';

const TrendingTopics = ({ topics }) => {
  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return { icon: 'TrendingUp', color: 'text-success' };
      case 'down': return { icon: 'TrendingDown', color: 'text-error' };
      case 'hot': return { icon: 'Flame', color: 'text-warning' };
      default: return { icon: 'Minus', color: 'text-text-secondary' };
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Trending Topics</h2>
        <div className="flex items-center space-x-1 text-warning">
          <Icon name="Flame" size={16} />
          <span className="text-sm font-medium">Hot</span>
        </div>
      </div>
      <div className="space-y-4">
        {topics?.map((topic, index) => {
          const trendData = getTrendIcon(topic?.trend);
          return (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted smooth-transition">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">{topic?.title}</h3>
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <span>{topic?.discussions} discussions</span>
                    <span>•</span>
                    <span>{topic?.participants} participants</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-1 ${trendData?.color}`}>
                  <Icon name={trendData?.icon} size={16} />
                  <span className="text-sm font-medium">{topic?.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <button className="w-full text-center text-primary hover:text-primary/80 text-sm font-medium smooth-transition">
          View All Topics →
        </button>
      </div>
    </div>
  );
};

export default TrendingTopics;