-- Portfolio Database Schema
--
-- 1. New Tables
--    - projects: Store portfolio projects
--    - skills: Store technical skills
--    - contact_submissions: Store contact form submissions
--
-- 2. Security
--    - Enable RLS on all tables
--    - Public read access for projects and skills
--    - Public insert access for contact submissions

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  long_description text,
  image_url text NOT NULL,
  tech_stack text[] DEFAULT '{}',
  live_url text,
  github_url text,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency integer DEFAULT 3 CHECK (proficiency >= 1 AND proficiency <= 5),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'read', 'archived')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Projects policies (public read)
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  TO anon
  USING (true);

-- Skills policies (public read)
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  TO anon
  USING (true);

-- Contact submissions policies (public insert, no read)
CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon
  WITH CHECK (true);
