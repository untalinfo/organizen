import { supabase } from "@/utils/supabase/supabaseClient";

export default async function Divisions() {
  const { data: divisions, error } = await supabase.from('divisions').select(`id, name`);

  if (error) {
    console.error("Error fetching tiers:", error);
  }
  return divisions;
}