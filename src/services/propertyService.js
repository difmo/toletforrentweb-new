import { supabase } from '../lib/supabase';

export const propertyService = {
  // Get all available properties with pagination
  async getProperties(options = {}) {
    try {
      let query = supabase?.from('properties')?.select(`
          *,
          owner:user_profiles!properties_owner_id_fkey(
            id,
            full_name,
            avatar_url,
            is_verified
          ),
          property_images(
            id,
            image_url,
            caption,
            is_primary,
            display_order
          ),
          property_amenities(
            id,
            amenity
          ),
          reviews(
            id,
            rating,
            reviewer_id,
            created_at
          )
        `)?.eq('status', 'available')

      // Apply filters
      if (options?.city) {
        query = query?.ilike('city', `%${options?.city}%`)
      }

      if (options?.state) {
        query = query?.ilike('state', `%${options?.state}%`)
      }

      if (options?.property_type) {
        query = query?.eq('property_type', options?.property_type)
      }

      if (options?.min_price) {
        query = query?.gte('rent_amount', options?.min_price)
      }

      if (options?.max_price) {
        query = query?.lte('rent_amount', options?.max_price)
      }

      if (options?.bedrooms) {
        query = query?.gte('bedrooms', options?.bedrooms)
      }

      if (options?.bathrooms) {
        query = query?.gte('bathrooms', options?.bathrooms)
      }

      // Apply sorting
      if (options?.sort_by === 'price_low') {
        query = query?.order('rent_amount', { ascending: true })
      } else if (options?.sort_by === 'price_high') {
        query = query?.order('rent_amount', { ascending: false })
      } else if (options?.sort_by === 'newest') {
        query = query?.order('created_at', { ascending: false })
      } else {
        query = query?.order('created_at', { ascending: false })
      }

      // Apply pagination
      if (options?.limit) {
        query = query?.limit(options?.limit)
      }

      if (options?.offset) {
        query = query?.range(options?.offset, options?.offset + (options?.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error

      // Process the data to match expected format
      const processedData = data?.map(property => ({
        ...property,
        images: property?.property_images
          ?.sort((a, b) => a?.display_order - b?.display_order)
          ?.map(img => img?.image_url) || [],
        amenities: property?.property_amenities?.map(amenity => amenity?.amenity) || [],
        rating: property?.reviews?.length > 0 
          ? (property?.reviews?.reduce((sum, review) => sum + review?.rating, 0) / property?.reviews?.length)?.toFixed(1)
          : null,
        reviewCount: property?.reviews?.length || 0,
        owner: {
          ...property?.owner,
          name: property?.owner?.full_name,
          avatar: property?.owner?.avatar_url
        }
      })) || []

      return { data: processedData, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get single property by ID
  async getProperty(propertyId) {
    try {
      const { data, error } = await supabase?.from('properties')?.select(`
          *,
          owner:user_profiles!properties_owner_id_fkey(
            id,
            full_name,
            email,
            phone,
            avatar_url,
            is_verified,
            created_at
          ),
          property_images(
            id,
            image_url,
            caption,
            is_primary,
            display_order
          ),
          property_amenities(
            id,
            amenity
          ),
          reviews(
            id,
            rating,
            title,
            content,
            created_at,
            reviewer:user_profiles!reviews_reviewer_id_fkey(
              full_name,
              avatar_url
            )
          )
        `)?.eq('id', propertyId)?.single()

      if (error) throw error

      // Process the data
      const processedData = {
        ...data,
        images: data?.property_images
          ?.sort((a, b) => a?.display_order - b?.display_order)
          ?.map(img => ({
            url: img?.image_url,
            caption: img?.caption
          })) || [],
        amenities: data?.property_amenities?.map(amenity => amenity?.amenity) || [],
        rating: data?.reviews?.length > 0 
          ? (data?.reviews?.reduce((sum, review) => sum + review?.rating, 0) / data?.reviews?.length)?.toFixed(1)
          : null,
        reviewCount: data?.reviews?.length || 0,
        owner: {
          ...data?.owner,
          name: data?.owner?.full_name,
          avatar: data?.owner?.avatar_url
        }
      }

      return { data: processedData, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Create new property
  async createProperty(propertyData) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser()
      if (!user) throw new Error('User must be authenticated')

      const { data, error } = await supabase?.from('properties')?.insert({
          ...propertyData,
          owner_id: user?.id
        })?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update property
  async updateProperty(propertyId, updates) {
    try {
      const { data, error } = await supabase?.from('properties')?.update(updates)?.eq('id', propertyId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Delete property
  async deleteProperty(propertyId) {
    try {
      const { error } = await supabase?.from('properties')?.delete()?.eq('id', propertyId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  // Get user's properties (for landlords)
  async getUserProperties(userId) {
    try {
      const { data, error } = await supabase?.from('properties')?.select(`
          *,
          property_images(
            id,
            image_url,
            is_primary
          ),
          rental_applications(
            id,
            status,
            created_at,
            applicant:user_profiles!rental_applications_applicant_id_fkey(
              full_name,
              email
            )
          )
        `)?.eq('owner_id', userId)?.order('created_at', { ascending: false })

      if (error) throw error

      const processedData = data?.map(property => ({
        ...property,
        primaryImage: property?.property_images?.find(img => img?.is_primary)?.image_url || 
                      property?.property_images?.[0]?.image_url,
        applicationCount: property?.rental_applications?.length || 0,
        pendingApplications: property?.rental_applications?.filter(app => app?.status === 'pending')?.length || 0
      })) || []

      return { data: processedData, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Add property to favorites
  async addToFavorites(propertyId) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser()
      if (!user) throw new Error('User must be authenticated')

      const { data, error } = await supabase?.from('favorites')?.insert({
          user_id: user?.id,
          property_id: propertyId
        })?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Remove property from favorites
  async removeFromFavorites(propertyId) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser()
      if (!user) throw new Error('User must be authenticated')

      const { error } = await supabase?.from('favorites')?.delete()?.eq('user_id', user?.id)?.eq('property_id', propertyId)

      if (error) throw error
      return { error: null }
    } catch (error) {
      return { error }
    }
  },

  // Get user's favorite properties
  async getFavoriteProperties(userId) {
    try {
      const { data, error } = await supabase?.from('favorites')?.select(`
          id,
          created_at,
          property:properties(
            *,
            owner:user_profiles!properties_owner_id_fkey(
              full_name,
              avatar_url
            ),
            property_images(
              image_url,
              is_primary,
              display_order
            )
          )
        `)?.eq('user_id', userId)?.order('created_at', { ascending: false })

      if (error) throw error

      const processedData = data?.map(favorite => ({
        ...favorite?.property,
        favoriteId: favorite?.id,
        images: favorite?.property?.property_images
          ?.sort((a, b) => a?.display_order - b?.display_order)
          ?.map(img => img?.image_url) || [],
        owner: {
          name: favorite?.property?.owner?.full_name,
          avatar: favorite?.property?.owner?.avatar_url
        }
      })) || []

      return { data: processedData, error: null }
    } catch (error) {
      return { data: null, error }
    }
  }
}