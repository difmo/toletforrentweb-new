-- Location: supabase/migrations/20250825154210_rental_property_platform.sql
-- Schema Analysis: Fresh project - no existing schema
-- Integration Type: Complete rental property management platform
-- Dependencies: None (foundation migration)

-- 1. Custom Types
CREATE TYPE public.user_role AS ENUM ('tenant', 'landlord', 'property_manager', 'admin');
CREATE TYPE public.property_type AS ENUM ('apartment', 'house', 'condo', 'townhouse', 'studio', 'room', 'commercial');
CREATE TYPE public.property_status AS ENUM ('available', 'rented', 'pending', 'maintenance', 'draft');
CREATE TYPE public.application_status AS ENUM ('pending', 'approved', 'rejected', 'withdrawn');
CREATE TYPE public.maintenance_status AS ENUM ('reported', 'in_progress', 'completed', 'cancelled');
CREATE TYPE public.message_type AS ENUM ('inquiry', 'application', 'maintenance', 'general');
CREATE TYPE public.review_type AS ENUM ('property', 'landlord', 'tenant');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'cancelled', 'refunded');

-- 2. Core Tables (No foreign keys first)

-- User profiles table (Critical intermediary for PostgREST compatibility)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone TEXT,
    role public.user_role DEFAULT 'tenant'::public.user_role,
    avatar_url TEXT,
    date_of_birth DATE,
    occupation TEXT,
    bio TEXT,
    is_verified BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Properties table
CREATE TABLE public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    property_type public.property_type NOT NULL,
    status public.property_status DEFAULT 'draft'::public.property_status,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT NOT NULL,
    country TEXT DEFAULT 'USA',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    bedrooms INTEGER NOT NULL DEFAULT 0,
    bathrooms DECIMAL(3, 1) NOT NULL DEFAULT 0,
    area INTEGER, -- Square feet
    rent_amount DECIMAL(10, 2) NOT NULL,
    deposit_amount DECIMAL(10, 2),
    utilities_included BOOLEAN DEFAULT false,
    pets_allowed BOOLEAN DEFAULT false,
    smoking_allowed BOOLEAN DEFAULT false,
    furnished BOOLEAN DEFAULT false,
    parking_available BOOLEAN DEFAULT false,
    laundry_available BOOLEAN DEFAULT false,
    available_from DATE,
    lease_duration INTEGER, -- Months
    is_featured BOOLEAN DEFAULT false,
    view_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Property amenities
CREATE TABLE public.property_amenities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    amenity TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Property images
CREATE TABLE public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Rental applications
CREATE TABLE public.rental_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    applicant_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    status public.application_status DEFAULT 'pending'::public.application_status,
    desired_move_in_date DATE,
    monthly_income DECIMAL(10, 2),
    employment_status TEXT,
    employer_name TEXT,
    emergency_contact_name TEXT,
    emergency_contact_phone TEXT,
    previous_landlord_contact TEXT,
    application_message TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(property_id, applicant_id)
);

-- Messages system
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    application_id UUID REFERENCES public.rental_applications(id) ON DELETE SET NULL,
    message_type public.message_type DEFAULT 'general'::public.message_type,
    subject TEXT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    parent_message_id UUID REFERENCES public.messages(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Reviews system
CREATE TABLE public.reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    reviewed_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    review_type public.review_type NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Favorites system
CREATE TABLE public.favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, property_id)
);

-- Maintenance requests
CREATE TABLE public.maintenance_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT,
    priority TEXT DEFAULT 'medium',
    status public.maintenance_status DEFAULT 'reported'::public.maintenance_status,
    assigned_to UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    estimated_cost DECIMAL(10, 2),
    actual_cost DECIMAL(10, 2),
    scheduled_date DATE,
    completed_date DATE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Payments tracking
CREATE TABLE public.payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    landlord_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10, 2) NOT NULL,
    payment_type TEXT NOT NULL, -- rent, deposit, utilities, etc.
    status public.payment_status DEFAULT 'pending'::public.payment_status,
    due_date DATE NOT NULL,
    paid_date DATE,
    stripe_payment_intent_id TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Market insights for location-based data
CREATE TABLE public.market_insights (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    average_rent DECIMAL(10, 2) NOT NULL,
    available_properties INTEGER DEFAULT 0,
    price_change_percentage DECIMAL(5, 2) DEFAULT 0.0,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(city, state)
);

-- 3. Indexes for performance
CREATE INDEX idx_user_profiles_email ON public.user_profiles(email);
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_properties_owner_id ON public.properties(owner_id);
CREATE INDEX idx_properties_status ON public.properties(status);
CREATE INDEX idx_properties_location ON public.properties(city, state);
CREATE INDEX idx_properties_type ON public.properties(property_type);
CREATE INDEX idx_properties_rent ON public.properties(rent_amount);
CREATE INDEX idx_property_amenities_property_id ON public.property_amenities(property_id);
CREATE INDEX idx_property_images_property_id ON public.property_images(property_id);
CREATE INDEX idx_rental_applications_property_id ON public.rental_applications(property_id);
CREATE INDEX idx_rental_applications_applicant_id ON public.rental_applications(applicant_id);
CREATE INDEX idx_rental_applications_status ON public.rental_applications(status);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_messages_property_id ON public.messages(property_id);
CREATE INDEX idx_reviews_reviewer_id ON public.reviews(reviewer_id);
CREATE INDEX idx_reviews_reviewed_id ON public.reviews(reviewed_id);
CREATE INDEX idx_reviews_property_id ON public.reviews(property_id);
CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_property_id ON public.favorites(property_id);
CREATE INDEX idx_maintenance_requests_property_id ON public.maintenance_requests(property_id);
CREATE INDEX idx_maintenance_requests_tenant_id ON public.maintenance_requests(tenant_id);
CREATE INDEX idx_payments_tenant_id ON public.payments(tenant_id);
CREATE INDEX idx_payments_landlord_id ON public.payments(landlord_id);
CREATE INDEX idx_market_insights_location ON public.market_insights(city, state);

-- 4. Helper Functions (MUST BE BEFORE RLS POLICIES)
CREATE OR REPLACE FUNCTION public.is_property_owner(property_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.properties p
    WHERE p.id = property_uuid AND p.owner_id = auth.uid()
)
$$;

CREATE OR REPLACE FUNCTION public.is_application_participant(application_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.rental_applications ra
    JOIN public.properties p ON ra.property_id = p.id
    WHERE ra.id = application_uuid 
    AND (ra.applicant_id = auth.uid() OR p.owner_id = auth.uid())
)
$$;

CREATE OR REPLACE FUNCTION public.is_message_participant(message_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM public.messages m
    WHERE m.id = message_uuid
    AND (m.sender_id = auth.uid() OR m.recipient_id = auth.uid())
)
$$;

-- Function for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, full_name, role)
  VALUES (
    NEW.id, 
    NEW.email, 
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE((NEW.raw_user_meta_data->>'role')::public.user_role, 'tenant'::public.user_role)
  );
  RETURN NEW;
END;
$$;

-- Update timestamps function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;

-- 5. Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.property_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rental_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_insights ENABLE ROW LEVEL SECURITY;

-- 6. RLS Policies

-- Pattern 1: Core user table (user_profiles) - Simple ownership only
CREATE POLICY "users_manage_own_user_profiles"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 4: Public read, private write for properties
CREATE POLICY "public_can_view_available_properties"
ON public.properties
FOR SELECT
TO public
USING (status = 'available'::public.property_status);

CREATE POLICY "owners_manage_own_properties"
ON public.properties
FOR ALL
TO authenticated
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

-- Property amenities - owners can manage, public can view for available properties
CREATE POLICY "public_can_view_property_amenities"
ON public.property_amenities
FOR SELECT
TO public
USING (
    EXISTS (
        SELECT 1 FROM public.properties p
        WHERE p.id = property_id AND p.status = 'available'::public.property_status
    )
);

CREATE POLICY "owners_manage_property_amenities"
ON public.property_amenities
FOR ALL
TO authenticated
USING (public.is_property_owner(property_id))
WITH CHECK (public.is_property_owner(property_id));

