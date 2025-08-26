import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyList = () => {
  const properties = [
    {
      id: 1,
      title: "Modern Downtown Apartment",
      address: "123 Main Street, Downtown",
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      status: "occupied",
      rent: 2800,
      tenant: "Sarah Johnson",
      occupancyRate: 95,
      nextPayment: "2025-01-15",
      maintenanceRequests: 0,
      rating: 4.8
    },
    {
      id: 2,
      title: "Cozy Studio Near University",
      address: "456 College Ave, University District",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      status: "vacant",
      rent: 1600,
      tenant: null,
      occupancyRate: 0,
      nextPayment: null,
      maintenanceRequests: 2,
      rating: 4.6
    },
    {
      id: 3,
      title: "Luxury Penthouse Suite",
      address: "789 Skyline Blvd, Uptown",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      status: "occupied",
      rent: 4200,
      tenant: "Michael Chen",
      occupancyRate: 100,
      nextPayment: "2025-01-20",
      maintenanceRequests: 1,
      rating: 4.9
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return 'bg-success/10 text-success';
      case 'vacant':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'occupied':
        return 'CheckCircle';
      case 'vacant':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Property Portfolio</h3>
          <p className="text-sm text-text-secondary">Manage and monitor your properties</p>
        </div>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Add Property
        </Button>
      </div>
      <div className="space-y-4">
        {properties?.map((property) => (
          <div key={property?.id} className="border border-border rounded-lg p-4 smooth-transition hover:shadow-elevation">
            <div className="flex items-start space-x-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={property?.image}
                  alt={property?.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-base font-semibold text-text-primary truncate">
                      {property?.title}
                    </h4>
                    <p className="text-sm text-text-secondary">{property?.address}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(property?.status)}`}>
                    <Icon name={getStatusIcon(property?.status)} size={12} />
                    <span className="capitalize">{property?.status}</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-text-secondary">Monthly Rent</p>
                    <p className="text-sm font-semibold text-text-primary">${property?.rent?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Occupancy</p>
                    <p className="text-sm font-semibold text-text-primary">{property?.occupancyRate}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Rating</p>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm font-semibold text-text-primary">{property?.rating}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-text-secondary">Maintenance</p>
                    <p className="text-sm font-semibold text-text-primary">
                      {property?.maintenanceRequests} requests
                    </p>
                  </div>
                </div>

                {property?.tenant && (
                  <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{property?.tenant}</p>
                        <p className="text-xs text-text-secondary">
                          Next payment: {new Date(property.nextPayment)?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" iconName="MessageCircle">
                      Message
                    </Button>
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" iconName="Eye">
                    View Details
                  </Button>
                  <Button variant="outline" size="sm" iconName="Edit">
                    Edit Listing
                  </Button>
                  <Button variant="outline" size="sm" iconName="BarChart3">
                    Analytics
                  </Button>
                  {property?.maintenanceRequests > 0 && (
                    <Button variant="warning" size="sm" iconName="Wrench">
                      {property?.maintenanceRequests} Issues
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
        <Button variant="ghost" iconName="Plus">
          Load More Properties
        </Button>
      </div>
    </div>
  );
};

export default PropertyList;