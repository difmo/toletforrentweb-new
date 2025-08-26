import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SuccessMetrics = () => {
  const [metrics, setMetrics] = useState({
    totalRentals: 0,
    revenueIncrease: 0,
    satisfaction: 0,
    activeUsers: 0
  });

  const finalMetrics = {
    totalRentals: 47832,
    revenueIncrease: 34,
    satisfaction: 96,
    activeUsers: 12847
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setMetrics({
        totalRentals: Math.floor(finalMetrics?.totalRentals * progress),
        revenueIncrease: Math.floor(finalMetrics?.revenueIncrease * progress),
        satisfaction: Math.floor(finalMetrics?.satisfaction * progress),
        activeUsers: Math.floor(finalMetrics?.activeUsers * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setMetrics(finalMetrics);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, []);

  const metricItems = [
    {
      icon: 'CheckCircle',
      value: metrics?.totalRentals?.toLocaleString(),
      label: 'Successful Rentals',
      description: 'Properties matched with perfect tenants',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: 'TrendingUp',
      value: `${metrics?.revenueIncrease}%`,
      label: 'Average Revenue Increase',
      description: 'For property owners using our platform',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: 'Star',
      value: `${metrics?.satisfaction}%`,
      label: 'Tenant Satisfaction',
      description: 'Based on verified reviews and ratings',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: 'Users',
      value: metrics?.activeUsers?.toLocaleString(),
      label: 'Active Community Members',
      description: 'Renters and owners actively using ToletTorrent',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our community's success speaks for itself. Join property owners and renters who've transformed their rental experience with ToletTorrent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metricItems?.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md smooth-transition"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 ${metric?.bgColor} rounded-xl mb-4`}>
                <Icon name={metric?.icon} size={24} className={metric?.color} />
              </div>
              
              <div className="space-y-2">
                <div className="text-3xl font-bold text-gray-900">
                  {metric?.value}
                </div>
                <div className="text-lg font-semibold text-gray-700">
                  {metric?.label}
                </div>
                <div className="text-sm text-gray-500">
                  {metric?.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Real-time Activity Feed */}
        <div className="mt-12 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Live Activity</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-500">Real-time updates</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { action: 'New rental agreement signed', location: 'Brooklyn, NY', time: '2 minutes ago' },
              { action: 'Property listed', location: 'Manhattan, NY', time: '5 minutes ago' },
              { action: 'Tenant application approved', location: 'Chicago, IL', time: '8 minutes ago' },
              { action: 'Property tour scheduled', location: 'San Francisco, CA', time: '12 minutes ago' }
            ]?.map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full" />
                  <div>
                    <span className="text-sm font-medium text-gray-900">{activity?.action}</span>
                    <span className="text-sm text-gray-500 ml-2">in {activity?.location}</span>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity?.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;