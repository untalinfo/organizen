import { supabase } from "@/utils/supabase/supabaseClient";
import { Tier } from "../types/types";
import { toast } from "react-toastify";

export default async function getTiers() {
  const { data: tiers, error } = await supabase.from('tiers').select(`id, name, positions(id, name, division_id, divisions:division_id(id, name), reports_to_id, tier_id, position_assignments(id, employees(id, full_name, email)))`) as { data: Tier[] | null, error: Error | null };

  if (error) {
    toast.error(`Error fetching tiers: ${error.message}`);
  }
  return tiers;
}


export async function fetchUpdateTierName(id: number, name: string): Promise<Tier | null> {
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