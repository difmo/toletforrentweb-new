import React, { useState, useEffect, useMemo } from 'react';
import PropertyCard from './PropertyCard';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { propertyService } from '../../../services/propertyService';
import { useAuth } from '../../../contexts/AuthContext';

const PropertyList = ({ filters, sortBy, viewMode = 'grid' }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [compareList, setCompareList] = useState(new Set());

  const { user } = useAuth();
  const itemsPerPage = 12;

  useEffect(() => {
    let isMounted = true;

    const loadProperties = async () => {
      setLoading(true);
      setError(null);

      try {
        const searchOptions = {
          ...filters,
          sort_by: sortBy,
          limit: itemsPerPage,
          offset: (currentPage - 1) * itemsPerPage
        };

        const { data, error } = await propertyService?.getProperties(searchOptions);

        if (error) {
          throw error;
        }

        if (isMounted) {
          if (currentPage === 1) {
            setProperties(data || []);
          } else {
            setProperties(prev => [...prev, ...(data || [])]);
          }
          
          setHasMore((data || [])?.length === itemsPerPage);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load properties. Please try again.');
          console.error('Error loading properties:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, [filters, sortBy, currentPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    setProperties([]);
  }, [filters, sortBy]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleFavorite = async (propertyId) => {
    if (!user) {
      // Show login modal or redirect to login
      console.log('Please login to save favorites');
      return;
    }

    try {
      if (favorites?.has(propertyId)) {
        await propertyService?.removeFromFavorites(propertyId);
        setFavorites(prev => {
          const newSet = new Set(prev);
          newSet?.delete(propertyId);
          return newSet;
        });
      } else {
        await propertyService?.addToFavorites(propertyId);
        setFavorites(prev => new Set(prev)?.add(propertyId));
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const handleCompare = (propertyId) => {
    setCompareList(prev => {
      const newSet = new Set(prev);
      if (newSet?.has(propertyId)) {
        newSet?.delete(propertyId);
      } else if (newSet?.size < 3) {
        newSet?.add(propertyId);
      } else {
        alert('You can compare up to 3 properties at once');
        return prev;
      }
      return newSet;
    });
  };

  const handleMessage = (propertyId) => {
    if (!user) {
      console.log('Please login to contact property owners');
      return;
    }
    
    // Navigate to message form or open modal
    console.log('Opening message form for property:', propertyId);
  };

  // Memoize processed properties to avoid re-processing on every render
  const processedProperties = useMemo(() => {
    return properties?.map(property => ({
      ...property,
      isFavorited: favorites?.has(property?.id)
    })) || [];
  }, [properties, favorites]);

  if (loading && currentPage === 1) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading properties...</p>
        </div>
      </div>
    );
  }

  if (error && properties?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="AlertTriangle" size={48} className="text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Unable to Load Properties
        </h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button
          onClick={() => window.location?.reload()}
          variant="outline"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (processedProperties?.length === 0) {
    return (
      <div className="text-center py-12">
        <Icon name="Search" size={48} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          No Properties Found
        </h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search filters to find more properties.
        </p>
        <Button
          onClick={() => {
            // Reset filters callback would go here
            console.log('Reset filters');
          }}
          variant="outline"
        >
          Clear Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {processedProperties?.length} {processedProperties?.length === 1 ? 'Property' : 'Properties'} Found
          </h2>
          {error && (
            <p className="text-red-600 text-sm mt-1">
              Some properties may not have loaded properly
            </p>
          )}
        </div>

        {compareList?.size > 0 && (
          <Button
            variant="outline"
            onClick={() => {
              console.log('Compare properties:', Array.from(compareList));
            }}
            iconName="GitCompare"
            iconPosition="left"
          >
            Compare ({compareList?.size})
          </Button>
        )}
      </div>
      {/* Property Grid */}
      <div className={`grid gap-6 ${
        viewMode === 'list' ?'grid-cols-1' :'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
      }`}>
        {processedProperties?.map((property) => (
          <PropertyCard
            key={property?.id}
            property={property}
            onFavorite={handleFavorite}
            onMessage={handleMessage}
            onCompare={handleCompare}
            isComparing={compareList?.has(property?.id)}
          />
        ))}
      </div>
      {/* Load More */}
      {hasMore && (
        <div className="text-center py-8">
          <Button
            onClick={handleLoadMore}
            loading={loading}
            variant="outline"
            size="lg"
          >
            {loading ? 'Loading...' : 'Load More Properties'}
          </Button>
        </div>
      )}
      {/* No More Results */}
      {!hasMore && processedProperties?.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">
            You've seen all available properties for your search criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;