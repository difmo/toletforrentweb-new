import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RentalHistory = ({ rentals, onAddRental, onRequestReference }) => {
  const [selectedRental, setSelectedRental] = useState(null);

  const getRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < rating ? "Star" : "Star"}
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-text-muted"}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10';
      case 'current': return 'text-primary bg-primary/10';
      case 'terminated': return 'text-error bg-error/10';
      default: return 'text-text-muted bg-muted';
    }
  };

  return (
    <div className="bg-surface flowing-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-brand-bold text-text-primary mb-2">Rental History</h2>
          <p className="text-text-secondary">Your rental track record builds trust with property owners</p>
        </div>
        <Button variant="outline" onClick={onAddRental} iconName="Plus" iconPosition="left">
          Add Rental
        </Button>
      </div>
      {rentals?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Home" size={24} className="text-text-muted" />
          </div>
          <h3 className="text-lg font-brand-semibold text-text-primary mb-2">No Rental History Yet</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Add your previous rental experiences to build credibility with property owners
          </p>
          <Button variant="default" onClick={onAddRental} iconName="Plus" iconPosition="left">
            Add Your First Rental
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {rentals?.map((rental) => (
            <div key={rental?.id} className="border border-border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Property Image */}
                  <div className="w-full lg:w-32 h-24 rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={rental?.propertyImage}
                      alt={rental?.propertyName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Rental Details */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-brand-semibold text-text-primary mb-1">{rental?.propertyName}</h3>
                        <div className="flex items-center gap-2 text-sm text-text-secondary mb-2">
                          <Icon name="MapPin" size={14} />
                          <span>{rental?.location}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-text-secondary">
                          <span>{rental?.duration}</span>
                          <span>•</span>
                          <span>${rental?.monthlyRent}/month</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-brand-medium ${getStatusColor(rental?.status)}`}>
                          {rental?.status?.charAt(0)?.toUpperCase() + rental?.status?.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Landlord Rating */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-muted">
                          <Image
                            src={rental?.landlordPhoto}
                            alt={rental?.landlordName}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-brand-medium text-text-primary">{rental?.landlordName}</p>
                          <div className="flex items-center gap-1">
                            {getRatingStars(rental?.landlordRating)}
                            <span className="text-xs text-text-muted ml-1">({rental?.landlordRating}/5)</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {rental?.hasReference ? (
                          <div className="flex items-center gap-2 text-success">
                            <Icon name="CheckCircle" size={16} />
                            <span className="text-sm font-brand-medium">Reference Available</span>
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onRequestReference(rental?.id)}
                            iconName="MessageCircle"
                            iconPosition="left"
                          >
                            Request Reference
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRental(selectedRental === rental?.id ? null : rental?.id)}
                          iconName={selectedRental === rental?.id ? "ChevronUp" : "ChevronDown"}
                        >
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedRental === rental?.id && (
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-brand-semibold text-text-primary mb-3">Rental Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Start Date:</span>
                            <span className="text-text-primary">{rental?.startDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">End Date:</span>
                            <span className="text-text-primary">{rental?.endDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Security Deposit:</span>
                            <span className="text-text-primary">${rental?.securityDeposit}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Payment History:</span>
                            <span className="text-success">On Time</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-brand-semibold text-text-primary mb-3">Landlord Feedback</h4>
                        <div className="bg-muted rounded-lg p-4">
                          <p className="text-sm text-text-secondary italic mb-3">"{rental?.landlordFeedback}"</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              {getRatingStars(rental?.landlordRating)}
                            </div>
                            <span className="text-xs text-text-muted">{rental?.feedbackDate}</span>
                          </div>
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

export default RentalHistory;