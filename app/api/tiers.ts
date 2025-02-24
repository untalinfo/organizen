import { supabase } from "@/utils/supabase/supabaseClient";
import { Tier } from "../types/types";
import { toast } from "react-toastify";

export default async function Tiers() {
  const { data: tiers, error } = await supabase.from('tiers').select(`id, name, positions(id, name, reports_to_id, tier_id, divisions(id, name), position_assignments(id, employees(id, full_name, email)))`);

  if (error) {
    toast.error(`Error fetching tiers: ${error.message}`);
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
    toast.error(`Error creating tier: ${error.message}`);
    return null;
  }
  return tier;
}

export async function UpdateTierName(id: number, name: string): Promise<Tier | null> {
  const { data: tier, error } = await supabase
    .from('tiers')
    .update({ name })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    toast.error(`Error update name tier: ${error.message}`);
    return null;
  }
  return tier;
}