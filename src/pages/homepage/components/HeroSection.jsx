import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { marketService } from '../../../services/marketService';

const HeroSection = () => {
  const [userLocation, setUserLocation] = useState('New York');
  const [marketInsights, setMarketInsights] = useState({
    averageRent: 2850,
    availableProperties: 1247,
    priceChange: '+5.2%'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadMarketData = async () => {
      setLoading(true);
      try {
        const { data: locationData } = await marketService?.detectUserLocation();
        
        if (isMounted && locationData) {
          setUserLocation(locationData?.city);
          
          if (locationData?.marketData) {
            setMarketInsights({
              averageRent: locationData?.marketData?.average_rent,
              availableProperties: locationData?.marketData?.available_properties,
              priceChange: `${locationData?.marketData?.price_change_percentage >= 0 ? '+' : ''}${locationData?.marketData?.price_change_percentage}%`
            });
          }
        }
      } catch (error) {
        console.error('Error loading market data:', error);
        // Keep default values if error occurs
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadMarketData();

    return () => {
      isMounted = false;
    };
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    })?.format(price);
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Location Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-blue-100 rounded-full px-4 py-2 text-sm">
              <Icon name="MapPin" size={16} className="text-blue-600" />
              <span className="text-gray-700">
                {loading ? 'Detecting location...' : `Detected location: ${userLocation}`}
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your perfect space is{' '}
                <span className="brand-gradient-text">waiting</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Rent with confidence, list with success. Join thousands who've found their ideal home through our trusted community.
              </p>
            </div>

            {/* Market Insights */}
            <div className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                {userLocation} Market Insights
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : formatPrice(marketInsights?.averageRent)}
                  </div>
                  <div className="text-sm text-gray-500">Avg. Rent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {loading ? '...' : marketInsights?.availableProperties?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
                <div>
                  <div className={`text-2xl font-bold ${
                    marketInsights?.priceChange?.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {loading ? '...' : marketInsights?.priceChange}
                  </div>
                  <div className="text-sm text-gray-500">This Month</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/advanced-search-discovery" className="flex-1">
                <Button 
                  variant="default" 
                  size="lg" 
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  className="brand-gradient text-white"
                >
                  Find Your Next Home
                </Button>
              </Link>
              <Link to="/owner-dashboard-suite" className="flex-1">
                <Button 
                  variant="outline" 
                  size="lg" 
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                >
                  List Your Property
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative z-10">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="aspect-[4/3] bg-gradient-to-br from-blue-100 to-teal-100 relative">
                  <img
                    src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Modern apartment interior"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  
                  {/* Floating Cards */}
                  <div className="absolute top-4 right-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <Icon name="Star" size={16} className="text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-4 left-4 bg-white rounded-lg p-3 shadow-lg">
                    <div className="text-sm text-gray-500">Starting from</div>
                    <div className="text-lg font-bold text-gray-900">$2,400/mo</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Luxury Downtown Apartment
                  </h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Icon name="Bed" size={14} />
                      <span>2 beds</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Bath" size={14} />
                      <span>2 baths</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Square" size={14} />
                      <span>1,200 sq ft</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-blue-200 rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-teal-200 rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;