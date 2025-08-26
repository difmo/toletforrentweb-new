import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingTransparency = ({ pricing }) => {
  const [selectedTerm, setSelectedTerm] = useState('monthly');

  const terms = [
    { id: 'monthly', label: '1 Month', multiplier: 1 },
    { id: 'quarterly', label: '3 Months', multiplier: 3, discount: 0.05 },
    { id: 'biannual', label: '6 Months', multiplier: 6, discount: 0.08 },
    { id: 'annual', label: '12 Months', multiplier: 12, discount: 0.12 }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    })?.format(price);
  };

  const calculateTotal = () => {
    const selectedTermData = terms?.find(term => term?.id === selectedTerm);
    const baseRent = pricing?.monthlyRent * selectedTermData?.multiplier;
    const discount = selectedTermData?.discount ? baseRent * selectedTermData?.discount : 0;
    const discountedRent = baseRent - discount;
    
    return {
      baseRent,
      discount,
      discountedRent,
      deposit: pricing?.securityDeposit,
      fees: pricing?.fees?.reduce((sum, fee) => sum + fee?.amount, 0),
      total: discountedRent + pricing?.securityDeposit + pricing?.fees?.reduce((sum, fee) => sum + fee?.amount, 0)
    };
  };

  const totals = calculateTotal();

  return (
    <div className="bg-surface rounded-lg p-6">
      <h3 className="text-lg font-semibold text-text-primary mb-6">Pricing & Costs</h3>
      {/* Lease Term Selection */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Select Lease Term</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {terms?.map((term) => (
            <button
              key={term?.id}
              onClick={() => setSelectedTerm(term?.id)}
              className={`p-3 rounded-lg border-2 text-center smooth-transition ${
                selectedTerm === term?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium text-text-primary">{term?.label}</div>
              {term?.discount && (
                <div className="text-sm text-success">Save {(term?.discount * 100)?.toFixed(0)}%</div>
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Cost Breakdown */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center py-2">
          <span className="text-text-secondary">Monthly Rent</span>
          <span className="font-medium text-text-primary">{formatPrice(pricing?.monthlyRent)}</span>
        </div>

        {totals?.discount > 0 && (
          <div className="flex justify-between items-center py-2 text-success">
            <span>Lease Term Discount</span>
            <span>-{formatPrice(totals?.discount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center py-2 border-t border-border">
          <span className="text-text-secondary">Subtotal ({terms?.find(t => t?.id === selectedTerm)?.label})</span>
          <span className="font-medium text-text-primary">{formatPrice(totals?.discountedRent)}</span>
        </div>

        <div className="flex justify-between items-center py-2">
          <span className="text-text-secondary">Security Deposit</span>
          <span className="font-medium text-text-primary">{formatPrice(totals?.deposit)}</span>
        </div>

        {pricing?.fees?.map((fee, index) => (
          <div key={index} className="flex justify-between items-center py-2">
            <div className="flex items-center space-x-2">
              <span className="text-text-secondary">{fee?.name}</span>
              {fee?.description && (
                <div className="group relative">
                  <Icon name="Info" size={14} className="text-text-secondary cursor-help" />
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded text-xs text-text-secondary opacity-0 invisible group-hover:opacity-100 group-hover:visible smooth-transition whitespace-nowrap">
                    {fee?.description}
                  </div>
                </div>
              )}
            </div>
            <span className="font-medium text-text-primary">{formatPrice(fee?.amount)}</span>
          </div>
        ))}
      </div>
      {/* Total */}
      <div className="border-t border-border pt-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-text-primary">Total Due at Move-in</span>
          <span className="text-xl font-bold text-primary">{formatPrice(totals?.total)}</span>
        </div>
        <p className="text-sm text-text-secondary mt-1">
          Includes first period rent, security deposit, and applicable fees
        </p>
      </div>
      {/* Payment Options */}
      <div className="mb-6">
        <h4 className="font-medium text-text-primary mb-3">Payment Options</h4>
        <div className="space-y-2">
          {pricing?.paymentOptions?.map((option, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-surface-secondary rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name={option?.icon} size={20} className="text-primary" />
                <div>
                  <div className="font-medium text-text-primary">{option?.name}</div>
                  <div className="text-sm text-text-secondary">{option?.description}</div>
                </div>
              </div>
              {option?.fee && (
                <span className="text-sm text-text-secondary">{option?.fee}</span>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Important Notes */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-2">
          <Icon name="AlertCircle" size={16} className="text-warning mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-medium text-text-primary mb-1">Important Notes</p>
            <ul className="text-text-secondary space-y-1">
              <li>• Security deposit is fully refundable upon lease completion</li>
              <li>• Utilities are not included unless specified</li>
              <li>• Pet deposit may apply for pet-friendly properties</li>
              <li>• Prices subject to change based on availability</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="default" size="lg" iconName="FileText" iconPosition="left" className="flex-1">
          Apply Now
        </Button>
        <Button variant="outline" size="lg" iconName="Calculator" iconPosition="left" className="flex-1">
          Calculate Affordability
        </Button>
      </div>
    </div>
  );
};

export default PricingTransparency;