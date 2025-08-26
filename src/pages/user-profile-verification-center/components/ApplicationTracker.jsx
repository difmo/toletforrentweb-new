import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ApplicationTracker = ({ applications, onWithdrawApplication, onMessageLandlord }) => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'rejected': return 'text-error bg-error/10';
      case 'withdrawn': return 'text-text-muted bg-muted';
      case 'under_review': return 'text-primary bg-primary/10';
      default: return 'text-text-muted bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      case 'withdrawn': return 'Minus';
      case 'under_review': return 'Eye';
      default: return 'Circle';
    }
  };

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending': return 25;
      case 'under_review': return 50;
      case 'approved': return 100;
      case 'rejected': return 100;
      case 'withdrawn': return 0;
      default: return 0;
    }
  };

  const applicationSteps = [
    { key: 'submitted', label: 'Application Submitted', icon: 'FileText' },
    { key: 'under_review', label: 'Under Review', icon: 'Eye' },
    { key: 'background_check', label: 'Background Check', icon: 'Shield' },
    { key: 'final_decision', label: 'Final Decision', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-surface flowing-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-brand-bold text-text-primary mb-2">Application Tracker</h2>
          <p className="text-text-secondary">Track the status of your rental applications</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
          <Icon name="Activity" size={16} />
          <span className="text-sm font-brand-medium">{applications?.length} Active</span>
        </div>
      </div>
      {applications?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={24} className="text-text-muted" />
          </div>
          <h3 className="text-lg font-brand-semibold text-text-primary mb-2">No Applications Yet</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Start applying to properties to track your application status here
          </p>
          <Button variant="default" iconName="Search" iconPosition="left">
            Browse Properties
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {applications?.map((application) => (
            <div key={application?.id} className="border border-border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Property Image */}
                  <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={application?.propertyImage}
                      alt={application?.propertyName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Application Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-brand-semibold text-text-primary mb-1">{application?.propertyName}</h3>
                        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                          <Icon name="MapPin" size={14} />
                          <span>{application?.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>Applied: {application?.appliedDate}</span>
                          <span>•</span>
                          <span>${application?.monthlyRent}/month</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-brand-medium ${getStatusColor(application?.status)}`}>
                          <Icon name={getStatusIcon(application?.status)} size={12} className="inline mr-1" />
                          {application?.status?.replace('_', ' ')?.charAt(0)?.toUpperCase() + application?.status?.replace('_', ' ')?.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-brand-medium text-text-secondary">Application Progress</span>
                        <span className="text-sm font-brand-medium text-text-primary">{getProgressPercentage(application?.status)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full smooth-transition ${
                            application?.status === 'approved' ? 'bg-success' :
                            application?.status === 'rejected'? 'bg-error' : 'brand-gradient'
                          }`}
                          style={{ width: `${getProgressPercentage(application?.status)}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedApplication(selectedApplication === application?.id ? null : application?.id)}
                        iconName={selectedApplication === application?.id ? "ChevronUp" : "ChevronDown"}
                        iconPosition="left"
                      >
                        View Details
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onMessageLandlord(application?.id)}
                        iconName="MessageCircle"
                        iconPosition="left"
                      >
                        Message Landlord
                      </Button>
                      
                      {application?.status === 'pending' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onWithdrawApplication(application?.id)}
                          iconName="X"
                          iconPosition="left"
                        >
                          Withdraw
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedApplication === application?.id && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Application Timeline */}
                      <div>
                        <h4 className="font-brand-semibold text-text-primary mb-4">Application Timeline</h4>
                        <div className="space-y-4">
                          {applicationSteps?.map((step, index) => {
                            const isCompleted = getProgressPercentage(application?.status) > (index * 25);
                            const isCurrent = Math.floor(getProgressPercentage(application?.status) / 25) === index;
                            
                            return (
                              <div key={step?.key} className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                  isCompleted ? 'bg-success text-white' : isCurrent ?'bg-primary text-white': 'bg-muted text-text-muted'
                                }`}>
                                  <Icon name={step?.icon} size={16} />
                                </div>
                                <div className="flex-1">
                                  <p className={`text-sm font-brand-medium ${
                                    isCompleted || isCurrent ? 'text-text-primary' : 'text-text-muted'
                                  }`}>
                                    {step?.label}
                                  </p>
                                  {isCompleted && (
                                    <p className="text-xs text-text-muted">Completed</p>
                                  )}
                                  {isCurrent && (
                                    <p className="text-xs text-primary">In Progress</p>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      
                      {/* Application Details */}
                      <div>
                        <h4 className="font-brand-semibold text-text-primary mb-4">Application Details</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Application Fee:</span>
                            <span className="text-text-primary">${application?.applicationFee}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Security Deposit:</span>
                            <span className="text-text-primary">${application?.securityDeposit}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Move-in Date:</span>
                            <span className="text-text-primary">{application?.moveInDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-text-secondary">Lease Term:</span>
                            <span className="text-text-primary">{application?.leaseTerm}</span>
                          </div>
                          
                          {application?.notes && (
                            <div className="mt-4 p-3 bg-muted rounded-lg">
                              <p className="text-sm font-brand-medium text-text-primary mb-1">Landlord Notes:</p>
                              <p className="text-sm text-text-secondary italic">"{application?.notes}"</p>
                            </div>
                          )}
                          
                          {application?.nextStep && (
                            <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                              <p className="text-sm font-brand-medium text-primary mb-1">Next Step:</p>
                              <p className="text-sm text-text-secondary">{application?.nextStep}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationTracker;