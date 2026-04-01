import { createClient } from "./supabase/client";

export const auth = {
  // Sign in with email and password
  async signIn(email, password) {
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  // Sign out
  async signOut() {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    const supabase = createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  },

  // Check if user is authenticated
  async isAuthenticated() {
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return !!session;
  },

  // Get session
  async getSession() {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  },
};
