import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';

const RevenueChart = () => {
  const revenueData = [
    { month: 'Jan', revenue: 18500, occupancy: 89 },
    { month: 'Feb', revenue: 19200, occupancy: 92 },
    { month: 'Mar', revenue: 21800, occupancy: 95 },
    { month: 'Apr', revenue: 23400, occupancy: 97 },
    { month: 'May', revenue: 22100, occupancy: 94 },
    { month: 'Jun', revenue: 24580, occupancy: 96 },
  ];

  const [activeTab, setActiveTab] = React.useState('revenue');

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Performance Analytics</h3>
          <p className="text-sm text-text-secondary">Track your property performance over time</p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('revenue')}
            className={`px-4 py-2 rounded-lg text-sm font-medium smooth-transition ${
              activeTab === 'revenue' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary hover:text-text-primary'
            }`}
          >
            Revenue
          </button>
          <button
            onClick={() => setActiveTab('occupancy')}
            className={`px-4 py-2 rounded-lg text-sm font-medium smooth-transition ${
              activeTab === 'occupancy' ?'bg-primary text-primary-foreground' :'bg-muted text-text-secondary hover:text-text-primary'
            }`}
          >
            Occupancy
          </button>
        </div>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {activeTab === 'revenue' ? (
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`$${value?.toLocaleString()}`, 'Revenue']}
              />
              <Line 
                type="monotone" 
                dataKey="revenue" 
                stroke="#2563EB" 
                strokeWidth={3}
                dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
              />
            </LineChart>
          ) : (
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
              <YAxis stroke="#6B7280" fontSize={12} />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value}%`, 'Occupancy Rate']}
              />
              <Bar dataKey="occupancy" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-sm text-text-secondary">Current Period</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full"></div>
            <span className="text-sm text-text-secondary">Target</span>
          </div>
        </div>
        <button className="flex items-center space-x-2 text-sm text-primary hover:text-primary/80 smooth-transition">
          <Icon name="Download" size={16} />
          <span>Export Data</span>
        </button>
      </div>
    </div>
  );
};

export default RevenueChart;