import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TenantApplications = () => {
  const applications = [
    {
      id: 1,
      applicantName: "Emma Rodriguez",
      applicantImage: "https://randomuser.me/api/portraits/women/32.jpg",
      propertyTitle: "Modern Downtown Apartment",
      applicationDate: "2025-01-18",
      monthlyIncome: 8500,
      creditScore: 785,
      employmentStatus: "Full-time Software Engineer",
      verificationStatus: {
        identity: "verified",
        income: "verified",
        background: "pending",
        references: "verified"
      },
      rating: 4.7,
      previousRentals: 3,
      message: `Hi! I'm very interested in your downtown apartment. I'm a software engineer at TechCorp and have been looking for a place close to work. I have excellent references from previous landlords and would love to schedule a viewing.`
    },
    {
      id: 2,
      applicantName: "David Kim",
      applicantImage: "https://randomuser.me/api/portraits/men/45.jpg",
      propertyTitle: "Cozy Studio Near University",
      applicationDate: "2025-01-17",
      monthlyIncome: 4200,
      creditScore: 720,
      employmentStatus: "Graduate Student & TA",
      verificationStatus: {
        identity: "verified",
        income: "verified",
        background: "verified",
        references: "pending"
      },
      rating: 4.9,
      previousRentals: 2,
      message: `I'm a PhD student in Computer Science and would be an ideal tenant for your studio. I'm quiet, responsible, and have great references from my current landlord.`
    },
    {
      id: 3,
      applicantName: "Lisa Thompson",
      applicantImage: "https://randomuser.me/api/portraits/women/28.jpg",
      propertyTitle: "Luxury Penthouse Suite",
      applicationDate: "2025-01-16",
      monthlyIncome: 12000,
      creditScore: 820,
      employmentStatus: "Marketing Director",
      verificationStatus: {
        identity: "verified",
        income: "verified",
        background: "verified",
        references: "verified"
      },
      rating: 4.8,
      previousRentals: 4,
      message: `I'm relocating to the city for a new position and am looking for a luxury apartment. I have an excellent rental history and can provide all necessary documentation.`
    }
  ];

  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'failed':
        return 'text-error';
      default:
        return 'text-text-secondary';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'failed':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Tenant Applications</h3>
          <p className="text-sm text-text-secondary">Review and manage incoming applications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {applications?.map((application) => (
          <div key={application?.id} className="border border-border rounded-lg p-6 smooth-transition hover:shadow-elevation">
            <div className="flex items-start space-x-4 mb-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={application?.applicantImage}
                  alt={application?.applicantName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-lg font-semibold text-text-primary">{application?.applicantName}</h4>
                    <p className="text-sm text-text-secondary">{application?.employmentStatus}</p>
                    <p className="text-sm text-text-secondary">Applied for: {application?.propertyTitle}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="text-sm font-medium text-text-primary">{application?.rating}</span>
                    </div>
                    <p className="text-xs text-text-secondary">
                      Applied {new Date(application.applicationDate)?.toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-text-secondary mb-1">Monthly Income</p>
                    <p className="text-lg font-semibold text-text-primary">${application?.monthlyIncome?.toLocaleString()}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-text-secondary mb-1">Credit Score</p>
                    <p className="text-lg font-semibold text-text-primary">{application?.creditScore}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-xs text-text-secondary mb-1">Previous Rentals</p>
                    <p className="text-lg font-semibold text-text-primary">{application?.previousRentals}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-text-primary mb-2">Verification Status</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {Object.entries(application?.verificationStatus)?.map(([key, status]) => (
                      <div key={key} className="flex items-center space-x-2">
                        <Icon 
                          name={getVerificationIcon(status)} 
                          size={16} 
                          className={getVerificationColor(status)} 
                        />
                        <span className="text-sm text-text-secondary capitalize">{key}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-sm font-medium text-text-primary mb-2">Application Message</h5>
                  <p className="text-sm text-text-secondary bg-muted rounded-lg p-3">
                    {application?.message}
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <Button variant="default" size="sm" iconName="Check">
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm" iconName="X">
                    Decline
                  </Button>
                  <Button variant="outline" size="sm" iconName="MessageCircle">
                    Message
                  </Button>
                  <Button variant="outline" size="sm" iconName="Calendar">
                    Schedule Tour
                  </Button>
                  <Button variant="ghost" size="sm" iconName="FileText">
                    View Documents
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6 pt-6 border-t border-border">
        <Button variant="ghost" iconName="RefreshCw">
          Load More Applications
        </Button>
      </div>
    </div>
  );
};

export default TenantApplications;