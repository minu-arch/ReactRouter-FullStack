import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://seszmhxrejdtqdrkwvnq.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlc3ptaHhyZWpkdHFkcmt3dm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgyNjgyMjMsImV4cCI6MjA2Mzg0NDIyM30.9-r-XTMZx3x7uRTMENpkaVdXFXj73EgA0N4D7lHuYfs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);