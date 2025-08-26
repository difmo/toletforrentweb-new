import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import OwnerDashboardSuite from './pages/owner-dashboard-suite';
import UserProfileVerificationCenter from './pages/user-profile-verification-center';
import CommunityHubLocalInsights from './pages/community-hub-local-insights';
import AdvancedSearchDiscovery from './pages/advanced-search-discovery';
import PropertyDetailExperience from './pages/property-detail-experience';
import Homepage from './pages/homepage';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AdvancedSearchDiscovery />} />
        <Route path="/owner-dashboard-suite" element={<OwnerDashboardSuite />} />
        <Route path="/user-profile-verification-center" element={<UserProfileVerificationCenter />} />
        <Route path="/community-hub-local-insights" element={<CommunityHubLocalInsights />} />
        <Route path="/advanced-search-discovery" element={<AdvancedSearchDiscovery />} />
        <Route path="/property-detail-experience" element={<PropertyDetailExperience />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
