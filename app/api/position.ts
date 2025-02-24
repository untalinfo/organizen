import { supabase } from "@/utils/supabase/supabaseClient";

export default async function Positions() {
  const { data: positions, error } = await supabase.from('positions').select(
    `id, name, reports_to_id, tier_id,`
  );

  if (error) {
    console.error("Error fetching tiers:", error);
  }
  return JSON.stringify(positions, null, 2);
}

export async function PositionById(id: number) {
  const { data: position, error } = await supabase.from('positions').select(
    `id, name, position_assignments(id, employees(id, full_name, email)))`
  ).eq('id', id).single();
  if (error) {
    console.error("Error fetching tiers:", error);
  }
  return position;
}

interface EditPositionData {
  id?: number;
  name: string;
  // Add other fields as necessary
}

export async function EditPosition(data: EditPositionData): Promise<EditPositionData | null> {
  const { error } = await supabase.from('positions').upsert(data);

  if (error) {
    console.error("Error editing position:", error);
    return null;
  }
  return data;
}