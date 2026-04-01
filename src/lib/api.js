import { createClient } from "./supabase/client";

const supabase = createClient();

export const projectsApi = {
  async getAll() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order", { ascending: true });

    if (error) throw new Error(error.message); // ✅
    return data;
  },

  async getFeatured() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("featured", true)
      .order("order", { ascending: true });

    if (error) throw new Error(error.message); // ✅
    return data;
  },

  async getById(id) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message); // ✅
    return data;
  },

  async create(project) {
    const { data, error } = await supabase
      .from("projects")
      .insert([project])
      .select()
      .single();

    if (error) throw new Error(error.message); // ✅
    return data;
  },

  async update(id, updates) {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message); // ✅
    return data;
  },

  async delete(id) {
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) throw new Error(error.message); // ✅
    return true;
  },
};
// Messages API
export const messagesApi = {
  // Submit contact form message
  async submit(messageData) {
    const { data, error } = await supabase
      .from("messages")
      .insert([messageData])
      .select()
      .single();

    if (error) throw new Error(error.message); // ✅ was: throw error
    return data;
  },

  // Get all messages (admin only)
  async getAll() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return data;
  },

  // Mark message as read (admin only)
  async markAsRead(id) {
    const { data, error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Archive message (admin only)
  async archive(id) {
    const { data, error } = await supabase
      .from("messages")
      .update({ is_archived: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete message (admin only)
  async delete(id) {
    const { error } = await supabase.from("messages").delete().eq("id", id);

    if (error) throw error;
    return true;
  },
};

// Visitors API
export const visitorsApi = {
  // Track visitor
  async track(visitorData) {
    const { error } = await supabase.from("visitors").insert([visitorData]);
    if (error) console.error("Error tracking visitor:", error);
  },

  // Get visitor count ✅ FIXED
  async getCount() {
    const { count, error } = await supabase
      .from("visitors")
      .select("*", { count: "exact", head: true });

    if (error) throw error;
    return count || 0;
  },

  // Get recent visitors (admin only)
  async getRecent(limit = 50) {
    const { data, error } = await supabase
      .from("visitors")
      .select("*")
      .order("visited_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },
};
