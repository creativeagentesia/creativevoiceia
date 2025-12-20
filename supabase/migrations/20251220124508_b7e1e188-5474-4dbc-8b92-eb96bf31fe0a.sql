-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('super_admin', 'common_user');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'common_user',
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create website_sections table
CREATE TABLE public.website_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  component_name TEXT NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  sort_order INTEGER NOT NULL,
  can_be_deleted BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create section_content table
CREATE TABLE public.section_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.website_sections(id) ON DELETE CASCADE,
  content_key TEXT NOT NULL,
  content_value JSONB NOT NULL,
  content_type TEXT NOT NULL CHECK (content_type IN ('text', 'rich_text', 'image', 'video', 'array', 'json')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(section_id, content_key)
);

-- Create video_content table
CREATE TABLE public.video_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID REFERENCES public.website_sections(id) ON DELETE CASCADE,
  youtube_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  thumbnail_url TEXT,
  duration TEXT,
  view_count INTEGER,
  sort_order INTEGER DEFAULT 0,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create navigation_items table
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  parent_id UUID REFERENCES public.navigation_items(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.section_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (avoids RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to check if user is admin (super_admin)
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'super_admin')
$$;

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (id = auth.uid());

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- RLS Policies for website_sections (public read, admin write)
CREATE POLICY "Anyone can view visible sections"
ON public.website_sections FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can view all sections"
ON public.website_sections FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can insert sections"
ON public.website_sections FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update sections"
ON public.website_sections FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete sections"
ON public.website_sections FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()) AND can_be_deleted = true);

-- RLS Policies for section_content
CREATE POLICY "Anyone can view content of visible sections"
ON public.section_content FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.website_sections
    WHERE id = section_id AND is_visible = true
  )
);

CREATE POLICY "Admins can view all content"
ON public.section_content FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage content"
ON public.section_content FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- RLS Policies for video_content
CREATE POLICY "Anyone can view visible videos"
ON public.video_content FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can view all videos"
ON public.video_content FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage videos"
ON public.video_content FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- RLS Policies for navigation_items
CREATE POLICY "Anyone can view visible navigation"
ON public.navigation_items FOR SELECT
USING (is_visible = true);

CREATE POLICY "Admins can view all navigation"
ON public.navigation_items FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage navigation"
ON public.navigation_items FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Create trigger function for profile creation on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name'),
    NEW.raw_user_meta_data ->> 'avatar_url'
  );
  
  -- Assign default role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'common_user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_website_sections_updated_at
  BEFORE UPDATE ON public.website_sections
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_section_content_updated_at
  BEFORE UPDATE ON public.section_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_video_content_updated_at
  BEFORE UPDATE ON public.video_content
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_navigation_items_updated_at
  BEFORE UPDATE ON public.navigation_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default sections based on current landing page
INSERT INTO public.website_sections (name, display_name, component_name, sort_order, can_be_deleted) VALUES
('hero', 'Hero Banner', 'Hero', 1, false),
('brand_scroller', 'Marcas Parceiras', 'BrandScroller', 2, true),
('features', 'Funcionalidades', 'Features', 3, false),
('how_it_works', 'Como Funciona', 'HowItWorks', 4, true),
('video_demo', 'Demonstração em Vídeo', 'VideoDemo', 5, true),
('sectors', 'Setores Atendidos', 'Sectors', 6, true),
('impact', 'Impacto', 'Impact', 7, true),
('testimonials', 'Depoimentos', 'Testimonials', 8, true),
('video_testimonials', 'Depoimentos em Vídeo', 'VideoTestimonials', 9, true),
('pricing', 'Preços', 'Pricing', 10, false),
('faq', 'Perguntas Frequentes', 'FAQ', 11, true),
('contact', 'Contato', 'ContactForm', 12, false),
('cta', 'Chamada para Ação', 'CTA', 13, true),
('footer', 'Rodapé', 'Footer', 14, false);

-- Insert default navigation items
INSERT INTO public.navigation_items (label, href, sort_order) VALUES
('Funcionalidades', '#funcionalidades', 1),
('Como Funciona', '#como-funciona', 2),
('Preços', '#precos', 3),
('FAQ', '#faq', 4),
('Contato', '#contato', 5);