import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onEditProfile, onUploadPhoto }) => {
  const getVerificationColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'rejected': return 'text-error bg-error/10';
      default: return 'text-text-muted bg-muted';
    }
  };

  const getVerificationIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'rejected': return 'XCircle';
      default: return 'AlertCircle';
    }
  };

  return (
    <div className="bg-surface flowing-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* Profile Photo Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-muted">
              <Image
                src={user?.profilePhoto}
                alt={`${user?.name}'s profile`}
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={onUploadPhoto}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center hover:bg-primary/90 smooth-transition"
              aria-label="Upload new photo"
            >
              <Icon name="Camera" size={16} />
            </button>
          </div>
          
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-brand-bold text-text-primary mb-1">{user?.name}</h1>
            <p className="text-text-secondary mb-2">{user?.email}</p>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <Icon name="MapPin" size={16} className="text-text-muted" />
              <span className="text-sm text-text-secondary">{user?.location}</span>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex-1 lg:mx-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {user?.verifications?.map((verification) => (
              <div key={verification?.type} className="text-center">
                <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-brand-medium ${getVerificationColor(verification?.status)}`}>
                  <Icon name={getVerificationIcon(verification?.status)} size={16} />
                  <span className="hidden sm:inline">{verification?.label}</span>
                </div>
                <p className="text-xs text-text-muted mt-1 sm:hidden">{verification?.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={onEditProfile} iconName="Edit" iconPosition="left">
            Edit Profile
          </Button>
          <Button variant="default" className="brand-gradient text-white" iconName="Shield" iconPosition="left">
            Complete Verification
          </Button>
        </div>
      </div>
      {/* Profile Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
        <div className="text-center">
          <div className="text-2xl font-brand-bold text-text-primary">{user?.stats?.memberSince}</div>
          <div className="text-sm text-text-secondary">Member Since</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-brand-bold text-text-primary">{user?.stats?.completedRentals}</div>
          <div className="text-sm text-text-secondary">Completed Rentals</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-brand-bold text-text-primary">{user?.stats?.rating}</div>
          <div className="text-sm text-text-secondary">Average Rating</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-brand-bold text-text-primary">{user?.stats?.responseRate}</div>
          <div className="text-sm text-text-secondary">Response Rate</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;