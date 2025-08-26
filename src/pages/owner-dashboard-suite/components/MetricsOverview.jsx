import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsOverview = () => {
  const metrics = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      changeType: "positive",
      icon: "DollarSign",
      period: "This Month"
    },
    {
      id: 2,
      title: "Occupancy Rate",
      value: "94.2%",
      change: "+3.1%",
      changeType: "positive",
      icon: "Home",
      period: "Current"
    },
    {
      id: 3,
      title: "Active Properties",
      value: "8",
      change: "+2",
      changeType: "positive",
      icon: "Building",
      period: "Total"
    },
    {
      id: 4,
      title: "Tenant Satisfaction",
      value: "4.8/5",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      period: "Average Rating"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics?.map((metric) => (
        <div key={metric?.id} className="bg-surface border border-border rounded-lg p-6 smooth-transition hover:shadow-elevation">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              metric?.changeType === 'positive' ? 'bg-success/10' : 'bg-error/10'
            }`}>
              <Icon 
                name={metric?.icon} 
                size={24} 
                className={metric?.changeType === 'positive' ? 'text-success' : 'text-error'} 
              />
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              metric?.changeType === 'positive' ?'bg-success/10 text-success' :'bg-error/10 text-error'
            }`}>
              {metric?.change}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-text-primary">{metric?.value}</h3>
            <p className="text-sm font-medium text-text-primary">{metric?.title}</p>
            <p className="text-xs text-text-secondary">{metric?.period}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MetricsOverview;