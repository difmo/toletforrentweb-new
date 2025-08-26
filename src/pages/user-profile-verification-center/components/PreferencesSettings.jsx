import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const PreferencesSettings = ({ preferences, onUpdatePreferences }) => {
  const [activeSection, setActiveSection] = useState('search');
  const [formData, setFormData] = useState(preferences);

  const sections = [
    { key: 'search', label: 'Search Preferences', icon: 'Search' },
    { key: 'notifications', label: 'Notifications', icon: 'Bell' },
    { key: 'privacy', label: 'Privacy & Security', icon: 'Shield' },
    { key: 'communication', label: 'Communication', icon: 'MessageCircle' }
  ];

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'House' },
    { value: 'condo', label: 'Condo' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'studio', label: 'Studio' },
    { value: 'room', label: 'Room' }
  ];

  const bedroomOptions = [
    { value: 'any', label: 'Any' },
    { value: '1', label: '1 Bedroom' },
    { value: '2', label: '2 Bedrooms' },
    { value: '3', label: '3 Bedrooms' },
    { value: '4', label: '4+ Bedrooms' }
  ];

  const budgetRanges = [
    { value: '0-1000', label: '$0 - $1,000' },
    { value: '1000-2000', label: '$1,000 - $2,000' },
    { value: '2000-3000', label: '$2,000 - $3,000' },
    { value: '3000-5000', label: '$3,000 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    onUpdatePreferences(formData);
  };

  const renderSearchPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Default Search Criteria</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Preferred Location"
            type="text"
            placeholder="City, neighborhood, or zip code"
            value={formData?.defaultLocation}
            onChange={(e) => handleInputChange('defaultLocation', e?.target?.value)}
          />
          
          <Select
            label="Property Type"
            options={propertyTypes}
            value={formData?.propertyType}
            onChange={(value) => handleInputChange('propertyType', value)}
            multiple
          />
          
          <Select
            label="Bedrooms"
            options={bedroomOptions}
            value={formData?.bedrooms}
            onChange={(value) => handleInputChange('bedrooms', value)}
          />
          
          <Select
            label="Budget Range"
            options={budgetRanges}
            value={formData?.budgetRange}
            onChange={(value) => handleInputChange('budgetRange', value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Amenities Preferences</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <Checkbox
              label="Pet-friendly"
              checked={formData?.amenities?.petFriendly}
              onChange={(e) => handleInputChange('amenities', { ...formData?.amenities, petFriendly: e?.target?.checked })}
            />
            <Checkbox
              label="Parking included"
              checked={formData?.amenities?.parking}
              onChange={(e) => handleInputChange('amenities', { ...formData?.amenities, parking: e?.target?.checked })}
            />
            <Checkbox
              label="Laundry in unit"
              checked={formData?.amenities?.laundry}
              onChange={(e) => handleInputChange('amenities', { ...formData?.amenities, laundry: e?.target?.checked })}
            />
          </div>
          <div className="space-y-3">
            <Checkbox
              label="Air conditioning"
              checked={formData?.amenities?.airConditioning}
              onChange={(e) => handleInputChange('amenities', { ...formData?.amenities, airConditioning: e?.target?.checked })}
            />
            <Checkbox
              label="Gym/Fitness center"
              checked={formData?.amenities?.gym}
              onChange={(e) => handleInputChange('amenities', { ...formData?.amenities, gym: e?.target?.checked })}
            />
            <Checkbox
              label="Swimming pool"
              checked={formData?.amenities?.pool}
              onChange={(e) => handleInputChange('amenities', { ...formData?.amenities, pool: e?.target?.checked })}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">New Property Matches</p>
              <p className="text-sm text-text-secondary">Get notified when properties match your saved searches</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.notifications?.newMatches ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('notifications', { ...formData?.notifications, newMatches: !formData?.notifications?.newMatches })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.notifications?.newMatches ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Application Updates</p>
              <p className="text-sm text-text-secondary">Status changes on your rental applications</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.notifications?.applicationUpdates ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('notifications', { ...formData?.notifications, applicationUpdates: !formData?.notifications?.applicationUpdates })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.notifications?.applicationUpdates ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Messages</p>
              <p className="text-sm text-text-secondary">New messages from landlords and property managers</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.notifications?.messages ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('notifications', { ...formData?.notifications, messages: !formData?.notifications?.messages })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.notifications?.messages ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Push Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Instant Alerts</p>
              <p className="text-sm text-text-secondary">Immediate notifications for urgent updates</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.notifications?.pushAlerts ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('notifications', { ...formData?.notifications, pushAlerts: !formData?.notifications?.pushAlerts })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.notifications?.pushAlerts ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Profile Visibility</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Public Profile</p>
              <p className="text-sm text-text-secondary">Allow landlords to view your profile and rental history</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.privacy?.publicProfile ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('privacy', { ...formData?.privacy, publicProfile: !formData?.privacy?.publicProfile })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.privacy?.publicProfile ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Contact Information</p>
              <p className="text-sm text-text-secondary">Show your contact details to verified landlords</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.privacy?.showContact ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('privacy', { ...formData?.privacy, showContact: !formData?.privacy?.showContact })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.privacy?.showContact ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Data & Security</h3>
        <div className="space-y-3">
          <Button variant="outline" fullWidth iconName="Download" iconPosition="left">
            Download My Data
          </Button>
          <Button variant="outline" fullWidth iconName="Key" iconPosition="left">
            Change Password
          </Button>
          <Button variant="outline" fullWidth iconName="Smartphone" iconPosition="left">
            Two-Factor Authentication
          </Button>
        </div>
      </div>
    </div>
  );

  const renderCommunicationSettings = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Communication Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Auto-Reply Messages</p>
              <p className="text-sm text-text-secondary">Automatically respond to landlord inquiries</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.communication?.autoReply ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('communication', { ...formData?.communication, autoReply: !formData?.communication?.autoReply })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.communication?.autoReply ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div>
              <p className="font-brand-medium text-text-primary">Read Receipts</p>
              <p className="text-sm text-text-secondary">Let others know when you've read their messages</p>
            </div>
            <div className={`w-12 h-6 rounded-full ${formData?.communication?.readReceipts ? 'bg-primary' : 'bg-text-muted'} relative smooth-transition cursor-pointer`}
                 onClick={() => handleInputChange('communication', { ...formData?.communication, readReceipts: !formData?.communication?.readReceipts })}>
              <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 smooth-transition ${formData?.communication?.readReceipts ? 'left-6' : 'left-0.5'}`} />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-brand-semibold text-text-primary mb-4">Response Time</h3>
        <Select
          label="Expected Response Time"
          options={[
            { value: 'immediate', label: 'Within 1 hour' },
            { value: 'same_day', label: 'Same day' },
            { value: 'next_day', label: 'Within 24 hours' },
            { value: 'flexible', label: 'Flexible' }
          ]}
          value={formData?.communication?.responseTime}
          onChange={(value) => handleInputChange('communication', { ...formData?.communication, responseTime: value })}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-surface flowing-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-brand-bold text-text-primary mb-2">Preferences & Settings</h2>
          <p className="text-text-secondary">Customize your ToletTorrent experience</p>
        </div>
        <Button variant="default" onClick={handleSave} iconName="Save" iconPosition="left">
          Save Changes
        </Button>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:w-64">
          <div className="space-y-2">
            {sections?.map((section) => (
              <button
                key={section?.key}
                onClick={() => setActiveSection(section?.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left smooth-transition ${
                  activeSection === section?.key
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={section?.icon} size={18} />
                <span className="font-brand-medium">{section?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-surface-secondary rounded-lg p-6">
            {activeSection === 'search' && renderSearchPreferences()}
            {activeSection === 'notifications' && renderNotificationSettings()}
            {activeSection === 'privacy' && renderPrivacySettings()}
            {activeSection === 'communication' && renderCommunicationSettings()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSettings;