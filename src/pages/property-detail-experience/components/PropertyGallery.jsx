import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PropertyGallery = ({ images, propertyName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showVirtualTour, setShowVirtualTour] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="bg-surface rounded-lg overflow-hidden">
      {/* Main Image Display */}
      <div className="relative h-96 lg:h-[500px] overflow-hidden">
        <Image
          src={images?.[currentImageIndex]?.url}
          alt={`${propertyName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-primary hover:bg-surface smooth-transition"
          aria-label="Previous image"
        >
          <Icon name="ChevronLeft" size={20} />
        </button>
        
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-surface/90 backdrop-blur-sm rounded-full flex items-center justify-center text-text-primary hover:bg-surface smooth-transition"
          aria-label="Next image"
        >
          <Icon name="ChevronRight" size={20} />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-surface/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-text-primary">
          {currentImageIndex + 1} / {images?.length}
        </div>

        {/* Virtual Tour Button */}
        <div className="absolute bottom-4 left-4">
          <Button
            variant="default"
            size="sm"
            iconName="Eye"
            iconPosition="left"
            onClick={() => setShowVirtualTour(true)}
            className="bg-surface/90 backdrop-blur-sm text-text-primary hover:bg-surface"
          >
            360° Virtual Tour
          </Button>
        </div>
      </div>
      {/* Thumbnail Strip */}
      <div className="p-4 bg-surface-secondary">
        <div className="flex space-x-2 overflow-x-auto scrollbar-hide">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 smooth-transition ${
                index === currentImageIndex
                  ? 'border-primary' :'border-transparent hover:border-border'
              }`}
            >
              <Image
                src={image?.url}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface rounded-lg w-full max-w-4xl h-[80vh] relative overflow-hidden">
            <div className="absolute top-4 right-4 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVirtualTour(false)}
                className="bg-surface/90 backdrop-blur-sm"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>
            
            <div className="w-full h-full flex items-center justify-center bg-muted">
              <div className="text-center">
                <Icon name="Eye" size={48} className="mx-auto mb-4 text-text-secondary" />
                <h3 className="text-lg font-semibold text-text-primary mb-2">360° Virtual Tour</h3>
                <p className="text-text-secondary">Interactive virtual tour would be embedded here</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyGallery;