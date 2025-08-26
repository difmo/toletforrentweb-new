import { supabase } from '../lib/supabase';

export const marketService = {
  // Get market insights for a specific location
  async getMarketInsights(city, state) {
    try {
      const { data, error } = await supabase?.from('market_insights')?.select('*')?.eq('city', city)?.eq('state', state)?.single()

      if (error) {
        // If no data found for specific city, return default data
        if (error?.code === 'PGRST116') {
          return { 
            data: {
              city,
              state,
              average_rent: 2000,
              available_properties: 100,
              price_change_percentage: 2.5
            }, 
            error: null 
          }
        }
        throw error
      }

      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get market insights for multiple locations
  async getMultipleMarketInsights(locations = []) {
    try {
      if (locations?.length === 0) {
        // Return default popular cities
        const { data, error } = await supabase?.from('market_insights')?.select('*')?.order('average_rent', { ascending: false })?.limit(5)

        if (error) throw error
        return { data: data || [], error: null }
      }

      const { data, error } = await supabase?.from('market_insights')?.select('*')?.in('city', locations)

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Update market insights (admin only)
  async updateMarketInsights(city, state, insights) {
    try {
      const { data, error } = await supabase?.from('market_insights')?.upsert({
          city,
          state,
          ...insights,
          updated_at: new Date()?.toISOString()
        })?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get real-time property statistics
  async getPropertyStats(filters = {}) {
    try {
      let query = supabase?.from('properties')?.select('rent_amount, property_type, city, state, created_at')?.eq('status', 'available')

      if (filters?.city) {
        query = query?.eq('city', filters?.city)
      }

      if (filters?.state) {
        query = query?.eq('state', filters?.state)
      }

      if (filters?.property_type) {
        query = query?.eq('property_type', filters?.property_type)
      }

      const { data, error } = await query

      if (error) throw error

      // Calculate statistics
      const stats = {
        total_properties: data?.length || 0,
        average_rent: data?.length > 0 
          ? Math.round(data?.reduce((sum, prop) => sum + parseFloat(prop?.rent_amount || 0), 0) / data?.length)
          : 0,
        min_rent: data?.length > 0 
          ? Math.min(...data?.map(prop => parseFloat(prop?.rent_amount || 0)))
          : 0,
        max_rent: data?.length > 0 
          ? Math.max(...data?.map(prop => parseFloat(prop?.rent_amount || 0)))
          : 0,
        property_types: data?.reduce((acc, prop) => {
          acc[prop?.property_type] = (acc?.[prop?.property_type] || 0) + 1
          return acc
        }, {}) || {},
        recent_listings: data?.filter(prop => {
          const createdAt = new Date(prop?.created_at)
          const sevenDaysAgo = new Date()
          sevenDaysAgo?.setDate(sevenDaysAgo?.getDate() - 7)
          return createdAt >= sevenDaysAgo
        })?.length || 0
      }

      return { data: stats, error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Get trending locations
  async getTrendingLocations(limit = 10) {
    try {
      const { data, error } = await supabase?.from('market_insights')?.select('city, state, price_change_percentage, available_properties')?.order('price_change_percentage', { ascending: false })?.limit(limit)

      if (error) throw error
      return { data: data || [], error: null }
    } catch (error) {
      return { data: null, error }
    }
  },

  // Detect user location (mock implementation - replace with actual geolocation)
  async detectUserLocation() {
    try {
      // This is a mock implementation
      // In production, you would use browser geolocation API
      // or IP-based location detection
      const mockLocations = [
        { city: 'New York', state: 'NY' },
        { city: 'San Francisco', state: 'CA' },
        { city: 'Los Angeles', state: 'CA' },
        { city: 'Chicago', state: 'IL' },
        { city: 'Boston', state: 'MA' }
      ]

      const randomLocation = mockLocations?.[Math.floor(Math.random() * mockLocations?.length)]
      
      // Get market data for detected location
      const { data: marketData } = await this.getMarketInsights(randomLocation?.city, randomLocation?.state)
      
      return { 
        data: {
          ...randomLocation,
          marketData
        }, 
        error: null 
      }
    } catch (error) {
      return { data: null, error }
    }
  }
}