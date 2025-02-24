import { supabase } from "@/utils/supabase/supabaseClient";
import { Tier } from "../types/types";

export default async function Tiers() {
  const { data: tiers, error } = await supabase.from('tiers').select(`id, name, positions(id, name, reports_to_id, tier_id, divisions(id, name), position_assignments(id, employees(id, full_name, email)))`);

  if (error) {
    console.error("Error fetching tiers:", error);
  }
  return tiers;
}

interface CreateTierData {
  name: string;
  description: string;
  // Add other fields as necessary
}

export async function CreateTier(data: CreateTierData): Promise<Tier | null> {
  const { data: tier, error } = await supabase.from('tiers').insert(data).single();

  if (error) {
    console.error("Error creating tier:", error);
    return null;
  }
  return tier;
}