import { supabase } from "@/utils/supabase/supabaseClient";

export default async function Tiers() {
  const { data: tiers, error } = await supabase.from('tiers').select('*');

  if (error) {
    console.error("Error fetching tiers:", error);
  }
  return JSON.stringify(tiers, null, 2);
}

interface Tier {
  id: number;
  name: string;
  description: string;
  // Add other fields as necessary
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