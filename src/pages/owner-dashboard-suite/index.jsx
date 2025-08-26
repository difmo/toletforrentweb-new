import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricsOverview from './components/MetricsOverview';
import RevenueChart from './components/RevenueChart';
import PropertyList from './components/PropertyList';
import TenantApplications from './components/TenantApplications';
import MaintenanceRequests from './components/MaintenanceRequests';
import QuickActions from './components/QuickActions';

const OwnerDashboardSuite = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'properties', label: 'Properties', icon: 'Home' },
    { id: 'applications', label: 'Applications', icon: 'Users', badge: '3' },
    { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', badge: '2' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <RevenueChart />
              </div>
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
          </div>
        );
      case 'properties':
        return <PropertyList />;
      case 'applications':
        return <TenantApplications />;
      case 'maintenance':
        return <MaintenanceRequests />;
      case 'analytics':
        return (
          <div className="space-y-8">
            <RevenueChart />
            <MetricsOverview />
          </div>
        );
      default:
        return (
          <div className="space-y-8">
            <MetricsOverview />
            <RevenueChart />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-surface border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-text-primary mb-2">Owner Dashboard</h1>
                <p className="text-text-secondary">
                  Manage your property portfolio with comprehensive analytics and streamlined tools
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" iconName="Download">
                  Export Report
                </Button>
                <Button variant="default" className="brand-gradient text-white" iconName="Plus">
                  Add Property
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-surface border-b border-border sticky top-16 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {navigationTabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`relative flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap smooth-transition ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab?.icon} size={18} />
                  <span>{tab?.label}</span>
                  {tab?.badge && (
                    <span className="bg-error text-error-foreground text-xs px-2 py-0.5 rounded-full">
                      {tab?.badge}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {renderTabContent()}
        </div>

        {/* Mobile Quick Actions FAB */}
        <div className="fixed bottom-6 right-6 lg:hidden">
          <div className="relative group">
            <Button
              variant="default"
              size="icon"
              className="w-14 h-14 rounded-full brand-gradient text-white shadow-overlay"
              iconName="Plus"
            />
            
            {/* Quick Actions Menu */}
            <div className="absolute bottom-16 right-0 w-48 bg-popover border border-border rounded-lg shadow-overlay opacity-0 invisible group-hover:opacity-100 group-hover:visible smooth-transition">
              <div className="py-2">
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted smooth-transition">
                  <Icon name="Home" size={16} />
                  <span>Add Property</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted smooth-transition">
                  <Icon name="Users" size={16} />
                  <span>Review Applications</span>
                </button>
                <button className="flex items-center space-x-3 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted smooth-transition">
                  <Icon name="Wrench" size={16} />
                  <span>Schedule Maintenance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 2L2 7L12 12L22 7L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 17L12 22L22 17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 12L12 17L22 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-text-primary">ToletTorrent</h3>
                  <p className="text-sm text-text-secondary">Rent with Confidence</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                Maximize your rental property potential with our comprehensive owner dashboard. 
                Track performance, manage tenants, and optimize revenue all in one place.
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm" iconName="MessageCircle">
                  Support
                </Button>
                <Button variant="ghost" size="sm" iconName="FileText">
                  Documentation
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Owner Tools</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary smooth-transition">Property Management</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Tenant Screening</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Revenue Analytics</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Maintenance Tracking</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary smooth-transition">Owner Guide</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Legal Resources</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Market Insights</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Tax Information</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 flex items-center justify-between">
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} ToletTorrent. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                <Icon name="Twitter" size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                <Icon name="Linkedin" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default OwnerDashboardSuite;