-- Property images - similar to amenities
CREATE POLICY "public_can_view_property_images"
ON public.property_images
FOR SELECT
TO public
USING (
    EXISTS (
        SELECT 1 FROM public.properties p
        WHERE p.id = property_id AND p.status = 'available'::public.property_status
    )
);

CREATE POLICY "owners_manage_property_images"
ON public.property_images
FOR ALL
TO authenticated
USING (public.is_property_owner(property_id))
WITH CHECK (public.is_property_owner(property_id));

-- Rental applications - only participants can access
CREATE POLICY "participants_manage_rental_applications"
ON public.rental_applications
FOR ALL
TO authenticated
USING (public.is_application_participant(id))
WITH CHECK (applicant_id = auth.uid());

-- Messages - only participants can access
CREATE POLICY "participants_manage_messages"
ON public.messages
FOR ALL
TO authenticated
USING (public.is_message_participant(id))
WITH CHECK (sender_id = auth.uid());

-- Reviews - public can read, authenticated users can write their own
CREATE POLICY "public_can_view_reviews"
ON public.reviews
FOR SELECT
TO public
USING (true);

CREATE POLICY "users_manage_own_reviews"
ON public.reviews
FOR ALL
TO authenticated
USING (reviewer_id = auth.uid())
WITH CHECK (reviewer_id = auth.uid());

-- Pattern 2: Simple user ownership for favorites
CREATE POLICY "users_manage_own_favorites"
ON public.favorites
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Maintenance requests - tenants and property owners can access
CREATE POLICY "tenants_and_owners_manage_maintenance_requests"
ON public.maintenance_requests
FOR ALL
TO authenticated
USING (
    tenant_id = auth.uid() OR 
    public.is_property_owner(property_id) OR
    assigned_to = auth.uid()
)
WITH CHECK (tenant_id = auth.uid());

-- Payments - tenants and landlords can access their own
CREATE POLICY "participants_manage_payments"
ON public.payments
FOR ALL
TO authenticated
USING (tenant_id = auth.uid() OR landlord_id = auth.uid())
WITH CHECK (tenant_id = auth.uid() OR landlord_id = auth.uid());

-- Market insights - public read access
CREATE POLICY "public_can_view_market_insights"
ON public.market_insights
FOR SELECT
TO public
USING (true);

-- Admin users can manage market insights
CREATE POLICY "admin_manage_market_insights"
ON public.market_insights
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM public.user_profiles up
        WHERE up.id = auth.uid() AND up.role = 'admin'::public.user_role
    )
);

-- 7. Triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON public.properties
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_rental_applications_updated_at
  BEFORE UPDATE ON public.rental_applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_maintenance_requests_updated_at
  BEFORE UPDATE ON public.maintenance_requests
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- 8. Storage Buckets for file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  (
    'property-images',
    'property-images',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  ),
  (
    'profile-avatars',
    'profile-avatars',
    true,
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  ),
  (
    'application-documents',
    'application-documents',
    false,
    20971520, -- 20MB limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'text/plain', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
  );

-- Storage RLS Policies
CREATE POLICY "public_can_view_property_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'property-images');

CREATE POLICY "authenticated_upload_property_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'property-images');

CREATE POLICY "owners_manage_property_images_storage"
ON storage.objects
FOR UPDATE, DELETE
TO authenticated
USING (bucket_id = 'property-images' AND owner = auth.uid());

CREATE POLICY "public_can_view_avatars"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'profile-avatars');

