import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import NeighborhoodGuideCard from './components/NeighborhoodGuideCard';
import ForumDiscussionCard from './components/ForumDiscussionCard';
import MarketInsightChart from './components/MarketInsightChart';
import SuccessStoryCard from './components/SuccessStoryCard';
import LocalServiceCard from './components/LocalServiceCard';
import CommunityStats from './components/CommunityStats';
import QuickActions from './components/QuickActions';
import TrendingTopics from './components/TrendingTopics';

const CommunityHubLocalInsights = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data for community stats
  const communityStats = [
    { type: 'members', label: 'Active Members', value: '12.5K', growth: 15 },
    { type: 'discussions', label: 'Discussions', value: '3.2K', growth: 8 },
    { type: 'guides', label: 'Neighborhood Guides', value: '450', growth: 12 },
    { type: 'reviews', label: 'Service Reviews', value: '8.9K', growth: 22 },
    { type: 'services', label: 'Verified Services', value: '280', growth: 5 }
  ];

  // Mock data for trending topics
  const trendingTopics = [
    { title: "Best neighborhoods for young professionals", discussions: 45, participants: 128, trend: 'hot', change: '+25%' },
    { title: "Utility setup tips for new renters", discussions: 32, participants: 89, trend: 'up', change: '+18%' },
    { title: "Property investment opportunities 2024", discussions: 28, participants: 67, trend: 'up', change: '+12%' },
    { title: "Moving services recommendations", discussions: 24, participants: 56, trend: 'hot', change: '+30%' },
    { title: "Lease negotiation strategies", discussions: 19, participants: 43, trend: 'up', change: '+8%' }
  ];

  // Mock data for neighborhood guides
  const neighborhoodGuides = [
    {
      id: 1,
      name: "Downtown Financial District",
      category: "Business Hub",
      description: "Complete guide to living in the heart of the financial district with insider tips on commuting, dining, and entertainment options.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      rating: 4.8,
      contributors: 23,
      reviews: 156,
      recentContributors: [
        { name: "Sarah Chen", avatar: "https://randomuser.me/api/portraits/women/32.jpg" },
        { name: "Mike Johnson", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
        { name: "Lisa Park", avatar: "https://randomuser.me/api/portraits/women/28.jpg" }
      ]
    },
    {
      id: 2,
      name: "Riverside Arts Quarter",
      category: "Creative Hub",
      description: "Discover the vibrant arts scene, local galleries, and creative spaces that make this neighborhood perfect for artists and creatives.",
      image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=300&fit=crop",
      rating: 4.6,
      contributors: 18,
      reviews: 89,
      recentContributors: [
        { name: "Alex Rivera", avatar: "https://randomuser.me/api/portraits/men/33.jpg" },
        { name: "Emma Wilson", avatar: "https://randomuser.me/api/portraits/women/41.jpg" },
        { name: "David Kim", avatar: "https://randomuser.me/api/portraits/men/29.jpg" }
      ]
    },
    {
      id: 3,
      name: "Green Valley Suburbs",
      category: "Family Friendly",
      description: "Family-oriented community guide featuring schools, parks, safety information, and family activities in this peaceful suburban area.",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      rating: 4.9,
      contributors: 31,
      reviews: 203,
      recentContributors: [
        { name: "Jennifer Adams", avatar: "https://randomuser.me/api/portraits/women/35.jpg" },
        { name: "Robert Taylor", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
        { name: "Maria Garcia", avatar: "https://randomuser.me/api/portraits/women/38.jpg" }
      ]
    }
  ];

  // Mock data for forum discussions
  const forumDiscussions = [
    {
      id: 1,
      title: "Best internet providers in downtown area - need recommendations",
      preview: "Moving to downtown next month and looking for reliable high-speed internet. What are your experiences with different providers in the area?",
      author: { name: "TechNomad_Sarah", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'active',
      replies: 23,
      views: 156,
      likes: 12,
      tags: ['internet', 'downtown', 'utilities']
    },
    {
      id: 2,
      title: "Solved: How to handle security deposit disputes with landlords",
      preview: "After months of back and forth, I finally got my full security deposit back. Here's exactly what worked and the documentation you need.",
      author: { name: "LegalEagle_Mike", avatar: "https://randomuser.me/api/portraits/men/36.jpg" },
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'solved',
      replies: 45,
      views: 892,
      likes: 67,
      tags: ['legal', 'deposits', 'landlord']
    },
    {
      id: 3,
      title: "🔥 Hot: New luxury apartments opening in Riverside - insider info",
      preview: "Got some inside information about the new luxury development opening in Riverside. Pre-leasing starts next week with some amazing amenities.",
      author: { name: "PropertyInsider_Lisa", avatar: "https://randomuser.me/api/portraits/women/31.jpg" },
      createdAt: new Date(Date.now() - 30 * 60 * 1000),
      status: 'hot',
      replies: 78,
      views: 1234,
      likes: 89,
      tags: ['luxury', 'riverside', 'new-development']
    }
  ];

  // Mock data for market insights
  const rentalPriceData = [
    { name: 'Jan', value: 2800 },
    { name: 'Feb', value: 2850 },
    { name: 'Mar', value: 2900 },
    { name: 'Apr', value: 2950 },
    { name: 'May', value: 3100 },
    { name: 'Jun', value: 3200 }
  ];

  const availabilityData = [
    { name: 'Studio', value: 45 },
    { name: '1BR', value: 78 },
    { name: '2BR', value: 123 },
    { name: '3BR', value: 67 },
    { name: '4BR+', value: 23 }
  ];

  // Mock data for success stories
  const successStories = [
    {
      id: 1,
      title: "From Couch Surfing to Dream Apartment",
      excerpt: "After months of searching and facing multiple rejections, I finally found my perfect studio in the arts district. The community here helped me understand the application process and connect with the right landlord.",
      author: { name: "Jessica Martinez", avatar: "https://randomuser.me/api/portraits/women/27.jpg" },
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      type: 'rental',
      location: 'Arts District',
      timeframe: '3 months ago',
      metrics: [
        { label: 'Search Time', value: '2 months' },
        { label: 'Applications', value: '12' },
        { label: 'Savings', value: '$200/mo' }
      ],
      likes: 156,
      comments: 23,
      shares: 8
    },
    {
      id: 2,
      title: "Turning My Property into a Rental Goldmine",
      excerpt: "Using insights from this community, I transformed my inherited property into a profitable rental. The local market data and renovation tips were invaluable in maximizing my ROI.",
      author: { name: "Robert Chen", avatar: "https://randomuser.me/api/portraits/men/39.jpg" },
      image: "https://images.unsplash.com/photo-1560184897-ae75f418493e?w=400&h=300&fit=crop",
      type: 'investment',
      location: 'Suburban Heights',
      timeframe: '6 months ago',
      metrics: [
        { label: 'ROI Increase', value: '+35%' },
        { label: 'Occupancy', value: '98%' },
        { label: 'Monthly Income', value: '$2,800' }
      ],
      likes: 234,
      comments: 45,
      shares: 19
    },
    {
      id: 3,
      title: "International Move Made Easy",
      excerpt: "Moving from London to San Francisco seemed impossible until I found this community. The relocation guides and local connections made my transition seamless and stress-free.",
      author: { name: "Emma Thompson", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      type: 'relocation',
      location: 'Financial District',
      timeframe: '4 months ago',
      metrics: [
        { label: 'Prep Time', value: '6 weeks' },
        { label: 'Connections', value: '15+' },
        { label: 'Stress Level', value: 'Low' }
      ],
      likes: 189,
      comments: 34,
      shares: 12
    }
  ];

  // Mock data for local services
  const localServices = [
    {
      id: 1,
      name: "Swift Movers Pro",
      category: "moving",
      description: "Professional moving services with 15+ years experience. Specializing in local and long-distance moves with full insurance coverage.",
      logo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop",
      rating: 4.8,
      reviewCount: 234,
      location: "Citywide",
      responseTime: "< 2 hours",
      priceRange: "$89/hour",
      specialties: ["Local Moving", "Packing", "Storage", "Piano Moving"]
    },
    {
      id: 2,
      name: "PowerGrid Utilities",
      category: "utilities",
      description: "Fast and reliable utility setup services. Get your electricity, gas, and internet connected within 24 hours of your move-in date.",
      logo: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&h=100&fit=crop",
      rating: 4.6,
      reviewCount: 156,
      location: "Metro Area",
      responseTime: "Same day",
      priceRange: "$45 setup",
      specialties: ["Electricity", "Gas", "Internet", "Cable TV"]
    },
    {
      id: 3,
      name: "Sparkle Clean Services",
      category: "cleaning",
      description: "Move-in and move-out cleaning specialists. Eco-friendly products and satisfaction guaranteed. Available for one-time or recurring services.",
      logo: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=100&h=100&fit=crop",
      rating: 4.9,
      reviewCount: 189,
      location: "Downtown & Suburbs",
      responseTime: "< 4 hours",
      priceRange: "$120/visit",
      specialties: ["Deep Cleaning", "Eco-Friendly", "Move-in/out", "Recurring"]
    }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'downtown', label: 'Downtown' },
    { value: 'riverside', label: 'Riverside' },
    { value: 'suburbs', label: 'Suburbs' },
    { value: 'arts-district', label: 'Arts District' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'guides', label: 'Neighborhood Guides' },
    { value: 'discussions', label: 'Discussions' },
    { value: 'services', label: 'Local Services' },
    { value: 'stories', label: 'Success Stories' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Home' },
    { id: 'guides', label: 'Neighborhood Guides', icon: 'Map' },
    { id: 'discussions', label: 'Discussions', icon: 'MessageSquare' },
    { id: 'insights', label: 'Market Insights', icon: 'BarChart3' },
    { id: 'stories', label: 'Success Stories', icon: 'Heart' },
    { id: 'services', label: 'Local Services', icon: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="pt-20 pb-12 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              Community Hub & <span className="brand-gradient-text">Local Insights</span>
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Connect with fellow renters and property owners, discover neighborhood secrets, and access local market intelligence that helps you make informed decisions.
            </p>
          </div>
          
          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-6 shadow-elevation">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    type="search"
                    placeholder="Search discussions, guides, or services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select
                    options={locationOptions}
                    value={selectedLocation}
                    onChange={setSelectedLocation}
                    placeholder="Location"
                    className="min-w-[150px]"
                  />
                  <Select
                    options={categoryOptions}
                    value={selectedCategory}
                    onChange={setSelectedCategory}
                    placeholder="Category"
                    className="min-w-[150px]"
                  />
                  <Button variant="default" iconName="Search">
                    Search
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Navigation Tabs */}
      <section className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 whitespace-nowrap smooth-transition ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Community Stats */}
            <CommunityStats stats={communityStats} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
              
              {/* Trending Topics */}
              <div className="lg:col-span-2">
                <TrendingTopics topics={trendingTopics} />
              </div>
            </div>
            
            {/* Featured Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Discussions */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text-primary">Recent Discussions</h2>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('discussions')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {forumDiscussions?.slice(0, 2)?.map((discussion) => (
                    <ForumDiscussionCard key={discussion?.id} discussion={discussion} />
                  ))}
                </div>
              </div>
              
              {/* Popular Guides */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-text-primary">Popular Guides</h2>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('guides')}>
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {neighborhoodGuides?.slice(0, 2)?.map((guide) => (
                    <NeighborhoodGuideCard key={guide?.id} guide={guide} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Neighborhood Guides Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text-primary">Neighborhood Guides</h2>
              <Button variant="default" iconName="Plus">
                Create Guide
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoodGuides?.map((guide) => (
                <NeighborhoodGuideCard key={guide?.id} guide={guide} />
              ))}
            </div>
          </div>
        )}

        {/* Discussions Tab */}
        {activeTab === 'discussions' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text-primary">Community Discussions</h2>
              <Button variant="default" iconName="MessageSquarePlus">
                Start Discussion
              </Button>
            </div>
            
            <div className="space-y-6">
              {forumDiscussions?.map((discussion) => (
                <ForumDiscussionCard key={discussion?.id} discussion={discussion} />
              ))}
            </div>
          </div>
        )}

        {/* Market Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text-primary">Market Insights</h2>
              <Button variant="outline" iconName="Download">
                Export Data
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <MarketInsightChart
                data={rentalPriceData}
                type="line"
                title="Average Rental Prices"
                subtitle="Monthly trends for 1BR apartments"
                trend={8.5}
              />
              <MarketInsightChart
                data={availabilityData}
                type="bar"
                title="Available Properties"
                subtitle="Current inventory by property type"
                trend={-3.2}
              />
            </div>
          </div>
        )}

        {/* Success Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text-primary">Success Stories</h2>
              <Button variant="default" iconName="Heart">
                Share Your Story
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories?.map((story) => (
                <SuccessStoryCard key={story?.id} story={story} />
              ))}
            </div>
          </div>
        )}

        {/* Local Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text-primary">Local Services</h2>
              <Button variant="default" iconName="Plus">
                Add Service
              </Button>
            </div>
            
            <div className="space-y-6">
              {localServices?.map((service) => (
                <LocalServiceCard key={service?.id} service={service} />
              ))}
            </div>
          </div>
        )}
      </main>
      {/* Footer */}
      <footer className="bg-surface border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 brand-gradient rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primary">ToletTorrent Community</h3>
                  <p className="text-sm text-text-secondary">Connect, Share, Discover</p>
                </div>
              </div>
              <p className="text-text-secondary mb-4">
                Join thousands of renters and property owners sharing knowledge, experiences, and building stronger communities together.
              </p>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm" iconName="MessageSquare">
                  Join Discussion
                </Button>
                <Button variant="default" size="sm" iconName="Users">
                  Become Member
                </Button>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Community</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary smooth-transition">Guidelines</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Moderation</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Rewards Program</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Expert Network</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li><a href="#" className="hover:text-text-primary smooth-transition">Rental Guides</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Legal Resources</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">Market Reports</a></li>
                <li><a href="#" className="hover:text-text-primary smooth-transition">API Access</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} ToletTorrent Community. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                  <Icon name="Twitter" size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                  <Icon name="Facebook" size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                  <Icon name="Instagram" size={20} />
                </a>
                <a href="#" className="text-text-secondary hover:text-text-primary smooth-transition">
                  <Icon name="Linkedin" size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CommunityHubLocalInsights;