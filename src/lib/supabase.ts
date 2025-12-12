import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  description: string;
  long_description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
  featured: boolean;
  display_order: number;
  created_at: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
  display_order: number;
  created_at: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
}
