import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      name: 'SSL Secured',
      icon: 'Shield',
      description: '256-bit encryption',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      name: 'GDPR Compliant',
      icon: 'Lock',
      description: 'Data protection certified',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'PCI DSS Level 1',
      icon: 'CreditCard',
      description: 'Payment security standard',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'SOC 2 Type II',
      icon: 'CheckCircle',
      description: 'Security & availability',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const partnerships = [
    {
      name: 'Better Business Bureau',
      rating: 'A+',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: 'Accredited Business'
    },
    {
      name: 'National Association of Realtors',
      rating: 'Member',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: 'Professional Member'
    },
    {
      name: 'TrustPilot',
      rating: '4.8/5',
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: 'Excellent Rating'
    },
    {
      name: 'Google Reviews',
      rating: '4.9/5',
      logo: 'https://images.unsplash.com/photo-1560472355-536de3962603?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
      description: '2,847 Reviews'
    }
  ];

  const mediaRecognition = [
    {
      outlet: 'TechCrunch',
      title: 'Best PropTech Startup 2024',
      date: 'March 2024',
      type: 'Award'
    },
    {
      outlet: 'Forbes',
      title: 'Revolutionizing Rental Market',
      date: 'February 2024',
      type: 'Feature'
    },
    {
      outlet: 'Wall Street Journal',
      title: 'Top 10 Real Estate Platforms',
      date: 'January 2024',
      type: 'Ranking'
    },
    {
      outlet: 'Real Estate Weekly',
      title: 'Innovation in Property Rentals',
      date: 'December 2023',
      type: 'Interview'
    }
  ];

  const legalCompliance = [
    {
      jurisdiction: 'United States',
      laws: ['Fair Housing Act', 'Real Estate Settlement Procedures Act', 'Truth in Lending Act'],
      status: 'Fully Compliant'
    },
    {
      jurisdiction: 'European Union',
      laws: ['GDPR', 'Digital Services Act', 'Consumer Rights Directive'],
      status: 'Certified'
    },
    {
      jurisdiction: 'Canada',
      laws: ['Personal Information Protection Act', 'Residential Tenancies Act'],
      status: 'Registered'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted & Secure Platform
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your safety and security are our top priorities. We maintain the highest standards of data protection, legal compliance, and industry recognition.
          </p>
        </div>

        {/* Security Certifications */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Security Certifications
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md smooth-transition"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 ${cert?.bgColor} rounded-xl mb-4`}>
                  <Icon name={cert?.icon} size={24} className={cert?.color} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{cert?.name}</h4>
                <p className="text-sm text-gray-500">{cert?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnerships & Ratings */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Partnerships & Ratings
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerships?.map((partner, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100 hover:shadow-md smooth-transition"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={partner?.logo}
                    alt={partner?.name}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 text-sm">{partner?.name}</h4>
                <div className="text-lg font-bold text-blue-600 mb-1">{partner?.rating}</div>
                <p className="text-xs text-gray-500">{partner?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Recognition */}
        <div className="mb-16">
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Media Recognition
          </h3>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid md:grid-cols-2 gap-6">
              {mediaRecognition?.map((media, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 smooth-transition"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon name="Award" size={20} className="text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{media?.outlet}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        media?.type === 'Award' ? 'bg-yellow-100 text-yellow-800' :
                        media?.type === 'Feature' ? 'bg-blue-100 text-blue-800' :
                        media?.type === 'Ranking'? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {media?.type}
                      </span>
                    </div>
                    <p className="text-gray-700 mb-1">{media?.title}</p>
                    <p className="text-sm text-gray-500">{media?.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-8 text-center">
            Legal Compliance
          </h3>
          <div className="grid lg:grid-cols-3 gap-6">
            {legalCompliance?.map((compliance, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">{compliance?.jurisdiction}</h4>
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                    {compliance?.status}
                  </span>
                </div>
                <ul className="space-y-2">
                  {compliance?.laws?.map((law, lawIndex) => (
                    <li key={lawIndex} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{law}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8">
            <Icon name="Shield" size={48} className="text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Your Trust is Our Foundation
            </h3>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've built ToletTorrent on the principles of transparency, security, and reliability. Every feature, every process, and every interaction is designed to earn and maintain your trust.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSignals;