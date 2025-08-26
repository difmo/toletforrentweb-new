import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const AIRecommendations = ({ recommendations, onDismiss, onFeedback }) => {
  const [expandedReason, setExpandedReason] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  const handleReasonToggle = (id) => {
    setExpandedReason(expandedReason === id ? null : id);
  };

  const handleFeedback = (propertyId, isHelpful) => {
    onFeedback(propertyId, isHelpful);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 brand-gradient rounded-lg flex items-center justify-center">
            <Icon name="Sparkles" size={16} className="text-white" />
          </div>
          <div>
            <h3 className="font-brand-semibold text-text-primary">AI Recommendations</h3>
            <p className="text-sm text-text-secondary">Based on your search behavior</p>
          </div>
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      <div className="space-y-4">
        {recommendations?.map((property) => (
          <div key={property?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation smooth-transition">
            <Link to="/property-detail-experience" className="block">
              <div className="flex gap-3">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={property?.images?.[0]}
                    alt={property?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="font-brand-medium text-text-primary text-sm line-clamp-1">
                      {property?.title}
                    </h4>
                    <button
                      onClick={(e) => {
                        e?.preventDefault();
                        onDismiss(property?.id);
                      }}
                      className="text-text-muted hover:text-text-secondary p-1"
                    >
                      <Icon name="X" size={14} />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
                    <Icon name="MapPin" size={12} />
                    <span>{property?.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-brand-bold text-primary text-sm">
                      {formatPrice(property?.price)}/mo
                    </span>
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={12} className="text-warning" fill="currentColor" />
                      <span className="text-xs text-text-secondary">{property?.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 text-xs text-text-secondary mb-2">
                    <span>{property?.bedrooms} bed</span>
                    <span>{property?.bathrooms} bath</span>
                    <span>{property?.area} sqft</span>
                  </div>

                  {/* AI Reason */}
                  <div className="bg-muted rounded-md p-2 mb-2">
                    <button
                      onClick={(e) => {
                        e?.preventDefault();
                        handleReasonToggle(property?.id);
                      }}
                      className="flex items-center justify-between w-full text-left"
                    >
                      <div className="flex items-center gap-1">
                        <Icon name="Brain" size={12} className="text-primary" />
                        <span className="text-xs font-brand-medium text-text-primary">
                          Why recommended?
                        </span>
                      </div>
                      <Icon 
                        name={expandedReason === property?.id ? "ChevronUp" : "ChevronDown"} 
                        size={12} 
                        className="text-text-secondary" 
                      />
                    </button>
                    
                    {expandedReason === property?.id && (
                      <div className="mt-2 text-xs text-text-secondary">
                        <p>{property?.aiReason}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {property?.matchingCriteria?.map((criteria, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                            >
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Feedbac  */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-text-secondary">Helpful?</span>
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e?.preventDefault();
                            handleFeedback(property?.id, true);
                          }}
                          className={`p-1 rounded hover:bg-muted smooth-transition ${
                            property?.feedback === true ? 'text-success' : 'text-text-muted'
                          }`}
                        >
                          <Icon name="ThumbsUp" size={12} />
                        </button>
                        <button
                          onClick={(e) => {
                            e?.preventDefault();
                            handleFeedback(property?.id, false);
                          }}
                          className={`p-1 rounded hover:bg-muted smooth-transition ${
                            property?.feedback === false ? 'text-error' : 'text-text-muted'
                          }`}
                        >
                          <Icon name="ThumbsDown" size={12} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {property?.matchScore && (
                        <div className="flex items-center gap-1">
                          <span className="text-xs text-text-secondary">Match:</span>
                          <span className="text-xs font-brand-medium text-success">
                            {property?.matchScore}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* AI Learning Notice */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start gap-2">
          <Icon name="Info" size={14} className="text-primary mt-0.5" />
          <div>
            <p className="text-xs text-text-secondary">
              Our AI learns from your interactions to provide better recommendations. 
              Your feedback helps improve suggestions for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;