import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessStoryCarousel = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const stories = [
    {
      type: 'owner',
      name: 'Sarah Chen',
      location: 'Brooklyn, NY',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Increased Revenue by 45%',
      story: `"After switching to ToletTorrent, I found the perfect tenants for my Brooklyn apartment. The verification process gave me confidence, and the community insights helped me price competitively. My rental income increased by 45% in just six months."`,
      metrics: {
        revenue: '+45%',
        timeToRent: '12 days',
        tenantRating: '4.9/5'
      },
      badge: 'Property Owner Success'
    },
    {
      type: 'renter',
      name: 'Marcus Johnson',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Found Dream Apartment in 3 Days',
      story: `"Moving to San Francisco for work was stressful until I found ToletTorrent. The AI matching connected me with a perfect apartment in Mission District within 3 days. The owner was verified, the process was transparent, and I love my new neighborhood."`,
      metrics: {
        searchTime: '3 days',
        savings: '$400/mo',
        satisfaction: '5/5 stars'
      },
      badge: 'Renter Success Story'
    },
    {
      type: 'owner',
      name: 'David Rodriguez',
      location: 'Chicago, IL',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Zero Vacancy for 18 Months',
      story: `"ToletTorrent's tenant screening is incredible. I've had zero vacancy for 18 months across my three properties. The platform's community insights helped me understand what renters really want, and the results speak for themselves."`,
      metrics: {
        vacancy: '0%',
        tenantRetention: '94%',
        properties: '3 units'
      },
      badge: 'Multi-Property Success'
    },
    {
      type: 'renter',
      name: 'Emily Watson',
      location: 'Boston, MA',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80',
      backgroundImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      title: 'Perfect Match for Graduate School',
      story: `"As a graduate student, finding affordable housing near campus was challenging. ToletTorrent's community insights showed me hidden gems in safe neighborhoods. I found a great roommate through the platform and saved $300 monthly."`,
      metrics: {
        savings: '$300/mo',
        commute: '15 min',
        community: '4.8/5'
      },
      badge: 'Student Success'
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setCurrentStory((prev) => (prev + 1) % stories?.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, stories?.length]);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories?.length);
    setIsAutoPlaying(false);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories?.length) % stories?.length);
    setIsAutoPlaying(false);
  };

  const goToStory = (index) => {
    setCurrentStory(index);
    setIsAutoPlaying(false);
  };

  const currentStoryData = stories?.[currentStory];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories from Our Community
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real people, real results. Discover how ToletTorrent has transformed the rental experience for property owners and renters alike.
          </p>
        </div>

        <div className="relative">
          {/* Main Story Card */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Story Content */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    currentStoryData?.type === 'owner' ?'bg-blue-100 text-blue-800' :'bg-green-100 text-green-800'
                  }`}>
                    {currentStoryData?.badge}
                  </div>
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {currentStoryData?.title}
                </h3>

                <blockquote className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {currentStoryData?.story}
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {Object.entries(currentStoryData?.metrics)?.map(([key, value], index) => (
                    <div key={index} className="text-center">
                      <div className="text-xl font-bold text-gray-900">{value}</div>
                      <div className="text-sm text-gray-500 capitalize">{key?.replace(/([A-Z])/g, ' $1')}</div>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={currentStoryData?.avatar}
                    alt={currentStoryData?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{currentStoryData?.name}</div>
                    <div className="text-sm text-gray-500">{currentStoryData?.location}</div>
                  </div>
                </div>
              </div>

              {/* Story Image */}
              <div className="relative h-64 lg:h-auto">
                <img
                  src={currentStoryData?.backgroundImage}
                  alt={`${currentStoryData?.name}'s property`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 smooth-transition">
                    <Icon name="Play" size={24} className="text-gray-700 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Previous/Next Buttons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevStory}
                className="w-10 h-10 rounded-full"
              >
                <Icon name="ChevronLeft" size={20} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextStory}
                className="w-10 h-10 rounded-full"
              >
                <Icon name="ChevronRight" size={20} />
              </Button>
            </div>

            {/* Dots Indicator */}
            <div className="flex items-center space-x-2">
              {stories?.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToStory(index)}
                  className={`w-3 h-3 rounded-full smooth-transition ${
                    index === currentStory 
                      ? 'bg-blue-600' :'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Auto-play Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`p-2 rounded-full smooth-transition ${
                  isAutoPlaying 
                    ? 'bg-blue-100 text-blue-600' :'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
              </button>
              <span className="text-sm text-gray-500">
                {isAutoPlaying ? 'Auto-play on' : 'Auto-play off'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryCarousel;