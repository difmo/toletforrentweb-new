import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VerificationCenter = ({ verifications, onStartVerification, onUploadDocument }) => {
  const [activeStep, setActiveStep] = useState(null);

  const getStepStatus = (step) => {
    const verification = verifications?.find(v => v?.type === step?.type);
    return verification?.status || 'not_started';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'rejected': return 'text-error';
      case 'in_progress': return 'text-primary';
      default: return 'text-text-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      case 'in_progress': return 'RefreshCw';
      default: return 'Circle';
    }
  };

  const verificationSteps = [
    {
      type: 'identity',
      title: 'Identity Verification',
      description: 'Upload a government-issued ID to verify your identity',
      icon: 'User',
      documents: ['Passport', 'Driver\'s License', 'National ID'],
      estimatedTime: '2-3 minutes'
    },
    {
      type: 'employment',
      title: 'Employment Verification',
      description: 'Verify your employment status and income',
      icon: 'Briefcase',
      documents: ['Employment Letter', 'Pay Stub', 'Tax Return'],
      estimatedTime: '5-7 minutes'
    },
    {
      type: 'references',
      title: 'Rental References',
      description: 'Provide previous landlord or rental references',
      icon: 'Users',
      documents: ['Previous Lease', 'Landlord Contact', 'Reference Letter'],
      estimatedTime: '3-5 minutes'
    },
    {
      type: 'financial',
      title: 'Financial Verification',
      description: 'Verify your financial stability and creditworthiness',
      icon: 'CreditCard',
      documents: ['Bank Statement', 'Credit Report', 'Income Proof'],
      estimatedTime: '4-6 minutes'
    }
  ];

  return (
    <div className="bg-surface flowing-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-brand-bold text-text-primary mb-2">Verification Center</h2>
          <p className="text-text-secondary">Complete your verification to build trust with property owners</p>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-brand-medium">Secure & Encrypted</span>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-brand-medium text-text-secondary">Overall Progress</span>
          <span className="text-sm font-brand-medium text-text-primary">
            {verifications?.filter(v => v?.status === 'verified')?.length} of {verificationSteps?.length} completed
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="brand-gradient h-2 rounded-full smooth-transition"
            style={{ 
              width: `${(verifications?.filter(v => v?.status === 'verified')?.length / verificationSteps?.length) * 100}%` 
            }}
          />
        </div>
      </div>
      {/* Verification Steps */}
      <div className="space-y-4">
        {verificationSteps?.map((step, index) => {
          const status = getStepStatus(step);
          const isActive = activeStep === step?.type;
          
          return (
            <div key={step?.type} className="border border-border rounded-lg overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-muted/50 smooth-transition"
                onClick={() => setActiveStep(isActive ? null : step?.type)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      status === 'verified' ? 'bg-success/10 text-success' :
                      status === 'pending' || status === 'in_progress' ? 'bg-warning/10 text-warning' :
                      status === 'rejected'? 'bg-error/10 text-error' : 'bg-muted text-text-muted'
                    }`}>
                      <Icon name={step?.icon} size={20} />
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-brand-semibold text-text-primary">{step?.title}</h3>
                        <Icon 
                          name={getStatusIcon(status)} 
                          size={16} 
                          className={getStatusColor(status)} 
                        />
                      </div>
                      <p className="text-sm text-text-secondary">{step?.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <div className="text-sm font-brand-medium text-text-primary capitalize">
                        {status?.replace('_', ' ')}
                      </div>
                      <div className="text-xs text-text-muted">{step?.estimatedTime}</div>
                    </div>
                    <Icon 
                      name={isActive ? "ChevronUp" : "ChevronDown"} 
                      size={20} 
                      className="text-text-muted" 
                    />
                  </div>
                </div>
              </div>
              {/* Expanded Content */}
              {isActive && (
                <div className="border-t border-border p-4 bg-surface-secondary">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-brand-semibold text-text-primary mb-3">Required Documents</h4>
                      <div className="space-y-2">
                        {step?.documents?.map((doc, docIndex) => (
                          <div key={docIndex} className="flex items-center gap-2">
                            <Icon name="FileText" size={16} className="text-text-muted" />
                            <span className="text-sm text-text-secondary">{doc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {status === 'not_started' && (
                        <Button 
                          variant="default" 
                          fullWidth
                          onClick={() => onStartVerification(step?.type)}
                          iconName="Upload"
                          iconPosition="left"
                        >
                          Start Verification
                        </Button>
                      )}
                      
                      {status === 'in_progress' && (
                        <div className="space-y-3">
                          <Button 
                            variant="outline" 
                            fullWidth
                            onClick={() => onUploadDocument(step?.type)}
                            iconName="Upload"
                            iconPosition="left"
                          >
                            Upload Documents
                          </Button>
                          <Button variant="ghost" fullWidth iconName="MessageCircle" iconPosition="left">
                            Schedule Video Call
                          </Button>
                        </div>
                      )}
                      
                      {status === 'pending' && (
                        <div className="text-center p-4 bg-warning/10 rounded-lg">
                          <Icon name="Clock" size={24} className="text-warning mx-auto mb-2" />
                          <p className="text-sm text-warning font-brand-medium">Under Review</p>
                          <p className="text-xs text-text-muted mt-1">We'll notify you within 24-48 hours</p>
                        </div>
                      )}
                      
                      {status === 'verified' && (
                        <div className="text-center p-4 bg-success/10 rounded-lg">
                          <Icon name="CheckCircle" size={24} className="text-success mx-auto mb-2" />
                          <p className="text-sm text-success font-brand-medium">Verified Successfully</p>
                          <p className="text-xs text-text-muted mt-1">Completed on {new Date()?.toLocaleDateString()}</p>
                        </div>
                      )}
                      
                      {status === 'rejected' && (
                        <div className="space-y-3">
                          <div className="text-center p-4 bg-error/10 rounded-lg">
                            <Icon name="XCircle" size={24} className="text-error mx-auto mb-2" />
                            <p className="text-sm text-error font-brand-medium">Verification Failed</p>
                            <p className="text-xs text-text-muted mt-1">Please resubmit with correct documents</p>
                          </div>
                          <Button 
                            variant="outline" 
                            fullWidth
                            onClick={() => onStartVerification(step?.type)}
                            iconName="RefreshCw"
                            iconPosition="left"
                          >
                            Try Again
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerificationCenter;