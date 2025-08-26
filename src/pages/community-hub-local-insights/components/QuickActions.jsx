import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const actions = [
    {
      id: 1,
      title: "Start Discussion",
      description: "Ask questions or share insights",
      icon: "MessageSquarePlus",
      color: "text-blue-600 bg-blue-50",
      action: "discussion"
    },
    {
      id: 2,
      title: "Write Guide",
      description: "Share your neighborhood knowledge",
      icon: "PenTool",
      color: "text-green-600 bg-green-50",
      action: "guide"
    },
    {
      id: 3,
      title: "Review Service",
      description: "Help others with service recommendations",
      icon: "Star",
      color: "text-yellow-600 bg-yellow-50",
      action: "review"
    },
    {
      id: 4,
      title: "Share Story",
      description: "Tell your rental success story",
      icon: "Heart",
      color: "text-red-600 bg-red-50",
      action: "story"
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-text-primary">Quick Actions</h2>
        <div className="flex items-center space-x-1 text-primary">
          <Icon name="Zap" size={16} />
          <span className="text-sm font-medium">Contribute</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            className="flex items-start space-x-4 p-4 rounded-lg border border-border hover:shadow-elevation smooth-transition text-left w-full"
          >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${action?.color}`}>
              <Icon name={action?.icon} size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-text-primary mb-1">{action?.title}</h3>
              <p className="text-sm text-text-secondary">{action?.description}</p>
            </div>
            <Icon name="ArrowRight" size={16} className="text-text-muted flex-shrink-0 mt-1" />
          </button>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="text-sm text-text-secondary">
            Earn badges and recognition for your contributions
          </div>
          <Link
            to="/community-hub-local-insights/rewards"
            className="text-primary hover:text-primary/80 text-sm font-medium smooth-transition"
          >
            View Rewards →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;