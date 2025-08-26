import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MaintenanceRequests = () => {
  const requests = [
    {
      id: 1,
      title: "Kitchen Faucet Leak",
      description: "The kitchen faucet has been dripping constantly for the past two days. It\'s getting worse and needs immediate attention.",
      property: "Modern Downtown Apartment",
      tenant: "Sarah Johnson",
      tenantImage: "https://randomuser.me/api/portraits/women/25.jpg",
      priority: "high",
      status: "pending",
      category: "Plumbing",
      reportedDate: "2025-01-20",
      estimatedCost: 150,
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 2,
      title: "Air Conditioning Not Working",
      description: "The AC unit stopped working yesterday. The apartment is getting very warm and uncomfortable.",
      property: "Luxury Penthouse Suite",
      tenant: "Michael Chen",
      tenantImage: "https://randomuser.me/api/portraits/men/35.jpg",
      priority: "urgent",
      status: "in-progress",
      category: "HVAC",
      reportedDate: "2025-01-19",
      estimatedCost: 350,
      assignedTo: "Cool Air Services",
      images: [
        "https://images.unsplash.com/photo-1631545806609-c2b999c8f4c6?w=300&h=200&fit=crop"
      ]
    },
    {
      id: 3,
      title: "Bathroom Light Fixture",
      description: "The light fixture in the main bathroom is flickering and sometimes doesn't turn on at all.",
      property: "Cozy Studio Near University",
      tenant: "Alex Rivera",
      tenantImage: "https://randomuser.me/api/portraits/men/28.jpg",
      priority: "medium",
      status: "completed",
      category: "Electrical",
      reportedDate: "2025-01-15",
      completedDate: "2025-01-18",
      estimatedCost: 85,
      actualCost: 75,
      assignedTo: "Bright Electric Co.",
      images: []
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success';
      case 'in-progress':
        return 'bg-primary/10 text-primary';
      case 'pending':
        return 'bg-warning/10 text-warning';
      default:
        return 'bg-muted text-text-secondary';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Plumbing':
        return 'Droplets';
      case 'HVAC':
        return 'Wind';
      case 'Electrical':
        return 'Zap';
      case 'Appliance':
        return 'Microwave';
      default:
        return 'Wrench';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Maintenance Requests</h3>
          <p className="text-sm text-text-secondary">Track and manage property maintenance issues</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="default" size="sm" iconName="Plus">
            Add Request
          </Button>
        </div>
      </div>
      <div className="space-y-4">
        {requests?.map((request) => (
          <div key={request?.id} className="border border-border rounded-lg p-6 smooth-transition hover:shadow-elevation">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getPriorityColor(request?.priority)?.replace('text-', 'text-')?.replace('bg-', 'bg-')}`}>
                  <Icon name={getCategoryIcon(request?.category)} size={20} />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-text-primary mb-1">{request?.title}</h4>
                  <p className="text-sm text-text-secondary mb-2">{request?.property}</p>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(request?.priority)}`}>
                      {request?.priority?.charAt(0)?.toUpperCase() + request?.priority?.slice(1)} Priority
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request?.status)}`}>
                      {request?.status?.charAt(0)?.toUpperCase() + request?.status?.slice(1)}
                    </span>
                    <span className="text-xs text-text-secondary">{request?.category}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">
                  Est. ${request?.estimatedCost}
                </p>
                {request?.actualCost && (
                  <p className="text-xs text-success">
                    Actual: ${request?.actualCost}
                  </p>
                )}
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-text-secondary">{request?.description}</p>
            </div>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <Image
                    src={request?.tenantImage}
                    alt={request?.tenant}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">{request?.tenant}</p>
                  <p className="text-xs text-text-secondary">
                    Reported {new Date(request.reportedDate)?.toLocaleDateString()}
                  </p>
                </div>
              </div>
              {request?.assignedTo && (
                <div className="flex items-center space-x-2">
                  <Icon name="User" size={16} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">Assigned to {request?.assignedTo}</span>
                </div>
              )}
              {request?.completedDate && (
                <div className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={16} className="text-success" />
                  <span className="text-sm text-success">
                    Completed {new Date(request.completedDate)?.toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>

            {request?.images?.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium text-text-primary mb-2">Attached Images</p>
                <div className="flex space-x-2">
                  {request?.images?.map((image, index) => (
                    <div key={index} className="w-20 h-20 rounded-lg overflow-hidden">
                      <Image
                        src={image}
                        alt={`Issue photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {request?.status === 'pending' && (
                <>
                  <Button variant="default" size="sm" iconName="Play">
                    Start Work
                  </Button>
                  <Button variant="outline" size="sm" iconName="Users">
                    Assign Contractor
                  </Button>
                </>
              )}
              {request?.status === 'in-progress' && (
                <>
                  <Button variant="success" size="sm" iconName="Check">
                    Mark Complete
                  </Button>
                  <Button variant="outline" size="sm" iconName="Clock">
                    Update Status
                  </Button>
                </>
              )}
              <Button variant="outline" size="sm" iconName="MessageCircle">
                Message Tenant
              </Button>
              <Button variant="ghost" size="sm" iconName="FileText">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
        <Button variant="ghost" iconName="RefreshCw">
          Load More Requests
        </Button>
      </div>
    </div>
  );
};

export default MaintenanceRequests;