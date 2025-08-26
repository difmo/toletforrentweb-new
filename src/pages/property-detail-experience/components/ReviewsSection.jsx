import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, overallRating, totalReviews }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [selectedRating, setSelectedRating] = useState('all');

  const displayedReviews = showAllReviews ? reviews : reviews?.slice(0, 3);

  const ratingBreakdown = [
    { stars: 5, count: 45, percentage: 75 },
    { stars: 4, count: 12, percentage: 20 },
    { stars: 3, count: 2, percentage: 3 },
    { stars: 2, count: 1, percentage: 2 },
    { stars: 1, count: 0, percentage: 0 }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-border'}
      />
    ));
  };

  return (
    <div className="bg-surface rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-text-primary">Reviews & Ratings</h3>
        <Button variant="outline" size="sm" iconName="MessageSquare" iconPosition="left">
          Write Review
        </Button>
      </div>
      {/* Overall Rating */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="text-center lg:text-left">
          <div className="flex items-center justify-center lg:justify-start space-x-2 mb-2">
            <span className="text-4xl font-bold text-primary">{overallRating}</span>
            <div className="flex space-x-1">
              {renderStars(Math.floor(overallRating))}
            </div>
          </div>
          <p className="text-text-secondary">Based on {totalReviews} reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="space-y-2">
          {ratingBreakdown?.map((item) => (
            <div key={item?.stars} className="flex items-center space-x-3">
              <span className="text-sm text-text-secondary w-6">{item?.stars}★</span>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div
                  className="bg-warning rounded-full h-2 smooth-transition"
                  style={{ width: `${item?.percentage}%` }}
                />
              </div>
              <span className="text-sm text-text-secondary w-8">{item?.count}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', '5', '4', '3', '2', '1']?.map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`px-3 py-1 rounded-full text-sm font-medium smooth-transition ${
              selectedRating === rating
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-text-secondary hover:bg-border'
            }`}
          >
            {rating === 'all' ? 'All Reviews' : `${rating} Stars`}
          </button>
        ))}
      </div>
      {/* Reviews List */}
      <div className="space-y-6">
        {displayedReviews?.map((review) => (
          <div key={review?.id} className="border-b border-border pb-6 last:border-b-0 last:pb-0">
            <div className="flex items-start space-x-4">
              <Image
                src={review?.reviewer?.avatar}
                alt={review?.reviewer?.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-text-primary">{review?.reviewer?.name}</h5>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <span>{formatDate(review?.date)}</span>
                      <span>•</span>
                      <span>{review?.stayDuration}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(review?.rating)}
                  </div>
                </div>
                
                <p className="text-text-secondary leading-relaxed mb-3">
                  {review?.comment}
                </p>
                
                {review?.images && review?.images?.length > 0 && (
                  <div className="flex space-x-2 mb-3">
                    {review?.images?.map((image, index) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ))}
                  </div>
                )}
                
                {review?.helpful > 0 && (
                  <div className="flex items-center space-x-4 text-sm">
                    <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary smooth-transition">
                      <Icon name="ThumbsUp" size={14} />
                      <span>Helpful ({review?.helpful})</span>
                    </button>
                    <button className="text-text-secondary hover:text-text-primary smooth-transition">
                      Reply
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Show More Button */}
      {reviews?.length > 3 && (
        <div className="text-center mt-6">
          <Button
            variant="outline"
            onClick={() => setShowAllReviews(!showAllReviews)}
            iconName={showAllReviews ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAllReviews ? 'Show Less' : `Show All ${reviews?.length} Reviews`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;