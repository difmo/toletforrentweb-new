import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeatureGrid = () => {
  const features = [
    {
      icon: 'Brain',
      title: 'AI-Powered Matching',
      description: 'Our intelligent algorithm analyzes your preferences, lifestyle, and budget to connect you with properties that truly fit your needs.',
      benefits: [
        'Smart property recommendations',
        'Lifestyle compatibility scoring',
        'Budget optimization suggestions',
        'Preference learning over time'
      ],
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-500'
    },
    {
      icon: 'Shield',
      title: 'Transparent Verification',
      description: 'Every user, property, and transaction is thoroughly verified through our comprehensive trust and safety system.',
      benefits: [
        'Identity verification for all users',
        'Property authenticity checks',
        'Financial background screening',
        'Real-time fraud detection'
      ],
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      gradientFrom: 'from-green-500',
      gradientTo: 'to-emerald-500'
    },
    {
      icon: 'Users',
      title: 'Community-Driven Insights',
      description: 'Tap into the collective wisdom of our community with authentic reviews, neighborhood guides, and local insights.',
      benefits: [
        'Verified tenant and owner reviews',
        'Neighborhood safety ratings',
        'Local amenity recommendations',
        'Community event updates'
      ],
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-pink-500'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose ToletTorrent?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We've reimagined the rental experience with cutting-edge technology, transparent processes, and a community-first approach.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl smooth-transition overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature?.gradientFrom} ${feature?.gradientTo} opacity-0 group-hover:opacity-5 smooth-transition`} />
              
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-16 h-16 ${feature?.bgColor} rounded-2xl mb-6 group-hover:scale-110 smooth-transition`}>
                <Icon name={feature?.icon} size={32} className={feature?.color} />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature?.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature?.description}
                </p>

                {/* Benefits List */}
                <ul className="space-y-3 mb-8">
                  {feature?.benefits?.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start space-x-3">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="sm"
                  className="group-hover:border-current group-hover:text-blue-600 smooth-transition"
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  Learn More
                </Button>
              </div>

              {/* Decorative Element */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full opacity-20 group-hover:scale-150 smooth-transition" />
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-8 lg:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied users who've found their perfect rental match through our innovative platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Link to="/advanced-search-discovery" className="flex-1">
                <Button 
                  variant="default" 
                  size="lg" 
                  fullWidth
                  className="brand-gradient text-white"
                  iconName="Search"
                  iconPosition="left"
                >
                  Start Searching
                </Button>
              </Link>
              <Link to="/community-hub-local-insights" className="flex-1">
                <Button 
                  variant="outline" 
                  size="lg" 
                  fullWidth
                  iconName="Users"
                  iconPosition="left"
                >
                  Join Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;