CREATE POLICY "users_manage_own_avatar"
ON storage.objects
FOR ALL
TO authenticated
USING (
    bucket_id = 'profile-avatars' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
    bucket_id = 'profile-avatars' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "users_manage_own_documents"
ON storage.objects
FOR ALL
TO authenticated
USING (
    bucket_id = 'application-documents' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
)
WITH CHECK (
    bucket_id = 'application-documents' 
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

-- 9. Mock Data for Development
DO $$
DECLARE
    landlord_uuid UUID := gen_random_uuid();
    tenant_uuid UUID := gen_random_uuid();
    property_uuid UUID := gen_random_uuid();
    property2_uuid UUID := gen_random_uuid();
    application_uuid UUID := gen_random_uuid();
BEGIN
    -- Create auth users with complete field structure
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (landlord_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'john.landlord@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Landlord", "role": "landlord"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (tenant_uuid, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'sarah.tenant@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Sarah Johnson", "role": "tenant"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Create properties
    INSERT INTO public.properties (id, owner_id, title, description, property_type, status, address, city, state, zip_code, bedrooms, bathrooms, area, rent_amount, deposit_amount, utilities_included, pets_allowed, available_from) VALUES
        (property_uuid, landlord_uuid, 'Luxury Downtown Apartment', 'Beautiful 2-bedroom apartment in the heart of downtown with stunning city views and modern amenities.', 'apartment'::public.property_type, 'available'::public.property_status, '123 Main Street, Apt 4B', 'New York', 'NY', '10001', 2, 2.0, 1200, 2850.00, 5700.00, false, true, CURRENT_DATE + INTERVAL '30 days'),
        (property2_uuid, landlord_uuid, 'Cozy Studio in Brooklyn', 'Perfect studio apartment for young professionals. Recently renovated with modern appliances.', 'studio'::public.property_type, 'available'::public.property_status, '456 Brooklyn Ave', 'Brooklyn', 'NY', '11201', 0, 1.0, 600, 1950.00, 3900.00, true, false, CURRENT_DATE + INTERVAL '15 days');

    -- Add property amenities
    INSERT INTO public.property_amenities (property_id, amenity) VALUES
        (property_uuid, 'Air Conditioning'),
        (property_uuid, 'Dishwasher'),
        (property_uuid, 'Gym Access'),
        (property_uuid, 'Rooftop Terrace'),
        (property2_uuid, 'Air Conditioning'),
        (property2_uuid, 'Laundry in Building'),
        (property2_uuid, 'Near Subway');

    -- Add property images
    INSERT INTO public.property_images (property_id, image_url, caption, is_primary, display_order) VALUES
        (property_uuid, 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Living Room', true, 0),
        (property_uuid, 'https://images.unsplash.com/photo-1560449752-0c9ac8c9c7a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Kitchen', false, 1),
        (property_uuid, 'https://images.unsplash.com/photo-1560449752-08b4ba2a0e05?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Bedroom', false, 2),
        (property2_uuid, 'https://images.unsplash.com/photo-1560448204-30ef5e8ebe87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', 'Studio Space', true, 0);

    -- Create rental application
    INSERT INTO public.rental_applications (id, property_id, applicant_id, desired_move_in_date, monthly_income, employment_status, employer_name, application_message) VALUES
        (application_uuid, property_uuid, tenant_uuid, CURRENT_DATE + INTERVAL '45 days', 8500.00, 'Full-time employed', 'Tech Solutions Inc.', 'I am very interested in this property and would love to schedule a viewing.');

    -- Add some reviews
    INSERT INTO public.reviews (reviewer_id, reviewed_id, property_id, review_type, rating, title, content) VALUES
        (tenant_uuid, landlord_uuid, property_uuid, 'landlord'::public.review_type, 5, 'Excellent Landlord', 'John is very responsive and takes great care of his properties. Highly recommended!');

    -- Add market insights
    INSERT INTO public.market_insights (city, state, average_rent, available_properties, price_change_percentage) VALUES
        ('New York', 'NY', 2850.00, 1247, 5.2),
        ('San Francisco', 'CA', 3200.00, 892, 3.8),
        ('Los Angeles', 'CA', 2650.00, 1456, 4.1),
        ('Chicago', 'IL', 1950.00, 2134, 2.9),
        ('Boston', 'MA', 2450.00, 987, 6.1);

EXCEPTION
    WHEN foreign_key_violation THEN
        RAISE NOTICE 'Foreign key error during mock data insertion: %', SQLERRM;
    WHEN unique_violation THEN
        RAISE NOTICE 'Unique constraint error during mock data insertion: %', SQLERRM;
    WHEN OTHERS THEN
        RAISE NOTICE 'Unexpected error during mock data insertion: %', SQLERRM;
END $$;