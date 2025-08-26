import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import ProfileHeader from './components/ProfileHeader';
import VerificationCenter from './components/VerificationCenter';
import RentalHistory from './components/RentalHistory';
import SavedSearches from './components/SavedSearches';
import ApplicationTracker from './components/ApplicationTracker';
import PreferencesSettings from './components/PreferencesSettings';

const UserProfileVerificationCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    location: "San Francisco, CA",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    verifications: [
      { type: 'identity', label: 'Identity', status: 'verified' },
      { type: 'employment', label: 'Employment', status: 'verified' },
      { type: 'references', label: 'References', status: 'pending' }
    ],
    stats: {
      memberSince: "2022",
      completedRentals: "3",
      rating: "4.8",
      responseRate: "98%"
    }
  };

  // Mock verification data
  const verificationData = [
    { type: 'identity', status: 'verified' },
    { type: 'employment', status: 'verified' },
    { type: 'references', status: 'pending' },
    { type: 'financial', status: 'not_started' }
  ];

  // Mock rental history
  const rentalHistoryData = [
    {
      id: 1,
      propertyName: "Modern Downtown Apartment",
      location: "Downtown San Francisco, CA",
      propertyImage: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300&h=200&fit=crop",
      duration: "Jan 2023 - Dec 2023",
      monthlyRent: 3200,
      status: "completed",
      landlordName: "Michael Chen",
      landlordPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      landlordRating: 5,
      landlordFeedback: "Sarah was an excellent tenant. Always paid rent on time, kept the property in great condition, and was very communicative. I would highly recommend her to any landlord.",
      feedbackDate: "Jan 2024",
      hasReference: true,
      startDate: "Jan 15, 2023",
      endDate: "Dec 31, 2023",
      securityDeposit: 3200
    },
    {
      id: 2,
      propertyName: "Cozy Mission District Studio",
      location: "Mission District, San Francisco, CA",
      propertyImage: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
      duration: "Jun 2021 - Dec 2022",
      monthlyRent: 2800,
      status: "completed",
      landlordName: "Lisa Rodriguez",
      landlordPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
      landlordRating: 4,
      landlordFeedback: "Good tenant overall. Responsible and respectful of the property. Minor communication delays but nothing major.",
      feedbackDate: "Jan 2023",
      hasReference: true,
      startDate: "Jun 1, 2021",
      endDate: "Dec 15, 2022",
      securityDeposit: 2800
    }
  ];

  // Mock saved searches
  const savedSearchesData = [
    {
      id: 1,
      name: "Downtown 1BR Under $3500",
      location: "Downtown San Francisco",
      minPrice: 2500,
      maxPrice: 3500,
      propertyType: "Apartment",
      bedrooms: 1,
      bathrooms: 1,
      hasAlert: true,
      emailAlert: true,
      pushAlert: true,
      newMatches: 3,
      totalMatches: 24,
      lastUpdated: "2 hours ago",
      frequency: "Daily"
    },
    {
      id: 2,
      name: "Pet-Friendly Mission District",
      location: "Mission District",
      minPrice: 2000,
      maxPrice: 4000,
      propertyType: "Apartment, House",
      bedrooms: 2,
      bathrooms: 1,
      hasAlert: false,
      emailAlert: false,
      pushAlert: false,
      newMatches: 0,
      totalMatches: 12,
      lastUpdated: "1 day ago",
      frequency: "Weekly"
    }
  ];

  // Mock applications
  const applicationsData = [
    {
      id: 1,
      propertyName: "Luxury High-Rise Apartment",
      location: "SOMA, San Francisco, CA",
      propertyImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&h=200&fit=crop",
      appliedDate: "Aug 15, 2024",
      monthlyRent: 4200,
      status: "under_review",
      applicationFee: 50,
      securityDeposit: 4200,
      moveInDate: "Sep 1, 2024",
      leaseTerm: "12 months",
      notes: "Application looks good. We\'re currently running background checks and will have an update by end of week.",
      nextStep: "Background check in progress. You\'ll receive an update within 2-3 business days."
    },
    {
      id: 2,
      propertyName: "Charming Victorian House",
      location: "Castro District, San Francisco, CA",
      propertyImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&h=200&fit=crop",
      appliedDate: "Aug 10, 2024",
      monthlyRent: 3800,
      status: "pending",
      applicationFee: 75,
      securityDeposit: 3800,
      moveInDate: "Sep 15, 2024",
      leaseTerm: "12 months",
      notes: null,
      nextStep: "Waiting for landlord review. Applications are being reviewed in order received."
    }
  ];

  // Mock preferences
  const preferencesData = {
    defaultLocation: "San Francisco, CA",
    propertyType: ["apartment", "condo"],
    bedrooms: "1",
    budgetRange: "2000-4000",
    amenities: {
      petFriendly: true,
      parking: true,
      laundry: false,
      airConditioning: true,
      gym: false,
      pool: false
    },
    notifications: {
      newMatches: true,
      applicationUpdates: true,
      messages: true,
      pushAlerts: false
    },
    privacy: {
      publicProfile: true,
      showContact: false
    },
    communication: {
      autoReply: false,
      readReceipts: true,
      responseTime: "same_day"
    }
  };

  const tabs = [
    { key: 'overview', label: 'Overview', icon: 'User' },
    { key: 'verification', label: 'Verification', icon: 'Shield' },
    { key: 'history', label: 'Rental History', icon: 'Clock' },
    { key: 'searches', label: 'Saved Searches', icon: 'Search' },
    { key: 'applications', label: 'Applications', icon: 'FileText' },
    { key: 'preferences', label: 'Preferences', icon: 'Settings' }
  ];

  // Event handlers
  const handleEditProfile = () => {
    console.log('Edit profile clicked');
  };

  const handleUploadPhoto = () => {
    console.log('Upload photo clicked');
  };

  const handleStartVerification = (type) => {
    console.log('Start verification:', type);
  };

  const handleUploadDocument = (type) => {
    console.log('Upload document:', type);
  };

  const handleAddRental = () => {
    console.log('Add rental clicked');
  };

  const handleRequestReference = (rentalId) => {
    console.log('Request reference for rental:', rentalId);
  };

  const handleCreateAlert = (searchId) => {
    console.log('Create alert for search:', searchId);
  };

  const handleEditSearch = (searchId) => {
    console.log('Edit search:', searchId);
  };

  const handleDeleteSearch = (searchId) => {
    console.log('Delete search:', searchId);
  };

  const handleWithdrawApplication = (applicationId) => {
    console.log('Withdraw application:', applicationId);
  };

  const handleMessageLandlord = (applicationId) => {
    console.log('Message landlord for application:', applicationId);
  };

  const handleUpdatePreferences = (preferences) => {
    console.log('Update preferences:', preferences);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header - Always visible */}
          <ProfileHeader
            user={userData}
            onEditProfile={handleEditProfile}
            onUploadPhoto={handleUploadPhoto}
          />

          {/* Tab Navigation */}
          <div className="bg-surface flowing-border mb-6">
            <div className="flex overflow-x-auto">
              {tabs?.map((tab) => (
                <button
                  key={tab?.key}
                  onClick={() => setActiveTab(tab?.key)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-brand-medium whitespace-nowrap smooth-transition ${
                    activeTab === tab?.key
                      ? 'text-primary border-b-2 border-primary' :'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  <span className="hidden sm:inline">{tab?.label}</span>
                  <span className="sm:hidden">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {activeTab === 'overview' && (
              <div className="grid lg:grid-cols-2 gap-6">
                <VerificationCenter
                  verifications={verificationData}
                  onStartVerification={handleStartVerification}
                  onUploadDocument={handleUploadDocument}
                />
                <div className="space-y-6">
                  <SavedSearches
                    searches={savedSearchesData?.slice(0, 2)}
                    onCreateAlert={handleCreateAlert}
                    onEditSearch={handleEditSearch}
                    onDeleteSearch={handleDeleteSearch}
                  />
                  <ApplicationTracker
                    applications={applicationsData?.slice(0, 1)}
                    onWithdrawApplication={handleWithdrawApplication}
                    onMessageLandlord={handleMessageLandlord}
                  />
                </div>
              </div>
            )}

            {activeTab === 'verification' && (
              <VerificationCenter
                verifications={verificationData}
                onStartVerification={handleStartVerification}
                onUploadDocument={handleUploadDocument}
              />
            )}

            {activeTab === 'history' && (
              <RentalHistory
                rentals={rentalHistoryData}
                onAddRental={handleAddRental}
                onRequestReference={handleRequestReference}
              />
            )}

            {activeTab === 'searches' && (
              <SavedSearches
                searches={savedSearchesData}
                onCreateAlert={handleCreateAlert}
                onEditSearch={handleEditSearch}
                onDeleteSearch={handleDeleteSearch}
              />
            )}

            {activeTab === 'applications' && (
              <ApplicationTracker
                applications={applicationsData}
                onWithdrawApplication={handleWithdrawApplication}
                onMessageLandlord={handleMessageLandlord}
              />
            )}

            {activeTab === 'preferences' && (
              <PreferencesSettings
                preferences={preferencesData}
                onUpdatePreferences={handleUpdatePreferences}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfileVerificationCenter;