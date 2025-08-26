import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SavedSearches = ({ searches, onCreateAlert, onEditSearch, onDeleteSearch }) => {
  const [activeSearch, setActiveSearch] = useState(null);

  const getAlertStatusColor = (hasAlert) => {
    return hasAlert ? 'text-success bg-success/10' : 'text-text-muted bg-muted';
  };

  const formatPrice = (min, max) => {
    if (min && max) return `$${min} - $${max}`;
    if (min) return `$${min}+`;
    if (max) return `Up to $${max}`;
    return 'Any price';
  };

  return (
    <div className="bg-surface flowing-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-brand-bold text-text-primary mb-2">Saved Searches</h2>
          <p className="text-text-secondary">Get notified when new properties match your criteria</p>
        </div>
        <Button variant="outline" iconName="Plus" iconPosition="left">
          New Search
        </Button>
      </div>
      {searches?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-text-muted" />
          </div>
          <h3 className="text-lg font-brand-semibold text-text-primary mb-2">No Saved Searches</h3>
          <p className="text-text-secondary mb-6 max-w-md mx-auto">
            Save your search criteria to get instant notifications when matching properties become available
          </p>
          <Button variant="default" iconName="Search" iconPosition="left">
            Create Your First Search
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {searches?.map((search) => (
            <div key={search?.id} className="border border-border rounded-lg overflow-hidden">
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-brand-semibold text-text-primary">{search?.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-brand-medium ${getAlertStatusColor(search?.hasAlert)}`}>
                        {search?.hasAlert ? 'Alert On' : 'Alert Off'}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Icon name="MapPin" size={14} />
                        <span>{search?.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="DollarSign" size={14} />
                        <span>{formatPrice(search?.minPrice, search?.maxPrice)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Icon name="Home" size={14} />
                        <span>{search?.propertyType}</span>
                      </div>
                      {search?.bedrooms && (
                        <div className="flex items-center gap-1">
                          <Icon name="Bed" size={14} />
                          <span>{search?.bedrooms} bed{search?.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActiveSearch(activeSearch === search?.id ? null : search?.id)}
                      iconName={activeSearch === search?.id ? "ChevronUp" : "ChevronDown"}
                    >
                      Details
                    </Button>
                  </div>
                </div>

                {/* Search Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-brand-bold text-text-primary">{search?.newMatches}</div>
                    <div className="text-xs text-text-secondary">New Matches</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-brand-bold text-text-primary">{search?.totalMatches}</div>
                    <div className="text-xs text-text-secondary">Total Matches</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-brand-bold text-text-primary">{search?.lastUpdated}</div>
                    <div className="text-xs text-text-secondary">Last Updated</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-lg font-brand-bold text-text-primary">{search?.frequency}</div>
                    <div className="text-xs text-text-secondary">Alert Frequency</div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="default" size="sm" iconName="Search" iconPosition="left">
                    View Results ({search?.totalMatches})
                  </Button>
                  <Button
                    variant={search?.hasAlert ? "outline" : "default"}
                    size="sm"
                    onClick={() => onCreateAlert(search?.id)}
                    iconName={search?.hasAlert ? "BellOff" : "Bell"}
                    iconPosition="left"
                  >
                    {search?.hasAlert ? 'Disable Alert' : 'Enable Alert'}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onEditSearch(search?.id)} iconName="Edit" iconPosition="left">
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => onDeleteSearch(search?.id)} iconName="Trash2" iconPosition="left">
                    Delete
                  </Button>
                </div>
              </div>

              {/* Expanded Details */}
              {activeSearch === search?.id && (
                <div className="border-t border-border p-4 bg-surface-secondary">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-brand-semibold text-text-primary mb-3">Search Criteria</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Location:</span>
                          <span className="text-text-primary">{search?.location}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Property Type:</span>
                          <span className="text-text-primary">{search?.propertyType}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-secondary">Price Range:</span>
                          <span className="text-text-primary">{formatPrice(search?.minPrice, search?.maxPrice)}</span>
                        </div>
                        {search?.bedrooms && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Bedrooms:</span>
                            <span className="text-text-primary">{search?.bedrooms}</span>
                          </div>
                        )}
                        {search?.bathrooms && (
                          <div className="flex justify-between">
                            <span className="text-text-secondary">Bathrooms:</span>
                            <span className="text-text-primary">{search?.bathrooms}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-brand-semibold text-text-primary mb-3">Alert Settings</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                          <div>
                            <p className="text-sm font-brand-medium text-text-primary">Email Notifications</p>
                            <p className="text-xs text-text-secondary">Get notified via email</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full ${search?.emailAlert ? 'bg-primary' : 'bg-muted'} relative smooth-transition`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${search?.emailAlert ? 'left-6' : 'left-0.5'}`} />
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-surface rounded-lg">
                          <div>
                            <p className="text-sm font-brand-medium text-text-primary">Push Notifications</p>
                            <p className="text-xs text-text-secondary">Get instant mobile alerts</p>
                          </div>
                          <div className={`w-12 h-6 rounded-full ${search?.pushAlert ? 'bg-primary' : 'bg-muted'} relative smooth-transition`}>
                            <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${search?.pushAlert ? 'left-6' : 'left-0.5'}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedSearches;